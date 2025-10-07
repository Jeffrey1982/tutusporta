import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Shield, Mail, Calendar, Clock, Activity, ListTree } from 'lucide-react'

export const metadata: Metadata = {
  title: 'SLA & Support - TutusPorta',
  description:
    'Service Level Agreement en support informatie van TutusPorta: uptime garanties, response times en support levels.',
  keywords: [
    'SLA',
    'service level agreement',
    'support',
    'uptime',
    'response time',
    'beschikbaarheid',
  ],
  openGraph: {
    title: 'SLA & Support - TutusPorta',
    description:
      'Service Level Agreement en support informatie van TutusPorta: uptime garanties, response times en support levels.',
    url: 'https://tutusporta.com/legal/sla',
    siteName: 'TutusPorta',
    type: 'website',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary',
    title: 'SLA & Support - TutusPorta',
    description:
      'Service Level Agreement en support informatie van TutusPorta: uptime garanties, response times en support levels.',
  },
  alternates: {
    canonical: 'https://tutusporta.com/legal/sla',
    languages: { 'nl-NL': 'https://tutusporta.com/legal/sla' },
  },
  robots: { index: true, follow: true },
}

const lastUpdated = '8 december 2024'
const policyVersion = 'v1.0'

const sections = [
  { id: 'agreement', label: 'Service Level Agreement' },
  { id: 'support', label: 'Support Levels' },
  { id: 'incidents', label: 'Incident Response' },
  { id: 'contact', label: 'Contact Support' },
]

export default function SLAPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:ring"
      >
        Ga naar hoofdinhoud
      </a>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-b from-primary/5 via-transparent to-transparent">
        <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative p-6 sm:p-10">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Terug naar startpagina
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">SLA & Support</h1>
            <Badge variant="outline" className="flex items-center gap-2">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              Laatst bijgewerkt: {lastUpdated}
            </Badge>
            <Badge variant="secondary" aria-label={`Beleidsversie ${policyVersion}`}>
              {policyVersion}
            </Badge>
          </div>
          <p className="mt-3 max-w-2xl text-base sm:text-lg text-muted-foreground">
            Onze service level overeenkomst en support informatie voor alle TutusPorta gebruikers.
          </p>

          {/* Summary */}
          <div className="mt-8">
            <Card className="border-primary/30 bg-primary/10">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Shield className="h-5 w-5" aria-hidden="true" />
                  Belangrijkste punten
                </CardTitle>
                <CardDescription>Onze toezeggingen aan jou</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-3">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Uptime
                  </p>
                  <p className="leading-relaxed">
                    99.9% uptime garantie op alle betaalde plannen
                  </p>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Support
                  </p>
                  <p className="leading-relaxed">
                    Reactie binnen 4 uur voor Business plan gebruikers
                  </p>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    24/7 Monitoring
                  </p>
                  <p className="leading-relaxed">
                    Continue monitoring met directe incident response
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Content + Aside */}
      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_300px]">
        {/* Main */}
        <main
          id="main"
          className={[
            'prose prose-slate max-w-none',
            '[&_h2]:mt-14 [&_h2]:mb-5 [&_h2]:scroll-mt-24',
            '[&_h3]:mt-9  [&_h3]:mb-3',
            '[&_ul]:my-5 [&_ul>li]:my-2 [&_ol]:my-5 [&_ol>li]:my-2 leading-relaxed',
            '[&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-muted',
          ].join(' ')}
        >
          {/* Service Level Agreement */}
          <section id="agreement">
            <h2>Service Level Agreement</h2>
            <p>
              TutusPorta commits to providing reliable service with the following availability
              targets:
            </p>
            <ul>
              <li>
                <strong>Uptime:</strong> 99.9% uptime on all paid plans (excludes scheduled
                maintenance)
              </li>
              <li>
                <strong>Scheduled Maintenance:</strong> Announced at least 48 hours in advance
              </li>
              <li>
                <strong>Scan Processing:</strong> Scans typically complete within 5-15 minutes for
                standard pages
              </li>
            </ul>
          </section>

          <div className="h-px bg-border my-10 not-prose" />

          {/* Support Levels */}
          <section id="support">
            <h2>Support Levels</h2>

            <h3>Starter Plan</h3>
            <ul>
              <li>Email support</li>
              <li>Response time: Within 2 business days</li>
              <li>Access to documentation and guides</li>
            </ul>

            <h3>Pro Plan</h3>
            <ul>
              <li>Priority email support</li>
              <li>Response time: Within 1 business day</li>
              <li>Access to advanced documentation</li>
              <li>Quarterly check-in calls (optional)</li>
            </ul>

            <h3>Business Plan</h3>
            <ul>
              <li>Priority support via email and chat</li>
              <li>Response time: Within 4 hours during business hours</li>
              <li>Dedicated account manager</li>
              <li>Monthly check-in calls</li>
              <li>Priority feature requests</li>
            </ul>

            <h3>Enterprise Plan</h3>
            <ul>
              <li>24/7 support via phone, email, and chat</li>
              <li>Response time: Within 1 hour for critical issues</li>
              <li>Dedicated account team</li>
              <li>Custom SLA available</li>
              <li>On-call support for emergencies</li>
            </ul>
          </section>

          <div className="h-px bg-border my-10 not-prose" />

          {/* Incident Response */}
          <section id="incidents">
            <h2>Incident Response</h2>
            <p>
              We monitor our systems 24/7 and respond to incidents according to severity:
            </p>
            <ul>
              <li><strong>Critical:</strong> Service down - Immediate response</li>
              <li><strong>High:</strong> Major functionality impaired - Response within 2 hours</li>
              <li><strong>Medium:</strong> Minor functionality impaired - Response within 1 business day</li>
              <li><strong>Low:</strong> Cosmetic or minor issues - Response within 3 business days</li>
            </ul>
          </section>

          <div className="h-px bg-border my-10 not-prose" />

          {/* Contact Support */}
          <section id="contact">
            <h2>Contact Support</h2>
            <div className="not-prose rounded-lg border bg-muted/40 p-4 space-y-2">
              <p className="font-medium">Support Contact</p>
              <p className="text-sm text-muted-foreground">
                <Mail className="inline h-4 w-4 mr-1" aria-hidden="true" />
                E-mail: <a className="text-primary hover:underline" href="mailto:support@tutusporta.com">support@tutusporta.com</a>
              </p>
              <p className="text-sm text-muted-foreground">
                Of via het contact formulier in je dashboard
              </p>
            </div>
          </section>

          {/* Footer strip */}
          <div className="not-prose mt-12 rounded-xl border bg-background p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">Laatst bijgewerkt: {lastUpdated}</p>
              <div className="flex gap-3">
                <Button variant="outline" asChild>
                  <Link href="/legal/security">Security</Link>
                </Button>
                <Button asChild>
                  <Link href="/contact">Contact opnemen</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* Aside */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <ListTree className="h-4 w-4" />
                Op deze pagina
              </CardTitle>
              <CardDescription>Snel naar een sectie</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              <nav aria-label="Inhoudsopgave" className="space-y-2">
                {sections.map((s) => (
                  <div key={s.id}>
                    <Link
                      href={`#${s.id}`}
                      className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring rounded"
                    >
                      {s.label}
                    </Link>
                  </div>
                ))}
              </nav>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Hulp nodig?</CardTitle>
              <CardDescription>We reageren meestal binnen 1 werkdag.</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button asChild className="w-full">
                <Link href="/contact">Contact opnemen</Link>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
