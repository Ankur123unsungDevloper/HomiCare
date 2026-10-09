"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  Clock3,
  FileClock,
  HeartHandshake,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  MessageCircleQuestion,
  Settings,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";

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
        {children}
      </div>
    </div>
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

          const isActive =
            item.href === "/dashboard"
              ? pathname === item.href
              : pathname.startsWith(item.href);

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