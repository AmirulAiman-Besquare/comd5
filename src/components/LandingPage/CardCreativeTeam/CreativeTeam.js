import React from "react";
import CreativeTeamList from "./CreativeTeamList";
import "./CreativeTeam.css";
import Aiman from "../../asset/TeamMember/aiman2.png";
import Vishnu from "../../asset/TeamMember/vishnu2.png";
import Yazeed from "../../asset/TeamMember/yazeed2.png";
import Nadiah from "../../asset/TeamMember/nadiah2.png";
import Rusydiah from "../../asset/TeamMember/rusy2.png";
import Syafiqah from "../../asset/TeamMember/syafiqah2.png";
import "animate.css";

function CreativeTeam() {
  const arr = ["cards-creativeTeam", "bg-creativeTeam", "bg-size"];
  const textColorDescription = [
    "text-description",
    "text-description-color-creativeTeam",
  ];
  return (
    <div className={arr.join(" ")}>
      <h1 className="title-creativeTeam">Expert Team</h1>
      <p className={textColorDescription.join(" ")}>
        Meet our expert team who make Commodify become a reality
      </p>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <a href="https://github.com/AmirulAiman-Besquare">
              <CreativeTeamList src={Aiman} text="Amirul Aiman" />
            </a>
            <a href="https://github.com/vishnu-besquare">
              <CreativeTeamList src={Vishnu} text="Vishnu " />
            </a>
            <a href="https://github.com/yazeedwong">
              <CreativeTeamList src={Yazeed} text="Yazeed" />
            </a>
          </ul>
          <ul className="cards__items">
            <a href="https://github.com/nadizeq">
              <CreativeTeamList src={Nadiah} text="Nadiah" />
            </a>
            <a href="https://github.com/rsydh">
              <CreativeTeamList src={Rusydiah} text="Rusydiah" />
            </a>
            <a href="https://github.com/Izzan54">
              <CreativeTeamList src={Syafiqah} text="Syafiqah" />
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CreativeTeam;
