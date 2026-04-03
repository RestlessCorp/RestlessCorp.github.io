import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Search, PenTool, LayoutTemplate, Zap, ClipboardIcon, Send, CheckCircle, Shield, MessageSquare } from "lucide-react";

const detailedSteps = [
  {
    title: "Discovery",
    subtitle: "Clarify the product, technical risk, and scope pressure.",
    description: "We start with the current build, platform targets, team structure, and the systems that are blocking progress.",
    icon: Search,
  },
  {
    title: "Assessment",
    subtitle: "Understand codebase shape and delivery constraints.",
    description: "We review architecture, ownership boundaries, and feasibility so the work can be scoped without hidden assumptions.",
    icon: PenTool,
  },
  {
    title: "Scope & Plan",
    subtitle: "Define the smallest responsible path forward.",
    description: "We align on milestones, communication rhythm, and which systems we are responsible for delivering.",
    icon: LayoutTemplate,
  },
  {
    title: "Execution",
    subtitle: "Build inside the production loop you already use.",
    description: "We work inside your sprint cadence and engineering standards, with attention to performance and maintainability.",
    icon: Zap,
  },
  {
    title: "Review",
    subtitle: "Keep progress visible and technical debt explicit.",
    description: "Regular demos, reviews, and architecture checks keep the work understandable to your internal team.",
    icon: ClipboardIcon,
  },
  {
    title: "Handoff or Continuation",
    subtitle: "Close cleanly or keep supporting the roadmap.",
    description: "We can exit with a clean transfer of knowledge or stay embedded for the next phase of delivery.",
    icon: Send,
  },
];

const values = [
  {
    title: "Accountability",
    description: "Direct communication with senior contributors and clear ownership of the systems in scope.",
    icon: Shield,
  },
  {
    title: "Precision",
    description: "Performance, maintainability, and production fit are treated as constraints from the beginning.",
    icon: CheckCircle,
  },
  {
    title: "Communication",
    description: "We keep the work legible with scoped updates, review notes, and concrete next steps.",
    icon: MessageSquare,
  },
];

export default function ProcessPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 bg-surface-3/30 border-b border-white/8">
        <Container>
          <div className="max-w-3xl">
            <span className="text-accent-gold font-bold uppercase tracking-widest text-xs mb-4 block">Process</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">A working model designed for engineering clarity</h1>
            <p className="text-xl text-text-muted leading-relaxed">
              The process is simple on purpose: understand the build, scope the risk, deliver inside the existing workflow, and keep ownership visible.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="space-y-12 max-w-5xl mx-auto">
            {detailedSteps.map((step, i) => (
              <div
                key={step.title}
                className="flex flex-col md:flex-row gap-8 items-start relative pb-12 border-b border-white/8 last:border-0 hover:bg-surface-1/10 transition-colors p-6 rounded-lg group"
              >
                <div className="w-16 h-16 rounded-lg bg-surface-2 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-surface-1 transition-colors">
                  <step.icon className="w-8 h-8 text-accent-gold" />
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-background px-3 py-1 bg-accent-gold rounded-full">
                      Step 0{i + 1}
                    </span>
                    <h2 className="text-2xl font-bold text-white">{step.title}</h2>
                  </div>
                  <p className="text-accent-gold text-xs font-bold uppercase tracking-widest mb-4 opacity-90">{step.subtitle}</p>
                  <p className="text-text-muted leading-relaxed text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 bg-surface-2/40 border-y border-white/8">
        <Container className="text-center">
          <h2 className="text-3xl font-bold mb-12 text-white">Working principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="p-8 glass-panel rounded-lg">
                <div className="w-12 h-12 rounded-md bg-surface-2 border border-white/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-6 h-6 text-accent-gold" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{value.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
