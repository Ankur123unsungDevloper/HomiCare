"use client"

import * as React from "react"
import {
  Bell,
  Building2,
  CheckCircle2,
  ChevronRight,
  Globe2,
  LockKeyhole,
  Mail,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function AdminSettingsPage() {
  const [saved, setSaved] = React.useState(false)

  const [settings, setSettings] = React.useState({
    bookingNotifications: true,
    verificationNotifications: true,
    complaintNotifications: true,
    weeklyReports: true,
    newHouseholdEmails: false,
    newHelperEmails: true,
  })

  const updateSetting = (
    key: keyof typeof settings,
    value: boolean,
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }))

    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 3000)
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Admin Settings
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage HomiCare platform, notification and administrator settings.
        </p>
      </div>

      {/* General */}
      <section className="rounded-xl border bg-card">
        <SectionHeader
          icon={Building2}
          title="Platform information"
          description="Basic information used across the HomiCare platform"
        />

        <Separator />

        <div className="grid gap-5 p-5 sm:grid-cols-2">
          <Field
            label="Platform name"
            value="HomiCare"
            readOnly
          />

          <Field
            label="Support email"
            value="support@homicare.com"
          />

          <Field
            label="Default city"
            value="Mumbai"
          />

          <Field
            label="Timezone"
            value="Asia/Kolkata (IST)"
            readOnly
          />
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-xl border bg-card">
        <SectionHeader
          icon={Bell}
          title="Notifications"
          description="Choose which platform events should notify administrators"
        />

        <Separator />

        <div className="divide-y">
          <SettingRow
            title="Booking notifications"
            description="Notify admins when bookings are created, confirmed or cancelled."
            checked={settings.bookingNotifications}
            onCheckedChange={(value) =>
              updateSetting("bookingNotifications", value)
            }
          />

          <SettingRow
            title="Helper verification"
            description="Notify admins when a helper submits or updates verification information."
            checked={settings.verificationNotifications}
            onCheckedChange={(value) =>
              updateSetting("verificationNotifications", value)
            }
          />

          <SettingRow
            title="Complaint notifications"
            description="Notify admins when a new complaint or dispute is submitted."
            checked={settings.complaintNotifications}
            onCheckedChange={(value) =>
              updateSetting("complaintNotifications", value)
            }
          />

          <SettingRow
            title="Weekly reports"
            description="Receive a weekly summary of platform activity and operations."
            checked={settings.weeklyReports}
            onCheckedChange={(value) =>
              updateSetting("weeklyReports", value)
            }
          />

          <SettingRow
            title="New household emails"
            description="Receive email notifications whenever a new household registers."
            checked={settings.newHouseholdEmails}
            onCheckedChange={(value) =>
              updateSetting("newHouseholdEmails", value)
            }
          />

          <SettingRow
            title="New helper emails"
            description="Receive email notifications whenever a helper registers."
            checked={settings.newHelperEmails}
            onCheckedChange={(value) =>
              updateSetting("newHelperEmails", value)
            }
          />
        </div>
      </section>

      {/* Admin profile */}
      <section className="rounded-xl border bg-card">
        <SectionHeader
          icon={UserRound}
          title="Administrator profile"
          description="Information associated with the current administrator"
        />

        <Separator />

        <div className="grid gap-5 p-5 sm:grid-cols-2">
          <Field
            label="Full name"
            value="Ankur Das"
          />

          <Field
            label="Role"
            value="Administrator"
            readOnly
          />

          <Field
            label="Email"
            value="admin@homicare.com"
          />

          <Field
            label="Account status"
            value="Active"
            readOnly
          />
        </div>
      </section>

      {/* Security */}
      <section className="rounded-xl border bg-card">
        <SectionHeader
          icon={LockKeyhole}
          title="Security"
          description="Manage administrator account security"
        />

        <Separator />

        <div className="divide-y">
          <ActionRow
            icon={LockKeyhole}
            title="Change password"
            description="Update the password for this administrator account."
            action="Change"
          />

          <ActionRow
            icon={ShieldCheck}
            title="Two-factor authentication"
            description="Add an additional verification step to protect the admin account."
            action="Configure"
          />

          <ActionRow
            icon={Globe2}
            title="Active sessions"
            description="Review devices and sessions currently signed into the admin account."
            action="Review"
          />
        </div>
      </section>

      {/* Email configuration */}
      <section className="rounded-xl border bg-card">
        <SectionHeader
          icon={Mail}
          title="Email configuration"
          description="Configuration for system-generated communications"
        />

        <Separator />

        <div className="p-5">
          <div className="flex items-start gap-3 rounded-lg bg-muted/40 p-4">
            <Mail className="mt-0.5 size-5 shrink-0 text-muted-foreground" />

            <div>
              <p className="text-sm font-medium">
                Transactional email provider
              </p>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Email delivery should be configured through the backend
                environment rather than directly inside the admin dashboard.
              </p>

              <BadgeLike>
                Backend configuration required
              </BadgeLike>
            </div>
          </div>
        </div>
      </section>

      {/* Save */}
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {saved ? (
            <div className="flex items-center gap-2 text-sm font-medium text-green-700">
              <CheckCircle2 className="size-4" />
              Settings saved successfully.
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Changes are currently stored only in this demo session.
            </p>
          )}
        </div>

        <Button onClick={handleSave}>
          <Save className="size-4" />
          Save Changes
        </Button>
      </div>

      {/* Admin note */}
      <div className="rounded-xl border bg-muted/30 p-4">
        <p className="text-sm font-medium">
          Production security reminder
        </p>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Admin settings, role changes, security actions and notification
          preferences must be protected by server-side authorization. Never
          rely only on client-side route protection for administrator
          privileges.
        </p>
      </div>
    </div>
  )
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3 p-5">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-5" />
      </div>

      <div>
        <h2 className="font-semibold">{title}</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  readOnly = false,
}: {
  label: string
  value: string
  readOnly?: boolean
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <Input
        defaultValue={value}
        readOnly={readOnly}
        className={readOnly ? "bg-muted/50" : ""}
      />
    </div>
  )
}

function SettingRow({
  title,
  description,
  checked,
  onCheckedChange,
}: {
  title: string
  description: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-5 p-5">
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>

        <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
          {description}
        </p>
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
}: {
  icon: React.ElementType
  title: string
  description: string
  action: string
}) {
  return (
    <div className="flex items-center gap-4 p-5">
      <div className="hidden size-9 shrink-0 items-center justify-center rounded-lg bg-muted sm:flex">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>

      <Button variant="outline" size="sm">
        {action}
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
}

function BadgeLike({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 inline-flex rounded-full border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
      {children}
    </div>
  )
}