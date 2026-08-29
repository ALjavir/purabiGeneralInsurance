
import HomeHeroSection from "~/components/pages/home/heroSection";
import Section3 from "~/components/pages/home/section-3";
import Section4 from "~/components/pages/home/section-4";
import Section5 from "~/components/pages/home/section-5";

export default function Home() {
  return (
    <main>
      <HomeHeroSection />
  
      <Section3 />
      <Section4 />
      <Section5/>
    </main>
  );
}
