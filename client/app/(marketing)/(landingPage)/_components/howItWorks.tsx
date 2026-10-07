"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  Search,
  UserRoundCheck,
  CalendarCheck,
  HeartHandshake,
} from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    description:
      "Explore verified maids, babysitters, and nannies based on what your home needs.",
  },
  {
    number: "02",
    icon: UserRoundCheck,
    title: "Choose",
    description:
      "Compare profiles, experience, availability, and service preferences.",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Book",
    description:
      "Select a plan that fits your schedule and send your service request.",
  },
  {
    number: "04",
    icon: HeartHandshake,
    title: "Care",
    description:
      "Your helper accepts the request and your service begins.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 25%"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative overflow-hidden bg-background px-6 py-32 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            How it works
          </span>

          <h2 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-[3.4rem]">
            From finding help to feeling at home.
          </h2>

          <p className="mt-6 max-w-xl text-[15px] leading-7 text-muted-foreground md:text-base">
            HomiCare keeps the entire process simple, transparent, and
            organized.
          </p>
        </div>

        {/* Journey */}
        <div className="relative mt-24">

          {/* Background line */}
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-border md:block" />

          {/* Animated line */}
          <motion.div
            className="absolute left-0 top-6 hidden h-px origin-left bg-foreground md:block"
            style={{
              width: "100%",
              scaleX: lineScale,
            }}
          />

          {/* Steps */}
          <div className="grid gap-16 md:grid-cols-4 md:gap-0">
            {steps.map(
              ({ number, icon: Icon, title, description }, index) => (
                <motion.div
                  key={number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    amount: 0.4,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  className="relative md:pr-8"
                >
                  {/* Point */}
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background">
                    <Icon
                      className="h-5 w-5 text-foreground"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Number */}
                  <span className="mt-8 block text-sm font-medium text-muted-foreground">
                    {number}
                  </span>

                  {/* Content */}
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                    {title}
                  </h3>

                  <p className="mt-3 max-w-xs text-[15px] leading-7 text-muted-foreground">
                    {description}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>

      </div>
    </section>
  );
}