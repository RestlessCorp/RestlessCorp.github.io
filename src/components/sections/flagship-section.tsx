import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, Cpu, Zap, Box } from "lucide-react";

export function FlagshipSection() {
  return (
    <section className="py-24 bg-surface-3/50 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 -z-10" />
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Flagship Content */}
          <div>
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest text-accent-gold border border-accent-gold/30 rounded-full bg-accent-gold/5">
              Production Proof: Calamity
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight text-white">
              Flagship Capability: <br />
              <span className="text-gradient-hero">The Calamity Ecosystem</span>
            </h2>
            <p className="text-text-muted text-lg mb-8 leading-relaxed max-w-xl">
              Calamity represents our capacity to handle large-scale, complex game production. 
              From high-fidelity technical art to multi-platform web-connected backend infrastructure, 
              we built everything from the ground up for performance and scalability.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex gap-4">
                <Shield className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">Architecture</h4>
                  <p className="text-xs text-text-muted">Scaled for multiplayer stability.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Cpu className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">Systems</h4>
                  <p className="text-xs text-text-muted">High-performance Unity execution.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Zap className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">Live Ops</h4>
                  <p className="text-xs text-text-muted">Seamless web-connected services.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Box className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">Technical Art</h4>
                  <p className="text-xs text-text-muted">Premium visual atmosphere.</p>
                </div>
              </div>
            </div>

            <Button variant="premium" size="lg" asChild>
              <Link href="/case-studies/calamity">View Detailed Case Study</Link>
            </Button>
          </div>

          {/* Calamity Visual Mockup Area */}
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full group-hover:bg-primary/30 transition-colors -z-10" />
            <div className="aspect-video bg-surface-2 border border-primary-border rounded-lg overflow-hidden shadow-2xl relative">
              <img 
                src="/calamity/key-art.png" 
                alt="Calamity Key Art" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Calamity Online</h4>
                  <p className="text-xs text-text-muted">Expert Unity Production Proof</p>
                </div>
                <div className="flex gap-2">
                   <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Live Production</span>
                </div>
              </div>
            </div>
            
            {/* Secondary Proof Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="aspect-video bg-surface-1 rounded border border-primary-border/30 overflow-hidden relative">
                <img src="/calamity/combat.gif" alt="Combat Systems" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-background/80 px-2 py-1 rounded">Combat Systems</span>
                </div>
              </div>
              <div className="aspect-video bg-surface-1 rounded border border-primary-border/30 overflow-hidden relative">
                <img src="/calamity/economy.gif" alt="Economy Design" className="w-full h-full object-cover opacity-60" />
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
