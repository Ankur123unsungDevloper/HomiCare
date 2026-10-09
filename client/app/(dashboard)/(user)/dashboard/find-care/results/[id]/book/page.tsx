"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Home,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useState } from "react";

const plans = [
  {
    id: "hourly",
    title: "Hourly",
    description: "Flexible short-term support",
    icon: Clock3,
  },
  {
    id: "monthly",
    title: "Monthly",
    description: "Regular household support",
    icon: CalendarDays,
  },
  {
    id: "yearly",
    title: "Yearly",
    description: "Long-term care arrangement",
    icon: CalendarDays,
  },
];

export default function BookingPage() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  return (
    <main className="min-h-full bg-background">
      <div className="mx-auto max-w-5xl p-6 lg:p-8">
        {/* Back */}
        <Link
          href="/dashboard/find-care/results/1"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to profile
        </Link>

        {/* Header */}
        <div className="mt-8">
          <p className="text-xs font-bold tracking-[0.18em] text-muted-foreground">
            BOOKING REQUEST
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Set up your care.
          </h1>

          <p className="mt-2 text-muted-foreground">
            Review the details before sending your request.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Main Form */}
          <div className="space-y-6">
            {/* Helper */}
            <section className="rounded-2xl border bg-card p-6">
              <SectionTitle
                eyebrow="HELPER"
                title="Your selected helper"
              />

              <div className="mt-5 flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-xl bg-muted">
                  <span className="font-bold">PS</span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">
                      Priya Sharma
                    </h3>

                    <ShieldCheck className="size-4" />
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Maid Services · 5 years experience
                  </p>
                </div>
              </div>
            </section>

            {/* Plan */}
            <section className="rounded-2xl border bg-card p-6">
              <SectionTitle
                eyebrow="SERVICE PLAN"
                title="Choose your plan"
              />

              <div className="mt-5 space-y-3">
                {plans.map((plan) => {
                  const Icon = plan.icon;
                  const selected = selectedPlan === plan.id;

                  return (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                        selected
                          ? "border-foreground bg-foreground text-background"
                          : "hover:border-foreground/30"
                      }`}
                    >
                      <div
                        className={`flex size-10 items-center justify-center rounded-lg ${
                          selected
                            ? "bg-background/10"
                            : "bg-muted"
                        }`}
                      >
                        <Icon className="size-4" />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-semibold">
                          {plan.title}
                        </p>

                        <p
                          className={`mt-1 text-xs ${
                            selected
                              ? "text-background/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {plan.description}
                        </p>
                      </div>

                      {selected && (
                        <CheckCircle2 className="size-5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Schedule */}
            <section className="rounded-2xl border bg-card p-6">
              <SectionTitle
                eyebrow="SCHEDULE"
                title="When do you need the service?"
              />

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Start date"
                  icon={CalendarDays}
                  type="date"
                />

                <FormField
                  label="Preferred time"
                  icon={Clock3}
                  type="time"
                />
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-xs font-semibold text-muted-foreground">
                  SERVICE FREQUENCY
                </label>

                <button className="flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm">
                  <span>Monday, Wednesday & Friday</span>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </button>
              </div>
            </section>

            {/* Address */}
            <section className="rounded-2xl border bg-card p-6">
              <SectionTitle
                eyebrow="SERVICE LOCATION"
                title="Where should the service happen?"
              />

              <div className="mt-5 space-y-4">
                <FormField
                  label="House / Flat / Building"
                  icon={Home}
                  placeholder="Enter your house or flat details"
                />

                <FormField
                  label="Area / Locality"
                  icon={MapPin}
                  placeholder="Enter your area"
                />

                <div>
                  <label className="mb-2 block text-xs font-semibold text-muted-foreground">
                    ADDITIONAL DIRECTIONS
                  </label>

                  <textarea
                    rows={3}
                    placeholder="Anything the helper should know about reaching your home?"
                    className="w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
                  />
                </div>
              </div>
            </section>

            {/* Requirements */}
            <section className="rounded-2xl border bg-card p-6">
              <SectionTitle
                eyebrow="SPECIAL REQUIREMENTS"
                title="Anything else we should know?"
              />

              <p className="mt-2 text-sm text-muted-foreground">
                Share details that can help the helper understand
                your household needs.
              </p>

              <textarea
                rows={5}
                placeholder="For example: preferred cleaning routine, pets at home, specific household tasks..."
                className="mt-5 w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
              />
            </section>
          </div>

          {/* Summary */}
          <aside>
            <div className="sticky top-6 rounded-2xl border bg-card p-6">
              <p className="text-xs font-bold tracking-[0.18em] text-muted-foreground">
                REQUEST SUMMARY
              </p>

              <h2 className="mt-3 text-xl font-bold">
                Review your request
              </h2>

              <div className="mt-6 divide-y">
                <SummaryRow
                  icon={UserRound}
                  label="Helper"
                  value="Priya Sharma"
                />

                <SummaryRow
                  icon={Home}
                  label="Service"
                  value="Maid Services"
                />

                <SummaryRow
                  icon={CalendarDays}
                  label="Plan"
                  value={
                    plans.find((p) => p.id === selectedPlan)?.title ??
                    "Monthly"
                  }
                />

                <SummaryRow
                  icon={CalendarDays}
                  label="Start"
                  value="Select a date"
                />

                <SummaryRow
                  icon={MapPin}
                  label="Location"
                  value="Your address"
                />
              </div>

              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90">
                Send booking request
                <CheckCircle2 className="size-4" />
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
                Your booking is not confirmed until the helper
                accepts your request.
              </p>
            </div>
          </aside>
        </div>

        {/* Trust Footer */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-4" />
          Your booking details are managed securely through
          HomiCare.
        </div>
      </div>
    </main>
  );
}

/* ---------------------------------------------
   Components
--------------------------------------------- */

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold tracking-[0.18em] text-muted-foreground">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-xl font-bold">
        {title}
      </h2>
    </div>
  );
}

function FormField({
  label,
  icon: Icon,
  type = "text",
  placeholder,
}: {
  label: string;
  icon: React.ElementType;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-muted-foreground">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-xl border px-4 py-3">
        <Icon className="size-4 shrink-0 text-muted-foreground" />

        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
    </div>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 py-4">
      <Icon className="size-4 shrink-0 text-muted-foreground" />

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-semibold">
          {value}
        </p>
      </div>
    </div>
  );
}