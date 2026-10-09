"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Heart,
  Home,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
  UserCheck,
} from "lucide-react";
import { useState } from "react";

const helper = {
  name: "Priya Sharma",
  role: "Maid Services",
  initials: "PS",
  rating: "4.9",
  reviews: 38,
  experience: "5 years",
  location: "Andheri West, Mumbai",
  availability: "Monday – Saturday",
  responseTime: "Usually responds within a few hours",
};

const verificationItems = [
  "Identity details",
  "Profile information",
  "Contact information",
];

const services = [
  {
    title: "House cleaning",
    icon: Home,
  },
  {
    title: "Kitchen assistance",
    icon: Home,
  },
  {
    title: "Laundry support",
    icon: Home,
  },
];

export default function HelperProfilePage() {
  const [saved, setSaved] = useState(false);

  return (
    <main className="min-h-full bg-background">
      <div className="mx-auto max-w-5xl p-6 lg:p-8">
        {/* Back */}
        <Link
          href="/dashboard/find-care/results"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to helpers
        </Link>

        {/* Profile Header */}
        <section className="rounded-2xl border bg-card p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            {/* Avatar */}
            <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-muted">
              <span className="text-2xl font-bold">
                {helper.initials}
              </span>
            </div>

            {/* Information */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                      {helper.name}
                    </h1>

                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold">
                      <ShieldCheck className="size-3.5" />
                      Verified
                    </span>
                  </div>

                  <p className="mt-2 text-muted-foreground">
                    {helper.role}
                  </p>
                </div>

                <button
                  onClick={() => setSaved(!saved)}
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border"
                  aria-label="Save helper"
                >
                  <Heart
                    className={`size-4 ${
                      saved ? "fill-current" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Star className="size-4 fill-current text-foreground" />
                  <strong className="text-foreground">
                    {helper.rating}
                  </strong>
                  {helper.reviews} reviews
                </span>

                <span className="flex items-center gap-2">
                  <Clock3 className="size-4" />
                  {helper.experience}
                </span>

                <span className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  {helper.location}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {/* About */}
            <section className="rounded-2xl border bg-card p-6 sm:p-8">
              <p className="text-xs font-bold tracking-[0.18em] text-muted-foreground">
                ABOUT
              </p>

              <h2 className="mt-2 text-xl font-bold">
                About {helper.name}
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Experienced household support professional with
                experience helping families manage everyday home
                responsibilities. Profile details and service
                preferences are provided through HomiCare.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <InfoItem
                  icon={CalendarDays}
                  label="Availability"
                  value={helper.availability}
                />

                <InfoItem
                  icon={MessageCircle}
                  label="Response"
                  value={helper.responseTime}
                />
              </div>
            </section>

            {/* Verification */}
            <section className="rounded-2xl border bg-card p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <ShieldCheck className="size-5" />
                </div>

                <div>
                  <p className="text-xs font-bold tracking-[0.18em] text-muted-foreground">
                    VERIFICATION
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    Verified profile
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    HomiCare has verified the information shown
                    below.
                  </p>
                </div>
              </div>

              <div className="mt-6 divide-y">
                {verificationItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 py-4"
                  >
                    <CheckCircle2 className="size-4" />

                    <span className="text-sm font-medium">
                      {item}
                    </span>

                    <span className="ml-auto text-xs text-muted-foreground">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Services */}
            <section className="rounded-2xl border bg-card p-6 sm:p-8">
              <p className="text-xs font-bold tracking-[0.18em] text-muted-foreground">
                SERVICES
              </p>

              <h2 className="mt-2 text-xl font-bold">
                What {helper.name} can help with
              </h2>

              <div className="mt-6 space-y-3">
                {services.map((service) => {
                  const Icon = service.icon;

                  return (
                    <div
                      key={service.title}
                      className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3"
                    >
                      <Icon className="size-4" />

                      <span className="text-sm font-medium">
                        {service.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Reviews */}
            <section className="rounded-2xl border bg-card p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.18em] text-muted-foreground">
                    REVIEWS
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    What families say
                  </h2>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-current" />

                  <span className="font-semibold">
                    {helper.rating}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t pt-6">
                <p className="text-sm leading-7 text-muted-foreground">
                  “Reliable, punctual, and very helpful with our
                  everyday household routine.”
                </p>

                <p className="mt-3 text-xs font-semibold">
                  Verified customer
                </p>
              </div>
            </section>
          </div>

          {/* Booking Panel */}
          <aside>
            <div className="sticky top-6 rounded-2xl border bg-card p-6 shadow-sm">
              <p className="text-xs font-bold tracking-[0.18em] text-muted-foreground">
                BOOK THIS HELPER
              </p>

              <h2 className="mt-3 text-xl font-bold">
                Ready to get started?
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Choose your preferred plan and send a service
                request to {helper.name}.
              </p>

              <div className="mt-6 space-y-3">
                <PlanOption
                  icon={Clock3}
                  title="Hourly"
                  description="Flexible short-term help"
                />

                <PlanOption
                  icon={CalendarDays}
                  title="Monthly"
                  description="Regular household support"
                  selected
                />

                <PlanOption
                  icon={CalendarCheck}
                  title="Yearly"
                  description="Long-term care arrangement"
                />
              </div>

              <Link
                href={`/dashboard/find-care/results/${1}/book`}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                Request booking
                <ChevronRight className="size-4" />
              </Link>

              <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
                The helper will need to accept your request before
                the service is confirmed.
              </p>
            </div>
          </aside>
        </div>

        {/* Bottom Trust */}
        <div className="mt-8 flex flex-col items-center justify-center gap-2 text-center text-xs text-muted-foreground sm:flex-row">
          <UserCheck className="size-4" />
          <span>
            Review helper information carefully before sending a
            booking request.
          </span>
        </div>
      </div>
    </main>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-muted/50 p-4">
      <Icon className="size-4 text-muted-foreground" />

      <p className="mt-3 text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}

function PlanOption({
  icon: Icon,
  title,
  description,
  selected = false,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  selected?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
        selected
          ? "border-foreground bg-foreground text-background"
          : "hover:border-foreground/30"
      }`}
    >
      <div
        className={`flex size-9 items-center justify-center rounded-lg ${
          selected ? "bg-background/10" : "bg-muted"
        }`}
      >
        <Icon className="size-4" />
      </div>

      <div>
        <p className="text-sm font-semibold">{title}</p>

        <p
          className={`text-xs ${
            selected
              ? "text-background/70"
              : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      </div>
    </button>
  );
}