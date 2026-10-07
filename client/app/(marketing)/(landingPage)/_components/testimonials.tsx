"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Finding reliable help for our home became much easier with HomiCare. The whole experience felt simple and reassuring.",
    name: "Priya Sharma",
    location: "Mumbai",
    service: "Household support",
    initials: "PS",
  },
  {
    quote:
      "I wanted someone I could genuinely trust with my daughter. HomiCare made the process feel much more transparent.",
    name: "Rahul Mehta",
    location: "Pune",
    service: "Nanny care",
    initials: "RM",
  },
  {
    quote:
      "Instead of managing everything through calls and messages, I could keep the service organized in one place.",
    name: "Neha Kapoor",
    location: "Mumbai",
    service: "Babysitting",
    initials: "NK",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const testimonial = testimonials[active];

  const previous = () => {
    setActive((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const next = () => {
    setActive((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-muted/40 px-6 py-32 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-20">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Real homes. Real care.
          </span>

          <h2 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-[3.4rem]">
            Care feels different when you know you can trust it.
          </h2>
        </div>

        {/* Testimonial */}
        <div className="grid gap-16 lg:grid-cols-[1fr_0.35fr] lg:items-end">

          {/* Main testimonial */}
          <div className="relative min-h-105">

            {/* Quote icon */}
            <Quote
              className="h-12 w-12 text-foreground/10"
              strokeWidth={1}
              fill="currentColor"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45 }}
                className="mt-10"
              >
                {/* Quote */}
                <blockquote className="max-w-4xl text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
                  “{testimonial.quote}”
                </blockquote>

                {/* Person */}
                <div className="mt-12 flex items-center gap-4">

                  {/* Dummy avatar */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
                    {testimonial.initials}
                  </div>

                  <div>
                    <p className="font-medium text-foreground">
                      {testimonial.name}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {testimonial.service} · {testimonial.location}
                    </p>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-14 flex items-center gap-3">

              <button
                onClick={previous}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <button
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted"
              >
                <ArrowRight className="h-4 w-4" />
              </button>

            </div>
          </div>

          {/* Testimonial navigation */}
          <div className="border-l border-border pl-8">

            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Stories
            </p>

            <div className="space-y-1">
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => setActive(index)}
                  className="group flex w-full items-center gap-4 py-4 text-left"
                >
                  {/* Indicator */}
                  <span
                    className={`h-px transition-all duration-300 ${
                      active === index
                        ? "w-8 bg-foreground"
                        : "w-3 bg-border group-hover:w-6 group-hover:bg-foreground/50"
                    }`}
                  />

                  <span
                    className={`text-sm transition-colors ${
                      active === index
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </span>
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}