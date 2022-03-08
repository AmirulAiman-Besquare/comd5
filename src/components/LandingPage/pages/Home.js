import React from "react";
import "./home.css";
import Asset from "../Assetpage/Asset";
import HeroSection from "../HeroSection/HeroSection";
import FirstFeature from "../CardFeature/CardRealTime";
import SecondFeature from "../CardFeature/CardWallet";
import FinalSection from "../FinalSection/FinalSection";
import CreativeTeam from "../CardCreativeTeam/CreativeTeam";
import Footer from "../Footer/Footer";

function Home() {
  return (
    <>
      <div className="landingpage">
        <HeroSection />

        <Asset />

        <FirstFeature />
        <SecondFeature />
        <CreativeTeam />
        <FinalSection />
        <Footer />
      </div>
    </>
  );
}

export default Home;
