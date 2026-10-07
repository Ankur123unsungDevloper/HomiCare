import CTA from "./_components/cta";
import Heroes from "./_components/heroes";
import HowItWorks from "./_components/howItWorks";
import Plans from "./_components/plans";
import Services from "./_components/services";
import Testimonials from "./_components/testimonials";
import Trust from "./_components/trust";
import Verification from "./_components/verification";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-2 flex-1 w-full">
      <Heroes />
      <Trust />
      <Services />
      <Verification />
      <Plans />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </div>
  );
}

export default LandingPage;