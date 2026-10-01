// import Bento from "./_components/bento";
// import Endless from "./_components/endless";
// import Features from "./_components/features";
// import Heroine from "./_components/heroine";
// import IgnoreTools from "./_components/ignoretools";
// import Partner from "./_components/partner";
// import Services from "./_components/services";

import Heroes from "./heroes";

const LandingPage = () => {
  return (
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-2 flex-1 w-full">
        <Heroes />
        {/* <Partner />
        <IgnoreTools />
        <Features />
        <Services />
        <Bento />
        <Endless />
        <Heroine /> */}
      </div>
  );
}

export default LandingPage;