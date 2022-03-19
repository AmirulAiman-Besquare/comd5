import React from "react";
import firstFeature from "../../asset/images/realtime.png";
import "./Card.css";

function CardRealTime() {
  const arr = ["cards", "bg1"];
  const textColorFeatureDescription = [
    "text-description",
    "text-description-color",
  ];
  return (
    <div className={arr.join(" ")}>
      <h1 className="title">Real-Time Price</h1>
      <p className={textColorFeatureDescription.join(" ")}>
        Find the commodities real-time price you need
      </p>
      <p></p>
      <img
        className="center"
        src={firstFeature}
        alt="Showcase Real Time feature"
      />
    </div>
  );
}

export default CardRealTime;
