
import HomeHeroSection from "~/components/pages/home/heroSection";
import Section2 from "~/components/pages/home/section-2";
import Section3 from "~/components/pages/home/section-3";
import Section4 from "~/components/pages/home/section-4";


import Section5 from "~/components/pages/home/section-5";
import Section6 from "~/components/pages/home/section-6";
import Section7 from "~/components/pages/home/section-7";
import Section8 from "~/components/pages/home/section-8";

export default function Home() {
  return (
    <main>
      <HomeHeroSection />
      <Section2 />

      <Section3 />
      <Section4/>
      <Section5 />
      <Section6 />
      <Section7 />
      <Section8/>
    </main>
  );
}
