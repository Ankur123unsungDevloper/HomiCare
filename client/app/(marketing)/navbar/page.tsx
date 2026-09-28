"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";

import Logo from "@/components/logo";
// import ActionButton from "./_components/actionbutton";
// import Search from "./_components/search";

import Link from "next/link";
import {
  usePathname
} from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaUserFriends } from "react-icons/fa";

const NAV_LINKS = [
  { href: "/games", label: "Games" },
  { href: "/venues", label: "Venues" },
  { href: "/communities", label: "Communities" },
];

const Navbar = () => {
  const pathname = usePathname();
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-white fixed top-0 left-0 flex items-center justify-between w-full px-5 py-2",
        scrolled && "border-b shadow-sm"
      )}
    >
      <div className="flex items-center xl:min-w-100 md:justify-start w-[35%] xl:w-[25%] min-w-0">
        <div className="flex-none">
          <Logo />
        </div>
      </div>
      <nav className="hidden items-center gap-1 md:flex uppercase text-xl font-semibold">
        {NAV_LINKS.map((link) => {
          const active = pathname?.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 transition-colors ${
                active ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="flex flex-row items-center gap-3">
        <Button
          variant="ghost"
          className=""
        >
          <Link href="/partner-with-us" className="flex flex-col lg:flex-row items-center cursor-pointer">
            <FaUserFriends className="size-8 m-auto shrink-0" />
            <span className="ml-2 uppercase text-xl font-semibold tracking-[10%] whitespace-nowrap text-main">Partner</span>
          </Link>
        </Button>
        {/* <ActionButton /> */}
      </div>
    </div>
  );
};

export default Navbar;