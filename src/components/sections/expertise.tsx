import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Network, MonitorSmartphone, Code2, Brush } from "lucide-react";

const expertise = [
  {
    title: "Multiplayer Architecture",
    description: "Deep experience with connected systems. We can design, implement, and maintain robust multiplayer utilizing modern networking stacks.",
    icon: Network,
  },
  {
    title: "Multiplatform Porting",
    description: "Optimized delivery for PC, handheld, mobile, and console. We ensure performance metrics are hit across the ecosystem without fire drills.",
    icon: MonitorSmartphone,
  },
  {
    title: "Technical Art & Shaders",
    description: "Bridging the gap between code and vision. Expertise in URP, HDRP, custom shader development, and rendering optimization.",
    icon: Code2,
  },
  {
    title: "2D Art & UI",
    description: "Production-ready visual support tailored for Unity pipelines. Versatile assets aligned with technical and gameplay constraints.",
    icon: Brush,
  },
];

export function ExpertiseSection() {
  return (
    <section id="expertise" className="py-24 relative overflow-hidden bg-surface-3/30 border-y border-white/5">
      <Container>
        <div className="max-w-2xl mb-16">
          <span className="text-accent-gold font-bold uppercase tracking-widest text-xs mb-4 block">Our Expertise</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Focused capabilities <br />
            <span className="text-gradient-hero italic font-serif">for production risk</span>
          </h2>
          <p className="text-text-muted text-lg">
            We focus on technical excellence and clear communication. Our team deeply specializes in areas that often block production or degrade quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertise.map((item, i) => (
            <Card key={i} className="group relative overflow-hidden h-full flex flex-col p-6 hover:bg-surface-2 transition-all duration-300 border-white/5">
              <CardHeader className="p-0">
                <div className="p-3 mb-6 rounded-md bg-surface-1 border border-white/10 w-fit group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6 text-accent-gold" />
                </div>
                <CardTitle className="text-xl mb-4 leading-tight font-bold">{item.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed text-text-muted">{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
