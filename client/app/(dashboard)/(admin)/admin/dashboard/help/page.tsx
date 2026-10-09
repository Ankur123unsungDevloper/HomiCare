"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  CircleHelp,
  FileCheck2,
  Headphones,
  LifeBuoy,
  Mail,
  MessageSquare,
  Search,
  ShieldAlert,
  ShieldCheck,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const supportOptions = [
  {
    icon: Headphones,
    title: "Admin Support",
    description:
      "Get help with users, helpers, bookings, complaints, and platform operations.",
    action: "Contact Admin Support",
  },
  {
    icon: MessageSquare,
    title: "Technical Support",
    description:
      "Report technical problems affecting the HomiCare admin dashboard.",
    action: "Contact Technical Support",
  },
  {
    icon: ShieldAlert,
    title: "Report Security Issue",
    description:
      "Report suspicious activity, unauthorized access, or a security concern.",
    action: "Report an Issue",
  },
]

const faqs = [
  {
    question: "How do I verify a helper?",
    answer:
      "Open Helpers from the admin sidebar, select a helper from the verification queue, review the submitted information and verification items, then approve or reject the profile based on HomiCare's verification policy.",
  },
  {
    question: "How can I manage a user account?",
    answer:
      "Open Users from the admin dashboard and search for the household, helper, or administrator. From the available actions, you can review the user's profile and account activity. Suspension and restoration should be connected to backend authorization before production use.",
  },
  {
    question: "Where can I monitor bookings?",
    answer:
      "Use the Bookings section to search bookings, filter them by status, and review household, helper, service, and scheduling information.",
  },
  {
    question: "How are complaints handled?",
    answer:
      "Complaints can be reviewed from the Complaints section. Administrators can inspect the issue, review the related household and helper information, update the complaint status, and record the resolution once the backend workflow is implemented.",
  },
  {
    question: "Can I view platform performance?",
    answer:
      "Yes. The Analytics section provides operational metrics such as households, verified helpers, active bookings, completion rate, helper reliability, satisfaction, city performance, and service distribution.",
  },
  {
    question: "What should I do if a helper verification is incomplete?",
    answer:
      "Keep the profile in the appropriate pending state and review the missing verification information. Do not approve a helper until the required verification checks have been completed according to HomiCare's policy.",
  },
]

const helpTopics = [
  {
    icon: Users,
    title: "User Management",
    description: "Households, helpers, roles, account status, and access.",
  },
  {
    icon: FileCheck2,
    title: "Helper Verification",
    description: "Review profiles, identity details, and verification status.",
  },
  {
    icon: BookOpen,
    title: "Booking Operations",
    description: "Monitor requests, confirmed services, cancellations, and history.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Trust",
    description: "Verification, complaints, suspicious activity, and safety workflows.",
  },
]

function TopicCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <div className="group rounded-2xl border bg-card p-5 transition-colors hover:bg-muted/30">
      <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
        <Icon className="size-5" />
      </div>

      <h3 className="mt-4 font-semibold">{title}</h3>

      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
        Learn more
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  )
}

export default function AdminHelpPage() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(0)

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          Help & Support
        </p>

        <div className="mt-1 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              How can we help?
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Find guidance for managing HomiCare operations and resolving
              platform issues.
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <section className="rounded-2xl bg-foreground p-6 text-background sm:p-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-background/10">
            <LifeBuoy className="size-5" />
          </div>

          <h2 className="mt-4 text-xl font-semibold sm:text-2xl">
            Search the admin help center
          </h2>

          <p className="mt-2 text-sm text-background/65">
            Find answers about verification, bookings, users, complaints, and
            platform operations.
          </p>

          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search for help..."
              className="h-12 border-0 bg-background pl-11 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </section>

      {/* Support options */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Contact support</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Get assistance when you need help beyond the admin dashboard.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {supportOptions.map((option) => {
            const Icon = option.icon

            return (
              <div
                key={option.title}
                className="rounded-2xl border bg-card p-5"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                  <Icon className="size-5" />
                </div>

                <h3 className="mt-4 font-semibold">{option.title}</h3>

                <p className="mt-1 min-h-12 text-sm leading-6 text-muted-foreground">
                  {option.description}
                </p>

                <Button variant="outline" className="mt-5 w-full">
                  {option.action}
                </Button>
              </div>
            )
          })}
        </div>
      </section>

      <Separator />

      {/* Help topics */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Admin help topics</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Quick guidance for the areas you manage most often.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {helpTopics.map((topic) => (
            <TopicCard
              key={topic.title}
              icon={topic.icon}
              title={topic.title}
              description={topic.description}
            />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="mb-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <CircleHelp className="size-5" />
            Frequently asked questions
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Common questions about HomiCare administration.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-card">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index

            return (
              <div key={faq.question}>
                {index > 0 && <Separator />}

                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-muted/30"
                >
                  <span className="text-sm font-medium">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`size-4 shrink-0 text-muted-foreground transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pr-12">
                    <p className="text-sm leading-6 text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Safety */}
      <section className="rounded-2xl border bg-muted/30 p-6 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-background">
            <ShieldCheck className="size-5" />
          </div>

          <div className="flex-1">
            <h2 className="font-semibold">Safety & trust comes first</h2>

            <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
              Admin decisions can directly affect households and helpers.
              Always review verification information carefully, document
              important decisions, and escalate suspicious activity through
              the appropriate support channel.
            </p>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Button>
                <Link href="/admin/dashboard/helpers">
                  Review Verification Queue
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Button variant="outline">
                <Link href="/admin/dashboard/complaints">
                  View Complaints
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="rounded-2xl border bg-card p-6 text-center sm:p-8">
        <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-muted">
          <Mail className="size-5" />
        </div>

        <h2 className="mt-4 text-lg font-semibold">
          Still need help?
        </h2>

        <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-muted-foreground">
          Contact the HomiCare support team for assistance with platform
          operations or technical issues.
        </p>

        <Button variant="outline" className="mt-5">
          Contact Support
        </Button>
      </section>

      {/* Demo notice */}
      <div className="rounded-xl border border-dashed p-4">
        <p className="text-xs leading-5 text-muted-foreground">
          <span className="font-semibold text-foreground">Demo notice:</span>{" "}
          Support buttons and help-topic actions are currently UI-only.
          Connect them to your support workflow, email service, or ticketing
          system when the backend is implemented.
        </p>
      </div>
    </div>
  )
}