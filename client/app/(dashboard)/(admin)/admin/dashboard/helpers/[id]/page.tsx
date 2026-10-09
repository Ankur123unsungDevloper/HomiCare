"use client"

import * as React from "react"
import Link from "next/link"
import { useState } from "react"
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  FileCheck2,
  FileText,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  UserCheck,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const helper = {
  id: "HLP-001",
  name: "Priya Sharma",
  role: "Maid",
  location: "Andheri West, Mumbai",
  phone: "+91 98765 43210",
  email: "priya.sharma@example.com",
  experience: "5 years",
  rating: "4.8",
  services: ["Maid Services", "Elder Care"],
  availability: "Monday – Saturday",
  preferredPlans: ["Monthly", "Yearly"],
  joined: "18 September 2026",
  status: "Pending",
}

const verificationItems = [
  {
    title: "Identity details",
    description: "Government-issued identity information submitted.",
    status: "Submitted",
    icon: FileCheck2,
  },
  {
    title: "Profile information",
    description: "Personal, service and experience details completed.",
    status: "Verified",
    icon: UserCheck,
  },
  {
    title: "Contact information",
    description: "Phone number and email address provided.",
    status: "Verified",
    icon: Phone,
  },
  {
    title: "Additional documents",
    description: "Supporting documents uploaded for review.",
    status: "Pending",
    icon: FileText,
  },
]

export default function HelperVerificationPage() {
  const [decision, setDecision] = useState<string | null>(null)

  const handleDecision = (value: string) => {
    setDecision(value)
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Button variant="outline" size="icon" className="shrink-0">
            <Link href="/admin/dashboard/helpers">
              <ArrowLeft className="size-4" />
              <span className="sr-only">Back to helpers</span>
            </Link>
          </Button>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                {helper.name}
              </h1>

              <Badge
                variant="outline"
                className="border-amber-200 bg-amber-50 text-amber-700"
              >
                Pending Verification
              </Badge>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              Helper ID: {helper.id} · Submitted for review
            </p>
          </div>
        </div>

        <Button variant="outline">
          <Link href="/admin/dashboard/helpers">
            Back to Helpers
          </Link>
        </Button>
      </div>

      {/* Attention banner */}
      <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
        <CircleAlert className="mt-0.5 size-5 shrink-0 text-amber-600" />

        <div>
          <p className="font-medium text-amber-900">
            Verification requires admin review
          </p>
          <p className="mt-1 text-sm leading-6 text-amber-800">
            Review the submitted information and documents before approving
            this helper profile.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          {/* Personal information */}
          <section className="rounded-xl border bg-card">
            <div className="flex items-center gap-3 p-5">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <User className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold">Personal information</h2>
                <p className="text-sm text-muted-foreground">
                  Basic details provided by the helper
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid gap-x-8 gap-y-5 p-5 sm:grid-cols-2">
              <InfoItem label="Full name" value={helper.name} />
              <InfoItem label="Service type" value={helper.role} />
              <InfoItem label="Phone number" value={helper.phone} />
              <InfoItem label="Email address" value={helper.email} />
              <InfoItem label="Experience" value={helper.experience} />
              <InfoItem label="Joined HomiCare" value={helper.joined} />
            </div>
          </section>

          {/* Services */}
          <section className="rounded-xl border bg-card">
            <div className="p-5">
              <h2 className="font-semibold">Services & preferences</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Services and plans selected by the helper
              </p>
            </div>

            <Separator />

            <div className="grid gap-6 p-5 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-sm font-medium">Services offered</p>

                <div className="flex flex-wrap gap-2">
                  {helper.services.map((service) => (
                    <Badge key={service} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium">Preferred plans</p>

                <div className="flex flex-wrap gap-2">
                  {helper.preferredPlans.map((plan) => (
                    <Badge key={plan} variant="outline">
                      {plan}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2">
                <CalendarDays className="mt-0.5 size-4 text-muted-foreground" />

                <div>
                  <p className="text-sm font-medium">Availability</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {helper.availability}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="rounded-xl border bg-card">
            <div className="p-5">
              <h2 className="font-semibold">Location</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Preferred service location
              </p>
            </div>

            <Separator />

            <div className="flex items-start gap-3 p-5">
              <MapPin className="mt-0.5 size-5 text-muted-foreground" />

              <div>
                <p className="font-medium">{helper.location}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Service availability is currently limited to the selected
                  service area.
                </p>
              </div>
            </div>
          </section>

          {/* Verification */}
          <section className="rounded-xl border bg-card">
            <div className="flex items-center justify-between gap-4 p-5">
              <div>
                <h2 className="font-semibold">Verification review</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Review each verification requirement
                </p>
              </div>

              <ShieldCheck className="hidden size-6 text-muted-foreground sm:block" />
            </div>

            <Separator />

            <div className="divide-y">
              {verificationItems.map((item) => {
                const Icon = item.icon
                const verified = item.status === "Verified"

                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 p-5"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Icon className="size-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{item.title}</p>

                        <Badge
                          variant="outline"
                          className={
                            verified
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-amber-200 bg-amber-50 text-amber-700"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>

                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>

                    {verified ? (
                      <CheckCircle2 className="mt-1 size-5 shrink-0 text-green-600" />
                    ) : (
                      <CircleAlert className="mt-1 size-5 shrink-0 text-amber-600" />
                    )}
                  </div>
                )
              })}
            </div>

            <div className="border-t bg-muted/30 p-5">
              <Button variant="outline" className="w-full">
                <FileText className="size-4" />
                Review submitted documents
                <ChevronRight className="ml-auto size-4" />
              </Button>
            </div>
          </section>
        </div>

        {/* Admin decision */}
        <aside className="space-y-6">
          <section className="sticky top-6 rounded-xl border bg-card">
            <div className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                  <BadgeCheck className="size-5" />
                </div>

                <div>
                  <h2 className="font-semibold">Admin decision</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage helper verification
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4 p-5">
              {decision && (
                <div
                  className={`rounded-lg border p-3 text-sm ${
                    decision === "Approved"
                      ? "border-green-200 bg-green-50 text-green-800"
                      : decision === "Rejected"
                        ? "border-red-200 bg-red-50 text-red-800"
                        : "border-amber-200 bg-amber-50 text-amber-800"
                  }`}
                >
                  Demo action selected: <strong>{decision}</strong>
                </div>
              )}

              <div>
                <p className="text-sm font-medium">Approve profile</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Make this helper available to households after verification.
                </p>

                <Button
                  className="mt-3 w-full"
                  onClick={() => handleDecision("Approved")}
                >
                  <CheckCircle2 className="size-4" />
                  Approve Helper
                </Button>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium">Reject profile</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Reject the submission when required information or
                  verification does not meet HomiCare requirements.
                </p>

                <Button
                  variant="outline"
                  className="mt-3 w-full text-destructive hover:text-destructive"
                  onClick={() => handleDecision("Rejected")}
                >
                  <XCircle className="size-4" />
                  Reject Helper
                </Button>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium">Suspend profile</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Temporarily prevent the helper from receiving new service
                  requests.
                </p>

                <Button
                  variant="outline"
                  className="mt-3 w-full"
                  onClick={() => handleDecision("Suspended")}
                >
                  <ShieldCheck className="size-4" />
                  Suspend Helper
                </Button>
              </div>
            </div>

            <div className="border-t bg-muted/30 p-5">
              <p className="text-xs leading-5 text-muted-foreground">
                <strong>Admin note:</strong> These controls are currently
                demo actions. Backend authorization, audit logs, document
                validation and status persistence should be added when the
                admin API is connected.
              </p>
            </div>
          </section>
        </aside>
      </div>
    </div>
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
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  )
}