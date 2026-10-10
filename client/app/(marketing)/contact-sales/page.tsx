"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Headphones,
  Home,
  ShieldCheck,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const demoHighlights = [
  {
    number: "01",
    icon: ShieldCheck,
    title: "Helper verification",
    description:
      "See how helper profiles, verification information, and approval workflows can be managed.",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "Booking management",
    description:
      "Explore how service requests, schedules, and household bookings fit into one workflow.",
  },
  {
    number: "03",
    icon: FileCheck2,
    title: "Service oversight",
    description:
      "Understand how service history, feedback, and operational visibility work together.",
  },
]

const demoIncludes = [
  "A walkthrough of the HomiCare platform",
  "An overview of helper and booking workflows",
  "A discussion of your service management needs",
]

type DemoForm = {
  fullName: string
  email: string
  organization: string
  role: string
  preferredDate: string
  message: string
}

const initialForm: DemoForm = {
  fullName: "",
  email: "",
  organization: "",
  role: "",
  preferredDate: "",
  message: "",
}

export default function RequestDemoPage() {
  const [form, setForm] = React.useState<DemoForm>(initialForm)
  const [submitted, setSubmitted] = React.useState(false)
  const [error, setError] = React.useState("")

  const today = new Date()
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-")

  function updateField<K extends keyof DemoForm>(
    field: K,
    value: DemoForm[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    if (!form.fullName.trim()) {
      setError("Please enter your full name.")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.")
      return
    }

    if (!form.role) {
      setError("Please select your role.")
      return
    }

    if (form.preferredDate && form.preferredDate < minDate) {
      setError("Please select today or a future date.")
      return
    }

    // UI demonstration only. No data is stored or transmitted.
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top navigation */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="HomiCare home"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-foreground text-background">
              <Home className="size-5" />
            </span>

            <span className="text-xl font-bold tracking-tight">
              HomiCare
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1.5 text-xs font-semibold tracking-wide">
              <span className="size-1.5 rounded-full bg-foreground" />
              HOMICARE PLATFORM DEMO
            </div>

            <h1 className="mt-7 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              A better way to
              <br />
              manage home care.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Discover how HomiCare brings helper verification, bookings, and
              service management together in one straightforward platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12"
                onClick={() =>
                  document
                    .getElementById("demo-form")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              >
                Request your demo
                <ArrowRight className="ml-2 size-4" />
              </Button>

              <Button size="lg" variant="outline" className="h-12">
                <Link href="/#how-it-works">
                  Discover HomiCare
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 text-foreground" />
                Personalised walkthrough
              </span>

              <span className="inline-flex items-center gap-2">
                <Clock3 className="size-4 text-foreground" />
                Discuss your requirements
              </span>
            </div>
          </div>

          {/* Product preview */}
          <div className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-muted/60 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border bg-card shadow-xl shadow-black/4">
              <div className="flex items-center justify-between border-b px-5 py-4">
                <div>
                  <p className="text-sm font-semibold">Operations overview</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Your care, organised.
                  </p>
                </div>

                <span className="rounded-full border px-2.5 py-1 text-xs font-medium">
                  Platform preview
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 sm:p-5">
                <div className="rounded-xl border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <Users className="size-4 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">
                      PROFILES
                    </span>
                  </div>

                  <p className="mt-4 text-2xl font-bold">Helpers</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Profile management
                  </p>
                </div>

                <div className="rounded-xl border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <CalendarDays className="size-4 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">
                      SCHEDULING
                    </span>
                  </div>

                  <p className="mt-4 text-2xl font-bold">Bookings</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Requests and schedules
                  </p>
                </div>
              </div>

              <div className="px-4 pb-5 sm:px-5">
                <div className="rounded-xl border">
                  <div className="flex items-center justify-between border-b px-4 py-3">
                    <p className="text-sm font-semibold">Core workflows</p>
                    <span className="text-xs text-muted-foreground">
                      Preview
                    </span>
                  </div>

                  {[
                    {
                      icon: BadgeCheck,
                      title: "Helper profiles",
                      detail: "Verification and service details",
                    },
                    {
                      icon: CalendarDays,
                      title: "Service bookings",
                      detail: "Requests and scheduling",
                    },
                    {
                      icon: FileCheck2,
                      title: "Service records",
                      detail: "History and feedback",
                    },
                  ].map((item, index) => {
                    const Icon = item.icon

                    return (
                      <div
                        key={item.title}
                        className={`flex items-center gap-3 px-4 py-3.5 ${
                          index < 2 ? "border-b" : ""
                        }`}
                      >
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                          <Icon className="size-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {item.detail}
                          </p>
                        </div>

                        <Check className="size-4 text-muted-foreground" />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="relative mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-foreground" />
              Illustrative preview — not live platform data
            </div>
          </div>
        </div>
      </section>

      {/* Demo agenda */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
              WHAT YOU&apos;LL SEE
            </p>

            <h2 className="mt-4 max-w-lg text-3xl font-bold tracking-tight sm:text-4xl">
              Everything your care operations need to feel simpler.
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
              Explore the workflows that help bring visibility, structure, and
              accountability to home care services.
            </p>

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("demo-form")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
            >
              Book a walkthrough
              <ArrowDown className="size-4" />
            </button>
          </div>

          <div className="divide-y border-y">
            {demoHighlights.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.number}
                  className="grid gap-4 py-6 sm:grid-cols-[60px_1fr] sm:gap-6 sm:py-8"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl border">
                    <Icon className="size-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-muted-foreground">
                        {item.number}
                      </span>

                      <h3 className="text-lg font-semibold">{item.title}</h3>
                    </div>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Form section */}
      <section
        id="demo-form"
        className="scroll-mt-24 border-y bg-muted/30"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
              LET&apos;S TALK
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              See how HomiCare could work for you.
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
              Tell us a little about yourself and what you&apos;re looking for.
              We&apos;ll use that information to shape a relevant product
              walkthrough.
            </p>

            <div className="mt-8 space-y-5">
              {demoIncludes.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                    <Check className="size-3" />
                  </span>

                  <p className="text-sm leading-6">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border bg-background p-5">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <Headphones className="size-5" />
                </div>

                <div>
                  <p className="font-semibold">Have a specific requirement?</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Use the message field to tell us about your team, service
                    model, or operational challenges.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-background p-5 shadow-sm sm:p-8">
            {submitted ? (
              <div className="flex min-h-110 flex-col items-center justify-center text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                  <CheckCircle2 className="size-7" />
                </div>

                <h3 className="mt-5 text-2xl font-bold">
                  Your form is complete.
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                  The demo request interface is working, but submission is not
                  connected to a server yet. Your information has not been
                  saved or sent.
                </p>

                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setForm(initialForm)
                    setSubmitted(false)
                    setError("")
                  }}
                >
                  Submit another request
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-bold">Request your demo</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Complete the form below to get started.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="fullName"
                        className="text-sm font-medium"
                      >
                        Full name <span aria-hidden="true">*</span>
                      </label>

                      <Input
                        id="fullName"
                        autoComplete="name"
                        placeholder="Your full name"
                        value={form.fullName}
                        onChange={(event) =>
                          updateField("fullName", event.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email address <span aria-hidden="true">*</span>
                      </label>

                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(event) =>
                          updateField("email", event.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="organization"
                      className="text-sm font-medium"
                    >
                      Organization / agency
                    </label>

                    <Input
                      id="organization"
                      autoComplete="organization"
                      placeholder="Your organization name (optional)"
                      value={form.organization}
                      onChange={(event) =>
                        updateField("organization", event.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium">
                      Your role <span aria-hidden="true">*</span>
                    </label>
                    <Select
                      value={form.role}
                      onValueChange={(value: string | null) =>
                        updateField("role", value ?? "")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="helper">Helper</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="preferredDate"
                      className="text-sm font-medium"
                    >
                      Preferred demo date
                    </label>

                    <Input
                      id="preferredDate"
                      type="date"
                      min={minDate}
                      value={form.preferredDate}
                      onChange={(event) =>
                        updateField("preferredDate", event.target.value)
                      }
                    />

                    <p className="text-xs text-muted-foreground">
                      Optional. This date is a preference, not a confirmed
                      appointment.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      What would you like to explore?
                    </label>

                    <Textarea
                      id="message"
                      placeholder="Tell us about your requirements..."
                      className="min-h-28 resize-y"
                      value={form.message}
                      onChange={(event) =>
                        updateField("message", event.target.value)
                      }
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-sm text-destructive">
                      {error}
                    </p>
                  )}

                  <Button type="submit" size="lg" className="h-12 w-full">
                    Request a demo
                    <ArrowRight className="ml-2 size-4" />
                  </Button>

                  <p className="text-center text-xs leading-5 text-muted-foreground">
                    Please avoid entering identity documents or other
                    sensitive personal information in this form.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background">
              <Home className="size-4" />
            </span>

            <span className="font-bold">HomiCare</span>
          </Link>

          <p className="text-sm text-muted-foreground">
            Care You Can Count On.
          </p>

          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to homepage
          </Link>
        </div>
      </footer>
    </main>
  )
}