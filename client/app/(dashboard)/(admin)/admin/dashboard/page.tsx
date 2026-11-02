"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuth } from "@clerk/nextjs";
import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  TrendingUp,
  UserRoundCheck,
  Users,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type HelperApplication = {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  area: string;
  services: string[];
  experience: number;
  availability: string;
  experienceDetails: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  user: {
    email: string | null;
  };
};

type HelperApplicationsResponse = {
  success: boolean;
  count: number;
  applications: HelperApplication[];
};

type HouseholdCountResponse = {
  success: boolean;
  totalHouseholds: number;
  message?: string;
};

type RecentBooking = {
  id: string;
  serviceType: string;
  planType: string;
  status: "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  startAt: string;
  household: {
    firstName: string | null;
    lastName: string | null;
  };
  helper: {
    firstName: string | null;
    lastName: string | null;
  } | null;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const complaints = [
  {
    title: "Service timing issue",
    customer: "Rahul Mehta",
    priority: "Medium",
    date: "Oct 7, 2026",
  },
  {
    title: "Booking cancellation dispute",
    customer: "Neha Kapoor",
    priority: "High",
    date: "Oct 6, 2026",
  },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "Confirmed") {
    return (
      <Badge
        variant="outline"
        className="border-emerald-200 bg-emerald-50 text-emerald-700"
      >
        <CheckCircle2 className="mr-1 h-3 w-3" />
        Confirmed
      </Badge>
    );
  }

  if (status === "In Progress") {
    return (
      <Badge
        variant="outline"
        className="border-sky-200 bg-sky-50 text-sky-700"
      >
        <Clock3 className="mr-1 h-3 w-3" />
        In Progress
      </Badge>
    );
  }

  if (status === "Completed") {
    return (
      <Badge
        variant="outline"
        className="border-slate-200 bg-slate-50 text-slate-700"
      >
        <CheckCircle2 className="mr-1 h-3 w-3" />
        Completed
      </Badge>
    );
  }

  if (status === "Cancelled") {
    return (
      <Badge
        variant="outline"
        className="border-red-200 bg-red-50 text-red-700"
      >
        <AlertTriangle className="mr-1 h-3 w-3" />
        Cancelled
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="border-amber-200 bg-amber-50 text-amber-700"
    >
      <Clock3 className="mr-1 h-3 w-3" />
      Pending
    </Badge>
  );
}

function StatCard({
  label,
  value,
  description,
  icon: Icon,
  href,
}: {
  label: string;
  value: string;
  description: string;
  icon: React.ElementType;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border bg-card p-5 transition-colors hover:bg-muted/30"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
          <Icon className="h-5 w-5" />
        </div>

        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
      </div>

      <p className="mt-5 text-sm text-muted-foreground">{label}</p>

      <p className="mt-1 text-3xl font-bold tracking-tight">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </Link>
  );
}

function formatSubmissionDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminDashboardPage() {
  const { getToken } = useAuth();

  // Helper verification state.
  const [applications, setApplications] = useState<HelperApplication[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [applicationsError, setApplicationsError] = useState<string | null>(
    null,
  );

  // Primary-admin-only household count state.
  const [totalHouseholds, setTotalHouseholds] = useState<number | null>(null);
  const [householdCountLoading, setHouseholdCountLoading] = useState(true);
  const [canViewHouseholdCount, setCanViewHouseholdCount] = useState(false);
  const [householdCountError, setHouseholdCountError] = useState<string | null>(
    null,
  );

  // Recent bookings state.
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState<string | null>(null);

  // Prevent stale requests from overwriting newer results.
  const applicationsRequestIdRef = useRef(0);
  const householdRequestIdRef = useRef(0);

  const fetchPendingApplications = useCallback(async () => {
    const requestId = ++applicationsRequestIdRef.current;

    setApplicationsLoading(true);
    setApplicationsError(null);

    try {
      const baseUrl = API_URL?.trim().replace(/\/+$/, "");

      if (!baseUrl) {
        throw new Error(
          "API URL is not configured. Check NEXT_PUBLIC_API_URL in client/.env.local.",
        );
      }

      const token = await getToken();

      if (!token) {
        throw new Error("Unable to authenticate. Please sign in again.");
      }

      const response = await fetch(
        `${baseUrl}/api/admin/helper-applications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error(
          response.status === 401
            ? "Your session has expired. Please sign in again."
            : response.status === 403
              ? "You do not have permission to view helper applications."
              : `Failed to fetch helper applications (${response.status}).`,
        );
      }

      const data: HelperApplicationsResponse = await response.json();

      if (!data.success || !Array.isArray(data.applications)) {
        throw new Error("Invalid response received from the server.");
      }

      if (requestId !== applicationsRequestIdRef.current) {
        return;
      }

      setApplications(
        data.applications.filter(
          (application) => application.status === "PENDING",
        ),
      );
    } catch (error) {
      if (requestId !== applicationsRequestIdRef.current) {
        return;
      }

      setApplicationsError(
        error instanceof Error
          ? error.message
          : "Something went wrong while fetching applications.",
      );
    } finally {
      if (requestId === applicationsRequestIdRef.current) {
        setApplicationsLoading(false);
      }
    }
  }, [getToken]);

  const fetchHouseholdCount = useCallback(async () => {
    const requestId = ++householdRequestIdRef.current;

    setHouseholdCountLoading(true);
    setHouseholdCountError(null);

    try {
      const baseUrl = API_URL?.trim().replace(/\/+$/, "");

      if (!baseUrl) {
        throw new Error(
          "API URL is not configured. Check NEXT_PUBLIC_API_URL in client/.env.local.",
        );
      }

      const token = await getToken();

      if (!token) {
        throw new Error("Unable to authenticate. Please sign in again.");
      }

      const response = await fetch(
        `${baseUrl}/api/admin/dashboard/household-count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        },
      );

      // Only the primary administrator is allowed to see this statistic.
      if (response.status === 403) {
        if (requestId === householdRequestIdRef.current) {
          setCanViewHouseholdCount(false);
          setTotalHouseholds(null);
        }

        return;
      }

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Your session has expired. Please sign in again.");
        }

        throw new Error(
          `Failed to fetch household count (${response.status}).`,
        );
      }

      const data: HouseholdCountResponse = await response.json();

      if (
        !data.success ||
        !Number.isInteger(data.totalHouseholds) ||
        data.totalHouseholds < 0
      ) {
        throw new Error("Invalid household count received from the server.");
      }

      if (requestId !== householdRequestIdRef.current) {
        return;
      }

      setTotalHouseholds(data.totalHouseholds);
      setCanViewHouseholdCount(true);
    } catch (error) {
      if (requestId !== householdRequestIdRef.current) {
        return;
      }

      setCanViewHouseholdCount(false);
      setTotalHouseholds(null);
      setHouseholdCountError(
        error instanceof Error
          ? error.message
          : "Unable to load household statistics.",
      );
    } finally {
      if (requestId === householdRequestIdRef.current) {
        setHouseholdCountLoading(false);
      }
    }
  }, [getToken]);

  useEffect(() => {
    let cancelled = false;

    const timeoutId = setTimeout(() => {
      if (!cancelled) {
        void fetchPendingApplications();
        void fetchHouseholdCount();
      }
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);

      applicationsRequestIdRef.current += 1;
      householdRequestIdRef.current += 1;
    };
  }, [fetchPendingApplications, fetchHouseholdCount]);

  useEffect(() => {
    const fetchRecentBookings = async () => {
      try {
        setBookingsLoading(true);
        setBookingsError(null);

        const token = await getToken();

        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const API_URL =
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

        const response = await fetch(
          `${API_URL}/api/admin/dashboard/bookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch recent bookings.");
        }

        setRecentBookings(data.recentBookings ?? []);
      } catch (error) {
        setBookingsError(
          error instanceof Error
            ? error.message
            : "Something went wrong while fetching bookings.",
        );
      } finally {
        setBookingsLoading(false);
      }
    };

    fetchRecentBookings();
  }, [getToken]);

  const pendingCount = applications.length;

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <section className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            ADMINISTRATION
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Good evening, Ankur.
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Here&apos;s what&apos;s happening across HomiCare today.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          All systems operational
        </div>
      </section>

      {/* Key Metrics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Only the primary administrator receives this card. */}
        {canViewHouseholdCount && (
          <StatCard
            label="Total households"
            value={
              householdCountLoading
                ? "…"
                : totalHouseholds === null
                  ? "—"
                  : totalHouseholds.toLocaleString("en-IN")
            }
            description={
              householdCountError
                ? "Unable to load household data"
                : "Registered household accounts"
            }
            icon={Users}
            href="/admin/dashboard/users"
          />
        )}

        <StatCard
          label="Pending verifications"
          value={applicationsLoading ? "…" : String(pendingCount)}
          description={
            applicationsError
              ? "Unable to load verification data"
              : "Applications awaiting review"
          }
          icon={UserRoundCheck}
          href="/admin/dashboard/helpers"
        />

        <StatCard
          label="Active bookings"
          value="—"
          description="Live booking metrics not connected"
          icon={CalendarDays}
          href="/admin/dashboard/bookings"
        />

        <StatCard
          label="Pending complaints"
          value="—"
          description="Live complaint metrics not connected"
          icon={AlertTriangle}
          href="/admin/dashboard/complaints"
        />
      </section>

      {/* Live Verification Attention Banner */}
      <section className="rounded-2xl border bg-muted/30 p-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-background">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold">
                {applicationsLoading
                  ? "Checking pending helper applications..."
                  : applicationsError
                    ? "Unable to load verification status"
                    : pendingCount === 0
                      ? "No pending helper applications."
                      : `${pendingCount} helper ${
                          pendingCount === 1
                            ? "application needs"
                            : "applications need"
                        } verification.`}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {applicationsError
                  ? applicationsError
                  : "Review submitted helper applications before approving their profiles."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => void fetchPendingApplications()}
              disabled={applicationsLoading}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${
                  applicationsLoading ? "animate-spin" : ""
                }`}
              />
              Refresh
            </Button>

            <Link href="/admin/dashboard/helpers">
              <Button>
                Review helpers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Activity */}
      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* Recent bookings */}
        <div className="rounded-2xl border bg-card">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div>
              <h2 className="font-semibold">Recent bookings</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Latest bookings from the database
              </p>
            </div>

            <Link href="/admin/dashboard/bookings">
              <Button variant="ghost" size="sm">
                View all
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="divide-y">
            {bookingsLoading ? (
              <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                Loading recent bookings...
              </div>
            ) : bookingsError ? (
              <div className="px-5 py-8 text-center text-sm text-destructive">
                {bookingsError}
              </div>
            ) : recentBookings.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                No bookings found.
              </div>
            ) : (
              recentBookings.map((booking) => {
                const customerName = [
                  booking.household.firstName,
                  booking.household.lastName,
                ]
                  .filter(Boolean)
                  .join(" ") || "Unknown customer";

                const helperName = booking.helper
                  ? [
                      booking.helper.firstName,
                      booking.helper.lastName,
                    ]
                      .filter(Boolean)
                      .join(" ") || "Unknown helper"
                  : "Not assigned";

                const bookingDate = new Date(booking.startAt);

                const date = bookingDate.toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });

                const time = bookingDate.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                const status = {
                  PENDING: "Pending",
                  CONFIRMED: "Confirmed",
                  IN_PROGRESS: "In Progress",
                  COMPLETED: "Completed",
                  CANCELLED: "Cancelled",
                }[booking.status];

                return (
                  <div
                    key={booking.id}
                    className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{booking.serviceType}</p>

                        <span className="text-xs text-muted-foreground">
                          {booking.planType}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {customerName}{" "}
                        <span className="text-muted-foreground/50">with</span>{" "}
                        {helperName}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span>{date}</span>
                        <span>{time}</span>
                      </div>
                    </div>

                    <StatusBadge status={status} />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Live Verification Queue */}
        <div className="rounded-2xl border bg-card">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div>
              <h2 className="font-semibold">Verification queue</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Real helper applications awaiting review
              </p>
            </div>

            <Badge variant="secondary">
              {applicationsLoading ? "…" : `${pendingCount} pending`}
            </Badge>
          </div>

          {applicationsLoading ? (
            <div className="px-5 py-10 text-center text-sm text-muted-foreground">
              Loading helper applications...
            </div>
          ) : applicationsError ? (
            <div className="space-y-3 px-5 py-6">
              <p className="text-sm text-destructive">
                {applicationsError}
              </p>

              <Button
                variant="outline"
                size="sm"
                onClick={() => void fetchPendingApplications()}
              >
                Try again
              </Button>
            </div>
          ) : applications.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />

              <p className="mt-3 font-medium">You&apos;re all caught up</p>

              <p className="mt-1 text-sm text-muted-foreground">
                No helper applications are waiting for verification.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {applications.slice(0, 5).map((helper) => (
                <Link
                  key={helper.id}
                  href="/admin/dashboard/helpers"
                  className="group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-muted/20"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                    {helper.fullName
                      .split(/\s+/)
                      .filter(Boolean)
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{helper.fullName}</p>

                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {helper.services?.length
                        ? helper.services.join(", ")
                        : "Services not specified"}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Submitted {formatSubmissionDate(helper.createdAt)}
                    </p>
                  </div>

                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          )}

          <div className="border-t p-4">
            <Button variant="outline" className="w-full">
              <Link href="/admin/dashboard/helpers">
                Open verification queue
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Today's Operations - Not Yet Connected */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <CalendarDays className="h-5 w-5" />
            </div>

            <span className="text-xs font-medium text-muted-foreground">
              TODAY
            </span>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Scheduled services
          </p>

          <p className="mt-1 text-3xl font-bold">—</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Booking API not connected
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <TrendingUp className="h-5 w-5" />
            </div>

            <span className="text-xs font-medium text-muted-foreground">
              THIS MONTH
            </span>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Completed services
          </p>

          <p className="mt-1 text-3xl font-bold">—</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Booking API not connected
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Helper verification rate
          </p>

          <p className="mt-1 text-3xl font-bold">—</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Verification metrics not connected
          </p>
        </div>
      </section>

      {/* Complaints - Demonstration Data */}
      <section className="rounded-2xl border bg-card">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="font-semibold">Complaints requiring attention</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Demonstration data — complaint API not connected
            </p>
          </div>

          <Link href="/admin/dashboard/complaints">
            <Button variant="ghost" size="sm">
              Manage complaints
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="divide-y">
          {complaints.map((complaint) => (
            <div
              key={complaint.title}
              className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <AlertTriangle className="h-4 w-4" />
                </div>

                <div>
                  <p className="font-medium">{complaint.title}</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Reported by {complaint.customer} · {complaint.date}
                  </p>
                </div>
              </div>

              <Badge
                variant="outline"
                className={
                  complaint.priority === "High"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-amber-200 bg-amber-50 text-amber-700"
                }
              >
                {complaint.priority} priority
              </Badge>
            </div>
          ))}
        </div>
      </section>

      {/* Admin Reminder */}
      <section className="rounded-2xl border bg-muted/30 p-5">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />

          <div>
            <h3 className="font-semibold">Dashboard data status</h3>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Helper verification data is loaded from the protected admin
              API. Household counts are retrieved from the database and
              displayed only to the configured primary administrator.
              Booking and complaint figures remain unavailable until their
              respective backend endpoints are connected.
            </p>

            {householdCountError && !canViewHouseholdCount && (
              <p className="mt-2 text-xs text-muted-foreground">
                Household statistics: {householdCountError}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}