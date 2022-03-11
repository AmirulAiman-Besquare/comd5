import React from "react";
import "./Asset.css";

function AssetItems(props) {
  return (
    <>
      <li className="assets_items">
        <div className="asset_items_box">
          <h3 className="title">{props.title}</h3>

          <figure className="asset_item_pic">
            <img className="asset_items_img" src={props.src} alt="Gold Image" />
          </figure>
          <div className="asset_item_info">
            <h5 className="asset_item_text"> {props.text}</h5>
          </div>
        </div>
      </li>
    </>
  );
}

export default AssetItems;
