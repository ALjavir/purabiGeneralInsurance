import AboutHero from "~/components/pages/about/hero";
import Section2 from "~/components/pages/about/section-2";
import ABSection4 from "~/components/pages/about/section-4";
import Section4 from "~/components/pages/home/section-4";
import Section5 from "~/components/pages/home/section-5";


export default function About() {
    return (
        <main>
            <AboutHero />
            <Section2 />
            <Section4/>
            <ABSection4 />
            <Section5/>
        </main>
    );
}