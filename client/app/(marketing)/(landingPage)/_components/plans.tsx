"use client";

import { motion, type Variants } from "framer-motion";
import {
  Clock3,
  CalendarDays,
  CalendarRange,
} from "lucide-react";

const plans = [
  {
    icon: Clock3,
    number: "01",
    title: "Hourly",
    description:
      "Flexible help when you need support for a few hours.",
  },
  {
    icon: CalendarDays,
    number: "02",
    title: "Monthly",
    description:
      "Reliable household support as part of your regular routine.",
  },
  {
    icon: CalendarRange,
    number: "03",
    title: "Yearly",
    description:
      "Long-term care and household support for your ongoing needs.",
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
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

export default function Plans() {
  return (
    <section
      id="plans"
      className="relative bg-muted/40 px-6 py-32 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Flexible care
          </span>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            A plan that fits your routine.
          </h2>

          <p className="mt-6 text-[15px] leading-7 text-muted-foreground md:text-base">
            Choose the type of support that works for your home,
            schedule, and everyday needs.
          </p>
        </motion.div>

        {/* Plans */}
        <motion.div
          className="mt-16 grid gap-4 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {plans.map(
            ({ icon: Icon, number, title, description }) => (
              <motion.article
                key={title}
                variants={item}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 md:p-10"
              >
                {/* Number + icon, side by side so top of card stays compact */}
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-bold tracking-tighter text-muted">
                    {number}
                  </span>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted/40 transition-colors duration-300 group-hover:border-foreground/20 group-hover:bg-background">
                    <Icon
                      className="h-5 w-5 text-foreground"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                <div className="mt-6 h-px w-10 bg-border transition-all duration-300 group-hover:w-16 group-hover:bg-foreground/40" />

                {/* Content, directly below — no dead space */}
                <div className="mt-6">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {title}
                  </h3>

                  <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                    {description}
                  </p>
                </div>
              </motion.article>
            )
          )}
        </motion.div>

      </div>
    </section>
  );
}