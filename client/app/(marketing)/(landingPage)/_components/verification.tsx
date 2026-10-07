"use client";

import { motion, type Variants } from "framer-motion";
import {
  ShieldCheck,
  FileCheck2,
  UserCheck,
  BadgeCheck,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_OUT,
    },
  },
};

const verificationSteps = [
  {
    icon: FileCheck2,
    title: "Profile verification",
    description: "Helper information is reviewed before approval.",
  },
  {
    icon: UserCheck,
    title: "Identity details",
    description: "Important identity information is collected and verified.",
  },
  {
    icon: BadgeCheck,
    title: "Verified profile",
    description: "Approved helpers receive a visible verification status.",
  },
];

export default function Verification() {
  return (
    <div
      id="verification"
      className="relative bg-background px-6 py-32 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">

        {/* Main content */}
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Built around trust
            </span>

            <h2 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-[3.4rem]">
              Know who you&apos;re welcoming into your home.
            </h2>

            <p className="mt-6 max-w-lg text-[15px] leading-7 text-muted-foreground md:text-base">
              HomiCare brings verification and helper information together so
              households can make more informed decisions before requesting a
              service.
            </p>

            {/* Trust badge */}
            <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-border bg-muted/40 px-4 py-2.5">
              <ShieldCheck
                className="h-5 w-5 text-foreground"
                strokeWidth={1.5}
              />

              <span className="text-sm font-medium text-foreground">
                Verified helper profiles
              </span>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            className="relative"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Verification visual */}
            <div className="relative overflow-hidden rounded-3xl border border-border bg-muted/40 p-6 md:p-8">

              {/* Profile header skeleton */}
              <motion.div
                variants={item}
                className="flex items-center justify-between border-b border-border pb-6"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="h-14 w-14 rounded-full" />

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
                  <BadgeCheck className="h-4 w-4" />

                  <span className="text-xs font-medium">
                    Verified
                  </span>
                </div>
              </motion.div>

              {/* Verification items */}
              <div className="divide-y divide-border">
                {verificationSteps.map(
                  ({ icon: Icon, title, description }) => (
                    <motion.div
                      key={title}
                      variants={item}
                      className="flex gap-4 py-6"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
                        <Icon
                          className="h-5 w-5 text-foreground"
                          strokeWidth={1.5}
                        />
                      </div>

                      <div>
                        <h3 className="font-medium text-foreground">
                          {title}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {description}
                        </p>
                      </div>
                    </motion.div>
                  )
                )}
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}