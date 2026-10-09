"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  AlertTriangle,
  BarChart3,
  CalendarDays,
  ChevronRight,
  Home,
  Menu,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
  X,
  LifeBuoy,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type NavItem = {
  label: string
  href: string
  icon: React.ElementType
}

type NavGroup = {
  label: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    label: "MAIN",
    items: [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: Home,
      },
      {
        label: "Users",
        href: "/admin/dashboard/users",
        icon: Users,
      },
      {
        label: "Helpers",
        href: "/admin/dashboard/helpers",
        icon: UserRound,
      },
    ],
  },
  {
    label: "OPERATIONS",
    items: [
      {
        label: "Bookings",
        href: "/admin/dashboard/bookings",
        icon: CalendarDays,
      },
      {
        label: "Complaints",
        href: "/admin/dashboard/complaints",
        icon: AlertTriangle,
      },
      {
        label: "Analytics",
        href: "/admin/dashboard/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      {
        label: "Settings",
        href: "/admin/dashboard/settings",
        icon: Settings,
      },
      {
        label: "Help & Support",
        href: "/admin/dashboard/help",
        icon: LifeBuoy,
      },
    ],
  },
]

function SidebarContent({
  onNavigate,
}: {
  onNavigate?: () => void
}) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex h-16 items-center px-5">
        <Link
          href="/admin/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-2.5"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
            <ShieldCheck className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-bold tracking-tight">
              HomiCare
            </p>

            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Admin Portal
            </p>
          </div>
        </Link>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 space-y-7 overflow-y-auto p-4">
        {navGroups.map((group) => (
          <div key={group.label} className="space-y-2">
            <p className="px-3 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground">
              {group.label}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon

                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin/dashboard" &&
                    pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />

                    <span className="flex-1">
                      {item.label}
                    </span>

                    {isActive && (
                      <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Admin status */}
      <div className="p-4">
        <div className="rounded-xl border bg-muted/30 p-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-xs font-semibold">
              System operational
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            All core HomiCare services are currently running normally.
          </p>
        </div>
      </div>

      <Separator />

      {/* Account */}
      <div className="p-4">
        <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
            AD
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">
              Ankur Das
            </p>

            <p className="text-xs text-muted-foreground">
              Administrator
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Account settings"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r bg-card lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile header */}
      <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 px-4 backdrop-blur lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Link
          href="/admin/dashboard"
          className="ml-3 flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
            <ShieldCheck className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-bold tracking-tight">
              HomiCare
            </p>

            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Admin
            </p>
          </div>
        </Link>
      </header>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          <aside className="absolute inset-y-0 left-0 w-72 border-r bg-card shadow-xl">
            <div className="absolute right-3 top-3 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <SidebarContent
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="min-h-screen lg:pl-64">
        <div className="mx-auto w-full max-w-350 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  )
}