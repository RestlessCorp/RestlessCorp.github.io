import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Rocket, Database, Layout, Share2 } from "lucide-react";
import Link from "next/link";

const detailedServices = [
  {
    id: "unity-co-dev",
    title: "Unity Co-Development",
    subtitle: "Expert Unity capacity that fits your production loop.",
    description:
      "We join existing teams as expert contributors, working inside your sprint cadence, coding standards, and review process.",
    highlights: ["Sprint integration", "Code review parity", "Fast ramp-up", "Lead-level support"],
    icon: Users,
  },
  {
    id: "game-design",
    title: "Game Design & Economy",
    subtitle: "Retention, progression, and monetization systems.",
    description:
      "We shape progression loops, live-service economy design, and monetization systems so product goals stay aligned with production reality.",
    highlights: ["Progression loops", "Economy tuning", "Retention design", "Systems balancing"],
    icon: Rocket,
  },
  {
    id: "multiplayer",
    title: "Live-Service & Web-Connected Systems",
    subtitle: "Connected gameplay and backend coordination.",
    description:
      "Implement high-performance multiplayer systems and live-service backends. We handle data orchestration, matchmaking, and cross-platform synchronization.",
    highlights: ["Multiplayer gameplay", "Live-service flows", "Matchmaking", "Cross-platform sync"],
    icon: Database,
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
      "We prepare games for PC, handheld, mobile, and console targets with platform integration, performance work, and release-readiness checks.",
    highlights: ["Platform support", "Optimization", "SDK integration", "Release preparation"],
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
              Expert game development support for the systems that decide shipping risk
            </h1>
            <p className="text-xl text-text-muted leading-relaxed">
              We help game teams add expert execution where architecture, connected systems,
              performance, and release pressure can slow production down.
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
              Use us for embedded co-development, targeted rescue work, or a defined connected-systems scope.
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
