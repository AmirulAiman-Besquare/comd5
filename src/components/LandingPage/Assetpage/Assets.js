import React from "react";
import Gold from "../../asset/images/gold_lp.png";
import Silver from "../../asset/images/silverlp.png";
import Platinum from "../../asset/images/platinum_lp.png";
import Palladium from "../../asset/images/palladium_lp.png";
import "./Assets.css";
import AssetsItems from "./AssetsItems";

function Assets() {
  return (
    <div className="asset-page">
      <h1 className="asset-title">Know Our Assets</h1>
      <h2 className="asset-subtitle">
        Navigate your commodities through Commodify
      </h2>
      <div className="gold-asset-container">
        <div className="asset-wrapper">
          <ul className="asset-items">
            <AssetsItems
              title="Gold"
              src={Gold}
              text="The rarity and many uses of
                    gold making it better 
                    than chocolate bar and has 
                     reliable trade value"
              path="/gold"
            />

            <AssetsItems
              title="Silver"
              src={Silver}
              text="Has been predominantly part 
                    of the civilization dating as far 
                    back as 4000BC for silverware and etc."
              path="/gold"
            />
          </ul>
          <ul className="asset-items">
            <AssetsItems
              title="Platinum"
              src={Platinum}
              text="Has a higher value and low 
                    maintainence which involves 
                    re-polished without losing 
                    metal density"
              path="/gold"
            />

            <AssetsItems
              title="Palladium"
              src={Palladium}
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

export default Assets;
