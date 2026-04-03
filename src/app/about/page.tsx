/* eslint-disable @next/next/no-img-element */
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, Cpu } from "lucide-react";
import Link from "next/link";

const principles = [
  {
    title: "Architecture First",
    description: "We protect maintainability and runtime performance early so production does not drift into avoidable rework.",
    icon: ShieldCheck,
  },
  {
    title: "Expert Delivery",
    description: "We work with experienced developers who can contribute directly, communicate clearly, and own difficult systems.",
    icon: Users,
  },
  {
    title: "Practical Tooling",
    description: "We use modern tooling to speed up repetitive work without losing the judgment needed for game-specific systems.",
    icon: Cpu,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 bg-surface-3/30 border-b border-white/8">
        <Container>
          <div className="max-w-3xl">
            <span className="text-accent-gold font-bold uppercase tracking-widest text-xs mb-4 block">About</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">An expert game development partner built around execution</h1>
            <p className="text-xl text-text-muted leading-relaxed">
              Something Is Cooking is a technical game development studio focused on co-development,
              connected systems, and the engineering work that tends to decide schedule risk.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-video glass-panel rounded-lg overflow-hidden group">
              <img
                src="/calamity/key-art.png"
                alt="Calamity key art"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
              <div className="absolute left-6 bottom-6">
                <span className="inline-flex px-3 py-1 mb-3 text-xs font-bold uppercase tracking-widest text-accent-gold border border-accent-gold/20 rounded-full bg-accent-gold/8">
                  Flagship proof
                </span>
                <h2 className="text-white text-2xl font-bold">Calamity</h2>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">We use our own production work as the proof point</h2>
              <p className="text-text-muted mb-8 leading-relaxed">
                Before supporting other teams, we built Calamity as a connected production with gameplay systems,
                technical art, and live-service infrastructure that had to work together under real constraints.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 p-4 border border-white/8 rounded-md bg-surface-1/30">
                  <ShieldCheck className="w-5 h-5 text-accent-gold shrink-0" />
                  <p className="text-sm text-text-muted">We stay close to architecture, performance budgets, and delivery risk.</p>
                </div>
                <div className="flex gap-4 p-4 border border-white/8 rounded-md bg-surface-1/30">
                  <Users className="w-5 h-5 text-accent-gold shrink-0" />
                  <p className="text-sm text-text-muted">We work best with studios that need expert contributors rather than generic capacity.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 bg-surface-2/20 border-y border-white/8">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {principles.map((principle) => (
              <div key={principle.title}>
                <div className="w-12 h-12 rounded-md bg-surface-2 border border-white/10 flex items-center justify-center mb-6">
                  <principle.icon className="w-6 h-6 text-accent-gold" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white italic">{principle.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="max-w-4xl">
          <div className="glass-panel rounded-lg p-10 md:p-12">
            <span className="text-accent-gold font-bold uppercase tracking-widest text-xs mb-4 block">Work with us</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Start with the technical problem, not the sales call</h2>
            <p className="text-text-muted text-lg mb-8">
              A short project brief is enough for us to understand the current build, platform targets, and where expert support is useful.
            </p>
            <Button size="lg" variant="premium" asChild>
              <Link href="/contact">Send Project Brief</Link>
            </Button>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
