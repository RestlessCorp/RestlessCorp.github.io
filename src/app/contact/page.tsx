"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Mail, Globe, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mailHref, setMailHref] = useState("mailto:hello@somethingiscooking.com");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const studio = String(formData.get("studio") || "").trim();
    const projectType = String(formData.get("project-type") || "").trim();
    const budget = String(formData.get("budget") || "").trim();
    const description = String(formData.get("description") || "").trim();

    const subject = `Project brief${name ? ` from ${name}` : ""}`;
    const bodyLines = [
      `Name: ${name || "Not provided"}`,
      `Email: ${email || "Not provided"}`,
      `Studio: ${studio || "Not provided"}`,
      `Project Type: ${projectType || "Not provided"}`,
      `Estimated Budget: ${budget || "Not provided"}`,
      "",
      "Project Brief:",
      description || "Not provided",
    ];

    const nextHref = `mailto:hello@somethingiscooking.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      bodyLines.join("\n")
    )}`;

    setMailHref(nextHref);
    setIsSubmitted(true);
    window.location.href = nextHref;
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 bg-surface-3/30 border-b border-white/8">
        <Container>
          <div className="max-w-3xl">
            <span className="text-accent-gold font-bold uppercase tracking-widest text-xs mb-4 block">Contact</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">Share the brief. We will start from the technical problem.</h1>
            <p className="text-xl text-text-muted leading-relaxed">
              Use the form below to outline the game, platform targets, and the systems that need expert support.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 space-y-8">
              <div className="glass-panel p-8 rounded-lg">
                <h2 className="text-sm font-bold mb-6 uppercase tracking-widest text-accent-gold">What to include</h2>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <Mail className="w-5 h-5 text-accent-gold shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">Project summary</h3>
                      <p className="text-xs text-text-muted">Current build stage, project type, and the main production risk.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <ShieldCheck className="w-5 h-5 text-accent-gold shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">Systems in scope</h3>
                      <p className="text-xs text-text-muted">Multiplayer, live-service flows, architecture, performance, tools, or release work.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Globe className="w-5 h-5 text-accent-gold shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">Contact path</h3>
                      <p className="text-xs text-text-muted">Submitting opens your email client with the brief prefilled. Email is the current handoff path.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-lg bg-surface-1/40">
                <h2 className="text-sm font-bold mb-4 uppercase tracking-widest text-accent-gold">Direct contact</h2>
                <p className="text-sm text-text-muted leading-relaxed mb-4">
                  If you prefer, skip the form and write directly to hello@somethingiscooking.com.
                </p>
                <a href="mailto:hello@somethingiscooking.com" className="text-sm font-semibold text-foreground hover:text-accent-gold transition-colors">
                  hello@somethingiscooking.com
                </a>
              </div>
            </div>

            <div className="lg:col-span-2">
              {isSubmitted ? (
                <div className="glass-panel p-12 rounded-lg bg-surface-1/40">
                  <div className="w-16 h-16 bg-accent-gold rounded-full flex items-center justify-center mb-6 text-background text-2xl font-bold shadow-glow">
                    OK
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-white">Project brief drafted</h2>
                  <p className="text-text-muted mb-8 text-lg">
                    Your email client should open with the brief prefilled. If it did not, use the button below to open the draft again.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="premium" asChild>
                      <a href={mailHref}>Open Email Draft Again</a>
                    </Button>
                    <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                      Edit Brief
                    </Button>
                  </div>
                </div>
              ) : (
                <form className="glass-panel p-8 md:p-12 rounded-lg space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-accent-gold">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full bg-background border border-white/10 rounded-md p-4 text-foreground focus:border-accent-gold focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-accent-gold">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full bg-background border border-white/10 rounded-md p-4 text-foreground focus:border-accent-gold focus:outline-none transition-colors"
                        placeholder="john@studio.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="studio" className="text-xs font-bold uppercase tracking-widest text-accent-gold">Studio</label>
                      <input
                        id="studio"
                        name="studio"
                        type="text"
                        className="w-full bg-background border border-white/10 rounded-md p-4 text-foreground focus:border-accent-gold focus:outline-none transition-colors"
                        placeholder="Studio or team name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="project-type" className="text-xs font-bold uppercase tracking-widest text-accent-gold">Project Type</label>
                      <select
                        id="project-type"
                        name="project-type"
                        className="w-full bg-background border border-white/10 rounded-md p-4 text-foreground appearance-none focus:border-accent-gold focus:outline-none transition-colors"
                      >
                        <option>Unity Co-Development</option>
                        <option>Live-Service Systems</option>
                        <option>Multiplayer Implementation</option>
                        <option>Technical Architecture</option>
                        <option>Porting & Release Readiness</option>
                        <option>Technical Rescue</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="budget" className="text-xs font-bold uppercase tracking-widest text-accent-gold">Estimated Budget</label>
                    <select
                      id="budget"
                      name="budget"
                      className="w-full bg-background border border-white/10 rounded-md p-4 text-foreground appearance-none focus:border-accent-gold focus:outline-none transition-colors"
                    >
                      <option>Under $50k</option>
                      <option>$50k - $150k</option>
                      <option>$150k - $500k</option>
                      <option>$500k+</option>
                      <option>Not yet defined</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-accent-gold">Project Brief</label>
                    <textarea
                      id="description"
                      name="description"
                      rows={7}
                      required
                      className="w-full bg-background border border-white/10 rounded-md p-4 text-foreground focus:border-accent-gold focus:outline-none transition-colors"
                      placeholder="Describe the game, target platforms, current build stage, and the systems that need help."
                    />
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <Button type="submit" variant="premium" size="lg" className="w-full md:w-auto min-w-[220px]">
                      Send Project Brief
                    </Button>
                    <p className="text-xs text-text-muted uppercase tracking-widest">
                      Submitting opens your email client with the brief prefilled.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
