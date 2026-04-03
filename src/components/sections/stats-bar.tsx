/* eslint-disable @next/next/no-img-element */
"use client";

import { Container } from "@/components/ui/container";
import { ShieldCheck, Zap, Globe, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const trustPoints = [
  { icon: ShieldCheck, text: "Expert Co-Dev" },
  { icon: Cpu, text: "Systems Design" },
  { icon: Globe, text: "Live-Service" },
  { icon: Zap, text: "Performance Review" },
];

export function StatsBar() {
  return (
    <section className="py-12 border-y border-white/8 bg-surface-3/10 overflow-hidden">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-10 md:gap-4 items-stretch">
           <div className="flex items-center justify-center gap-4 lg:border-r lg:border-white/5 pr-4 group cursor-default">
              <div className="w-10 h-10 relative flex-shrink-0 transition-transform group-hover:scale-110">
                <img
                  src="/unity_logo.png"
                  alt="Unity Engine"
                  className="w-full h-full object-contain brightness-0 invert opacity-90"
                />
              </div>
              <span className="text-xl font-black tracking-tighter text-white uppercase italic leading-[0.9] transition-colors group-hover:text-accent-gold">
                Unity <br className="hidden sm:block" /> Engine
              </span>
           </div>

           {trustPoints.map((point, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -2 }}
              className="flex flex-col md:flex-row items-center justify-center gap-3 px-6 text-center md:text-left border-l border-white/5 first:border-l-0 lg:first:border-l-0"
            >
              <div className="p-2.5 bg-surface-1/80 rounded-full border border-white/10 shadow-sm">
                <point.icon className="w-4 h-4 text-accent-gold" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.15em] text-foreground/85 uppercase leading-tight max-w-[110px]">
                {point.text}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
