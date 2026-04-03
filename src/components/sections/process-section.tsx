import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, PenTool, LayoutTemplate, Zap, ClipboardIcon, Send } from "lucide-react";

const steps = [
  {
    title: "Discovery",
    description: "Deep dive into your project needs, mechanics, and technical constraints.",
    icon: Search,
  },
  {
    title: "Assessment",
    description: "Detailed technical analysis and feasibility assessment for your scope.",
    icon: PenTool,
  },
  {
    title: "Milestone Planning",
    description: "Clear roadmap with actionable production milestones and reporting.",
    icon: LayoutTemplate,
  },
  {
    title: "Execution & Flow",
    description: "Continuous delivery with expert-level code quality and clear communication.",
    icon: Zap,
  },
  {
    title: "Reporting & Review",
    description: "Full visibility through regular sprints, demos, and architectural audits.",
    icon: ClipboardIcon,
  },
  {
    title: "Delivery & Handoff",
    description: "Clean deployment and production-ready assets for your launch.",
    icon: Send,
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 border-t border-primary-border/20 bg-surface-2/20">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Our <span className="text-primary italic">Production Workflow</span></h2>
          <p className="max-w-2xl mx-auto text-text-muted text-lg">
            We operate with the discipline of an expert engineering shop, ensuring 
            reassurance and results at every phase of the project lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
           {/* Timeline Line (desktop only) */}
           <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/20 -z-10 hidden md:block" />
          
          {steps.map((step, i) => (
            <Card key={i} className="relative z-10 hover:border-primary transition-all">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white shrink-0">
                    {i + 1}
                  </div>
                  <div className="p-2 rounded-md bg-primary/10 border border-primary/20">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
