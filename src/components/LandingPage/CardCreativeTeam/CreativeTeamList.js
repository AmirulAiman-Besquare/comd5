import React from "react";

function CreativeTeamList(props) {
  return (
    <>
      <li className="cards__item">
        <div className="cards__item__link">
          <figure className="cards__item__pic-wrap">
            <img
              src={props.src}
              alt="Team Member"
              className="cards__item__img"
            />
          </figure>
          <div className="cards__item__info">
            <h5 className="cards__item_text">{props.text}</h5>
          </div>
        </div>
      </li>
    </>
  );
}

export default CreativeTeamList;
