"use client"

import {
  Camera,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">

      {/* Header */}
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          ACCOUNT
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Your profile
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your personal information and household details.
        </p>
      </div>

      {/* Profile identity */}
      <section className="border bg-card">
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">

          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
              <UserRound className="h-10 w-10 text-muted-foreground" />
            </div>

            <button
              type="button"
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border bg-background shadow-sm transition-colors hover:bg-muted"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Ankur Das
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Household account
            </p>

            <div className="mt-3 flex items-center gap-2 text-sm text-green-700">
              <CheckCircle2 className="h-4 w-4" />
              Profile information complete
            </div>
          </div>

        </div>
      </section>

      {/* Personal information */}
      <section className="border bg-card">

        <div className="p-6 sm:p-8">
          <div>
            <h2 className="text-lg font-bold">
              Personal information
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Keep your contact details up to date.
            </p>
          </div>

          <Separator className="my-6" />

          <div className="grid gap-6 sm:grid-cols-2">

            <div className="space-y-2">
              <Label htmlFor="first-name">
                First name
              </Label>

              <Input
                id="first-name"
                defaultValue="Ankur"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="last-name">
                Last name
              </Label>

              <Input
                id="last-name"
                defaultValue="Das"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email address
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  defaultValue="ankur@example.com"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone number
              </Label>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="phone"
                  type="tel"
                  defaultValue="+91 98765 43210"
                  className="pl-10"
                />
              </div>
            </div>

          </div>

          <div className="mt-6 flex justify-end">
            <Button>
              Save changes
            </Button>
          </div>
        </div>

      </section>

      {/* Household information */}
      <section className="border bg-card">

        <div className="p-6 sm:p-8">

          <div>
            <h2 className="text-lg font-bold">
              Household information
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              This information helps HomiCare coordinate your care
              services.
            </p>
          </div>

          <Separator className="my-6" />

          <div className="grid gap-6 sm:grid-cols-2">

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">
                Home address
              </Label>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  id="address"
                  defaultValue="Andheri West, Mumbai"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">
                City
              </Label>

              <Input
                id="city"
                defaultValue="Mumbai"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode">
                PIN code
              </Label>

              <Input
                id="pincode"
                defaultValue="400058"
              />
            </div>

          </div>

          <div className="mt-6 flex justify-end">
            <Button>
              Save household details
            </Button>
          </div>

        </div>

      </section>

      {/* Account verification */}
      <section className="border bg-muted/40 p-6 sm:p-8">

        <div className="flex gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-background">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-semibold">
              Your information is protected
            </h2>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
              HomiCare uses your account and household information
              to manage bookings and provide care services. Only
              provide information that is required for your account.
            </p>
          </div>

        </div>

      </section>

    </div>
  )
}