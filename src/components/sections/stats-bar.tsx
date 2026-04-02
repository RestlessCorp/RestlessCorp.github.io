"use client";

import { Container } from "@/components/ui/container";
import { ShieldCheck, Zap, Globe, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const trustPoints = [
  { icon: ShieldCheck, text: "Expert Execution" },
  { icon: Cpu, text: "Systems Architecture" },
  { icon: Globe, text: "Web3 & Live-Service" },
  { icon: Zap, text: "Performance First" },
];

export function StatsBar() {
  return (
    <section className="py-12 border-y border-primary-border/10 bg-surface-3/10 overflow-hidden">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-10 md:gap-4 items-stretch opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
           {/* Primary Engine */}
           <div className="flex items-center justify-center gap-4 lg:border-r lg:border-white/5 pr-4 group cursor-default">
              <div className="w-10 h-10 relative flex-shrink-0 transition-transform group-hover:scale-110">
                <img 
                  src="/unity_logo.png" 
                  alt="Unity Engine" 
                  className="w-full h-full object-contain brightness-0 invert"
                />
              </div>
              <span className="text-xl font-black tracking-tighter text-white uppercase italic leading-[0.9] transition-colors group-hover:text-primary">
                Unity <br className="hidden sm:block" /> Engine
              </span>
           </div>

           {/* Value Points */}
           {trustPoints.map((point, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -2 }}
              className="flex flex-col md:flex-row items-center justify-center gap-3 px-6 text-center md:text-left border-l border-white/5 first:border-l-0 lg:first:border-l-0"
            >
              <div className="p-2.5 bg-primary/5 rounded-full border border-primary/10 shadow-sm">
                <point.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.15em] text-foreground uppercase leading-tight max-w-[110px]">
                {point.text}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
