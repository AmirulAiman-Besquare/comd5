import React from "react";
import Assets from "../Assetpage/Assets";
import HeroSection from "../HeroSection/HeroSection";
import FirstFeature from "../CardFeature/CardRealTime";
import SecondFeature from "../CardFeature/CardWallet";
import FinalSection from "../FinalSection/FinalSection";
import CreativeTeam from "../CardCreativeTeam/CreativeTeam";
import Footer from "../Footer/Footer";
import "typeface-roboto";

function Home() {
  return (
    <>
      <HeroSection />

      <Assets />

      <FirstFeature />
      <SecondFeature />
      <CreativeTeam />
      <FinalSection />
      <Footer />
    </>
  );
}

export default Home;
