"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ClipboardList,
  BriefcaseBusiness,
  CalendarDays,
  History,
  Wallet,
  UserRound,
  Settings,
  CircleHelp,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Search,
  Bell,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

const mainNavigation: NavItem[] = [
  {
    label: "Dashboard",
    href: "/helper/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Booking Requests",
    href: "/helper/dashboard/requests",
    icon: ClipboardList,
  },
]

const careNavigation: NavItem[] = [
  {
    label: "My Services",
    href: "/helper/dashboard/services",
    icon: BriefcaseBusiness,
  },
  {
    label: "My Schedule",
    href: "/helper/dashboard/schedule",
    icon: CalendarDays,
  },
  {
    label: "Service History",
    href: "/helper/dashboard/history",
    icon: History,
  },
  {
    label: "Earnings",
    href: "/helper/dashboard/earnings",
    icon: Wallet,
  },
]

const accountNavigation: NavItem[] = [
  {
    label: "Profile",
    href: "/helper/dashboard/profile",
    icon: UserRound,
  },
  {
    label: "Settings",
    href: "/helper/dashboard/settings",
    icon: Settings,
  },
  {
    label: "Help & Support",
    href: "/helper/dashboard/help",
    icon: CircleHelp,
  },
]

const allNavigation: NavItem[] = [
  ...mainNavigation,
  ...careNavigation,
  ...accountNavigation,
]

function isItemActive(pathname: string, href: string) {
  return (
    pathname === href ||
    (href !== "/helper/dashboard" && pathname.startsWith(href))
  )
}

function NavigationItem({
  item,
  pathname,
  onClick,
}: {
  item: NavItem
  pathname: string
  onClick?: () => void
}) {
  const Icon = item.icon
  const isActive = isItemActive(pathname, item.href)

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors xl:py-3 xl:text-[15px] ${
        isActive
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <Icon className="size-4.5 shrink-0" />

      <span className="flex-1">{item.label}</span>

      {isActive && <ChevronRight className="size-4 opacity-60" />}
    </Link>
  )
}

function NavGroup({
  label,
  items,
  pathname,
  onClick,
}: {
  label: string
  items: NavItem[]
  pathname: string
  onClick?: () => void
}) {
  return (
    <div>
      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground xl:text-[11px]">
        {label}
      </p>

      <div className="space-y-1">
        {items.map((item) => (
          <NavigationItem
            key={item.href}
            item={item}
            pathname={pathname}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  )
}

function Sidebar({
  pathname,
  mobile = false,
  onClose,
}: {
  pathname: string
  mobile?: boolean
  onClose?: () => void
}) {
  return (
    <aside
      className={
        mobile
          ? "flex h-full w-72 flex-col bg-background"
          : "fixed inset-y-0 left-0 z-40 hidden w-64 border-r bg-background lg:flex lg:flex-col xl:w-72"
      }
    >
      {/* Brand */}
      <div className="flex h-20 items-center px-6">
        <Link
          href="/helper/dashboard"
          onClick={onClose}
          className="flex items-center gap-3"
        >
          <div className="flex size-9 items-center justify-center rounded-xl bg-foreground text-background">
            <ShieldCheck className="size-5" />
          </div>

          <div>
            <p className="text-lg font-bold tracking-tight">HomiCare</p>

            <p className="text-[11px] font-medium text-muted-foreground">
              Helper Portal
            </p>
          </div>
        </Link>

        {mobile && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X className="size-5" />
          </Button>
        )}
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-7">
          <NavGroup
            label="Main"
            items={mainNavigation}
            pathname={pathname}
            onClick={onClose}
          />
          <NavGroup
            label="Your Work"
            items={careNavigation}
            pathname={pathname}
            onClick={onClose}
          />
          <NavGroup
            label="Account"
            items={accountNavigation}
            pathname={pathname}
            onClick={onClose}
          />
        </div>
      </nav>

      {/* Verification */}
      <div className="px-4 pb-4">
        <div className="rounded-2xl border bg-muted/40 p-4">
          <div className="mb-3 flex items-center gap-2">
            <ShieldCheck className="size-4" />

            <span className="text-sm font-semibold">Profile verified</span>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            Your verified profile helps households choose reliable care with
            confidence.
          </p>
        </div>
      </div>

      <Separator />

      {/* Account */}
      <div className="p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl px-2 py-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
            PS
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Priya Sharma</p>

            <p className="truncate text-xs text-muted-foreground">
              Maid · Mumbai
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
        >
          <LogOut className="size-4" />
          Sign out
        </Button>
      </div>
    </aside>
  )
}

/* Desktop-only top bar: gives the content area a frame on large screens */
function DesktopTopBar({ pathname }: { pathname: string }) {
  const current =
    [...allNavigation]
      .sort((a, b) => b.href.length - a.href.length)
      .find((item) => isItemActive(pathname, item.href)) ??
    allNavigation[0]

  return (
    <header className="sticky top-0 z-30 hidden h-16 items-center gap-4 border-b bg-background/95 px-8 backdrop-blur lg:flex xl:px-10">
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Helper Portal
        </p>
        <h1 className="truncate text-base font-semibold tracking-tight">
          {current.label}
        </h1>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          className="hidden h-10 w-64 items-center gap-2 rounded-xl border bg-muted/40 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted xl:flex"
        >
          <Search className="size-4" />
          <span className="flex-1 text-left">Search requests, history…</span>
          <kbd className="rounded border bg-background px-1.5 py-0.5 text-[10px] font-medium">
            ⌘K
          </kbd>
        </button>

        <Button
          variant="ghost"
          size="icon"
          className="xl:hidden"
          aria-label="Search"
        >
          <Search className="size-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-foreground ring-2 ring-background" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
            PS
          </div>

          <div className="hidden min-w-0 2xl:block">
            <p className="truncate text-sm font-semibold leading-none">
              Priya Sharma
            </p>
            <p className="mt-1 truncate text-xs text-muted-foreground">
              Maid · Mumbai
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default function HelperDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar pathname={pathname} />

      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 px-4 backdrop-blur lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </Button>

        <Link
          href="/helper/dashboard"
          className="ml-3 flex items-center gap-2"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background">
            <ShieldCheck className="size-4" />
          </div>

          <span className="font-bold tracking-tight">HomiCare</span>
        </Link>
      </header>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative h-full">
            <Sidebar
              pathname={pathname}
              mobile
              onClose={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="min-h-screen lg:pl-64 xl:pl-72">
        <DesktopTopBar pathname={pathname} />

        <main className="lg:px-8 lg:py-8 xl:px-10">
          <div className="mx-auto w-full max-w-360">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}