import React from "react";
import Gold from "../../asset/images/gold1.png";
import Silver from "../../asset/images/silver-p-p.png";
import "./Asset.css";
import AssetItems from "./AssetItems";

function Asset() {
  return (
    <div className="asset-page">
      <h1 className="asset-title">Know Our Assets</h1>
      <div className="gold-asset-container">
        <div className="asset-wrapper">
          <ul className="asset-items">
            <AssetItems
              title="Gold"
              src={Gold}
              text="The rarity and many uses of
                    gold making it better 
                    than chocolate bar and has 
                     reliable trade value"
              path="/gold"
            />

            <AssetItems
              title="Silver"
              src={Silver}
              text="Has been predominantly part 
                    of the civilization dating as far 
                    back as 4000BC for silverware and etc."
              path="/gold"
            />
          </ul>
          <ul className="asset-items">
            <AssetItems
              title="Platinum"
              src={Silver}
              text="Has a higher value and low 
                    maintainence which involves 
                    re-polished without losing 
                    metal density"
              path="/gold"
            />

            <AssetItems
              title="Palladium"
              src={Silver}
              text="Part of metal family, it is 
                    lighter, cheaper and more  scratch 
                    resistant compared  to its sibling, platinum."
              path="/gold"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Asset;
