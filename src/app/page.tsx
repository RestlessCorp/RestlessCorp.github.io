import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { ExpertiseSection } from "@/components/sections/expertise";
import { FlagshipSection } from "@/components/sections/flagship-section";
import { WorkSection } from "@/components/sections/work-section";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <StatsBar />
      <ExpertiseSection />
      <FlagshipSection />
      <WorkSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
