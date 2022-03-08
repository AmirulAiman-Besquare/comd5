import React from "react";

import "./HeroSection.css";
import comD5 from "../../asset/CompanyLogo/Company-logo.png";
import pcPhone from "../../asset/images/phonePCFirstPage.png";
import history from "../history";
import "animate.css";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="hero-container">
      <Link to="/login">
        <button className="login-btn">Login</button>
      </Link>
      <img className="company-logo" src={comD5} alt="ComD5 logo" />
      <img
        className="pcPhone-comd5"
        src={pcPhone}
        alt="Devices showing ComD5 services"
      />

      <h1 className="animate__animated animate__bounce Header-intro">
        Your Navigator in <br />
        the World of
        <br />
        Commodity Trade
      </h1>

      <div className="center-description">
        <p>
          Find the commodity data you need- whether you’re <br />
          looking to trade on a new exchange, invest in a fresh <br />
          currency or take a view on the big picture in global <br />
          market
        </p>
      </div>
      <Link to="/register">
        <button className="start-now-btn" onClick={() => history.push("/")}>
          Start Now
        </button>
      </Link>
      <div className="hero-btns"></div>
    </div>
  );
}

export default HeroSection;
