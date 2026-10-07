"use client";

import { motion, type Variants } from "framer-motion";
import { ShieldCheck, CalendarClock, ListChecks } from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Verified helpers",
    description:
      "Know who you're welcoming into your home with verified helper profiles.",
  },
  {
    icon: CalendarClock,
    title: "Flexible plans",
    description:
      "Choose hourly, monthly, or yearly care based on your needs.",
  },
  {
    icon: ListChecks,
    title: "Simple management",
    description:
      "Book, manage, track, and review your services in one place.",
  },
];

export default function Trust() {
  return (
    <section
      id="trust"
      className="relative bg-background px-6 py-28 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">

        {/* Section header */}
        <motion.div
          className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <h2 className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-[3.4rem]">
            Care should feel simple, not like a search.
          </h2>

          <p className="max-w-md text-[15px] leading-7 text-muted-foreground md:text-base md:justify-self-end md:text-right">
            Finding reliable help for your home shouldn&apos;t mean endless
            calls, uncertainty, and follow-ups.
          </p>
        </motion.div>

        {/* Trust points */}
        <motion.div
          className="mt-20 grid divide-y divide-border border-t border-border md:grid-cols-3 md:divide-x md:divide-y-0 md:border-t-0"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {trustPoints.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={item}
              className="py-8 pr-8 md:py-2 md:pl-8 first:md:pl-0"
            >
              <Icon
                className="h-5 w-5 text-foreground"
                strokeWidth={1.5}
                aria-hidden="true"
              />

              <h3 className="mt-6 text-lg font-medium tracking-tight text-foreground md:text-xl">
                {title}
              </h3>

              <p className="mt-3 max-w-xs text-[15px] leading-7 text-muted-foreground">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}