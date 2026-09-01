import HealthInsuranceHero from "~/components/pages/healthInsurance/hero";
import DynamicInsuranceForm from "~/components/pages/healthInsurance/section-2";
import Section3 from "~/components/pages/healthInsurance/section-3";

export default function HealthInsurance() {
  return (
    <main>
      <HealthInsuranceHero />
      <DynamicInsuranceForm/>
      <Section3/>
    </main>
  );
}