import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Rocket, Users, Settings, Database } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Unity Co-Development",
    description: "Senior Unity engineers who plug into your sprint, architecture, and review flow.",
    icon: Users,
    href: "/services#unity-co-dev",
  },
  {
    title: "Technical Architecture",
    description: "System design, rescue work, and performance fixes for complex game codebases.",
    icon: Settings,
    href: "/services#tech-art",
  },
  {
    title: "Game Design & Economy",
    description: "Progression, retention, and monetization design shaped for long-term operations.",
    icon: Rocket,
    href: "/services#game-design",
  },
  {
    title: "Live-Service Systems",
    description: "Connected gameplay, backend coordination, and tools that support persistent features.",
    icon: Database,
    href: "/services#multiplayer",
  },
];

export function ServicesOverview() {
  return (
    <section className="py-24 relative overflow-hidden">
      <Container>
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            High-leverage support <br />
            <span className="text-accent-gold italic">for production risk</span>
          </h2>
          <p className="text-text-muted text-lg">
            We focus on the areas where connected games usually stall: architecture,
            live-service systems, economy design, and senior Unity execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <Card key={i} className="group relative overflow-hidden h-full flex flex-col">
              <CardHeader>
                <div className="p-3 mb-4 rounded-md bg-surface-2 border border-white/10 w-fit group-hover:bg-surface-1 transition-colors">
                  <service.icon className="w-6 h-6 text-accent-gold" />
                </div>
                <CardTitle className="text-xl mb-4 leading-tight">{service.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mb-6">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Link
                  href={service.href}
                  className="text-xs font-bold uppercase tracking-widest text-foreground/80 hover:text-accent-gold transition-colors"
                >
                  View Details
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/services" className="text-sm font-semibold text-text-muted hover:text-foreground transition-colors">
            See the full service lineup
          </Link>
        </div>
      </Container>
    </section>
  );
}
