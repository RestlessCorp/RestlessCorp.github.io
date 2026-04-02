import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Trophy, Layers, Rocket, Database, Boxes, Layout, Monitor, Share2, 
  Gamepad2, Cpu, Cloud, Smartphone 
} from "lucide-react";
import Link from "next/link";

const caseStudies = [
  {
    id: "calamity",
    title: "Calamity Online",
    category: "Flagship Production",
    summary: "Large-scale fantasy RPG production with deep-connected web systems.",
    challenge: "Deliver a high-fidelity systems-heavy game with real-time web-connected persistent data.",
    execution: "Full-cycle production including technical art, multiplayer backend, and multi-platform release.",
    outcomes: "Production-ready game loop, complex database orchestration, and high-performance Unity systems.",
    icon: Trophy,
    color: "primary",
  },
  {
    id: "multiplatform-porting",
    title: "Multiplatform Release Readiness",
    category: "Porting & Optimization",
    summary: "Preparing and optimizing a high-performance title for Steam Deck and Consoles.",
    challenge: "Transitioning a PC-first production to be performant and compliant for secondary platforms.",
    execution: "Performance profiling, platform SDK integration, controller mapping, and compliance audits.",
    outcomes: "Sub-30ms frame delivery on handhelds, full console compliance, and optimized memory usage.",
    icon: Monitor,
    color: "accent-gold",
  },
  {
    id: "web-connected-systems",
    title: "Web-Connected Production Tools",
    category: "Web & Infrastructure",
    summary: "Building internal studio and player dashboards for real-time game monitoring.",
    challenge: "Bridging the gap between 24/7 web-connected live-service data and Unity client performance.",
    execution: "Next.js backend with real-time API syncing and secure internal admin tools for production teams.",
    outcomes: "Real-time player monitoring, automated reporting, and simplified live-ops management.",
    icon: Cloud,
    color: "accent-orange",
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Case Studies Hero */}
      <section className="pt-32 pb-20 bg-surface-3/30 border-b border-primary-border/20">
        <Container>
          <div className="max-w-3xl">
            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Proven Capability</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">Case Studies: <br />Expert Execution</h1>
            <p className="text-xl text-text-muted leading-relaxed">
              Explore how we solve complex technical and production challenges for game 
              studios, publishers, and innovative game founders. From flagship products 
              to technical rescue—we deliver.
            </p>
          </div>
        </Container>
      </section>

      {/* Case Studies List */}
      <section className="py-24">
        <Container>
          <div className="space-y-20">
            {caseStudies.map((cs, i) => (
              <div key={cs.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={i % 2 !== 0 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary border border-primary/30 px-3 py-1 bg-primary/10 rounded-full">{cs.category}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">{cs.title}</h2>
                  <p className="text-lg text-text-muted mb-8 leading-relaxed italic border-l-2 border-primary pl-6">
                    "{cs.summary}"
                  </p>
                  
                  <div className="space-y-6 mb-10">
                    <div>
                      <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-widest">Challenge</h4>
                      <p className="text-sm text-text-muted">{cs.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-widest">Execution</h4>
                      <p className="text-sm text-text-muted">{cs.execution}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-widest">Outcome</h4>
                      <p className="text-sm text-text-muted">{cs.outcomes}</p>
                    </div>
                  </div>
                  
                  <Button variant="premium" asChild>
                    <Link href={`/contact?subject=${cs.id}`}>Inquire for Similar Project</Link>
                  </Button>
                </div>
                
                <div className={`relative ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full -z-10" />
                  <Card className="p-1 h-full overflow-hidden border-2 hover:border-primary transition-colors group">
                    <div className="aspect-video bg-surface-2 bg-gradient-to-br from-primary/5 to-surface-3 flex items-center justify-center p-12">
                       <cs.icon className="w-24 h-24 text-primary group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-6 bg-surface-1/50">
                       <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-text-muted opacity-60">
                        <span>Production Case v2.0</span>
                        <span>{cs.id.toUpperCase()}</span>
                       </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Engagement Models Brief */}
      <section className="py-24 bg-surface-3/50">
        <Container className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Flexible Engagement Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="text-left p-8">
              <h3 className="text-xl font-bold mb-4">Co-Development</h3>
              <p className="text-sm text-text-muted mb-6">Deeply embedded senior developers who match your architecture and sprint workflow to deliver features faster.</p>
            </Card>
            <Card className="text-left p-8">
              <h3 className="text-xl font-bold mb-4">Full Outsource</h3>
              <p className="text-sm text-text-muted mb-6">End-to-end production ownership where we define the technical roadmap and execute on your milestone vision.</p>
            </Card>
             <Card className="text-left p-8">
              <h3 className="text-xl font-bold mb-4">Strike Teams</h3>
              <p className="text-sm text-text-muted mb-6">Expert technical rescue or high-priority feature execution for challenging systems or release deadlines.</p>
            </Card>
             <Card className="text-left p-8">
              <h3 className="text-xl font-bold mb-4">Release Ops</h3>
              <p className="text-sm text-text-muted mb-6">Focused support for porting, optimization, and platform compliance readiness for upcoming launches.</p>
            </Card>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
