"use client";

import {
  ArrowRight,
  Baby,
  CalendarCheck,
  CheckCircle2,
  HeartHandshake,
  Home,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Maid Services",
    description: "Reliable help for everyday household needs.",
    icon: Home,
  },
  {
    title: "Babysitting",
    description: "Trusted care when your family needs an extra hand.",
    icon: Baby,
  },
  {
    title: "Nanny Care",
    description: "Ongoing support for your child's daily routine.",
    icon: HeartHandshake,
  },
];

const activeServices = [
  {
    title: "Maid Service",
    helper: "Priya Sharma",
    schedule: "Mon · Wed · Fri",
    status: "Active",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-full bg-background">
      <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Your home
          </p>

          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Good evening, Ankur.
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage the care and support your home needs.
          </p>
        </motion.div>

        {/* Next Service */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="overflow-hidden rounded-2xl bg-foreground text-background"
        >
          <div className="flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-5 flex items-center gap-2 text-sm font-medium opacity-70">
                <CalendarCheck className="size-4" />
                Your next service
              </div>

              <h2 className="text-2xl font-bold">
                Nanny Care
              </h2>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-75">
                <span>Tomorrow</span>
                <span>10:00 AM</span>
                <span>Priya Sharma</span>
              </div>
            </div>

            <Button className="group inline-flex w-fit items-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5 hover:bg-gray-300">
              View booking
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.section>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat
            icon={CalendarCheck}
            label="Upcoming"
            value="1"
          />
          <Stat
            icon={HeartHandshake}
            label="Active services"
            value="1"
          />
          <Stat
            icon={CheckCircle2}
            label="Completed"
            value="12"
          />
        </div>

        {/* Active Services */}
        <section>
          <SectionHeader
            eyebrow="YOUR CARE"
            title="Active services"
            action="View all"
          />

          <div className="mt-5">
            {activeServices.map((service) => (
              <div
                key={service.title}
                className="flex flex-col gap-5 rounded-2xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                    <Home className="size-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {service.title}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {service.helper} · {service.schedule}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="size-2 rounded-full bg-success" />
                  {service.status}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Find Care */}
        <section>
          <SectionHeader
            eyebrow="FIND CARE"
            title="What does your home need?"
            description="Find the right support for your routine."
          />

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.button
                  key={service.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="group text-left"
                >
                  <div className="h-full rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-foreground/30 hover:shadow-sm">
                    <div className="mb-8 flex items-start justify-between">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-muted">
                        <Icon className="size-5" />
                      </div>

                      <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                    </div>

                    <h3 className="font-semibold">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Trust Reminder */}
        <section className="rounded-2xl border bg-muted/40 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-background">
              <ShieldCheck className="size-5" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">
                Your care, managed with confidence.
              </h3>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                HomiCare keeps your bookings, service history, and
                verified helper information organized in one place.
              </p>
            </div>

            <button className="inline-flex items-center gap-2 text-sm font-semibold">
              Learn more
              <ArrowRight className="size-4" />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
          <Icon className="size-4" />
        </div>

        <Sparkles className="size-4 text-muted-foreground" />
      </div>

      <p className="mt-5 text-2xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-sm text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-xs font-bold tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </p>

        <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {action && (
        <button className="hidden items-center gap-1 text-sm font-semibold sm:flex">
          {action}
          <ArrowRight className="size-4" />
        </button>
      )}
    </div>
  );
}