"use client";

import { motion, type Variants } from "framer-motion";
import { Home, Baby, Heart } from "lucide-react";

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

const services = [
  {
    icon: Home,
    title: "Maid services",
    description:
      "Reliable help for everyday household tasks, keeping your home comfortable and running smoothly.",
  },
  {
    icon: Baby,
    title: "Babysitting",
    description:
      "Trusted support for caring for your little ones when you need an extra pair of hands.",
  },
  {
    icon: Heart,
    title: "Nanny care",
    description:
      "Dedicated childcare and everyday support tailored around your family's routine.",
  },
];

export default function Services() {
  return (
    <div
      id="services"
      className="relative bg-muted/40 px-6 py-28 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">

        {/* Section Header */}
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Our services
          </span>

          <h2 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-[3.4rem]">
            Help for the moments that matter.
          </h2>

          <p className="mt-6 max-w-xl text-[15px] leading-7 text-muted-foreground md:text-base">
            From everyday household support to childcare, find the right kind
            of help for your home and your family&apos;s needs.
          </p>
        </motion.div>

        {/* Services */}
        <motion.div
          className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map(({ icon: Icon, title, description }) => (
            <motion.article
              key={title}
              variants={item}
              className="group relative min-h-88 overflow-hidden rounded-2xl border border-border bg-background p-8 transition-transform duration-300 hover:-translate-y-1 md:p-10"
            >
              {/* Icon */}
              <Icon
                className="h-6 w-6 text-foreground"
                strokeWidth={1.5}
                aria-hidden="true"
              />

              {/* Content */}
              <div className="absolute bottom-8 left-8 right-8 md:bottom-10 md:left-10 md:right-10">
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                  {title}
                </h3>

                <p className="mt-3 max-w-sm text-[15px] leading-7 text-muted-foreground">
                  {description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </div>
  );
}