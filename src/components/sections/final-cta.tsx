import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Calendar, Phone } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-primary/10 rounded-full -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full -z-10" />

      <Container>
        <div className="max-w-4xl mx-auto glass-panel p-10 md:p-20 rounded-lg text-center relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center border-4 border-background shadow-glow">
            <span className="text-white text-3xl font-bold">!</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white uppercase italic tracking-tighter">Ready to Scale?</h2>
          <p className="text-text-muted text-lg md:text-xl mb-12 max-w-xl mx-auto opacity-80">
            Let's discuss your technical roadmap, monetization strategy, 
            or engine-specific bottlenecks.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" variant="premium" className="w-full sm:w-auto min-w-[240px] h-16 text-lg" asChild>
              <Link href="/contact" className="flex items-center gap-3">
                <Calendar className="w-5 h-5" />
                Book a Scoping Call
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto min-w-[240px] h-16 text-lg" asChild>
              <Link href="mailto:hello@somethingiscooking.com" className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                Email the Team
              </Link>
            </Button>
          </div>
          
          <p className="mt-12 text-sm text-text-muted/60 uppercase tracking-widest flex items-center justify-center gap-2">
            Professional Response within 24 hours.
          </p>
        </div>
      </Container>
    </section>
  );
}
