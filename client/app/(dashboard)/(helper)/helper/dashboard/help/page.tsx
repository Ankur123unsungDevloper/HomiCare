"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  Mail,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  UserRoundCheck,
  Wallet,
  AlertTriangle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const supportOptions = [
  {
    title: "Chat with support",
    description: "Get help from the HomiCare support team.",
    icon: MessageCircle,
    action: "Start chat",
  },
  {
    title: "Email support",
    description: "Send us your question and we'll get back to you.",
    icon: Mail,
    action: "Contact support",
  },
  {
    title: "Call support",
    description: "Need urgent assistance? Speak with our team.",
    icon: Phone,
    action: "Call support",
  },
]

const helpTopics = [
  {
    title: "Booking Requests",
    description: "Accept, reject, and manage household requests.",
    icon: BookOpen,
    href: "/helper/dashboard/requests",
  },
  {
    title: "Services & Schedule",
    description: "Manage your active services and availability.",
    icon: CalendarDays,
    href: "/helper/dashboard/schedule",
  },
  {
    title: "Profile & Verification",
    description: "Keep your profile and verification information updated.",
    icon: UserRoundCheck,
    href: "/helper/dashboard/profile",
  },
  {
    title: "Earnings",
    description: "View completed services and your earnings summary.",
    icon: Wallet,
    href: "/helper/dashboard/earnings",
  },
]

const faqs = [
  {
    question: "How do I accept a booking request?",
    answer:
      "Open Booking Requests from your dashboard. Review the household, service plan, schedule, location, and requirements. If everything works for you, select Accept Request.",
  },
  {
    question: "What happens after I accept a request?",
    answer:
      "Once you accept a request, the service moves into your upcoming or active services. You can then review the schedule and service details from My Services.",
  },
  {
    question: "How do I update my availability?",
    answer:
      "You can manage your availability from your helper profile and work preferences. Keeping your schedule accurate helps households send requests that fit your availability.",
  },
  {
    question: "How are helper profiles verified?",
    answer:
      "HomiCare reviews the verification information submitted by helpers. Your profile can show verification status when the required information has been reviewed.",
  },
  {
    question: "How does service completion work?",
    answer:
      "After completing a scheduled service, the service record can be reflected in your service history. Completed services may also contribute to your earnings and household feedback.",
  },
  {
    question: "Where can I view my earnings?",
    answer:
      "Open Earnings from the helper dashboard to view your earnings summary and completed service activity.",
  },
  {
    question: "What if a household cancels?",
    answer:
      "If a household cancels or changes a service, review the updated booking information in your dashboard. If the situation is unclear or affects an active service, contact HomiCare support.",
  },
  {
    question: "How do I report a problem?",
    answer:
      "If you experience a safety concern, inappropriate behavior, a booking dispute, or another serious issue, contact HomiCare support as soon as possible.",
  },
]

function SupportIcon({
  icon: Icon,
}: {
  icon: React.ElementType
}) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-muted/50">
      <Icon className="h-5 w-5" />
    </div>
  )
}

function FAQItem({
  question,
  answer,
  open,
  onClick,
}: {
  question: string
  answer: string
  open: boolean
  onClick: () => void
}) {
  return (
    <div className="border-b last:border-b-0">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="font-medium">{question}</span>

        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="pb-5 pr-8 text-sm leading-6 text-muted-foreground">
          {answer}
        </div>
      )}
    </div>
  )
}

export default function HelperHelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="space-y-10 pb-10">
      {/* Header */}
      <section className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          SUPPORT
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Help & Support
        </h1>

        <p className="max-w-2xl text-muted-foreground">
          Find answers, manage your helper account, or get in touch with the
          HomiCare support team.
        </p>
      </section>

      {/* Search */}
      <section className="rounded-2xl border bg-card p-6">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <div>
            <h2 className="text-lg font-semibold">
              How can we help?
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Search for answers about bookings, services, verification, or
              earnings.
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search help articles..."
              className="h-12 pl-11"
            />
          </div>
        </div>
      </section>

      {/* Support options */}
      <section className="space-y-5">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            CONTACT US
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight">
            Need a little more help?
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {supportOptions.map((option) => {
            const Icon = option.icon

            return (
              <div
                key={option.title}
                className="rounded-2xl border bg-card p-5"
              >
                <SupportIcon icon={Icon} />

                <h3 className="mt-5 font-semibold">
                  {option.title}
                </h3>

                <p className="mt-2 min-h-10 text-sm leading-5 text-muted-foreground">
                  {option.description}
                </p>

                <Button
                  variant="outline"
                  className="mt-5 w-full"
                >
                  {option.action}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )
          })}
        </div>
      </section>

      {/* Help topics */}
      <section className="space-y-5">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            HELP TOPICS
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight">
            Explore the helper guide.
          </h2>
        </div>

        <div className="grid gap-x-8 md:grid-cols-2">
          {helpTopics.map((topic) => {
            const Icon = topic.icon

            return (
              <Link
                key={topic.title}
                href={topic.href}
                className="group flex items-center gap-4 border-b py-5 transition-colors hover:bg-muted/30"
              >
                <SupportIcon icon={Icon} />

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">
                    {topic.title}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {topic.description}
                  </p>
                </div>

                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
              </Link>
            )
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-5">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            FREQUENTLY ASKED QUESTIONS
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight">
            Common questions.
          </h2>
        </div>

        <div className="rounded-2xl border bg-card px-6">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              open={openFaq === index}
              onClick={() =>
                setOpenFaq(openFaq === index ? null : index)
              }
            />
          ))}
        </div>
      </section>

      {/* Safety / reporting */}
      <section className="rounded-2xl border bg-muted/30 p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-background">
              <AlertTriangle className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold">
                Need to report an issue?
              </h2>

              <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
                If something doesn&apos;t feel right during a service, contact
                HomiCare support. For immediate safety concerns, prioritize
                your personal safety and seek appropriate local assistance.
              </p>
            </div>
          </div>

          <Button variant="outline" className="shrink-0">
            Report a concern
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Verification reminder */}
      <section className="flex gap-4 rounded-2xl border bg-card p-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted">
          <ShieldCheck className="h-5 w-5" />
        </div>

        <div>
          <h3 className="font-semibold">
            Keep your profile information accurate.
          </h3>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Accurate profile, service, and availability information helps
            households make informed booking decisions.
          </p>

          <Link
            href="/helper/dashboard/profile"
            className="mt-3 inline-flex items-center text-sm font-semibold underline-offset-4 hover:underline"
          >
            Review my profile
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>
      </section>

      <Separator />

      <p className="text-center text-xs text-muted-foreground">
        HomiCare Support · Care You Can Count On.
      </p>
    </div>
  )
}