import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layers, Rocket, Users, Settings, Database, Share2 } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Expert Co-Development",
    description: "Battle-tested Unity engineers who integrate seamlessly into your production team and match your architectural standards.",
    icon: Users,
    href: "/services#unity-co-dev",
  },
  {
    title: "Systems Architecture",
    description: "Technical rescue and high-performance system design for complex PC, console, and mobile productions.",
    icon: Settings,
    href: "/services#tech-art",
  },
  {
    title: "Game Design & Economics",
    description: "Specialized design for monetization, player loops, and Web2/Web3 mechanics that drive retention and scale.",
    icon: Rocket,
    href: "/services#game-design",
  },
  {
    title: "Live-Service Infrastructure",
    description: "Robust multiplayer networking, database orchestration, and game-connected web tools for persistent worlds.",
    icon: Database,
    href: "/services#multiplayer",
  },
];

export function ServicesOverview() {
  return (
    <section className="py-24 relative overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Expertise That <br /><span className="text-primary italic">Drives Production</span></h2>
            <p className="text-text-muted text-lg">
              We specialize in the high-impact areas of game production, ensuring your 
              team has the technical muscle to execute on vision without compromise.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <Card key={i} className="group relative overflow-hidden h-full flex flex-col">
              <CardHeader>
                <div className="p-3 mb-4 rounded-md bg-primary/10 border border-primary/20 w-fit group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl mb-4 leading-tight">{service.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mb-6">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Link 
                  href={service.href} 
                  className="text-xs font-bold uppercase tracking-widest text-primary hover:text-white transition-colors flex items-center gap-2"
                >
                  Learn More <span>→</span>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
