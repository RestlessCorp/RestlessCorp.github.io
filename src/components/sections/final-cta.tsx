import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-primary/10 rounded-full -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full -z-10" />

      <Container>
        <div className="max-w-4xl mx-auto glass-panel p-10 md:p-20 rounded-lg text-center relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-5 py-2 bg-accent-gold text-background rounded-full border-4 border-background shadow-glow">
            <span className="text-xs font-bold uppercase tracking-widest">Next step</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">Need expert game development support?</h2>
          <p className="text-text-muted text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-85">
            Send a short brief and we will review scope, technical risk,
            and where we can help first.
          </p>

          <div className="flex flex-col items-center justify-center gap-6">
            <Button size="lg" variant="premium" className="w-full sm:w-auto min-w-[240px] h-16 text-lg" asChild>
              <Link href="/contact">Send Project Brief</Link>
            </Button>
            <p className="text-sm text-text-muted">
              Prefer email?{" "}
              <Link href="mailto:hello@somethingiscooking.com" className="text-foreground hover:text-accent-gold transition-colors">
                hello@somethingiscooking.com
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
