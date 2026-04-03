import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Brush, Users, MonitorSmartphone, ClipboardCheck } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Unity Co-Development",
    description: "Unity developers who plug into your sprint, architecture, and review flow.",
    icon: Users,
    href: "/services#unity-co-dev",
  },
  {
    title: "QA & Production Support",
    description: "QA coverage, bug triage, and PM coordination that keep production moving.",
    icon: ClipboardCheck,
    href: "/services#qa-pm",
  },
  {
    title: "2D Art Support",
    description: "Versatile 2D art for gameplay assets, UI, and production-ready visual support.",
    icon: Brush,
    href: "/services#art-support",
  },
  {
    title: "Porting & Release",
    description: "Multiplatform support for PC, mobile, handheld, and console releases.",
    icon: MonitorSmartphone,
    href: "/services#porting",
  },
];

export function ServicesOverview() {
  return (
    <section className="py-24 relative overflow-hidden">
      <Container>
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            High-leverage support <br />
            <span className="text-accent-gold italic">for production risk</span>
          </h2>
          <p className="text-text-muted text-lg">
            We focus on practical production support: Unity development,
            QA + PM coverage, versatile 2D art, and multiplatform release work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <Card key={i} className="group relative overflow-hidden h-full flex flex-col">
              <CardHeader>
                <div className="p-3 mb-4 rounded-md bg-surface-2 border border-white/10 w-fit group-hover:bg-surface-1 transition-colors">
                  <service.icon className="w-6 h-6 text-accent-gold" />
                </div>
                <CardTitle className="text-xl mb-4 leading-tight">{service.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mb-6">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Link
                  href={service.href}
                  className="text-xs font-bold uppercase tracking-widest text-foreground/80 hover:text-accent-gold transition-colors"
                >
                  View Details
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/services" className="text-sm font-semibold text-text-muted hover:text-foreground transition-colors">
            See the full service lineup
          </Link>
        </div>
      </Container>
    </section>
  );
}
