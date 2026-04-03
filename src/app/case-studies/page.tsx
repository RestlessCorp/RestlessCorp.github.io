import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Monitor, Cloud } from "lucide-react";
import Link from "next/link";

const caseStudies = [
  {
    id: "calamity",
    title: "Calamity Online",
    category: "Flagship Production",
    summary: "Connected action RPG production with shared gameplay systems, web services, and technical art pipelines.",
    scope: "Gameplay systems, backend coordination, production tooling, and platform-aware performance work.",
    outcome: "A connected production stack designed for long-term content and stable live operation.",
    icon: Trophy,
  },
  {
    id: "multiplatform-porting",
    title: "Multiplatform Release Readiness",
    category: "Porting & Optimization",
    summary: "Preparing a performance-sensitive title for handheld and console delivery.",
    scope: "Profiling, controller support, platform integration, and release-readiness review.",
    outcome: "A cleaner path from PC-first production to additional platforms without late-stage fire drills.",
    icon: Monitor,
  },
  {
    id: "web-connected-systems",
    title: "Web-Connected Production Tools",
    category: "Web & Infrastructure",
    summary: "Internal dashboards and operational tooling for connected game teams.",
    scope: "Real-time data flow, admin workflows, and secure integration between Unity and web systems.",
    outcome: "Operational visibility for live teams without overloading the game client.",
    icon: Cloud,
  },
];

const engagementModels = [
  {
    title: "Embedded Co-Development",
    description: "Expert developers who work inside your sprint loop and technical standards.",
  },
  {
    title: "Defined System Ownership",
    description: "A contained scope for gameplay systems, production support, or performance-critical systems.",
  },
  {
    title: "Rescue and Release Support",
    description: "Focused help for architecture issues, optimization passes, and launch pressure.",
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 bg-surface-3/30 border-b border-white/8">
        <Container>
          <div className="max-w-3xl">
            <span className="text-accent-gold font-bold uppercase tracking-widest text-xs mb-4 block">Case Studies</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">Proof that we can own the hard parts of production</h1>
            <p className="text-xl text-text-muted leading-relaxed">
              These examples show how we approach connected systems, platform delivery,
              and production tooling with expert engineering ownership.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="space-y-12">
            {caseStudies.map((study) => (
              <Card key={study.id} className="p-8 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-10 items-center">
                  <div>
                    <span className="inline-flex px-3 py-1 mb-5 text-xs font-bold uppercase tracking-widest text-accent-gold border border-accent-gold/20 rounded-full bg-accent-gold/8">
                      {study.category}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{study.title}</h2>
                    <p className="text-lg text-text-muted mb-8 leading-relaxed">{study.summary}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-bold text-white mb-2 uppercase text-xs tracking-widest">Scope</h3>
                        <p className="text-sm text-text-muted leading-relaxed">{study.scope}</p>
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-2 uppercase text-xs tracking-widest">Outcome</h3>
                        <p className="text-sm text-text-muted leading-relaxed">{study.outcome}</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/12 blur-[80px] rounded-full -z-10" />
                    <div className="aspect-video bg-surface-2 rounded-lg border border-white/10 flex items-center justify-center">
                      <study.icon className="w-24 h-24 text-accent-gold" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 bg-surface-3/45">
        <Container className="max-w-5xl">
          <div className="max-w-2xl mb-10">
            <span className="text-accent-gold font-bold uppercase tracking-widest text-xs mb-4 block">How we engage</span>
            <h2 className="text-3xl font-bold mb-4 text-white">Flexible ways to use expert support</h2>
            <p className="text-text-muted text-lg">
              The work can be embedded, scoped, or surgical depending on where the risk sits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagementModels.map((model) => (
              <Card key={model.title} className="p-8">
                <h3 className="text-xl font-bold mb-4 text-white">{model.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{model.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="max-w-3xl glass-panel rounded-lg p-10 md:p-12">
            <span className="text-accent-gold font-bold uppercase tracking-widest text-xs mb-4 block">Next step</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">If you need similar support, start with a short brief</h2>
            <p className="text-text-muted text-lg mb-8">
              A concise summary of the game, platform targets, and current risk is enough to start.
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
