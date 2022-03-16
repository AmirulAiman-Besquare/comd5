import React, { useState, useEffect } from "react";
import goldicon from "../asset/images/goldcoin.png";
import silvericon from "../asset/images/silvercoin.png";
import ScaleLoader from "react-spinners/ScaleLoader";
import downicon from "../asset/images/down.png";
import upicon from "../asset/images/up.png";

export const TicksPriceWs = ({ asset }) => {
  const [price, setPrice] = useState(
    <ScaleLoader color="#00B2FF" height={15} />
  );
  const [icon, setIcon] = useState(<p></p>);
  const [status, setStatus] = useState("similar");
  const [lastPrice, setLastPrice] = useState(0);
  const app_id = 1089; //app_id for testing only
  let latestPrice = null;

  useEffect(() => {
    const ws = new WebSocket(
      "wss://ws.binaryws.com/websockets/v3?app_id=" + app_id
    );
    ws.onopen = function (evt) {
      ws.send(JSON.stringify({ ticks: asset }));
    };

    ws.onmessage = (evt) => {
      let res = JSON.parse(evt.data);
      latestPrice = "$" + parseFloat(res.tick.quote).toFixed(2);
      setPrice(latestPrice);
      setLastPrice(price);
    };
    return () => {
      ws.close();
      setPrice();
      setLastPrice();
    };
  }, []);

  const setColour = () => {
    if (!lastPrice) {
      setStatus("similar");
      setLastPrice(price);
      setIcon();
    } else {
      if (price > lastPrice) {
        setIcon(<img src={upicon} />);
        setStatus("higher");
        setLastPrice(price);
      } else {
        setIcon(<img src={downicon} />);
        setStatus("lower");
        setLastPrice(price);
      }
    }
  };

  useEffect(() => {
    setColour();
  }, [price]);

  return (
    <div className="w-11/12 h-full p-2 m-auto rounded shadow-xl box sm:rounded-xl sm:w-64 xl:w-72 xl:max-w-xl xl:p-4 animate__animated animate__flipInY">
      <div className="flex flex-col flex-wrap justify-center w-full m-auto text-center align-middle xl:my-3">
        <p className="text-xl font-bold text-white sm:ml-0 xl:text-2xl">
          {asset === "frxXAUUSD"
            ? "Gold/USD"
            : asset === "frxXAGUSD"
            ? "Silver/USD"
            : asset === "frxXPTUSD"
            ? "Platinium/USD"
            : "Palladium/USD"}
        </p>
        <div className="">
          <img
            className="absolute xs:static w-12 bottom-[1rem] left-[1rem] sm:mx-auto sm:my-4 tickicon xl:mx-auto xl:my-10 xl:w-24"
            src={
              asset === "frxXAUUSD"
                ? goldicon
                : asset === "frxXAGUSD"
                ? silvericon
                : asset === "frxXPTUSD"
                ? silvericon
                : silvericon
            }
            alt=""
          />
        </div>
        <div
          className={
            status === "similar"
              ? "text-white text-xl flex m-auto gap-2"
              : status === "higher"
              ? "text-[#5CEE21] text-xl flex m-auto gap-2"
              : "text-[#FB512D] text-xl flex m-auto gap-2"
          }
        >
          {icon}
          {price}
        </div>
      </div>
    </div>
  );
};
