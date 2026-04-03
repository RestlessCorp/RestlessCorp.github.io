/* eslint-disable @next/next/no-img-element */
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { Shield, Cpu, Zap, Box } from "lucide-react";

export function FlagshipSection() {
  return (
    <section className="py-24 bg-surface-3/50 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 -z-10" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest text-accent-gold border border-accent-gold/25 rounded-full bg-accent-gold/8">
              Selected Work
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight text-white">
              Calamity shows the level of <br />
              <span className="text-gradient-hero">system ownership we can take on</span>
            </h2>
            <p className="text-text-muted text-lg mb-8 leading-relaxed max-w-xl">
              We built connected gameplay systems, supporting web services,
              technical art pipelines, and production tooling around one shared
              Unity foundation.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-md bg-surface-2 border border-white/10 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-accent-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Architecture</h4>
                  <p className="text-xs text-text-muted">Designed for online stability and long-lived content.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-md bg-surface-2 border border-white/10 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5 text-accent-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Systems</h4>
                  <p className="text-xs text-text-muted">Performance-focused gameplay and tooling.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-md bg-surface-2 border border-white/10 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-accent-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Live Ops</h4>
                  <p className="text-xs text-text-muted">Web-connected data and operational support.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-md bg-surface-2 border border-white/10 flex items-center justify-center shrink-0">
                  <Box className="w-5 h-5 text-accent-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Technical Art</h4>
                  <p className="text-xs text-text-muted">Visual implementation built for runtime constraints.</p>
                </div>
              </div>
            </div>

            <Link href="/case-studies" className="text-sm font-semibold text-text-muted hover:text-foreground transition-colors">
              View Case Studies
            </Link>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full group-hover:bg-primary/30 transition-colors -z-10" />
            <div className="aspect-video bg-surface-2 border border-white/10 rounded-lg overflow-hidden shadow-2xl relative">
              <img
                src="/calamity/key-art.png"
                alt="Calamity Key Art"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end gap-4">
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Calamity Online</h4>
                  <p className="text-xs text-text-muted">Connected production proof</p>
                </div>
                <div className="flex items-center gap-2 bg-accent-gold text-background px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-background animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Live Production</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="aspect-video bg-surface-1 rounded border border-white/10 overflow-hidden relative">
                <img src="/calamity/combat.png" alt="Combat Systems" className="w-full h-full object-cover opacity-75" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-background/80 px-2 py-1 rounded">Combat Systems</span>
                </div>
              </div>
              <div className="aspect-video bg-surface-1 rounded border border-white/10 overflow-hidden relative">
                <img src="/calamity/economy.png" alt="Economy Design" className="w-full h-full object-cover opacity-75" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-background/80 px-2 py-1 rounded">Economy Design</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
