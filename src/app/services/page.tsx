import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, Rocket, Database, Boxes, Layout, Monitor, Share2, 
  Gamepad2, Layers, Cpu, Cloud, Smartphone 
} from "lucide-react";
import Link from "next/link";

const detailedServices = [
  {
    id: "unity-co-dev",
    title: "Unity Co-Development",
    subtitle: "Flexible, senior-level Unity reinforcement for your production team.",
    description: "We don't just 'outsource' tasks; we integrate deeply into your team. Our senior Unity developers follow your architectural patterns, coding standards, and communication protocols to deliver high-quality features in parity with your internal team.",
    highlights: ["Sprint integration", "Architectural alignment", "Expert-level leadership", "Rapid ramp-up"],
    icon: Users,
  },
  {
    id: "game-design",
    title: "Game Design & Economics",
    subtitle: "Monetization, player loops, and Web2/Web3 mechanics.",
    description: "We specialize in the intersection of engagement and economics. From designing sustainable Web3 economies to optimizing Web2 monetization loops and core gameplay retention mechanics.",
    highlights: ["Monetization loops", "Web2/Web3 economics", "Retention design", "Systems balancing"],
    icon: Rocket,
  },
  {
    id: "multiplayer",
    title: "Live-Service & Web-Connected Systems",
    subtitle: "Robust backend and networking for modern connected games.",
    description: "Implement high-performance multiplayer systems (Netcode, Photon, Mirror) and live-service backends. We handle data orchestration, matchmaking, and cross-platform synchronization.",
    highlights: ["Real-time networking", "LiveOps systems", "Matchmaking", "Cross-platform play"],
    icon: Database,
  },
  {
    id: "tech-art",
    title: "Technical Architecture & Rescue",
    subtitle: "Critical systems engineering and technical leadership.",
    description: "High-performance shader development, complex UI/UX implementation, and technical rescue for projects with architecture bottlenecks or release-critical issues.",
    highlights: ["Systems architecture", "Technical rescue", "Performance profiling", "Complex UI Toolkit"],
    icon: Layout,
  },
  {
    id: "porting",
    title: "Porting & Release Readiness",
    subtitle: "Bringing your game to every screen, perfectly optimized.",
    description: "Optimization and porting for PC, mobile, Steam Deck, and consoles. We handle platform-specific integration (Steam/Epic/Consoles), compliance, and performance tuning.",
    highlights: ["Steam Deck / Consoles", "Platform SDKs", "Optimization", "Release compliance"],
    icon: Share2,
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Services Hero */}
      <section className="pt-32 pb-20 bg-surface-3/30 border-b border-primary-border/20">
        <Container>
          <div className="max-w-3xl">
            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Our Capabilities</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Professional <br />Studio Services</h1>
            <p className="text-xl text-text-muted leading-relaxed">
              We provide the high-level expertise needed to navigate the challenges 
              of modern game production. Whether you need a full team or expert 
              reinforcement, we deliver senior execution across Unity and web-connected systems.
            </p>
          </div>
        </Container>
      </section>

      {/* Detailed Services Grid */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {detailedServices.map((service) => (
              <Card key={service.id} id={service.id} className="p-8 group hover:bg-surface-1/50 transition-all border-l-4 border-l-primary/30 hover:border-l-primary">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-6 mb-8 text-primary">
                    <div className="bg-primary/10 p-4 rounded-md border border-primary/20">
                      <service.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">{service.title}</h2>
                      <p className="text-sm font-medium opacity-80 uppercase tracking-tighter text-accent-gold">{service.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-text-muted mb-8 flex-grow leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/70">
                         <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                         {h}
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" asChild>
                    <Link href="/contact">Inquire About This Service</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
