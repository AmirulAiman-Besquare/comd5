import React from "react";
import CreativeTeamList from "./CreativeTeamList";
import "./CreativeTeam.css";
import Team1 from "../../asset/TeamMember/icon1.png";
import "animate.css";

function CreativeTeam() {
  const arr = ["cards-creativeTeam", "bg-creativeTeam", "bg-size"];
  const textColorDescription = [
    "text-description",
    "text-description-color-creativeTeam",
  ];
  return (
    <div className={arr.join(" ")}>
      <h1 className="title-creativeTeam">Creative Team</h1>
      <p className={textColorDescription.join(" ")}>
        Meet our creative team who make Commodify become a reality
      </p>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CreativeTeamList src={Team1} text="Amirul Aiman" />
            <CreativeTeamList src={Team1} text="Vishnu " />
            <CreativeTeamList src={Team1} text="Yazeed" />
          </ul>
          <ul className="cards__items">
            <CreativeTeamList src={Team1} text="Nadiah" />
            <CreativeTeamList src={Team1} text="Rusydiah" />
            <CreativeTeamList src={Team1} text="Syafiqah" />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CreativeTeam;
