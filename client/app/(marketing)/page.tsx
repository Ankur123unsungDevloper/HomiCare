import LandingPage from "./(landingPage)/page";

import Navbar from "./navbar/page";

// import Footer from "./(landing-page)/_components/footer";


const MarketingPage = () => {
  return ( 
    <div className="min-h-full flex flex-col"
    >
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Navbar />
        <LandingPage />
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default MarketingPage;