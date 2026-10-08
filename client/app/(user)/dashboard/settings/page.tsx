"use client"

import { useState } from "react"
import {
  Bell,
  ChevronRight,
  Globe2,
  LockKeyhole,
  LogOut,
  Mail,
  Moon,
  ShieldCheck,
  Smartphone,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [serviceReminders, setServiceReminders] = useState(true)
  const [bookingUpdates, setBookingUpdates] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">

      {/* Header */}
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          ACCOUNT
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Settings
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your HomiCare preferences, notifications, and account.
        </p>
      </div>

      {/* Notifications */}
      <section className="border bg-card">

        <div className="p-6 sm:p-8">

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-muted">
              <Bell className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold">
                Notifications
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Choose how HomiCare keeps you updated.
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-6">

            <SettingRow
              icon={<Mail className="h-4 w-4" />}
              title="Email notifications"
              description="Receive important account and care updates by email."
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />

            <SettingRow
              icon={<Bell className="h-4 w-4" />}
              title="Service reminders"
              description="Get reminders before your scheduled care services."
              checked={serviceReminders}
              onCheckedChange={setServiceReminders}
            />

            <SettingRow
              icon={<Smartphone className="h-4 w-4" />}
              title="Booking updates"
              description="Get notified when a booking request changes status."
              checked={bookingUpdates}
              onCheckedChange={setBookingUpdates}
            />

            <SettingRow
              icon={<Mail className="h-4 w-4" />}
              title="Promotional emails"
              description="Receive occasional news, offers, and HomiCare updates."
              checked={marketingEmails}
              onCheckedChange={setMarketingEmails}
            />

          </div>

        </div>

      </section>

      {/* Preferences */}
      <section className="border bg-card">

        <div className="p-6 sm:p-8">

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-muted">
              <Globe2 className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold">
                Preferences
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Customize your HomiCare experience.
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-2">

            <PreferenceRow
              icon={<Globe2 className="h-4 w-4" />}
              title="Language"
              value="English"
            />

            <PreferenceRow
              icon={<Moon className="h-4 w-4" />}
              title="Appearance"
              value="System default"
            />

          </div>

        </div>

      </section>

      {/* Security */}
      <section className="border bg-card">

        <div className="p-6 sm:p-8">

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-muted">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold">
                Security
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Manage your account security.
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-2">

            <ActionRow
              icon={<LockKeyhole className="h-4 w-4" />}
              title="Password and authentication"
              description="Manage your sign-in and authentication settings."
              action="Manage"
            />

            <ActionRow
              icon={<Smartphone className="h-4 w-4" />}
              title="Active sessions"
              description="Review devices currently signed in to your account."
              action="View"
            />

          </div>

        </div>

      </section>

      {/* Account actions */}
      <section className="border bg-card">

        <div className="p-6 sm:p-8">

          <h2 className="font-bold">
            Account
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your HomiCare account.
          </p>

          <Separator className="my-6" />

          <div className="space-y-2">

            <ActionRow
              icon={<LogOut className="h-4 w-4" />}
              title="Sign out"
              description="Sign out of HomiCare on this device."
              action="Sign out"
            />

            <ActionRow
              icon={<Trash2 className="h-4 w-4 text-red-600" />}
              title="Delete account"
              description="Permanently delete your HomiCare account and associated data."
              action="Delete"
              destructive
            />

          </div>

        </div>

      </section>

      {/* Privacy note */}
      <div className="flex gap-3 border bg-muted/40 p-5">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />

        <div>
          <p className="text-sm font-medium">
            Your privacy matters
          </p>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            HomiCare should only collect and use information necessary
            to provide and manage your care services.
          </p>
        </div>
      </div>

    </div>
  )
}

function SettingRow({
  icon,
  title,
  description,
  checked,
  onCheckedChange,
}: {
  icon: React.ReactNode
  title: string
  description: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="flex gap-3">

        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
          {icon}
        </div>

        <div>
          <p className="text-sm font-medium">
            {title}
          </p>

          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="shrink-0"
      />
    </div>
  )
}

function PreferenceRow({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode
  title: string
  value: string
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-4 rounded-md p-3 text-left transition-colors hover:bg-muted"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-muted">
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium">
          {title}
        </p>

        <p className="mt-0.5 text-sm text-muted-foreground">
          {value}
        </p>
      </div>

      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  )
}

function ActionRow({
  icon,
  title,
  description,
  action,
  destructive = false,
}: {
  icon: React.ReactNode
  title: string
  description: string
  action: string
  destructive?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-6 rounded-md p-3">

      <div className="flex gap-3">

        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center bg-muted">
          {icon}
        </div>

        <div>
          <p
            className={`text-sm font-medium ${
              destructive ? "text-red-600" : ""
            }`}
          >
            {title}
          </p>

          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            {description}
          </p>
        </div>

      </div>

      <Button
        variant={destructive ? "destructive" : "outline"}
        size="sm"
        className="shrink-0"
      >
        {action}
      </Button>

    </div>
  )
}