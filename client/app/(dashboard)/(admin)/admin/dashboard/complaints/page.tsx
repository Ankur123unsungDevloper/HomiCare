"use client"

import * as React from "react"
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Clock3,
  MessageSquareText,
  MoreHorizontal,
  Search,
  ShieldAlert,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ComplaintStatus =
  | "Open"
  | "Under Review"
  | "Resolved"
  | "Closed"

type Priority = "High" | "Medium" | "Low"

type Complaint = {
  id: string
  subject: string
  household: string
  helper: string
  category: string
  submitted: string
  priority: Priority
  status: ComplaintStatus
  description: string
}

const complaints: Complaint[] = [
  {
    id: "CMP-0087",
    subject: "Helper did not arrive for scheduled service",
    household: "Rahul Mehta",
    helper: "Priya Sharma",
    category: "Service Issue",
    submitted: "08 Oct 2026",
    priority: "High",
    status: "Open",
    description:
      "The helper did not arrive for the scheduled morning service and the household was not notified in advance.",
  },
  {
    id: "CMP-0086",
    subject: "Service duration was shorter than agreed",
    household: "Neha Kapoor",
    helper: "Sunita Patil",
    category: "Service Issue",
    submitted: "08 Oct 2026",
    priority: "Medium",
    status: "Under Review",
    description:
      "Household reported that the service ended earlier than the agreed schedule.",
  },
  {
    id: "CMP-0085",
    subject: "Concern regarding helper conduct",
    household: "Amit Shah",
    helper: "Meena Joshi",
    category: "Conduct",
    submitted: "07 Oct 2026",
    priority: "High",
    status: "Open",
    description:
      "Household has raised a concern regarding communication and conduct during the service.",
  },
  {
    id: "CMP-0084",
    subject: "Booking cancellation dispute",
    household: "Priya Nair",
    helper: "Kavita Rao",
    category: "Cancellation",
    submitted: "07 Oct 2026",
    priority: "Medium",
    status: "Under Review",
    description:
      "Both parties have provided different reasons for the cancellation of the booking.",
  },
  {
    id: "CMP-0083",
    subject: "Repeated late arrival",
    household: "Sanjay Kulkarni",
    helper: "Anita Verma",
    category: "Attendance",
    submitted: "06 Oct 2026",
    priority: "Medium",
    status: "Resolved",
    description:
      "Household reported repeated delays. Admin reviewed the service history and contacted both parties.",
  },
  {
    id: "CMP-0082",
    subject: "Incorrect service expectations",
    household: "Riya Desai",
    helper: "Rita Deshmukh",
    category: "Service Issue",
    submitted: "05 Oct 2026",
    priority: "Low",
    status: "Resolved",
    description:
      "The household and helper had different expectations regarding the requested service.",
  },
  {
    id: "CMP-0081",
    subject: "Communication issue",
    household: "Karan Patel",
    helper: "Meena Kapoor",
    category: "Communication",
    submitted: "04 Oct 2026",
    priority: "Low",
    status: "Closed",
    description:
      "Communication issue was reviewed and resolved between both parties.",
  },
]

const statusFilters = [
  "All",
  "Open",
  "Under Review",
  "Resolved",
  "Closed",
] as const

export default function AdminComplaintsPage() {
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("All")

  const filteredComplaints = complaints.filter((complaint) => {
    const query = search.toLowerCase()

    const matchesSearch =
      complaint.id.toLowerCase().includes(query) ||
      complaint.subject.toLowerCase().includes(query) ||
      complaint.household.toLowerCase().includes(query) ||
      complaint.helper.toLowerCase().includes(query) ||
      complaint.category.toLowerCase().includes(query)

    const matchesStatus =
      statusFilter === "All" || complaint.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const stats = {
    total: complaints.length,
    open: complaints.filter((c) => c.status === "Open").length,
    review: complaints.filter((c) => c.status === "Under Review").length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
    highPriority: complaints.filter((c) => c.priority === "High").length,
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Complaints & Disputes
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Review household concerns, helper disputes and service-related
          issues.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          label="Total complaints"
          value={stats.total}
          icon={MessageSquareText}
        />

        <StatCard
          label="Open"
          value={stats.open}
          icon={AlertTriangle}
          tone="warning"
        />

        <StatCard
          label="Under review"
          value={stats.review}
          icon={Clock3}
        />

        <StatCard
          label="Resolved"
          value={stats.resolved}
          icon={CheckCircle2}
          tone="success"
        />

        <StatCard
          label="High priority"
          value={stats.highPriority}
          icon={ShieldAlert}
          tone="danger"
        />
      </div>

      {/* Attention banner */}
      {stats.open > 0 && (
        <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />

          <div>
            <p className="font-medium text-amber-900">
              {stats.open} complaint{stats.open !== 1 ? "s" : ""} require
              attention
            </p>

            <p className="mt-1 text-sm leading-6 text-amber-800">
              Review open complaints and resolve urgent household or helper
              issues promptly.
            </p>
          </div>
        </div>
      )}

      {/* Complaints */}
      <section className="rounded-xl border bg-card">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search complaint, household, helper..."
              className="pl-9"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">
                Status: {statusFilter}
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {statusFilters.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto border-t px-4 pt-3">
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors ${
                statusFilter === status
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Desktop */}
        <div className="mt-3 hidden overflow-x-auto lg:block">
          <table className="w-full text-sm">
            <thead className="border-t bg-muted/30">
              <tr>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  Complaint
                </th>

                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  Household
                </th>

                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  Helper
                </th>

                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  Category
                </th>

                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  Priority
                </th>

                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  Status
                </th>

                <th className="px-5 py-3 text-right font-medium text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredComplaints.map((complaint) => (
                <tr
                  key={complaint.id}
                  className="border-t transition-colors hover:bg-muted/20"
                >
                  <td className="max-w-70 px-5 py-4">
                    <p className="font-medium">{complaint.subject}</p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {complaint.id} · {complaint.submitted}
                    </p>
                  </td>

                  <td className="px-5 py-4 font-medium">
                    {complaint.household}
                  </td>

                  <td className="px-5 py-4 font-medium">
                    {complaint.helper}
                  </td>

                  <td className="px-5 py-4">
                    {complaint.category}
                  </td>

                  <td className="px-5 py-4">
                    <PriorityBadge priority={complaint.priority} />
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={complaint.status} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <ComplaintActions complaint={complaint} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="divide-y lg:hidden">
          {filteredComplaints.map((complaint) => (
            <div key={complaint.id} className="space-y-4 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold">{complaint.subject}</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {complaint.id} · {complaint.submitted}
                  </p>
                </div>

                <ComplaintActions complaint={complaint} />
              </div>

              <div className="flex flex-wrap gap-2">
                <PriorityBadge priority={complaint.priority} />
                <StatusBadge status={complaint.status} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <InfoItem
                  label="Household"
                  value={complaint.household}
                />

                <InfoItem
                  label="Helper"
                  value={complaint.helper}
                />

                <InfoItem
                  label="Category"
                  value={complaint.category}
                />

                <InfoItem
                  label="Submitted"
                  value={complaint.submitted}
                />
              </div>

              <div className="rounded-lg bg-muted/40 p-3">
                <p className="text-xs font-medium text-muted-foreground">
                  Description
                </p>

                <p className="mt-1 text-sm leading-6">
                  {complaint.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty */}
        {filteredComplaints.length === 0 && (
          <div className="border-t p-12 text-center">
            <MessageSquareText className="mx-auto size-8 text-muted-foreground" />

            <h3 className="mt-3 font-medium">
              No complaints found
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Try changing your search or status filter.
            </p>
          </div>
        )}

        <div className="border-t px-5 py-4 text-sm text-muted-foreground">
          Showing {filteredComplaints.length} of {complaints.length} complaints
        </div>
      </section>

      {/* Resolution policy */}
      <div className="rounded-xl border bg-muted/30 p-4">
        <p className="text-sm font-medium">Complaint handling</p>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Admins should review both sides of a dispute, inspect relevant
          booking and service history, document the resolution, and only then
          close the complaint.
        </p>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  icon: Icon,
  tone = "default",
}: {
  label: string
  value: number
  icon: React.ElementType
  tone?: "default" | "success" | "warning" | "danger"
}) {
  const iconClass = {
    default: "bg-muted text-foreground",
    success: "bg-green-50 text-green-700",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-red-50 text-red-700",
  }[tone]

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>

        <div
          className={`flex size-9 items-center justify-center rounded-lg ${iconClass}`}
        >
          <Icon className="size-4" />
        </div>
      </div>

      <p className="mt-3 text-2xl font-semibold tracking-tight">
        {value}
      </p>
    </div>
  )
}

function PriorityBadge({ priority }: { priority: Priority }) {
  const styles: Record<Priority, string> = {
    High: "border-red-200 bg-red-50 text-red-700",
    Medium: "border-amber-200 bg-amber-50 text-amber-700",
    Low: "border-border bg-muted text-muted-foreground",
  }

  return (
    <Badge variant="outline" className={styles[priority]}>
      {priority}
    </Badge>
  )
}

function StatusBadge({ status }: { status: ComplaintStatus }) {
  const styles: Record<ComplaintStatus, string> = {
    Open: "border-red-200 bg-red-50 text-red-700",
    "Under Review": "border-amber-200 bg-amber-50 text-amber-700",
    Resolved: "border-green-200 bg-green-50 text-green-700",
    Closed: "border-border bg-muted text-muted-foreground",
  }

  return (
    <Badge variant="outline" className={styles[status]}>
      {status}
    </Badge>
  )
}

function ComplaintActions({
  complaint,
}: {
  complaint: Complaint
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="size-4" />

          <span className="sr-only">
            Actions for {complaint.id}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          View complaint
        </DropdownMenuItem>

        <DropdownMenuItem>
          View household
        </DropdownMenuItem>

        <DropdownMenuItem>
          View helper
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {complaint.status === "Open" && (
          <DropdownMenuItem>
            Start review
          </DropdownMenuItem>
        )}

        {complaint.status === "Under Review" && (
          <DropdownMenuItem>
            Mark resolved
          </DropdownMenuItem>
        )}

        {complaint.status === "Resolved" && (
          <DropdownMenuItem>
            Close complaint
          </DropdownMenuItem>
        )}

        {complaint.status !== "Closed" && (
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            Escalate complaint
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function InfoItem({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  )
}