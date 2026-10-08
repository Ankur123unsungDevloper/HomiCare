"use client";

import {
  Baby,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Heart,
  Home,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import { useState } from "react";

const helpers = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Maid",
    experience: "5 years experience",
    rating: "4.9",
    reviews: 38,
    location: "Andheri West",
    availability: "Available Mon–Sat",
    plan: "Monthly",
    verified: true,
    initials: "PS",
  },
  {
    id: 2,
    name: "Sunita Patil",
    role: "Maid",
    experience: "7 years experience",
    rating: "4.8",
    reviews: 42,
    location: "Powai",
    availability: "Available Mon–Fri",
    plan: "Monthly",
    verified: true,
    initials: "SP",
  },
  {
    id: 3,
    name: "Meena Joshi",
    role: "Maid",
    experience: "4 years experience",
    rating: "4.7",
    reviews: 29,
    location: "Bandra West",
    availability: "Available Tue–Sat",
    plan: "Monthly",
    verified: true,
    initials: "MJ",
  },
];

const filters = [
  "Experience",
  "Availability",
  "Rating",
  "Service Plan",
];

export default function HelperResultsPage() {
  const [liked, setLiked] = useState<number[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleLike = (id: number) => {
    setLiked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return (
    <main className="min-h-full bg-background">
      <div className="mx-auto max-w-7xl p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-muted-foreground">
              FIND CARE
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Find your right helper.
            </h1>

            <p className="mt-2 text-muted-foreground">
              Verified helpers matching your care requirements.
            </p>
          </div>

          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="inline-flex w-fit items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold lg:hidden"
          >
            <SlidersHorizontal className="size-4" />
            Filters
          </button>
        </div>

        {/* Search Summary */}
        <section className="mt-8 rounded-2xl border bg-card p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-muted/60 px-4 py-3">
              <Search className="size-4 text-muted-foreground" />

              <div>
                <p className="text-xs text-muted-foreground">
                  SERVICE
                </p>

                <p className="text-sm font-semibold">
                  Maid Services
                </p>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-3 rounded-xl bg-muted/60 px-4 py-3">
              <MapPin className="size-4 text-muted-foreground" />

              <div>
                <p className="text-xs text-muted-foreground">
                  LOCATION
                </p>

                <p className="text-sm font-semibold">
                  Mumbai
                </p>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-3 rounded-xl bg-muted/60 px-4 py-3">
              <CalendarDays className="size-4 text-muted-foreground" />

              <div>
                <p className="text-xs text-muted-foreground">
                  PLAN
                </p>

                <p className="text-sm font-semibold">
                  Monthly
                </p>
              </div>
            </div>

            <button className="rounded-xl border px-5 py-3 text-sm font-semibold hover:bg-muted">
              Modify search
            </button>
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[230px_1fr]">
          {/* Filters */}
          <aside
            className={`${
              filterOpen ? "block" : "hidden"
            } lg:block`}
          >
            <div className="sticky top-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Filters</h2>

                <button className="text-xs font-semibold text-muted-foreground hover:text-foreground">
                  Clear all
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    className="flex w-full items-center justify-between border-b pb-3 text-left text-sm"
                  >
                    <span>{filter}</span>
                    <ChevronDown className="size-4 text-muted-foreground" />
                  </button>
                ))}
              </div>

              <div className="mt-8 rounded-xl border bg-muted/40 p-4">
                <ShieldCheck className="size-5" />

                <p className="mt-3 text-sm font-semibold">
                  Verified profiles
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Every helper shown here has a verified HomiCare
                  profile.
                </p>
              </div>
            </div>
          </aside>

          {/* Results */}
          <section>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {helpers.length}
                </span>{" "}
                helpers found
              </p>

              <button className="hidden items-center gap-2 text-sm font-medium sm:flex">
                Recommended
                <ChevronDown className="size-4" />
              </button>
            </div>

            <div className="space-y-4">
              {helpers.map((helper) => (
                <HelperResult
                  key={helper.id}
                  helper={helper}
                  liked={liked.includes(helper.id)}
                  onLike={() => toggleLike(helper.id)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function HelperResult({
  helper,
  liked,
  onLike,
}: {
  helper: (typeof helpers)[number];
  liked: boolean;
  onLike: () => void;
}) {
  return (
    <article className="group rounded-2xl border bg-card p-5 transition-all hover:border-foreground/30 hover:shadow-sm sm:p-6">
      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Avatar */}
        <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-muted">
          <span className="text-xl font-bold">
            {helper.initials}
          </span>
        </div>

        {/* Main Information */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold">
                  {helper.name}
                </h3>

                {helper.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[11px] font-semibold">
                    <ShieldCheck className="size-3" />
                    Verified
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {helper.role} · {helper.experience}
              </p>
            </div>

            <button
              onClick={onLike}
              className="flex size-9 shrink-0 items-center justify-center rounded-full border"
              aria-label="Save helper"
            >
              <Heart
                className={`size-4 ${
                  liked ? "fill-current" : ""
                }`}
              />
            </button>
          </div>

          {/* Details */}
          <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="size-4 fill-current text-foreground" />
              <span className="font-semibold text-foreground">
                {helper.rating}
              </span>
              <span>({helper.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-4" />
              {helper.location}
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock3 className="size-4" />
              {helper.availability}
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              {helper.role === "Maid" ? (
                <Home className="size-4" />
              ) : (
                <Baby className="size-4" />
              )}
              {helper.plan} plan
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="size-4" />
              Profile information verified
            </div>

            <a
              href={`/dashboard/find-care/results/${helper.id}`}
              className="inline-flex items-center justify-center rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              View profile
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}