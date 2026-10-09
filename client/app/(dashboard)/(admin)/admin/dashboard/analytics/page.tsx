"use client"

import * as React from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  Star,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"

const monthlyBookings = [
  { month: "May", value: 184 },
  { month: "Jun", value: 216 },
  { month: "Jul", value: 241 },
  { month: "Aug", value: 278 },
  { month: "Sep", value: 302 },
  { month: "Oct", value: 327 },
]

const serviceBreakdown = [
  {
    name: "Maid Services",
    bookings: 186,
    percentage: 57,
  },
  {
    name: "Nanny Care",
    bookings: 82,
    percentage: 25,
  },
  {
    name: "Babysitting",
    bookings: 42,
    percentage: 13,
  },
  {
    name: "Elder Care",
    bookings: 17,
    percentage: 5,
  },
]

const cityPerformance = [
  {
    city: "Mumbai",
    households: 782,
    helpers: 286,
    bookings: 214,
    completion: "95.2%",
  },
  {
    city: "Pune",
    households: 341,
    helpers: 142,
    bookings: 82,
    completion: "93.8%",
  },
  {
    city: "Thane",
    households: 161,
    helpers: 58,
    bookings: 31,
    completion: "91.6%",
  },
]

const recentActivity = [
  {
    title: "New helper verification completed",
    detail: "Kavita Rao was approved",
    time: "12 min ago",
  },
  {
    title: "Booking completed",
    detail: "BK-1045 · Maid Services",
    time: "28 min ago",
  },
  {
    title: "New household registered",
    detail: "Sneha Joshi joined HomiCare",
    time: "43 min ago",
  },
  {
    title: "Complaint resolved",
    detail: "CMP-0083 · Attendance issue",
    time: "1 hr ago",
  },
]

export default function AdminAnalyticsPage() {
  const maxBookings = Math.max(
    ...monthlyBookings.map((item) => item.value),
  )

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Analytics
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor HomiCare growth, service performance and operational
            health.
          </p>
        </div>

        <Badge variant="outline" className="w-fit">
          October 2026
        </Badge>
      </div>

      {/* KPI overview */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total households"
          value="1,284"
          change="+12.8%"
          description="vs. previous month"
          icon={Users}
          trend="up"
        />

        <MetricCard
          title="Verified helpers"
          value="486"
          change="+8.4%"
          description="vs. previous month"
          icon={UserCheck}
          trend="up"
        />

        <MetricCard
          title="Active bookings"
          value="327"
          change="+9.2%"
          description="vs. previous month"
          icon={CalendarCheck2}
          trend="up"
        />

        <MetricCard
          title="Customer satisfaction"
          value="4.8 / 5"
          change="+0.2"
          description="average rating"
          icon={Star}
          trend="up"
        />
      </div>

      {/* Operational metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SmallMetric
          label="Booking completion"
          value="94.8%"
          icon={CheckCircle2}
        />

        <SmallMetric
          label="Helper reliability"
          value="92.4%"
          icon={HeartHandshake}
        />

        <SmallMetric
          label="Pending verification"
          value="12"
          icon={Clock3}
        />

        <SmallMetric
          label="Open complaints"
          value="2"
          icon={BarChart3}
        />
      </div>

      {/* Main charts */}
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Booking trend */}
        <section className="rounded-xl border bg-card">
          <div className="flex items-start justify-between gap-4 p-5">
            <div>
              <h2 className="font-semibold">Booking growth</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Monthly active bookings over the last six months
              </p>
            </div>

            <TrendingUp className="size-5 text-muted-foreground" />
          </div>

          <div className="border-t p-5">
            <div className="flex h-64 items-end gap-3 sm:gap-5">
              {monthlyBookings.map((item) => {
                const height = `${(item.value / maxBookings) * 100}%`

                return (
                  <div
                    key={item.month}
                    className="flex min-w-0 flex-1 flex-col items-center gap-3"
                  >
                    <div className="flex h-full w-full items-end">
                      <div
                        className="group relative w-full rounded-t-md bg-foreground/90 transition-all hover:bg-foreground"
                        style={{ height }}
                      >
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">
                          {item.value}
                        </div>
                      </div>
                    </div>

                    <span className="text-xs text-muted-foreground">
                      {item.month}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="mt-5 flex items-center justify-between border-t pt-4">
              <div>
                <p className="text-xs text-muted-foreground">
                  October bookings
                </p>

                <p className="mt-1 text-lg font-semibold">
                  327
                </p>
              </div>

              <div className="flex items-center gap-1 text-sm font-medium text-green-700">
                <ArrowUpRight className="size-4" />
                8.3% growth
              </div>
            </div>
          </div>
        </section>

        {/* Service breakdown */}
        <section className="rounded-xl border bg-card">
          <div className="p-5">
            <h2 className="font-semibold">Service breakdown</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Bookings by service category
            </p>
          </div>

          <div className="border-t p-5">
            <div className="space-y-6">
              {serviceBreakdown.map((service) => (
                <div key={service.name}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium">
                      {service.name}
                    </span>

                    <span className="text-sm text-muted-foreground">
                      {service.bookings}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-foreground"
                      style={{
                        width: `${service.percentage}%`,
                      }}
                    />
                  </div>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {service.percentage}% of all bookings
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Performance */}
      <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        {/* City performance */}
        <section className="rounded-xl border bg-card">
          <div className="p-5">
            <h2 className="font-semibold">City performance</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Operational performance across active service areas
            </p>
          </div>

          <div className="overflow-x-auto border-t">
            <table className="w-full min-w-162.5 text-sm">
              <thead className="bg-muted/30">
                <tr>
                  <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                    City
                  </th>

                  <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                    Households
                  </th>

                  <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                    Helpers
                  </th>

                  <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                    Bookings
                  </th>

                  <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                    Completion
                  </th>
                </tr>
              </thead>

              <tbody>
                {cityPerformance.map((city) => (
                  <tr
                    key={city.city}
                    className="border-t transition-colors hover:bg-muted/20"
                  >
                    <td className="px-5 py-4 font-medium">
                      {city.city}
                    </td>

                    <td className="px-5 py-4">
                      {city.households}
                    </td>

                    <td className="px-5 py-4">
                      {city.helpers}
                    </td>

                    <td className="px-5 py-4">
                      {city.bookings}
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-medium text-green-700">
                        {city.completion}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Activity */}
        <section className="rounded-xl border bg-card">
          <div className="p-5">
            <h2 className="font-semibold">Recent activity</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Latest platform events
            </p>
          </div>

          <div className="divide-y border-t">
            {recentActivity.map((activity) => (
              <div
                key={activity.title}
                className="flex gap-3 p-4"
              >
                <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                  <CheckCircle2 className="size-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium">
                    {activity.title}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {activity.detail}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Key insights */}
      <section className="rounded-xl border bg-muted/30 p-5">
        <div className="flex items-start gap-3">
          <BarChart3 className="mt-0.5 size-5" />

          <div>
            <h2 className="font-semibold">Key operational insights</h2>

            <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
              <li>
                • Maid Services currently represents the largest share of
                platform bookings.
              </li>

              <li>
                • Mumbai is currently the largest active service market.
              </li>

              <li>
                • Booking completion remains above the 90% operational target.
              </li>

              <li>
                • Pending helper verification should be reviewed before
                assigning new service requests.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Demo disclaimer */}
      <div className="rounded-xl border p-4">
        <p className="text-xs leading-5 text-muted-foreground">
          <strong>Demo data:</strong> The analytics shown on this page are
          static UI data. Production metrics should be calculated from
          bookings, users, helpers, reviews, complaints and service records
          through protected backend APIs.
        </p>
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  change,
  description,
  icon: Icon,
  trend,
}: {
  title: string
  value: string
  change: string
  description: string
  icon: React.ElementType
  trend: "up" | "down"
}) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {title}
        </p>

        <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
          <Icon className="size-4" />
        </div>
      </div>

      <p className="mt-4 text-2xl font-semibold tracking-tight">
        {value}
      </p>

      <div className="mt-2 flex items-center gap-1 text-xs">
        {trend === "up" ? (
          <ArrowUpRight className="size-3.5 text-green-600" />
        ) : (
          <ArrowDownRight className="size-3.5 text-red-600" />
        )}

        <span className="font-medium text-green-700">
          {change}
        </span>

        <span className="text-muted-foreground">
          {description}
        </span>
      </div>
    </div>
  )
}

function SmallMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: React.ElementType
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 font-semibold">
          {value}
        </p>
      </div>
    </div>
  )
}