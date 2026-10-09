"use client"

import { useMemo, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  MoreHorizontal,
  Search,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type UserRole = "Household" | "Helper" | "Admin"
type UserStatus = "Active" | "Pending" | "Suspended"

type User = {
  id: number
  name: string
  email: string
  phone: string
  role: UserRole
  status: UserStatus
  location: string
  joined: string
  verified: boolean
}

const users: User[] = [
  {
    id: 1,
    name: "Ankur Das",
    email: "ankur@example.com",
    phone: "+91 98XXXXXX21",
    role: "Household",
    status: "Active",
    location: "Andheri West, Mumbai",
    joined: "Sep 12, 2026",
    verified: true,
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 97XXXXXX42",
    role: "Helper",
    status: "Active",
    location: "Andheri West, Mumbai",
    joined: "Aug 18, 2026",
    verified: true,
  },
  {
    id: 3,
    name: "Rahul Mehta",
    email: "rahul@example.com",
    phone: "+91 98XXXXXX13",
    role: "Household",
    status: "Active",
    location: "Powai, Mumbai",
    joined: "Aug 05, 2026",
    verified: true,
  },
  {
    id: 4,
    name: "Sunita Patil",
    email: "sunita@example.com",
    phone: "+91 96XXXXXX72",
    role: "Helper",
    status: "Pending",
    location: "Powai, Mumbai",
    joined: "Oct 03, 2026",
    verified: false,
  },
  {
    id: 5,
    name: "Neha Kapoor",
    email: "neha@example.com",
    phone: "+91 99XXXXXX54",
    role: "Household",
    status: "Active",
    location: "Bandra West, Mumbai",
    joined: "Jul 21, 2026",
    verified: true,
  },
  {
    id: 6,
    name: "Meena Joshi",
    email: "meena@example.com",
    phone: "+91 95XXXXXX38",
    role: "Helper",
    status: "Active",
    location: "Bandra West, Mumbai",
    joined: "Jun 14, 2026",
    verified: true,
  },
  {
    id: 7,
    name: "Aarav Shah",
    email: "aarav@example.com",
    phone: "+91 94XXXXXX67",
    role: "Household",
    status: "Pending",
    location: "Andheri East, Mumbai",
    joined: "Oct 06, 2026",
    verified: false,
  },
  {
    id: 8,
    name: "Karan Patel",
    email: "karan@example.com",
    phone: "+91 93XXXXXX19",
    role: "Helper",
    status: "Suspended",
    location: "Andheri East, Mumbai",
    joined: "May 28, 2026",
    verified: true,
  },
]

const roleFilters = ["All", "Household", "Helper", "Admin"] as const
const statusFilters = ["All", "Active", "Pending", "Suspended"] as const

function RoleBadge({ role }: { role: UserRole }) {
  if (role === "Helper") {
    return (
      <Badge variant="outline" className="gap-1 font-medium">
        <UserRound className="h-3 w-3" />
        Helper
      </Badge>
    )
  }

  if (role === "Admin") {
    return (
      <Badge variant="outline" className="gap-1 font-medium">
        <ShieldCheck className="h-3 w-3" />
        Admin
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="gap-1 font-medium">
      <Users className="h-3 w-3" />
      Household
    </Badge>
  )
}

function StatusBadge({ status }: { status: UserStatus }) {
  const classes = {
    Active:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
    Pending:
      "border-amber-200 bg-amber-50 text-amber-700",
    Suspended:
      "border-red-200 bg-red-50 text-red-700",
  }

  return (
    <Badge
      variant="outline"
      className={`font-medium ${classes[status]}`}
    >
      {status}
    </Badge>
  )
}

function UserAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
      {initials}
    </div>
  )
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState("")
  const [role, setRole] =
    useState<(typeof roleFilters)[number]>("All")
  const [status, setStatus] =
    useState<(typeof statusFilters)[number]>("All")

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = search.toLowerCase().trim()

      const matchesSearch =
        !searchValue ||
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        user.location.toLowerCase().includes(searchValue)

      const matchesRole =
        role === "All" || user.role === role

      const matchesStatus =
        status === "All" || user.status === status

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [search, role, status])

  const totalUsers = users.length
  const householdCount = users.filter(
    (user) => user.role === "Household"
  ).length
  const helperCount = users.filter(
    (user) => user.role === "Helper"
  ).length
  const pendingCount = users.filter(
    (user) => user.status === "Pending"
  ).length

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            USER MANAGEMENT
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Users
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Manage households, helpers, and administrator accounts
            across HomiCare.
          </p>
        </div>

        <Button>
          <Users className="mr-2 h-4 w-4" />
          Add user
        </Button>
      </section>

      {/* Overview */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Total users
          </p>

          <p className="mt-2 text-3xl font-bold">
            {totalUsers}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            All registered accounts
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Households
          </p>

          <p className="mt-2 text-3xl font-bold">
            {householdCount}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Customers using HomiCare
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Helpers
          </p>

          <p className="mt-2 text-3xl font-bold">
            {helperCount}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Registered care providers
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Pending accounts
          </p>

          <p className="mt-2 text-3xl font-bold">
            {pendingCount}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Require administrative attention
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="space-y-4">
        <div className="relative max-w-xl">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, email, or location..."
            className="h-11 pl-10"
          />
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Role */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Role
            </span>

            {roleFilters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRole(item)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  role === item
                    ? "border-foreground bg-foreground text-background"
                    : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Status */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Status
            </span>

            {statusFilters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setStatus(item)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  status === item
                    ? "border-foreground bg-foreground text-background"
                    : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* User table */}
      <section className="overflow-hidden rounded-2xl border bg-card">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="font-semibold">
              User directory
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              {filteredUsers.length} users shown
            </p>
          </div>

          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30 text-left">
                <th className="px-5 py-3 font-medium text-muted-foreground">
                  User
                </th>
                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Role
                </th>
                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Location
                </th>
                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-5 py-3 font-medium text-muted-foreground">
                  Joined
                </th>
                <th className="w-12 px-3 py-3" />
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b last:border-b-0 hover:bg-muted/20"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={user.name} />

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-medium">
                            {user.name}
                          </p>

                          {user.verified && (
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                          )}
                        </div>

                        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <RoleBadge role={user.role} />
                  </td>

                  <td className="px-5 py-4 text-muted-foreground">
                    {user.location}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={user.status} />
                  </td>

                  <td className="px-5 py-4 text-muted-foreground">
                    {user.joined}
                  </td>

                  <td className="px-3 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          View profile
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                          View activity
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {user.status === "Suspended" ? (
                          <DropdownMenuItem>
                            Restore account
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>
                            Suspend account
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile list */}
        <div className="divide-y md:hidden">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="p-4"
            >
              <div className="flex items-start gap-3">
                <UserAvatar name={user.name} />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <p className="font-medium">
                        {user.name}
                      </p>

                      {user.verified && (
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      )}
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          View profile
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                          View activity
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                          {user.status === "Suspended"
                            ? "Restore account"
                            : "Suspend account"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <RoleBadge role={user.role} />
                    <StatusBadge status={user.status} />
                  </div>

                  <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <p>{user.location}</p>
                    <p>Joined {user.joined}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>

            <h3 className="mt-4 font-semibold">
              No users found
            </h3>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Try changing your search or removing one of the
              filters.
            </p>

            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearch("")
                setRole("All")
                setStatus("All")
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="flex items-center justify-between border-t px-5 py-4">
            <p className="text-xs text-muted-foreground">
              Showing 1–{filteredUsers.length} of{" "}
              {filteredUsers.length}
            </p>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Admin note */}
      <section className="rounded-2xl border bg-muted/30 p-5">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />

          <div>
            <h3 className="font-semibold">
              User management
            </h3>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Admin actions should be permission-protected. Account
              suspension, role changes, and profile access should be
              enforced by the backend rather than relying only on
              the dashboard interface.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}