"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  CalendarCheck,
  Clock3,
  FileClock,
  HeartHandshake,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  MessageCircleQuestion,
  Search,
  Settings,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const mainNavigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Find Care",
    href: "/dashboard/find-care",
    icon: HeartHandshake,
  },
];

const careNavigation = [
  {
    label: "My Bookings",
    href: "/dashboard/bookings",
    icon: CalendarCheck,
  },
  {
    label: "My Services",
    href: "/dashboard/services",
    icon: Clock3,
  },
  {
    label: "Care History",
    href: "/dashboard/history",
    icon: FileClock,
  },
  {
    label: "Reviews",
    href: "/dashboard/reviews",
    icon: MessageCircleQuestion,
  },
];

const accountNavigation = [
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: UserRound,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    label: "Help & Support",
    href: "/dashboard/help",
    icon: HelpCircle,
  },
];

const allNavigation = [
  ...mainNavigation,
  ...careNavigation,
  ...accountNavigation,
];

function isItemActive(pathname: string, href: string) {
  return href === "/dashboard"
    ? pathname === href
    : pathname.startsWith(href);
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r bg-card lg:flex lg:flex-col">
        <Sidebar
          pathname={pathname}
          onNavigate={() => setMobileOpen(false)}
        />
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur lg:hidden">
        <Link
          href="/dashboard"
          className="font-heading text-xl font-bold tracking-tight"
        >
          HomiCare
        </Link>

        <button
          onClick={() => setMobileOpen(true)}
          className="flex size-10 items-center justify-center rounded-lg border"
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </button>
      </header>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-foreground/20 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />

          <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-card shadow-xl lg:hidden">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b p-5">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="font-heading text-xl font-bold"
                >
                  HomiCare
                </Link>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex size-9 items-center justify-center rounded-lg border"
                  aria-label="Close navigation"
                >
                  <X className="size-4" />
                </button>
              </div>

              <SidebarNavigation
                pathname={pathname}
                onNavigate={() => setMobileOpen(false)}
              />

              <SidebarFooter />
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        <DesktopTopBar pathname={pathname} />

        {children}
      </div>
    </div>
  );
}

/* ---------------------------------------------
   Desktop Top Bar
--------------------------------------------- */

function DesktopTopBar({ pathname }: { pathname: string }) {
  // Pick the most specific nav item that matches the current URL
  const current =
    [...allNavigation]
      .sort((a, b) => b.href.length - a.href.length)
      .find((item) => isItemActive(pathname, item.href)) ??
    allNavigation[0];

  return (
    <header className="sticky top-0 z-30 hidden h-16 border-b bg-background/95 backdrop-blur lg:block">
      {/* Same max width and side padding as the page content, so edges line up */}
      <div className="mx-auto flex h-full max-w-7xl items-center gap-4 px-8">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Household Portal
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

            <span className="flex-1 text-left">
              Search helpers, bookings…
            </span>

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
              AD
            </div>

            <div className="hidden min-w-0 2xl:block">
              <p className="truncate text-sm font-semibold leading-none">
                Ankur Das
              </p>

              <p className="mt-1 truncate text-xs text-muted-foreground">
                Household account
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------------------
   Desktop Sidebar
--------------------------------------------- */

function Sidebar({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex h-16 items-center border-b px-6">
        <Link
          href="/dashboard"
          className="font-heading text-xl font-bold tracking-tight"
        >
          HomiCare
        </Link>
      </div>

      <SidebarNavigation
        pathname={pathname}
        onNavigate={onNavigate}
      />

      <SidebarFooter />
    </div>
  );
}

/* ---------------------------------------------
   Navigation
--------------------------------------------- */

function SidebarNavigation({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-5">
      <NavigationGroup
        label="MAIN"
        items={mainNavigation}
        pathname={pathname}
        onNavigate={onNavigate}
      />

      <NavigationGroup
        label="YOUR CARE"
        items={careNavigation}
        pathname={pathname}
        onNavigate={onNavigate}
      />

      <NavigationGroup
        label="ACCOUNT"
        items={accountNavigation}
        pathname={pathname}
        onNavigate={onNavigate}
      />
    </nav>
  );
}

function NavigationGroup({
  label,
  items,
  pathname,
  onNavigate,
}: {
  label: string;
  items: {
    label: string;
    href: string;
    icon: React.ElementType;
  }[];
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div className="mb-7">
      <p className="mb-2 px-3 text-[10px] font-bold tracking-[0.18em] text-muted-foreground">
        {label}
      </p>

      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = isItemActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="size-4.25" />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------
   Sidebar Footer
--------------------------------------------- */

function SidebarFooter() {
  return (
    <div className="border-t p-3">
      {/* User */}
      <div className="flex items-center gap-3 rounded-xl p-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
          <UserRound className="size-4" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            Ankur Das
          </p>

          <p className="truncate text-xs text-muted-foreground">
            Household account
          </p>
        </div>
      </div>

      {/* Trust indicator */}
      <div className="mt-2 flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2">
        <ShieldCheck className="size-4" />

        <span className="text-xs font-medium">
          Your account is protected
        </span>
      </div>

      {/* Logout */}
      <button className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
        <LogOut className="size-4.25" />
        Log out
      </button>
    </div>
  );
}