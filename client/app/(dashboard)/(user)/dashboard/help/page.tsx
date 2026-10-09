"use client"

import { useState } from "react"
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const faqs = [
  {
    question: "How do I book a helper?",
    answer:
      "Go to Find Care, choose the type of service you need, select a helper, choose your preferred plan and schedule, then send a booking request. The helper can accept or reject the request.",
  },
  {
    question: "What happens after I send a booking request?",
    answer:
      "Your request appears under My Bookings with a Pending status. Once the helper responds, the booking status will be updated and you will receive a notification.",
  },
  {
    question: "Can I cancel a booking?",
    answer:
      "You can request cancellation from the relevant booking. Cancellation availability and any applicable conditions will depend on the booking status and HomiCare's cancellation policy.",
  },
  {
    question: "How are helpers verified?",
    answer:
      "HomiCare maintains verified helper profiles using the information and verification documents collected during the helper onboarding process.",
  },
  {
    question: "Can I change my service plan?",
    answer:
      "You can contact HomiCare support to request changes to an active service arrangement. Availability depends on the service and helper.",
  },
  {
    question: "How do I leave a review?",
    answer:
      "After completing a service, an option to leave a review will appear in your Reviews section. You can rate the experience and provide written feedback.",
  },
]

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">

      {/* Header */}
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          SUPPORT
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Help & support
        </h1>

        <p className="mt-2 max-w-2xl text-muted-foreground">
          Find answers, understand how HomiCare works, or get help
          with your care services.
        </p>
      </div>

      {/* Search */}
      <section className="border bg-card p-6 sm:p-8">
        <div className="mx-auto max-w-2xl text-center">

          <HelpCircle className="mx-auto h-8 w-8" />

          <h2 className="mt-4 text-xl font-bold">
            How can we help?
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Search our help topics or browse the common questions
            below.
          </p>

          <div className="relative mt-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search for help..."
              className="h-11 pl-10"
            />
          </div>

        </div>
      </section>

      {/* Quick support */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold">
            Get support
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Choose the way you&apos;d like to contact HomiCare.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">

          <SupportOption
            icon={<MessageCircle className="h-5 w-5" />}
            title="Chat with us"
            description="Get help with bookings and care services."
            action="Start chat"
          />

          <SupportOption
            icon={<Mail className="h-5 w-5" />}
            title="Email support"
            description="Send us a detailed question or request."
            action="Contact support"
          />

          <SupportOption
            icon={<Phone className="h-5 w-5" />}
            title="Call support"
            description="Speak with a HomiCare support representative."
            action="View contact"
          />

        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold">
            Frequently asked questions
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Quick answers to common HomiCare questions.
          </p>
        </div>

        <div className="border bg-card">

          {faqs.map((faq, index) => {
            const isOpen = openFaq === index

            return (
              <div key={faq.question}>

                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-6 p-5 text-left transition-colors hover:bg-muted/50 sm:p-6"
                >
                  <span className="font-medium">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                    <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                )}

                {index < faqs.length - 1 && (
                  <Separator />
                )}

              </div>
            )
          })}

        </div>
      </section>

      {/* Help topics */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold">
            Help topics
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <HelpTopic
            icon={<BookOpen className="h-5 w-5" />}
            title="Getting started"
            description="Learn how to find and book care."
          />

          <HelpTopic
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Trust & verification"
            description="Understand helper verification."
          />

          <HelpTopic
            icon={<MessageCircle className="h-5 w-5" />}
            title="Bookings & services"
            description="Manage your care arrangements."
          />

        </div>
      </section>

      {/* Safety */}
      <section className="border bg-muted/40 p-6 sm:p-8">

        <div className="flex gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-background">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-semibold">
              If something doesn&apos;t feel right
            </h2>

            <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
              If you have a safety concern, problem with a service,
              or issue involving a helper, contact HomiCare support
              as soon as possible. For emergencies, contact your
              local emergency services first.
            </p>

            <Button
              variant="outline"
              className="mt-5"
            >
              Contact support
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

        </div>

      </section>

    </div>
  )
}

function SupportOption({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode
  title: string
  description: string
  action: string
}) {
  return (
    <div className="border bg-card p-6">

      <div className="flex h-10 w-10 items-center justify-center bg-muted">
        {icon}
      </div>

      <h3 className="mt-5 font-semibold">
        {title}
      </h3>

      <p className="mt-2 min-h-10 text-sm leading-5 text-muted-foreground">
        {description}
      </p>

      <Button
        variant="outline"
        size="sm"
        className="mt-5"
      >
        {action}
      </Button>

    </div>
  )
}

function HelpTopic({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-4 border bg-card p-5 text-left transition-colors hover:bg-muted/50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-muted">
        {icon}
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-semibold">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>

      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
    </button>
  )
}