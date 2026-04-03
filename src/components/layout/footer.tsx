/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Container } from "@/components/ui/container";

const footerLinks = [
  {
    title: "Services",
    links: [
      { name: "Unity Co-Development", href: "/services#unity-co-dev" },
      { name: "QA & Production Support", href: "/services#qa-pm" },
      { name: "2D Art Support", href: "/services#art-support" },
      { name: "Technical Architecture", href: "/services#tech-art" },
      { name: "Porting & Release", href: "/services#porting" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Process", href: "/process" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { name: "LinkedIn", href: "https://www.linkedin.com/company/something-is-cooking/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-surface-3 border-t border-white/8 py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-4 mb-6">
              <div className="relative w-10 h-10">
                <img
                  src="/logo.jpg"
                  alt="Something Is Cooking Logo"
                  className="w-full h-full object-contain rounded-sm opacity-80"
                />
              </div>
              <span className="text-foreground font-bold tracking-tight text-xl">Something Is Cooking</span>
            </Link>
            <p className="text-text-muted text-sm max-w-sm mb-6">
              Expert game development support with Unity development, QA + PM,
              2D art coverage, and multiplatform release support.
            </p>
            <div className="flex gap-4">
              <span className="text-xs text-text-muted/50">&copy; 2026 Something Is Cooking Studio.</span>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-foreground font-bold mb-4 uppercase text-xs tracking-widest">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-text-muted text-sm hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[10px] text-text-muted/40 uppercase tracking-[0.18em]">
            Remote studio across EU and North America
          </span>
          <Link
            href="mailto:hello@somethingiscooking.com"
            className="text-xs text-text-muted hover:text-foreground transition-colors"
          >
            hello@somethingiscooking.com
          </Link>
        </div>
      </Container>
    </footer>
  );
}
