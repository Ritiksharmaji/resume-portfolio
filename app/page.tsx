import { Nav, RecruiterMode } from "@/components/client";
import { Hero, Marquee, About, Stack, Work, Architecture, Lab, Experience, Education, Achievements, Contact, Footer } from "@/components/sections";

export default function Home() {
  return (
    <div style={{ overflowX: "clip", position: "relative" }}>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Stack />
        <Work />
        <Architecture />
        <Lab />
        <Experience />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <RecruiterMode />
    </div>
  );
}
