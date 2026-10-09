"use client"

import {
  Bell,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Eye,
  LockKeyhole,
  LogOut,
  Mail,
  MessageSquare,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

function SettingRow({
  icon: Icon,
  title,
  description,
  checked,
  onCheckedChange,
}: {
  icon: React.ElementType
  title: string
  description: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-5">
      <div className="flex min-w-0 gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
          <Icon className="size-4" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium">{title}</p>
          <p className="mt-1 max-w-xl text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  )
}

function ActionRow({
  icon: Icon,
  title,
  description,
  action,
  destructive = false,
}: {
  icon: React.ElementType
  title: string
  description: string
  action: string
  destructive?: boolean
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-4 py-5 text-left transition-colors hover:bg-muted/30"
    >
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
          destructive ? "bg-destructive/10" : "bg-muted"
        }`}
      >
        <Icon
          className={`size-4 ${
            destructive ? "text-destructive" : ""
          }`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium ${
            destructive ? "text-destructive" : ""
          }`}
        >
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>

      <span
        className={`hidden text-xs font-medium sm:block ${
          destructive ? "text-destructive" : "text-muted-foreground"
        }`}
      >
        {action}
      </span>

      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
    </button>
  )
}

export default function HelperSettingsPage() {
  const notifications = {
    email: true,
    booking: true,
    reminders: true,
    messages: true,
    marketing: false,
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          ACCOUNT
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Manage your notifications, preferences, security, and account
          settings.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {/* Notifications */}
        <section className="rounded-2xl border bg-background">
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                <Bell className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold">
                  Notifications
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Choose which updates you want to receive.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="px-5 sm:px-6">
            <SettingRow
              icon={Mail}
              title="Email notifications"
              description="Receive important account and service updates by email."
              checked={notifications.email}
              onCheckedChange={() => {}}
            />

            <Separator />

            <SettingRow
              icon={Bell}
              title="Booking requests"
              description="Get notified when a household sends you a new booking request."
              checked={notifications.booking}
              onCheckedChange={() => {}}
            />

            <Separator />

            <SettingRow
              icon={CalendarClock}
              title="Service reminders"
              description="Receive reminders about upcoming services and schedule changes."
              checked={notifications.reminders}
              onCheckedChange={() => {}}
            />

            <Separator />

            <SettingRow
              icon={MessageSquare}
              title="Messages"
              description="Get notified when a household sends you a message."
              checked={notifications.messages}
              onCheckedChange={() => {}}
            />

            <Separator />

            <SettingRow
              icon={Mail}
              title="Marketing emails"
              description="Receive occasional news, tips, and updates from HomiCare."
              checked={notifications.marketing}
              onCheckedChange={() => {}}
            />
          </div>
        </section>

        {/* Work preferences */}
        <section className="rounded-2xl border bg-background">
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                <CalendarClock className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold">
                  Work preferences
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Control how households can find and contact you.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="px-5 sm:px-6">
            <SettingRow
              icon={Eye}
              title="Show my profile to households"
              description="Allow eligible households to discover your verified profile."
              checked={true}
              onCheckedChange={() => {}}
            />

            <Separator />

            <SettingRow
              icon={Bell}
              title="Accept new booking requests"
              description="Allow households to send you new service requests."
              checked={true}
              onCheckedChange={() => {}}
            />
          </div>

          <Separator />

          <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-sm font-medium">
                Availability schedule
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Monday – Saturday · 9:00 AM – 5:00 PM
              </p>
            </div>

            <Button variant="outline" size="sm">
              Edit availability
              <ChevronRight className="ml-2 size-4" />
            </Button>
          </div>
        </section>

        {/* Language and appearance */}
        <section className="rounded-2xl border bg-background">
          <div className="p-5 sm:p-6">
            <h2 className="font-semibold">
              Preferences
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Customize how HomiCare looks and behaves.
            </p>
          </div>

          <Separator />

          <div className="divide-y px-5 sm:px-6">
            <button
              type="button"
              className="flex w-full items-center gap-4 py-5 text-left"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                <MessageSquare className="size-4" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium">Language</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  English
                </p>
              </div>

              <span className="text-xs font-medium text-muted-foreground">
                Change
              </span>

              <ChevronRight className="size-4 text-muted-foreground" />
            </button>

            <button
              type="button"
              className="flex w-full items-center gap-4 py-5 text-left"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                <Eye className="size-4" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium">Appearance</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  System default
                </p>
              </div>

              <span className="text-xs font-medium text-muted-foreground">
                Change
              </span>

              <ChevronRight className="size-4 text-muted-foreground" />
            </button>
          </div>
        </section>

        {/* Security */}
        <section className="rounded-2xl border bg-background">
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                <ShieldCheck className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold">
                  Security
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Manage your account security settings.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="px-5 sm:px-6">
            <ActionRow
              icon={LockKeyhole}
              title="Password and authentication"
              description="Manage your account authentication and password settings."
              action="Manage"
            />

            <Separator />

            <ActionRow
              icon={UserRound}
              title="Active sessions"
              description="Review where your HomiCare account is currently signed in."
              action="View"
            />
          </div>
        </section>

        {/* Account */}
        <section className="rounded-2xl border bg-background">
          <div className="p-5 sm:p-6">
            <h2 className="font-semibold">
              Account
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage your HomiCare account.
            </p>
          </div>

          <Separator />

          <div className="px-5 sm:px-6">
            <ActionRow
              icon={LogOut}
              title="Sign out"
              description="Sign out of HomiCare on this device."
              action="Sign out"
            />

            <Separator />

            <ActionRow
              icon={Trash2}
              title="Delete account"
              description="Permanently remove your HomiCare account and associated data."
              action="Delete"
              destructive
            />
          </div>
        </section>

        {/* Security note */}
        <section className="rounded-2xl bg-muted/40 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-5 shrink-0" />

            <div>
              <h3 className="font-semibold">
                Your account matters
              </h3>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Keep your contact information, availability, and profile
                details accurate. Authentication and sensitive account
                operations should be handled through HomiCare&apos;s
                authentication system.
              </p>
            </div>
          </div>
        </section>

        {/* Save */}
        <div className="flex justify-end">
          <Button>
            <CheckCircle2 className="mr-2 size-4" />
            Save preferences
          </Button>
        </div>
      </div>
    </main>
  )
}