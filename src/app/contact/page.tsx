"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Mail, Calendar, Phone, MessageSquare, Briefcase, Globe, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Contact Hero */}
      <section className="pt-32 pb-20 bg-surface-3/30 border-b border-primary-border/20">
        <Container>
          <div className="max-w-3xl">
             <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Let's Connect</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">Start a Project <br /><span className="text-primary italic">Discussion</span></h1>
            <p className="text-xl text-text-muted leading-relaxed">
              Ready to explore Unity co-development, full-cycle production, or technical 
              systems for your game? Book a call or submit an inquiry to discuss your 
              needs with our senior technical leads.
            </p>
          </div>
        </Container>
      </section>

      {/* Form & Info Section */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="glass-panel p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-6 text-white uppercase text-xs tracking-widest italic border-b border-primary-border/10 pb-4">Contact Details</h3>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <Mail className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Email Our Lead Producer</h4>
                      <p className="text-xs text-text-muted">hello@somethingiscooking.com</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Calendar className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Book a Discovery Call</h4>
                      <p className="text-xs text-text-muted">Available via Calendly link upon request.</p>
                    </div>
                  </div>
                   <div className="flex gap-4 items-start">
                    <Globe className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Studio Information</h4>
                      <p className="text-xs text-text-muted">Fully remote team with senior-leads in EU and NA timezones.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-panel p-8 rounded-lg bg-primary/5 border-primary/20">
                <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-primary italic">What to Expect</h3>
                <p className="text-xs text-text-muted leading-relaxed mb-4">
                  Upon receiving your inquiry, we will review your requirements and 
                  reach out within 24 hours to schedule a discovery call with one of 
                  our senior technical leads.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent-gold">
                   <div className="w-1 h-1 bg-accent-gold rounded-full" />
                   Confidential Scoping Available
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-2">
              {isSubmitted ? (
                <div className="glass-panel p-12 rounded-lg text-center bg-primary/10 border-primary/30">
                   <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-glow">✓</div>
                   <h2 className="text-3xl font-bold mb-4">Inquiry Received</h2>
                   <p className="text-text-muted mb-8 text-lg">Thank you for reaching out. We will get back to you within 24 hours.</p>
                   <Button variant="outline" onClick={() => setIsSubmitted(false)}>Submit Another Inquiry</Button>
                </div>
              ) : (
                <form className="glass-panel p-8 md:p-12 rounded-lg space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-primary">Full Name</label>
                      <input 
                        id="name"
                        type="text" 
                        required
                        className="w-full bg-background border border-primary-border/20 rounded-md p-4 text-foreground focus:border-primary focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-primary">Email Address</label>
                      <input 
                        id="email"
                        type="email" 
                        required
                        className="w-full bg-background border border-primary-border/20 rounded-md p-4 text-foreground focus:border-primary focus:outline-none transition-colors"
                        placeholder="john@studio.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="project-type" className="text-xs font-bold uppercase tracking-widest text-primary">Project Type</label>
                      <select 
                        id="project-type"
                        className="w-full bg-background border border-primary-border/20 rounded-md p-4 text-foreground appearance-none focus:border-primary focus:outline-none transition-colors"
                      >
                        <option>Unity Co-Development</option>
                        <option>Full-Cycle Game Production</option>
                        <option>Multiplayer Systems Implementation</option>
                        <option>Technical Art / UI Support</option>
                        <option>Porting & Optimization</option>
                        <option>Web-Connected Systems</option>
                        <option>Technical Rescue / Strike Team</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="budget" className="text-xs font-bold uppercase tracking-widest text-primary">Estimated Budget</label>
                      <select 
                         id="budget"
                        className="w-full bg-background border border-primary-border/20 rounded-md p-4 text-foreground appearance-none focus:border-primary focus:outline-none transition-colors"
                      >
                        <option>$50k - $150k</option>
                        <option>$150k - $500k</option>
                        <option>$500k+</option>
                        <option>To be scoped / Not yet defined</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-primary">Project Description</label>
                    <textarea 
                      id="description"
                      rows={6}
                      required
                      className="w-full bg-background border border-primary-border/20 rounded-md p-4 text-foreground focus:border-primary focus:outline-none transition-colors"
                      placeholder="Tell us about your project or technical challenge..."
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <Button type="submit" variant="premium" size="lg" className="w-full md:w-auto min-w-[200px]">Send Project Inquiry</Button>
                     <p className="hidden md:block text-[10px] text-text-muted/60 uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck className="w-3 h-3" />
                       Lead Production Experts respond in 24 hours.
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
