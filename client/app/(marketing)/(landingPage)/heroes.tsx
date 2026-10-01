/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

const scenes = [
  {
    title: "Care You Can Count On.",
    description:
      "Find trusted domestic help for the people and places that matter most.",
  },
  {
    title: "Someone to care for the little ones.",
    description:
      "Find experienced babysitters and nannies who fit your family's needs.",
  },
  {
    title: "Help that keeps your home running.",
    description:
      "Get reliable household support that fits your routine and lifestyle.",
  },
  {
    title: "Care for every generation.",
    description:
      "Find dependable support for children, families and loved ones.",
  },
  {
    title: "One home. Many needs. One trusted place.",
    description:
      "HomiCare connects your family with verified domestic helpers.",
  },
];

export default function Hero() {
  const [progress, setProgress] = useState(0);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");

      if (!hero) return;

      const rect = hero.getBoundingClientRect();

      const totalScroll = hero.offsetHeight - window.innerHeight;

      const currentScroll = Math.min(
        Math.max(-rect.top, 0),
        totalScroll
      );

      const scrollProgress = currentScroll / totalScroll;

      setProgress(scrollProgress);

      const currentScene = Math.min(
        Math.floor(scrollProgress * scenes.length),
        scenes.length - 1
      );

      setScene(currentScene);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="hero"
      className="relative h-[500vh] w-full"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="mx-auto flex h-full items-center px-8">
          <div className="flex w-1/2 flex-col justify-center items-center">
            <span className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              HomiCare
            </span>
            <div className="max-w-xl">
              <h1
                key={scene}
                className="text-5xl font-bold tracking-tight text-neutral-900 md:text-7xl"
              >
                {scenes[scene].title}
              </h1>
              <p
                key={`description-${scene}`}
                className="mt-6 max-w-lg text-lg leading-8 text-neutral-500"
              >
                {scenes[scene].description}
              </p>
            </div>
            <div className="mt-8">
              <button className="rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800">
                Find a Helper
              </button>
            </div>
          </div>
          <div className="relative flex h-full w-1/2 items-center justify-center">
            <div className="relative aspect-square w-full max-w-162.5">
              <div className="absolute inset-0">
                <img
                  src="/images/homicare-hero.png"
                  alt="HomiCare domestic care"
                  className="h-full w-full object-contain"
                />
              </div>
              <div
                className="absolute left-0 top-1/2"
                style={{
                  transform: `
                    translateY(-50%)
                    translateX(${Math.max(0, progress - 0.15) * 300}px)
                  `,
                  opacity: progress > 0.15 ? 1 : 0,
                }}
              >
              </div>
              <div
                className="absolute right-0 top-1/3"
                style={{
                  transform: `
                    translateX(${Math.max(0, progress - 0.35) * -250}px)
                  `,
                  opacity: progress > 0.35 ? 1 : 0,
                }}
              >
              </div>
              <div
                className="absolute bottom-0 left-1/2"
                style={{
                  transform: `
                    translateX(-50%)
                    translateY(${Math.max(0, progress - 0.55) * -200}px)
                  `,
                  opacity: progress > 0.55 ? 1 : 0,
                }}
              >
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-neutral-400">
              Scroll to explore
            </span>
            <div className="h-10 w-px bg-neutral-300">
              <div
                className="w-full bg-neutral-900"
                style={{
                  height: `${progress * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}