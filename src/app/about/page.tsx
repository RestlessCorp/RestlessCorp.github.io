import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, Rocket, Zap, Users, Trophy, Cpu, 
  History, Target, Lightbulb 
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* About Hero */}
      <section className="pt-32 pb-20 bg-surface-3/30 border-b border-primary-border/20">
        <Container>
          <div className="max-w-3xl">
             <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Our Story</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">Something Is Cooking <br /><span className="text-primary italic">Studio</span></h1>
            <p className="text-xl text-text-muted leading-relaxed">
              We are a senior-led Unity development studio dedicated to 
              professional co-production and technical excellence. 
              Creators of **Calamity**, and partners to high-growth game teams.
            </p>
          </div>
        </Container>
      </section>

      {/* Flagship Proof (Calamity) */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-video glass-panel rounded-lg flex items-center justify-center p-12 overflow-hidden group">
               <div className="absolute inset-0 bg-primary/10 transition-transform duration-500 scale-100 group-hover:scale-110" />
               <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center border border-primary-border shadow-glow mb-4">
                    <span className="text-white font-bold text-2xl">C</span>
                  </div>
                  <span className="text-white font-bold tracking-widest uppercase text-xl">CALAMITY</span>
                  <span className="text-xs text-text-muted mt-2">Flagship In-House Release</span>
               </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">Proven Execution</h2>
              <p className="text-text-muted mb-8 leading-relaxed">
                Before offering our services to others, we built our flagship property: **Calamity**. 
                It stands as our proof of capability in high-fidelity technical art, 
                complex multiplayer systems, and cross-platform web-connected 
                infrastructure. We know the challenges of production because we've 
                navigated them from start to finish.
              </p>
              <div className="space-y-4">
                 <div className="flex gap-4 p-4 border border-primary-border/20 rounded-md bg-surface-1/30">
                    <History className="w-5 h-5 text-primary shrink-0" />
                    <p className="text-sm text-text-muted">Established by senior developers who wanted a cleaner, more efficient studio model.</p>
                 </div>
                 <div className="flex gap-4 p-4 border border-primary-border/20 rounded-md bg-surface-1/30">
                    <Target className="w-5 h-5 text-primary shrink-0" />
                    <p className="text-sm text-text-muted">Focused exclusively on senior Unity co-production and technical rescue.</p>
                 </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Studio Philosophy */}
      <section className="py-24 bg-surface-2/20 border-y border-primary-border/10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
               <h3 className="text-2xl font-bold mb-6 text-white italic">Architecture First</h3>
               <p className="text-text-muted text-sm leading-relaxed mb-6">
                We believe that maintainability and performance are the foundation of any 
                successful game. Our developers prioritize clean, sustainable 
                architectural patterns from the start.
               </p>
            </div>
            <div>
               <h3 className="text-2xl font-bold mb-6 text-white italic">Expert Execution</h3>
               <p className="text-text-muted text-sm leading-relaxed mb-6">
                We don't 'staff up' with juniors. Every developer integrated into your 
                project is a veteran professional with years of production experience 
                and a deep understanding of Unity.
               </p>
            </div>
            <div>
               <h3 className="text-2xl font-bold mb-6 text-white italic">AI-Assisted Workflows</h3>
               <p className="text-text-muted text-sm leading-relaxed mb-6">
                We leverage modern toolsets to accelerate boilerplate, audit code, 
                and ensure faster delivery cycles—without sacrificing the nuanced 
                craft needed for high-quality game systems.
               </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-24">
        <Container className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 italic">Interested in Working with Us?</h2>
          <p className="text-lg text-text-muted mb-12">
            Let's discuss how our senior-led studio can support your production 
            goals, from technical reinforcement to full-cycle development.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" variant="premium" asChild>
              <Link href="/contact">Start a Project Discussion</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/case-studies">Browse Case Studies</Link>
            </Button>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
