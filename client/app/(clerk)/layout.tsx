"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Baby,
  CalendarCheck,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";

type AuthMode = "sign-in" | "sign-up";

const COPY: Record<AuthMode, { heading: string; subtext: string }> = {
  "sign-in": {
    heading: "Welcome back to HomiCare",
    subtext: "Log in to continue managing your care.",
  },
  "sign-up": {
    heading: "Join HomiCare",
    subtext: "Create an account and find care you can count on.",
  },
};

type CarePoint = {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  top: string;
  left: string;
};

const CARE_POINTS: CarePoint[] = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Verified help",
    description: "Profiles you can trust",
    top: "18%",
    left: "72%",
  },
  {
    id: 2,
    icon: Baby,
    title: "Childcare",
    description: "Support for little ones",
    top: "38%",
    left: "18%",
  },
  {
    id: 3,
    icon: Sparkles,
    title: "Household care",
    description: "Help with everyday needs",
    top: "68%",
    left: "75%",
  },
];

const ClerkLayout = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  /** Force the copy instead of auto-detecting from the URL. */
  variant?: AuthMode;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));

    return () => cancelAnimationFrame(t);
  }, []);

  const pathname = usePathname();

  const mode: AuthMode =
    variant ??
    (pathname?.includes("sign-up") ? "sign-up" : "sign-in");

  const { heading, subtext } = COPY[mode];

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-background font-sans">
      {/* ------------------------------------------------------- */}
      {/* LEFT — HOMICARE BRAND PANEL */}
      {/* ------------------------------------------------------- */}
      <div className="relative hidden min-h-screen overflow-hidden bg-foreground lg:flex">
        {/* Subtle ambient lighting */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/6 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -right-40 h-128 w-lg rounded-full bg-white/4 blur-3xl" />

        {/* Decorative grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Brand */}
        <div className="absolute left-10 top-10 z-20">
          <div className="flex items-center gap-3">
            {/* HomiCare mark */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm">
              <HeartHandshake className="h-5 w-5 text-white" strokeWidth={1.8} />
            </div>

            <span className="text-xl font-bold tracking-tight text-white">
              HomiCare
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex w-full flex-col items-center justify-center px-12 py-24">
          <div className="relative w-full max-w-xl">
            {/* Small label */}
            <div
              className={`mb-8 flex justify-center transition-all duration-700 ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
            >
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>

                <span className="text-xs font-medium tracking-wide text-white/70">
                  Care you can count on
                </span>
              </div>
            </div>

            {/* Central visual */}
            <div className="relative mx-auto aspect-square w-[min(30rem,80vw)]">
              {/* Outer rings */}
              <div className="absolute inset-[10%] rounded-full border border-white/8" />
              <div className="absolute inset-[22%] rounded-full border border-white/8" />
              <div className="absolute inset-[34%] rounded-full border border-white/8" />

              {/* Connecting lines */}
              <div className="absolute left-1/2 top-[18%] h-[64%] w-px -translate-x-1/2 bg-white/8" />
              <div className="absolute left-[18%] top-1/2 h-px w-[64%] -translate-y-1/2 bg-white/8" />

              {/* Center */}
              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute -inset-6 rounded-full border border-white/6" />

                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-2xl">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <HeartHandshake
                      className="h-10 w-10 text-foreground"
                      strokeWidth={1.6}
                    />
                  </div>
                </div>

                <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 whitespace-nowrap text-center">
                  <p className="text-sm font-semibold text-white">
                    Your home
                  </p>
                  <p className="mt-1 text-xs text-white/45">
                    Your care, organized
                  </p>
                </div>
              </div>

              {/* Care points */}
              {CARE_POINTS.map((point, index) => {
                const Icon = point.icon;

                return (
                  <div
                    key={point.id}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
                      mounted
                        ? "scale-100 opacity-100"
                        : "scale-75 opacity-0"
                    }`}
                    style={{
                      top: point.top,
                      left: point.left,
                      transitionDelay: `${300 + index * 180}ms`,
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/8 shadow-xl backdrop-blur-sm">
                        <Icon
                          className="h-6 w-6 text-white/85"
                          strokeWidth={1.6}
                        />
                      </div>

                      <div className="mt-3 whitespace-nowrap text-center">
                        <p className="text-xs font-semibold text-white/85">
                          {point.title}
                        </p>

                        <p className="mt-0.5 text-[11px] text-white/40">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom message */}
            <div
              className={`mt-8 text-center transition-all delay-500 duration-700 ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
            >
              <p className="mx-auto max-w-sm text-sm leading-6 text-white/50">
                From everyday household support to childcare,
                HomiCare helps you find reliable care for the moments
                that matter.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom trust indicators */}
        <div className="absolute bottom-8 left-10 right-10 z-20 flex items-center justify-between border-t border-white/10 pt-5">
          <div className="flex items-center gap-2 text-xs text-white/45">
            <ShieldCheck className="h-4 w-4" />
            <span>Verified profiles</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/45">
            <CalendarCheck className="h-4 w-4" />
            <span>Flexible plans</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/45">
            <UserRoundCheck className="h-4 w-4" />
            <span>Simple management</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------- */}
      {/* RIGHT — AUTH FORM */}
      {/* ------------------------------------------------------- */}
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-5 py-16 sm:px-8 lg:py-0">
        <div
          key={mode}
          className={`w-full max-w-md text-center transition-all duration-700 motion-reduce:duration-0 ${
            mounted
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          }`}
        >
          <div className="mb-8 lg:hidden">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-foreground">
              <HeartHandshake
                className="h-5 w-5 text-background"
                strokeWidth={1.7}
              />
            </div>

            <p className="mt-3 text-xl font-bold tracking-tight text-foreground">
              HomiCare
            </p>
          </div>

          <h1 className="font-sans text-3xl font-bold tracking-tight text-foreground sm:text-[2rem]">
            {heading}
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            {subtext}
          </p>
        </div>

        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ClerkLayout;