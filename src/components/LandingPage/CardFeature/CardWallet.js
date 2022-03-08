import React from "react";
import secondFeature from "../../asset/images/walletFeature.png";
import "./Card.css";

function CardWallet() {
  const arr = ["cards", "bg2"];
  const textColorDescription = ["text-description", "text-description-color"];
  return (
    <div className={arr.join(" ")}>
      <h1 className="title">Wallet</h1>
      <p className={textColorDescription.join(" ")}>
        Withdraw or Top-up your wallet then never stop trading till you drop
      </p>
      <p></p>
      <img
        className="center"
        src={secondFeature}
        alt="Showcase Real Time feature"
      />
    </div>
  );
}

export default CardWallet;
