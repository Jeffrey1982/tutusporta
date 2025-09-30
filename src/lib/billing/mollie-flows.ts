import { mollie, appUrl } from "../mollie"
import { prisma } from "../prisma"
import { PRICES, planKeyFromString } from "./plans"
import type { Plan } from "@prisma/client"
import type { PaymentCreateParams } from "@mollie/api-client"
import { SequenceType } from "@mollie/api-client"

export async function createOrGetMollieCustomer(userId: string, email: string) {
  console.log('Looking for user with ID:', userId, 'and email:', email)

  // First try to find existing user by ID
  let user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      mollieCustomerId: true,
      mollieSubscriptionId: true,
      plan: true,
      subscriptionStatus: true
    }
  })

  // If user doesn't exist by ID, try to find by email (might be an existing user with different ID)
  if (!user) {
    console.log('User not found by ID, checking by email...')
    user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        mollieCustomerId: true,
        mollieSubscriptionId: true,
        plan: true,
        subscriptionStatus: true
      }
    })

    if (user) {
      console.log('Found existing user by email with different ID:', user.id, 'vs expected:', userId)
      // Update the user's ID to match Supabase
      user = await prisma.user.update({
        where: { email: email },
        data: { id: userId },
        select: {
          id: true,
          email: true,
          mollieCustomerId: true,
          mollieSubscriptionId: true,
          plan: true,
          subscriptionStatus: true
        }
      })
      console.log('Updated user ID to match Supabase:', user.id)
    }
  }

  // If user still doesn't exist, create them
  if (!user) {
    console.log('User not found in database, creating new user:', { userId, email })
    try {
      user = await prisma.user.create({
        data: {
          id: userId,
          email: email,
          plan: 'TRIAL',
          subscriptionStatus: 'inactive',
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days trial
        },
        select: {
          id: true,
          email: true,
          mollieCustomerId: true,
          mollieSubscriptionId: true,
          plan: true,
          subscriptionStatus: true
        }
      })
      console.log('User created successfully:', user.id)
    } catch (error) {
      console.error('Failed to create user, trying to find existing user again:', error)
      // Last resort: try to find the user again (might have been created by another request)
      user = await prisma.user.findUnique({
        where: { email: email },
        select: {
          id: true,
          email: true,
          mollieCustomerId: true,
          mollieSubscriptionId: true,
          plan: true,
          subscriptionStatus: true
        }
      })
      if (!user) {
        throw new Error('Unable to create or find user')
      }
    }
  }
  
  // If user already has a Mollie customer ID, return it
  if (user.mollieCustomerId) {
    try {
      const customer = await mollie.customers.get(user.mollieCustomerId)
      return customer
    } catch (error) {
      // Customer doesn't exist anymore, create a new one
    }
  }
  
  // Create new Mollie customer
  console.log('Creating new Mollie customer with data:', {
    email: email,
    name: email.split('@')[0],
    metadata: { userId: userId }
  })

  const customer = await mollie.customers.create({
    email: email,
    name: email.split('@')[0], // Use email prefix as name
    metadata: {
      userId: userId
    }
  })

  console.log('Mollie customer created:', {
    id: customer.id,
    email: customer.email,
    name: customer.name,
    mode: customer.mode
  })

  // Save customer ID to database
  await prisma.user.update({
    where: { id: userId },
    data: { mollieCustomerId: customer.id }
  })

  console.log('Customer ID saved to database')

  return customer
}

export async function createUpgradePayment(opts: {
  userId: string
  email: string
  plan: Exclude<Plan, "TRIAL">
}) {
  try {
    const { userId, email, plan } = opts

    console.log('=== Creating Upgrade Payment ===')
    console.log('Input:', { userId, email, plan })

    if (!PRICES[plan]) {
      throw new Error(`Invalid plan: ${plan}`)
    }

    // Get or create Mollie customer
    console.log('Getting or creating Mollie customer...')
    const customer = await createOrGetMollieCustomer(userId, email)
    console.log('Customer details:', {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      mode: customer.mode
    })

    // Check what payment methods are available (general list, not customer-specific)
    try {
      const availableMethods = await mollie.methods.list()
      console.log('Available methods (general):', availableMethods.map(m => ({ id: m.id, description: m.description, status: m.status })))
    } catch (methodError) {
      console.log('Could not check available methods:', methodError.message)
    }

    // Create payment without sequenceType to support all payment methods
    const paymentData: PaymentCreateParams = {
      amount: {
        currency: PRICES[plan].currency as any,
        value: PRICES[plan].amount
      },
      description: `TutusPorta ${plan} Plan - Payment (Vexnexa)`,
      customerId: customer.id,
      // Removed sequenceType to allow all payment methods
      redirectUrl: appUrl("/dashboard?checkout=success"),
      webhookUrl: appUrl("/api/mollie/webhook"),
      metadata: {
        userId,
        plan,
        type: "upgrade"
      }
    }

    console.log('Payment data to send:', JSON.stringify(paymentData, null, 2))

    const payment = await mollie.payments.create(paymentData)
    console.log('Payment created successfully:', {
      id: payment.id,
      status: payment.status,
      sequenceType: payment.sequenceType,
      checkoutUrl: payment.getCheckoutUrl()
    })
    return payment
  } catch (error) {
    console.error('=== Error in createUpgradePayment ===')
    console.error('Error type:', error.constructor.name)
    console.error('Error message:', error.message)
    console.error('Error details:', error)
    if (error.field) console.error('Error field:', error.field)
    if (error.statusCode) console.error('Status code:', error.statusCode)
    if (error.title) console.error('Error title:', error.title)
    throw error
  }
}

export async function createSubscription(opts: {
  customerId: string
  plan: Exclude<Plan, "TRIAL">
  userId: string
}) {
  const { customerId, plan, userId } = opts
  
  if (!PRICES[plan]) {
    throw new Error(`Invalid plan: ${plan}`)
  }
  
  // Check if customer has valid mandates
  const mandates = await mollie.customerMandates.page({ customerId })
  const validMandate = mandates.find((m: any) => m.status === "valid")

  if (!validMandate) {
    throw new Error("No valid mandate found for customer")
  }
  
  // Cancel existing subscription if any
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { mollieSubscriptionId: true }
  })
  if (user?.mollieSubscriptionId) {
    try {
      await mollie.customerSubscriptions.cancel(user.mollieSubscriptionId, { customerId })
    } catch (error) {
      // Failed to cancel existing subscription
    }
  }
  
  // Create new subscription
  const subscription = await (mollie.customerSubscriptions as any).create({
    customerId,
    amount: {
      currency: PRICES[plan].currency,
      value: PRICES[plan].amount
    },
    interval: "1 month",
    description: `TutusPorta ${plan} Plan (Vexnexa)`,
    startDate: new Date().toISOString().split('T')[0], // Start today
    metadata: {
      userId,
      plan
    }
  })
  
  // Update user in database
  await prisma.user.update({
    where: { id: userId },
    data: {
      plan,
      subscriptionStatus: "active",
      mollieSubscriptionId: subscription.id,
      trialEndsAt: null
    }
  })
  
  return subscription
}

export async function cancelSubscription(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      mollieCustomerId: true,
      mollieSubscriptionId: true
    }
  })
  
  if (!user) throw new Error("User not found")
  
  if (!user.mollieCustomerId || !user.mollieSubscriptionId) {
    throw new Error("No active subscription found")
  }
  
  // Cancel subscription at Mollie
  await mollie.customerSubscriptions.cancel(
    user.mollieSubscriptionId,
    { customerId: user.mollieCustomerId }
  )
  
  // Update user status
  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionStatus: "canceled",
      plan: "TRIAL", // Downgrade to trial
      mollieSubscriptionId: null,
      trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days grace period
    }
  })
}

export async function changePlan(opts: {
  userId: string
  newPlan: Exclude<Plan, "TRIAL">
}) {
  const { userId, newPlan } = opts
  
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      mollieCustomerId: true
    }
  })
  
  if (!user) throw new Error("User not found")
  
  if (!user.mollieCustomerId) {
    throw new Error("User has no Mollie customer ID")
  }
  
  // Check if user has valid mandate
  const mandates = await mollie.customerMandates.page({ customerId: user.mollieCustomerId })
  const validMandate = mandates.find((m: any) => m.status === "valid")

  if (!validMandate) {
    // Need new checkout flow for mandate
    return { needCheckout: true }
  }

  // Can create subscription directly
  await createSubscription({
    customerId: user.mollieCustomerId,
    plan: newPlan,
    userId
  })

  return { success: true }
}

export async function processWebhookPayment(paymentId: string) {
  // Fetch payment details from Mollie (never trust webhook data directly)
  const payment = await mollie.payments.get(paymentId)
  
  if (!(payment.metadata as any)?.userId || !(payment.metadata as any)?.plan) {
    console.error("Payment missing required metadata:", payment.id)
    return
  }
  
  const userId = (payment.metadata as any).userId
  const plan = planKeyFromString((payment.metadata as any).plan)
  
  if (payment.status !== "paid") {
    // Payment not paid yet
    return
  }
  
  // Payment is successful, create subscription
  if (payment.customerId && plan !== "TRIAL") {
    await createSubscription({
      customerId: payment.customerId,
      plan: plan as Exclude<Plan, "TRIAL">,
      userId
    })
  }
}

export async function createPaymentMethodResetPayment(userId: string, email: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true }
  })
  if (!user) throw new Error("User not found")
  
  // Get or create customer
  const customer = await createOrGetMollieCustomer(userId, email)
  
  // Create a small first payment to establish new mandate
  const paymentData: PaymentCreateParams = {
    amount: {
      currency: "EUR",
      value: "0.01" // 1 cent
    },
    description: "TutusPorta - Payment Method Setup (Vexnexa)",
    customerId: customer.id,
    sequenceType: SequenceType.first,
    redirectUrl: appUrl("/settings/billing?setup=success"),
    webhookUrl: appUrl("/api/mollie/webhook"),
    metadata: {
      userId,
      type: "payment_method_reset"
    }
  }

  const payment = await mollie.payments.create(paymentData)
  
  return payment
}