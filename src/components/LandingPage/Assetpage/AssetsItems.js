import React from "react";
import "./Assets.css";

function AssetsItems(props) {
  return (
    <>
      <li className="asset_items">
        <div className="asset_items_box">
          <h4 className="title">{props.title}</h4>
          <div className="asset-imgtext">
            <figure className="asset_item_pic">
              <img className="asset_items_img" src={props.src} alt="Gold" />
            </figure>
            <div className="asset_item_info">
              <h5 className="asset_item_text"> {props.text}</h5>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

export default AssetsItems;
