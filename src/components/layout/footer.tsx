import Link from "next/link";
import { Container } from "@/components/ui/container";

const footerLinks = [
  {
    title: "Services",
    links: [
      { name: "Unity Co-Development", href: "/services#unity-co-dev" },
      { name: "Full-Cycle Development", href: "/services#full-cycle" },
      { name: "Multiplayer Systems", href: "/services#multiplayer" },
      { name: "Technical Art", href: "/services#tech-art" },
      { name: "Web & Companion Apps", href: "/services#web-apps" },
      { name: "Porting & Release", href: "/services#porting" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Process", href: "/process" },
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
    <footer className="bg-surface-3 border-t border-primary-border/20 py-12 md:py-20">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-4 mb-6">
              <div className="relative w-10 h-10">
                <img 
                  src="/logo.jpg" 
                  alt="Something Is Cooking Logo" 
                  className="w-full h-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all rounded-sm"
                />
              </div>
              <span className="text-foreground font-bold tracking-tight text-xl">Something Is Cooking</span>
            </Link>
            <p className="text-text-muted text-sm max-w-sm mb-6">
              Expert Unity game development studio specializing in high-performance co-development, 
              multiplayer systems, and full-cycle production for modern game teams.
            </p>
            <div className="flex gap-4">
              <span className="text-xs text-text-muted/50">© 2026 Something Is Cooking Studio. All Rights Reserved.</span>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-foreground font-bold mb-4 uppercase text-xs tracking-widest">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-text-muted text-sm hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-primary-border/10 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-text-muted hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-text-muted hover:text-foreground">Terms of Service</Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-text-muted/40 uppercase tracking-tighter">Powered by Architectural Discipline & AI-Enhanced Workflows</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
