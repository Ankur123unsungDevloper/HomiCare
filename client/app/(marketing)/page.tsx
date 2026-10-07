import LandingPage from "./(landingPage)/page";

import Footer from "./footer/page";

import Navbar from "./navbar/page";

const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col"
    >
      <div className="flex flex-col items-center justify-center md:justify-start text-center flex-1">
        <Navbar />
        <LandingPage />
        <Footer />
      </div>
    </div>

  );
}

export default MarketingPage;