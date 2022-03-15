import React from "react";
import "./HeroSection.css";
import comD5 from "../../asset/images/Company-logo.png";
import pcPhone from "../../asset/images/phonePCFirstPage.png";
import history from "../../../history";
import "animate.css";

function HeroSection() {
  return (
    <div className="hero-container">
      <button className="login-btn">Login</button>
      <img className="company-logo" src={comD5} alt="ComD5 logo" />
      <div className="hero-content">
        <div className="hero-img">
          <img
            className="pcPhone-comd5"
            src={pcPhone}
            alt="Devices showing ComD5 services"
          />
        </div>
        <div className="hero-text">
          <h1 className="animate__animated animate__bounce Header-intro">
            Your Navigator in <br />
            the World of
            <br />
            Commodity Trade
          </h1>
          <p>
            Find the commodity data you need- whether you’re <br />
            looking to trade on a new exchange, invest in a fresh <br />
            currency or take a view on the big picture in global <br />
            market
          </p>

          <button className="start-now-btn" onClick={() => history.push("/")}>
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
