import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ClipboardCheck, Brush, Layout, Share2 } from "lucide-react";
import Link from "next/link";

const detailedServices = [
  {
    id: "unity-co-dev",
    title: "Unity Co-Development",
    subtitle: "Unity development capacity that fits your production loop.",
    description:
      "We join existing teams as embedded Unity developers, working inside your sprint cadence, coding standards, and review process.",
    highlights: ["Sprint integration", "Gameplay systems", "Fast ramp-up", "Code review parity"],
    icon: Users,
  },
  {
    id: "qa-pm",
    title: "QA & Production Support",
    subtitle: "Testing, coordination, and day-to-day delivery support.",
    description:
      "We provide QA coverage, bug reporting, regression support, and PM coordination so your development team can stay focused on shipping.",
    highlights: ["QA coverage", "Bug triage", "Regression checks", "PM support"],
    icon: ClipboardCheck,
  },
  {
    id: "art-support",
    title: "2D Art & UI Support",
    subtitle: "Versatile art support for production needs.",
    description:
      "Our 2D art support covers gameplay assets, UI elements, promotional visuals, and the day-to-day visual tasks that keep production moving.",
    highlights: ["Gameplay assets", "UI support", "Visual polish", "Production art"],
    icon: Brush,
  },
  {
    id: "tech-art",
    title: "Technical Architecture & Rescue",
    subtitle: "Critical systems work for projects under pressure.",
    description:
      "We step into performance bottlenecks, unstable architecture, and release-critical systems when teams need expert technical direction fast.",
    highlights: ["Systems architecture", "Performance profiling", "Technical rescue", "Complex UI and tools"],
    icon: Layout,
  },
  {
    id: "porting",
    title: "Porting & Release Readiness",
    subtitle: "Optimization and platform delivery support.",
    description:
      "We prepare games for PC, mobile, handheld, and console targets with platform integration, performance work, and release-readiness checks.",
    highlights: ["PC and mobile", "Handheld and console", "Optimization", "Release preparation"],
    icon: Share2,
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 bg-surface-3/30 border-b border-white/8">
        <Container>
          <div className="max-w-3xl">
            <span className="text-accent-gold font-bold uppercase tracking-widest text-xs mb-4 block">Services</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Expert game development support for teams that need reliable delivery
            </h1>
            <p className="text-xl text-text-muted leading-relaxed">
              We provide Unity development, QA + PM support, versatile 2D art,
              and multiplatform release help for studios that need an external team
              they can plug into production quickly.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {detailedServices.map((service) => (
              <Card
                key={service.id}
                id={service.id}
                className="p-8 group hover:bg-surface-1/50 transition-all border-l-4 border-l-white/10 hover:border-l-accent-gold"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="bg-surface-2 p-4 rounded-md border border-white/10">
                      <service.icon className="w-8 h-8 text-accent-gold" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">{service.title}</h2>
                      <p className="text-sm font-medium uppercase tracking-[0.16em] text-text-muted">{service.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-text-muted mb-8 flex-grow leading-relaxed">{service.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    {service.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/75">
                        <div className="w-1.5 h-1.5 bg-accent-gold rounded-full" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="max-w-3xl glass-panel rounded-lg p-10 md:p-12">
            <span className="text-accent-gold font-bold uppercase tracking-widest text-xs mb-4 block">Engagement</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Bring in expert support where the roadmap is hardest</h2>
            <p className="text-text-muted text-lg mb-8">
              Use us for embedded game development, QA + PM support, art coverage, or multiplatform release work.
            </p>
            <Button variant="premium" size="lg" asChild>
              <Link href="/contact">Send Project Brief</Link>
            </Button>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
