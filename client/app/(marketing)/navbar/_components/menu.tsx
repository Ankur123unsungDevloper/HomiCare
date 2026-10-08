"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  Home,
  Baby,
  Heart,
  Clock3,
  CalendarDays,
  CalendarRange,
  FileCheck2,
  UserCheck,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";

type NavLink = {
  icon: LucideIcon;
  title: string;
  href: string;
  description: string;
};

const services: NavLink[] = [
  {
    icon: Home,
    title: "Maid services",
    href: "/services/maid",
    description:
      "Reliable help for everyday household tasks, keeping your home running smoothly.",
  },
  {
    icon: Baby,
    title: "Babysitting",
    href: "/services/babysitting",
    description:
      "Trusted support for your little ones when you need an extra pair of hands.",
  },
  {
    icon: Heart,
    title: "Nanny care",
    href: "/services/nanny",
    description:
      "Dedicated childcare and everyday support built around your family's routine.",
  },
];

const plans: NavLink[] = [
  {
    icon: Clock3,
    title: "Hourly",
    href: "/plans/hourly",
    description: "Flexible help when you need support for a few hours.",
  },
  {
    icon: CalendarDays,
    title: "Monthly",
    href: "/plans/monthly",
    description: "Reliable support as part of your regular routine.",
  },
  {
    icon: CalendarRange,
    title: "Yearly",
    href: "/plans/yearly",
    description: "Long-term care for your ongoing household needs.",
  },
];

const verifications: NavLink[] = [
  {
    icon: FileCheck2,
    title: "Aadhaar verification",
    href: "/verification/aadhaar",
    description:
      "A helper's Aadhaar is verified to confirm identity and add a layer of trust.",
  },
  {
    icon: UserCheck,
    title: "Crime background verification",
    href: "/verification/background",
    description:
      "Criminal history is checked to rule out prior convictions that pose a risk.",
  },
  {
    icon: BadgeCheck,
    title: "Address verification",
    href: "/verification/address",
    description: "A helper's address is confirmed to be accurate and current.",
  },
];

export function NavigationMenuListItems() {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-105 gap-1 p-4 md:grid-cols-1">
              {services.map((link) => (
                <ListItem key={link.title} {...link} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Plans</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-105 gap-1 p-4 md:grid-cols-1">
              {plans.map((link) => (
                <ListItem key={link.title} {...link} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Verification</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-105 gap-1 p-4 md:grid-cols-1">
              {verifications.map((link) => (
                <ListItem key={link.title} {...link} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/become-a-helper" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Become a helper
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/pricing" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Pricing
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & NavLink
>(({ className, icon: Icon, title, description, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink>
        <a
          ref={ref}
          className={cn(
            "flex items-start gap-3 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-muted/60 focus:bg-muted/60",
            className
          )}
          {...props}
        >
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40">
            <Icon className="h-4 w-4 text-foreground" strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-sm font-medium leading-none text-foreground">
              {title}
            </div>
            <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-muted-foreground">
              {description}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";