"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Baby,
  CalendarDays,
  CalendarIcon,
  Clock3,
  HeartHandshake,
  Home,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const serviceTypes = [
  {
    id: "maid",
    title: "Maid Services",
    description: "Household cleaning and everyday home support.",
    icon: Home,
  },
  {
    id: "babysitting",
    title: "Babysitting",
    description: "Flexible childcare when you need an extra hand.",
    icon: Baby,
  },
  {
    id: "nanny",
    title: "Nanny Care",
    description: "Ongoing childcare and daily routine support.",
    icon: HeartHandshake,
  },
];

const plans = ["Hourly", "Monthly", "Yearly"];

const serviceNameMap: Record<string, string> = {
  maid: "Maid Services",
  babysitting: "Babysitting",
  nanny: "Nanny Care",
};

export default function FindCarePage() {
  const router = useRouter();

  const [selectedService, setSelectedService] = useState("maid");
  const [selectedPlan, setSelectedPlan] = useState("Monthly");

  const [location, setLocation] = useState("");
  const [availabilityDate, setAvailabilityDate] = useState<Date | undefined>();

  function searchHelpers() {
    const params = new URLSearchParams();

    params.set("service", serviceNameMap[selectedService]);
    params.set("plan", selectedPlan);

    const locationParts = location
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);

    if (locationParts.length === 1) {
      params.set("city", locationParts[0]);
    } else if (locationParts.length >= 2) {
      params.set("area", locationParts[0]);
      params.set("city", locationParts[1]);
    }

    if (availabilityDate) {
      params.set("date", format(availabilityDate, "yyyy-MM-dd"));
    }

    router.push(
      `/dashboard/find-care/results?${params.toString()}`,
    );
  }

  return (
    <main className="min-h-full bg-background">
      <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
        {/* Header */}
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-muted-foreground">
            FIND CARE
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Find the right help for your home.
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Tell us what you need and we&apos;ll help you find verified
            helpers that fit your routine.
          </p>
        </div>

        {/* Search Area */}
        <section className="rounded-2xl border bg-card p-5 sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
            {/* Location */}
            <div className="rounded-xl border bg-background px-4 py-3">
              <label className="mb-1 block text-xs font-semibold text-muted-foreground">
                LOCATION
              </label>

              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-muted-foreground" />

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Andheri, Mumbai"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Availability */}
            <div className="rounded-xl border bg-background px-4 py-3">
              <p className="mb-1 text-xs font-semibold text-muted-foreground">
                AVAILABILITY
              </p>

              <Popover>
                <PopoverTrigger>
                  <Button
                    variant="ghost"
                    className="h-auto w-full justify-start p-0 text-left font-normal hover:bg-transparent"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />

                    {availabilityDate ? (
                      format(availabilityDate, "PPP")
                    ) : (
                      <span className="text-muted-foreground">
                        Select availability date
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={availabilityDate}
                    onSelect={setAvailabilityDate}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    className="w-full"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <button
              onClick={searchHelpers}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              <Search className="size-4" />
              Search
            </button>
          </div>
        </section>

        {/* Service Type */}
        <section>
          <div className="mb-4">
            <p className="text-xs font-bold tracking-[0.18em] text-muted-foreground">
              SERVICE TYPE
            </p>

            <h2 className="mt-2 text-xl font-bold">
              What kind of care do you need?
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {serviceTypes.map((service) => {
              const Icon = service.icon;
              const selected = selectedService === service.id;

              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`group rounded-2xl border p-5 text-left transition-all ${
                    selected
                      ? "border-foreground bg-foreground text-background"
                      : "bg-card hover:border-foreground/30"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex size-11 items-center justify-center rounded-xl ${
                        selected
                          ? "bg-background/10"
                          : "bg-muted"
                      }`}
                    >
                      <Icon className="size-5" />
                    </div>

                    {selected && (
                      <span className="rounded-full bg-background px-2.5 py-1 text-xs font-semibold text-foreground">
                        Selected
                      </span>
                    )}
                  </div>

                  <h3 className="mt-6 font-semibold">
                    {service.title}
                  </h3>

                  <p
                    className={`mt-2 text-sm leading-6 ${
                      selected
                        ? "text-background/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {service.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Preferences */}
        <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold tracking-[0.18em] text-muted-foreground">
                  YOUR PREFERENCES
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  Choose your service plan
                </h2>
              </div>

              <SlidersHorizontal className="size-5 text-muted-foreground" />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {plans.map((plan) => {
                const selected = selectedPlan === plan;

                return (
                  <button
                    key={plan}
                    onClick={() => setSelectedPlan(plan)}
                    className={`rounded-xl border px-4 py-4 text-left transition ${
                      selected
                        ? "border-foreground bg-foreground text-background"
                        : "hover:border-foreground/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {plan === "Hourly" && (
                        <Clock3 className="size-4" />
                      )}

                      {plan === "Monthly" && (
                        <CalendarDays className="size-4" />
                      )}

                      {plan === "Yearly" && (
                        <Sparkles className="size-4" />
                      )}

                      <span className="text-sm font-semibold">
                        {plan}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Trust Panel */}
          <div className="rounded-2xl border bg-muted/40 p-6">
            <ShieldCheck className="size-6" />

            <h3 className="mt-5 font-semibold">
              Verified helpers
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Explore helper profiles with verification information,
              experience, availability and ratings.
            </p>
          </div>
        </section>

        {/* Continue */}
        <div className="flex justify-end">
          <button
            onClick={searchHelpers}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Find helpers
            <Search className="size-4" />
          </button>
        </div>
      </div>
    </main>
  );
}