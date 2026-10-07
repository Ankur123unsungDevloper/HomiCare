"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function CTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-foreground px-6 py-32 text-background md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">

        {/* Decorative element */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-background/10"
        />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="relative"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-background/50">
            Get started
          </span>

          <h2 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl lg:text-8xl">
            Find care you
            <br />
            can count on.
          </h2>

          <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <p className="max-w-md text-base leading-7 text-background/60">
              Whether you need household help, childcare, or ongoing support,
              HomiCare helps you find the right care for your home.
            </p>

            <button
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-background px-7 py-4 text-sm font-semibold text-foreground transition-transform duration-300 hover:-translate-y-1"
            >
              Find a helper

              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>

          </div>
        </motion.div>

      </div>
    </section>
  );
}