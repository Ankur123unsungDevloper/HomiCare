import Link from "next/link";

const footerLinks = {
  Services: [
    { label: "Maid Services", href: "/services/maid" },
    { label: "Babysitting", href: "/services/babysitting" },
    { label: "Nanny Care", href: "/services/nanny" },
  ],
  Company: [
    { label: "About HomiCare", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "FAQs", href: "/faqs" },
    { label: "Help Center", href: "/help" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-16 md:px-12 lg:px-20">

      <div className="mx-auto max-w-6xl">

        {/* Top */}
        <div className="grid gap-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              HomiCare
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              Care You Can Count On.
            </p>

            <p className="mt-6 max-w-sm text-sm leading-6 text-muted-foreground">
              Trusted domestic care, flexible service plans, and simple
              management for your home.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground">
                {title}
              </h3>

              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} HomiCare. All rights reserved.
          </p>

          <p>
            Care You Can Count On.
          </p>

        </div>

      </div>

    </footer>
  );
}