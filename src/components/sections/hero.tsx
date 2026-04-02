"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-orange/5 blur-[100px] rounded-full -z-10" />

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest text-primary border border-primary/30 rounded-full bg-primary/10">
            Game Development Studio
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-8 text-white leading-[1.05]">
            Engineering <br />
            <span className="text-gradient-hero italic font-serif">Excellence</span> in Games
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-text-muted mb-12 leading-relaxed opacity-90">
            We provide game teams with expert Unity co-development, complex systems 
            architecture, and specialized game design. From Vertical Slices 
            to high-performance Live-Service infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="premium" className="w-full sm:w-auto" asChild>
              <Link href="/contact">Book a Scoping Call</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
              <Link href="/case-studies">View Case Studies</Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
