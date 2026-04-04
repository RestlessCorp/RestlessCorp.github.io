"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] md:w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-orange/5 blur-[100px] rounded-full -z-10" />

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest text-accent-gold border border-accent-gold/25 rounded-full bg-accent-gold/8">
            Unity Production Partner
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-6 md:mb-8 text-white leading-[1.1] md:leading-[1.05]">
            Expert Unity <br className="hidden sm:inline" />
            <span className="text-gradient-hero italic font-serif">game development</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-text-muted mb-12 leading-relaxed opacity-90">
            We can take full ownership of production from scratch or seamlessly strengthen your existing team. A compact, senior squad focused on multiplayer architecture, multiplatform delivery, and technical excellence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="premium" className="w-full sm:w-auto" asChild>
              <Link href="/contact">Send Project Brief</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
              <Link href="/#work">View Work</Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
