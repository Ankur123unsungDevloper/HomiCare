"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
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
import { useBecomeHelperHref } from "@/lib/auth/become-a-helper";

interface MobileNavMenuProps {
  onClose: () => void;
}

type NavLink = {
  icon: LucideIcon;
  title: string;
  href: string;
};

const services: NavLink[] = [
  { icon: Home, title: "Maid services", href: "/services/maid" },
  { icon: Baby, title: "Babysitting", href: "/services/babysitting" },
  { icon: Heart, title: "Nanny care", href: "/services/nanny" },
];

const plans: NavLink[] = [
  { icon: Clock3, title: "Hourly", href: "/plans/hourly" },
  { icon: CalendarDays, title: "Monthly", href: "/plans/monthly" },
  { icon: CalendarRange, title: "Yearly", href: "/plans/yearly" },
];

const verifications: NavLink[] = [
  { icon: FileCheck2, title: "Aadhaar verification", href: "/verification/aadhaar" },
  { icon: UserCheck, title: "Crime background verification", href: "/verification/background" },
  { icon: BadgeCheck, title: "Address verification", href: "/verification/address" },
];

const MobileNavMenu = ({ onClose }: MobileNavMenuProps) => {
  const becomeHelperHref = useBecomeHelperHref();
  
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="absolute right-0 h-screen w-screen bg-background px-4 pt-6 lg:hidden">
      <Accordion className="pl-2">
        <NavSection
          value="services"
          title="Services"
          links={services}
          onLinkClick={handleLinkClick}
        />
        <NavSection
          value="plans"
          title="Plans"
          links={plans}
          onLinkClick={handleLinkClick}
        />
        <NavSection
          value="verification"
          title="Verification"
          links={verifications}
          onLinkClick={handleLinkClick}
        />

        <Link
          href={becomeHelperHref}
          onClick={handleLinkClick}
          className="flex flex-1 items-center justify-between border-b py-6 text-xl text-foreground"
        >
          Become a helper
        </Link>
        <Link
          href="/pricing"
          onClick={handleLinkClick}
          className="flex flex-1 items-center justify-between border-b py-6 text-xl text-foreground"
        >
          Pricing
        </Link>
      </Accordion>

      <div className="pt-12">
        <div className="flex flex-col space-y-4 px-4">
          <Button className="w-full text-base">Sign up free</Button>
        </div>
        <div className="mt-4 flex flex-col space-y-4 px-4">
          <Button variant="outline" className="w-full text-base">
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
};

function NavSection({
  value,
  title,
  links,
  onLinkClick,
}: {
  value: string;
  title: string;
  links: NavLink[];
  onLinkClick: () => void;
}) {
  return (
    <AccordionItem value={value} className="mt-6 border-b">
      <AccordionTrigger className="text-xl">{title}</AccordionTrigger>
      <AccordionContent className="space-y-1">
        {links.map(({ icon: Icon, title, href }) => (
          <Link
            key={title}
            href={href}
            onClick={onLinkClick}
            className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/60"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40">
              <Icon className="h-4 w-4 text-foreground" strokeWidth={1.5} />
            </div>
            <div className="text-base text-foreground">{title}</div>
          </Link>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

export default MobileNavMenu;