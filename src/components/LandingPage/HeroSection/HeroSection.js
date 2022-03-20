import React from "react";
import "./HeroSection.css";
import comD5 from "../../asset/CompanyLogo/Company-logo.png";
import pcPhone from "../../asset/images/device.png";
import history from "../../../history";
import "animate.css";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="hero-container">
      <Link to="/login">
        <button className="login-btn animate__animated animate__fadeInDown">
          Login
        </button>
      </Link>
      <img
        className="company-logo animate__animated animate__fadeInDown"
        src={comD5}
        alt="ComD5 logo"
      />
      <div className="hero-content">
        <div className="hero-img">
          <img
            className="pcPhone-comd5 animate__animated animate__fadeInDown"
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
          <Link to="/register">
            <button className="start-now-btn" onClick={() => history.push("/")}>
              Start Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
