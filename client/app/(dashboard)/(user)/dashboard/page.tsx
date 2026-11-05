"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
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

type Helper = {
  id: string;
  firstName: string | null;
  lastName: string | null;
};

type DashboardBooking = {
  id: string;
  serviceType: string;
  planType: string;
  status: "PENDING" | "CONFIRMED" | "IN_PROGRESS";
  startAt: string;
  endAt: string | null;
  helper: Helper | null;
};

type DashboardData = {
  user: {
    firstName: string | null;
    lastName: string | null;
  };
  stats: {
    upcoming: number;
    activeServices: number;
    completed: number;
  };
  nextService: DashboardBooking | null;
  activeServicesList: DashboardBooking[];
};

function formatBookingDate(date: string) {
  const bookingDate = new Date(date);
  const today = new Date();

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (isSameDay(bookingDate, today)) return "Today";
  if (isSameDay(bookingDate, tomorrow)) return "Tomorrow";

  return bookingDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatBookingTime(date: string) {
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatHelperName(helper: Helper | null) {
  if (!helper) return "Helper not assigned";

  const name = `${helper.firstName ?? ""} ${helper.lastName ?? ""}`.trim();

  return name || "Helper not assigned";
}

export default function DashboardPage() {
  const { getToken } = useAuth();

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDashboard() {
      try {
        setLoading(true);
        setError(null);

        const token = await getToken();

        if (!token) {
          throw new Error("Please sign in to view your dashboard.");
        }

        const API_URL =
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

        const response = await fetch(`${API_URL}/api/user/dashboard`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message ?? "Unable to load dashboard.");
        }

        setDashboard(result.data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchDashboard();

    return () => controller.abort();
  }, [getToken]);

  if (loading) {
    return (
      <main className="min-h-full bg-background p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-muted-foreground">
            Loading your dashboard...
          </p>
        </div>
      </main>
    );
  }

  if (error || !dashboard) {
    return (
      <main className="min-h-full bg-background p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-3">
          <h1 className="text-xl font-semibold">
            Unable to load your dashboard
          </h1>

          <p className="text-sm text-muted-foreground">
            {error ?? "Dashboard information is unavailable."}
          </p>

          <Button onClick={() => window.location.reload()}>
            Try again
          </Button>
        </div>
      </main>
    );
  }

  const firstName = dashboard.user.firstName || "there";

  const nextService = dashboard.nextService;

  const activeServices = dashboard.activeServicesList;

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
            {getGreeting()}, {firstName}.
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

              {nextService ? (
                <>
                  <h2 className="text-2xl font-bold">
                    {nextService.serviceType}
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-75">
                    <span>{formatBookingDate(nextService.startAt)}</span>
                    <span>{formatBookingTime(nextService.startAt)}</span>
                    <span>{formatHelperName(nextService.helper)}</span>
                  </div>
                </>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold">
                    No upcoming services
                  </h2>

                  <p className="mt-4 text-sm opacity-75">
                    Book a service to get started.
                  </p>
                </div>
              )}
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
            value={String(dashboard.stats.upcoming)}
          />
          <Stat
            icon={HeartHandshake}
            label="Active services"
            value={String(dashboard.stats.activeServices)}
          />
          <Stat
            icon={CheckCircle2}
            label="Completed"
            value={String(dashboard.stats.completed)}
          />
        </div>

        {/* Active Services */}
        <section>
          <SectionHeader
            eyebrow="YOUR CARE"
            title="Active services"
            action="View all"
          />

          <div className="mt-5 space-y-4">
            {activeServices.length > 0 ? (
              activeServices.map((service) => (
                <div
                  key={service.id}
                  className="flex flex-col gap-5 rounded-2xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                      <Home className="size-5" />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {service.serviceType}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatHelperName(service.helper)}
                        {" · "}
                        {formatBookingDate(service.startAt)}
                        {" · "}
                        {formatBookingTime(service.startAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="size-2 rounded-full bg-success" />
                    {service.status === "IN_PROGRESS"
                      ? "In Progress"
                      : "Confirmed"}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                You don&apos;t have any active services yet.
              </p>
            )}
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