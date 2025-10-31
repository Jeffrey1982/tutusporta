"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  ArrowRight,
  Zap,
  Target,
  Shield,
  Users,
  TrendingUp,
  FileText,
  Bell,
  Code,
  Eye,
  Gauge,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoStrip } from "@/components/marketing/LogoStrip";
import { Testimonials } from "@/components/marketing/Testimonials";
import { FAQ } from "@/components/marketing/FAQ";

// JSON-LD structured data
function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TutusPorta by Vexnexa",
    description: "Advanced web accessibility and compliance scanner with coverage beyond traditional WCAG checks",
    url: "https://tutusporta.com",
    logo: "https://tutusporta.com/logo.png",
    sameAs: [
      "https://linkedin.com/company/vexnexa",
      "https://twitter.com/vexnexa",
      "https://github.com/vexnexa",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://tutusporta.com/contact",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Hero Section
function HeroSection() {
  const handleCtaClick = (location: string) => {
    if (typeof window !== 'undefined' && window.va) {
      window.va.track("cta_click", { location });
    }
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="text-center lg:text-left space-y-8">
            <h1 className="animate-slide-up text-4xl lg:text-5xl xl:text-6xl font-bold font-display tracking-tight leading-tight">
              The secure gateway to{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                web accessibility
              </span>
            </h1>

            <p className="animate-slide-up text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Automated scanning + 8 extra categories beyond traditional WCAG checks. Clear reports, quick fixes, continuous monitoring.
            </p>

            <div className="animate-scale-in flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-4">
              <Button
                size="lg"
                className="button-hover gradient-primary text-white border-0 shadow-soft relative overflow-hidden group px-8 py-6 text-base"
                asChild
              >
                <Link
                  href="/auth/register"
                  onClick={() => handleCtaClick("hero_primary")}
                >
                  <span className="relative z-10 flex items-center">
                    Start free scan
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="button-hover border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 px-8 py-6 text-base"
                asChild
              >
                <Link href="/pricing">
                  See pricing
                </Link>
              </Button>
            </div>

            <p className="animate-fade-in text-sm text-muted-foreground pt-4">
              No credit card needed • 1 free scan/week
            </p>
          </div>

          {/* Right column - Dashboard screenshot */}
          <div className="relative animate-fade-in">
            <div className="relative z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/heroImage.png"
                alt="TutusPorta accessibility scanning dashboard showing detailed reports and issue prioritization"
                className="aspect-square lg:aspect-[4/3] rounded-3xl shadow-2xl border border-primary/20 w-full h-full object-cover"
              />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-pulse" aria-hidden="true"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse delay-500" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Value Pillars Section
function ValuePillarsSection() {
  const pillars = [
    {
      icon: Eye,
      title: "Deeper coverage",
      description: "Keyboard, cognitive, structure, contrast, forms, landmarks, multimedia, ARIA semantics.",
    },
    {
      icon: FileText,
      title: "Actionable reports",
      description: "Prioritized issues, code snippets, and remediation tips.",
    },
    {
      icon: Bell,
      title: "Continuous monitoring",
      description: "Schedule scans, track regressions, alert your team.",
    },
    {
      icon: Users,
      title: "Team-ready",
      description: "Projects, roles, Slack/Jira integration, API.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <Card
              key={index}
              className="text-center interactive-hover border-0 shadow-elegant bg-card/80 backdrop-blur-sm group"
            >
              <CardContent className="p-8 h-full flex flex-col">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 group-hover:scale-110">
                    <pillar.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold font-display mb-4 group-hover:text-primary transition-colors">
                  {pillar.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed flex-1">
                  {pillar.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Feature Details Section
function FeaturesSection() {
  const features = [
    "8 additional scanning categories beyond WCAG",
    "Keyboard navigation testing",
    "Screen reader compatibility checks",
    "Mobile accessibility analysis",
    "Cognitive accessibility assessment",
    "Motion & animation safety",
    "Advanced color vision testing",
    "Performance impact analysis",
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold font-display">
              From scan to action in{" "}
              <span className="text-primary">minutes</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              No technical expertise required. Our reports are clear enough that your team can start improvements immediately.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button asChild className="mt-6" size="lg">
              <Link href="/auth/register">
                Start free scan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="relative">
            <div className="bg-white rounded-lg shadow-xl p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Screenshot1.png"
                alt="TutusPorta scan detail report showing accessibility issues with prioritization and remediation tips"
                className="w-full h-64 rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Band
function CTABand() {
  return (
    <section className="py-12 bg-muted/30 border-y">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold font-display mb-4">
          Check your site now
        </h3>
        <Button size="lg" asChild className="gradient-primary">
          <Link href="/auth/register">
            Start free scan
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTASection() {
  return (
    <section className="py-20 gradient-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-10 left-10 w-32 h-32 border border-primary-foreground/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 border border-primary-foreground/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-primary-foreground/15 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold font-display animate-slide-up">
            Start your free scan
          </h2>
          <p className="text-xl opacity-90 animate-slide-up leading-relaxed">
            No credit card required. Get started in seconds and see what accessibility issues exist on your site.
          </p>

          <div className="animate-scale-in flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              variant="secondary"
              className="button-hover bg-white text-primary hover:bg-white/90 shadow-soft px-8 py-6 text-base"
              asChild
            >
              <Link href="/auth/register">
                Start free scan
                <Zap className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="button-hover bg-transparent border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground px-8 py-6 text-base"
              asChild
            >
              <Link href="/contact">
                Talk to us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function HomePage() {
  // Placeholder data for components
  const logos = [
    { name: "Rijksdienst" },
    { name: "InsurerCo" },
    { name: "FinanceCorp" },
    { name: "E-CommerceNL" },
  ];

  const testimonials = [
    {
      quote: "TutusPorta found accessibility issues our previous tools completely missed. The reports are actionable and help us prioritize fixes effectively.",
      author: "Sarah Johnson",
      role: "Lead Developer",
      company: "TechCorp",
      rating: 5,
    },
    {
      quote: "The continuous monitoring feature helps us catch regressions before they reach production. It's become an essential part of our CI/CD pipeline.",
      author: "Michael Chen",
      role: "Engineering Manager",
      company: "StartupXYZ",
      rating: 5,
    },
    {
      quote: "Finally, an accessibility scanner that goes beyond the basics. The keyboard navigation and screen reader testing saved us weeks of manual QA.",
      author: "Emma Williams",
      role: "QA Lead",
      company: "Enterprise Inc",
      rating: 5,
    },
  ];

  const faqItems = [
    {
      question: "Can you guarantee legal compliance?",
      answer: "No tool can guarantee 100% legal compliance in all contexts. TutusPorta detects and reports issues, assists remediation, and helps you adhere to WCAG and related standards. For legal risk assessment, consider an expert audit and ongoing governance process.",
    },
    {
      question: "How do page limits work?",
      answer: "Each plan includes a monthly page scan limit. A 'page' is one URL scanned. If you scan the same page multiple times in a month, each scan counts toward your limit. When you approach your limit, you'll receive a notification.",
    },
    {
      question: "What if I exceed my plan?",
      answer: "Small overages are automatically billed at €0.002/page, €2/extra site, or €1/extra user per month. When you consistently exceed limits, we'll suggest upgrading to a more suitable plan.",
    },
    {
      question: "Do you support teams/SSO?",
      answer: "Pro plans support up to 5 team members. Business plans support up to 15 members with role-based access. SSO is available on Business and Enterprise plans. Contact us for Enterprise features.",
    },
    {
      question: "Can I export reports?",
      answer: "PDF export is available on all paid plans. Word export is available on Pro and Business plans. All exports include your scan results, prioritized issues, code snippets, and remediation recommendations.",
    },
    {
      question: "What's monitored continuously?",
      answer: "Continuous monitoring allows you to schedule automatic scans (daily, weekly, or monthly). You'll receive email alerts when scores drop or new issues are detected. This feature is available on Pro and Business plans.",
    },
  ];

  return (
    <>
      <JsonLd />
      <HeroSection />
      <LogoStrip logos={logos} />
      <ValuePillarsSection />
      <FeaturesSection />
      <CTABand />
      <Testimonials testimonials={testimonials} title="Trusted by accessibility professionals" />
      <FAQ items={faqItems} />
      <FinalCTASection />
    </>
  );
}
