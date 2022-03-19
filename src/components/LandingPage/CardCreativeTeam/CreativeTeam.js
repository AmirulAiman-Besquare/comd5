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
            <CreativeTeamList src={Aiman} text="Amirul Aiman" />
            <CreativeTeamList src={Vishnu} text="Vishnu " />
            <CreativeTeamList src={Yazeed} text="Yazeed" />
          </ul>
          <ul className="cards__items">
            <CreativeTeamList src={Nadiah} text="Nadiah" />
            <CreativeTeamList src={Rusydiah} text="Rusydiah" />
            <CreativeTeamList src={Syafiqah} text="Syafiqah" />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CreativeTeam;
