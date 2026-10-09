"use client"

import { useState, type ReactNode } from "react"
import {
  BadgeCheck,
  Baby,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  Home,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const serviceOptions = [
  {
    id: "maid",
    label: "Maid Services",
    description: "Cleaning, kitchen assistance and household support",
    icon: Home,
  },
  {
    id: "babysitting",
    label: "Babysitting",
    description: "Short-term childcare and supervision",
    icon: Baby,
  },
  {
    id: "nanny",
    label: "Nanny Care",
    description: "Regular childcare and daily support",
    icon: UserRound,
  },
]

function Field({
  label,
  value,
  placeholder,
  type = "text",
}: {
  label: string
  value: string
  placeholder?: string
  type?: string
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-foreground focus:ring-2 focus:ring-foreground/10"
      />
    </div>
  )
}

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="rounded-2xl border bg-background">
      <div className="p-5 sm:p-6">
        <h2 className="font-semibold">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <Separator />

      <div className="p-5 sm:p-6">{children}</div>
    </section>
  )
}

export default function HelperProfilePage() {
  const [services, setServices] = useState<string[]>([
    "maid",
    "nanny",
  ])

  const [availableForNewRequests, setAvailableForNewRequests] =
    useState(true)

  const toggleService = (id: string) => {
    setServices((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            ACCOUNT
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Manage the information households see when considering your
            services.
          </p>
        </div>

        <Button>
          <Save className="mr-2 size-4" />
          Save changes
        </Button>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {/* Personal information */}
          <Section
            title="Personal information"
            description="Basic information associated with your HomiCare profile."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="First name"
                value="Priya"
              />

              <Field
                label="Last name"
                value="Sharma"
              />

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Email address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    type="email"
                    defaultValue="priya.sharma@example.com"
                    className="h-10 w-full rounded-lg border bg-muted/30 pl-9 pr-3 text-sm outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Phone number
                </label>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    type="tel"
                    defaultValue="+91 98765 43210"
                    className="h-10 w-full rounded-lg border bg-muted/30 pl-9 pr-3 text-sm outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10"
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* Service categories */}
          <Section
            title="Services you provide"
            description="Select the types of care you are available to provide."
          >
            <div className="space-y-3">
              {serviceOptions.map((service) => {
                const Icon = service.icon
                const selected = services.includes(service.id)

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                      selected
                        ? "border-foreground bg-muted/40"
                        : "hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Icon className="size-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">
                        {service.label}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {service.description}
                      </p>
                    </div>

                    <div
                      className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                        selected
                          ? "border-foreground bg-foreground text-background"
                          : "border-muted-foreground/30"
                      }`}
                    >
                      {selected && (
                        <CheckCircle2 className="size-4" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </Section>

          {/* Experience */}
          <Section
            title="Experience"
            description="Help households understand your experience and background."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Years of experience"
                value="5"
                type="number"
              />

              <Field
                label="Primary service"
                value="Nanny Care"
              />
            </div>

            <div className="mt-5 space-y-2">
              <label className="text-sm font-medium">
                About your experience
              </label>

              <textarea
                defaultValue="Experienced household helper with 5 years of experience supporting families with childcare, household assistance and daily routines."
                rows={5}
                className="w-full resize-none rounded-lg border bg-background px-3 py-3 text-sm leading-6 outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10"
              />

              <p className="text-xs text-muted-foreground">
                Keep this description factual and relevant to the
                services you provide.
              </p>
            </div>
          </Section>

          {/* Location */}
          <Section
            title="Service location"
            description="Set the area where you are currently available for work."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    defaultValue="Mumbai"
                    className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10"
                  />
                </div>
              </div>

              <Field
                label="Preferred area"
                value="Andheri West"
              />

              <Field
                label="PIN code"
                value="400058"
              />

              <Field
                label="Maximum travel distance"
                value="5 km"
              />
            </div>
          </Section>

          {/* Availability */}
          <Section
            title="Availability"
            description="Control whether you are currently accepting new booking requests."
          >
            <div className="flex items-center justify-between gap-5 rounded-xl border p-4">
              <div className="flex gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <BriefcaseBusiness className="size-5" />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Accept new requests
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Households can send you new booking requests when
                    this is enabled.
                  </p>
                </div>
              </div>

              <Switch
                checked={availableForNewRequests}
                onCheckedChange={setAvailableForNewRequests}
              />
            </div>

            <div className="mt-4 rounded-xl bg-muted/40 p-4">
              <p className="text-sm font-medium">
                Current availability
              </p>

              <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                <span>Monday – Saturday</span>
                <span>9:00 AM – 5:00 PM</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="mt-3 px-0"
              >
                Edit availability
                <ChevronRight className="ml-1 size-4" />
              </Button>
            </div>
          </Section>
        </div>

        {/* Profile sidebar */}
        <aside className="space-y-6">
          {/* Profile summary */}
          <section className="rounded-2xl border bg-background p-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-muted text-2xl font-semibold">
                PS
              </div>

              <h2 className="mt-4 text-lg font-semibold">
                Priya Sharma
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Maid · Nanny
              </p>

              <Badge
                variant="outline"
                className="mt-3 border-success/20 bg-success/10 text-success"
              >
                <BadgeCheck className="mr-1.5 size-3.5" />
                Verified profile
              </Badge>
            </div>

            <Separator className="my-5" />

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Experience
                </span>
                <span className="font-medium">5 years</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Rating
                </span>
                <span className="font-medium">4.9 / 5</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Reviews
                </span>
                <span className="font-medium">38</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Location
                </span>
                <span className="font-medium">Mumbai</span>
              </div>
            </div>
          </section>

          {/* Profile completion */}
          <section className="rounded-2xl border bg-background p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                Profile completeness
              </h3>

              <span className="text-sm font-semibold">90%</span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[90%] rounded-full bg-foreground" />
            </div>

            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              Add your preferred working hours and complete the remaining
              profile information.
            </p>
          </section>

          {/* Verification */}
          <section className="rounded-2xl border bg-background p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                <ShieldCheck className="size-5" />
              </div>

              <div>
                <h3 className="font-semibold">
                  Verification
                </h3>

                <p className="text-xs text-muted-foreground">
                  Profile verification status
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-4 text-success" />

                <span className="text-sm">
                  Identity details
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-4 text-success" />

                <span className="text-sm">
                  Profile information
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-4 text-success" />

                <span className="text-sm">
                  Contact information
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FileCheck2 className="size-4 text-muted-foreground" />

                <span className="text-sm text-muted-foreground">
                  Additional documents
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="mt-5 w-full"
            >
              Manage verification
            </Button>
          </section>

          {/* Contact */}
          <section className="rounded-2xl bg-muted/40 p-5">
            <div className="flex items-start gap-3">
              <InfoIcon />

              <div>
                <p className="text-sm font-medium">
                  Keep your profile accurate
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Households use your profile information when deciding
                  whether your services fit their needs.
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </main>
  )
}

function InfoIcon() {
  return (
    <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-background">
      <ShieldCheck className="size-4 text-muted-foreground" />
    </div>
  )
}