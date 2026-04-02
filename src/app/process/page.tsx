import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Search, PenTool, LayoutTemplate, Zap, ClipboardIcon, Send, 
  Settings, MessageSquare, CheckCircle, Shield 
} from "lucide-react";
import Link from "next/link";

const detailedSteps = [
  {
    title: "Discovery & Alignment",
    subtitle: "Understanding your technical vision and scope constraints.",
    description: "Deep dive into your project's current state, mechanics, and technical architecture. We align on goals, team communication, and reporting frequency.",
    icon: Search,
  },
  {
    title: "Technical Assessment",
    subtitle: "Audit and feasibility check for your platform and features.",
    description: "Our lead experts audit existing codebases (if any) and assess technical feasibility for chosen platforms like Steam Deck, Consoles, or Web3 environments.",
    icon: PenTool,
  },
  {
    title: "Scope & Roadmap",
    subtitle: "Clear, actionable production milestones and resource allocation.",
    description: "We define a clear roadmap with actionable milestones, production schedules, and sprint definitions to ensure reassurance at every phase.",
    icon: LayoutTemplate,
  },
  {
    title: "Continuous Execution",
    subtitle: "Expert Unity development and high-quality feature delivery.",
    description: "Our developers integrate into your environment, delivering code that matches your style guides and meets performance budgets for target hardware.",
    icon: Zap,
  },
  {
    title: "Review & Quality",
    subtitle: "Regular sprints, demos, and architectural audits.",
    description: "Full visibility through regular demos, code reviews, and performance profiling. We maintain transparency on progress and technical debt.",
    icon: ClipboardIcon,
  },
  {
    title: "Delivery & Support",
    subtitle: "Clean handoff or ongoing production partnership.",
    description: "Clean deployment and production-ready assets for your launch. We provide ongoing support or smooth handoff back to your core team.",
    icon: Send,
  },
];

export default function ProcessPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-surface-3/30 border-b border-primary-border/20">
        <Container>
          <div className="max-w-3xl">
             <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">How We Work</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">Expert Production <br /><span className="text-primary">Workflow</span></h1>
            <p className="text-xl text-text-muted leading-relaxed">
              We operate with the discipline of an elite engineering shop. No fluff, 
              no amateur shortcuts. Just expert execution and professional reporting.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="space-y-12 max-w-5xl mx-auto">
            {detailedSteps.map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8 items-start relative pb-12 border-b border-primary-border/10 last:border-0 hover:bg-surface-1/10 transition-colors p-6 rounded-lg group">
                <div className="w-16 h-16 rounded-lg bg-surface-2 border border-primary-border/30 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                   <div className="flex items-center gap-4 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2 py-1 bg-primary/10 rounded-xs">Step 0{i+1}</span>
                    <h2 className="text-2xl font-bold text-white">{step.title}</h2>
                  </div>
                  <p className="text-accent-gold text-xs font-bold uppercase tracking-widest mb-4 opacity-80">{step.subtitle}</p>
                  <p className="text-text-muted leading-relaxed text-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 bg-surface-2/40 border-y border-primary-border/10">
        <Container className="text-center">
           <h2 className="text-3xl font-bold mb-12">Core Production Values</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 glass-panel rounded-lg">
                <Shield className="w-10 h-10 text-primary mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">Accountability</h4>
                <p className="text-sm text-text-muted">Direct communication with lead experts. No gatekeeping. No vague reporting.</p>
              </div>
              <div className="p-8 glass-panel rounded-lg">
                <CheckCircle className="w-10 h-10 text-primary mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">Precision</h4>
                <p className="text-sm text-text-muted">Every line of code and every shader implementation is performance-vetted.</p>
              </div>
              <div className="p-8 glass-panel rounded-lg">
                <MessageSquare className="w-10 h-10 text-primary mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">Expert Mastery</h4>
                <p className="text-sm text-text-muted">We hire experts. Every developer on your project is a battle-tested professional.</p>
              </div>
           </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
