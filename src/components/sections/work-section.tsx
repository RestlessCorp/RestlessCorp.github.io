import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Trophy, Monitor, Cloud } from "lucide-react";

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

export function WorkSection() {
  return (
    <section id="work" className="py-24 relative">
      <Container>
        <div className="max-w-3xl mb-16">
          <span className="text-accent-gold font-bold uppercase tracking-widest text-xs mb-4 block">Case Studies</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">Proof that we can own the hard parts of production</h2>
          <p className="text-xl text-text-muted leading-relaxed">
            These examples show how we approach connected systems, platform delivery,
            and production tooling with expert engineering ownership.
          </p>
        </div>

        <div className="space-y-12">
          {caseStudies.map((study) => (
            <Card key={study.id} className="p-8 md:p-10 border-white/5 bg-surface-2 hover:bg-surface-2/80 transition-colors">
              <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-10 items-center">
                <div>
                  <span className="inline-flex px-3 py-1 mb-5 text-xs font-bold uppercase tracking-widest text-accent-gold border border-accent-gold/20 rounded-full bg-accent-gold/8">
                    {study.category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">{study.title}</h3>
                  <p className="text-lg text-text-muted mb-8 leading-relaxed">{study.summary}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-widest">Scope</h4>
                      <p className="text-sm text-text-muted leading-relaxed">{study.scope}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-widest">Outcome</h4>
                      <p className="text-sm text-text-muted leading-relaxed">{study.outcome}</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-primary/12 blur-[80px] rounded-full -z-10" />
                  <div className="aspect-video bg-background rounded-lg border border-white/10 flex items-center justify-center">
                    <study.icon className="w-24 h-24 text-accent-gold opacity-80" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
