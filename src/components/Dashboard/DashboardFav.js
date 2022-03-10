import React, { useState, useEffect } from "react";

export const DashBoardFav = () => {
  const [price, setPrice] = useState("$--");
  const [status, setStatus] = useState("similar");
  const [lastPrice, setLastPrice] = useState("similar");
  const app_id = 1089; //app_id for testing only
  let latestPrice = null;

  useEffect(() => {
    const ws = new WebSocket(
      "wss://ws.binaryws.com/websockets/v3?app_id=" + app_id
    );
    ws.onopen = function (evt) {
      ws.send(JSON.stringify({ ticks: "frxXAUUSD" }));
    };

    ws.onmessage = (evt) => {
      let comkObject = JSON.parse(evt.data);
      latestPrice = parseFloat(comkObject.tick.quote).toFixed(2);
      setPrice(latestPrice);
      setLastPrice(price);
    };
    return () => {
      ws.close();
    };
  }, []);

  const setColour = () => {
    if (!lastPrice) {
      setStatus("similar");
      setLastPrice(price);
    } else {
      if (price > lastPrice) {
        setStatus("higher");
        setLastPrice(price);
      } else {
        setStatus("lower");
        setLastPrice(price);
      }
    }
  };

  useEffect(() => {
    setColour();
  }, [price]);

  return (
    <div className="bg-[#075F93] rounded-xl h-36">
      <p className="p-3 text-xl font-bold text-white">Assets</p>
      <div className=" mb-10 pb-1 rounded-lg shadow-xl box w-20 h-20 px-20 border-[#376db3] xl:max-w-xl ">
        <p className="font-bold text-white text-xl">Gold</p>
        <div
          className={
            status === "similar"
              ? "text-white text-xl"
              : status === "higher"
              ? "text-green-600 text-xl"
              : "text-red-600 text-xl"
          }
        >
          {price}
        </div>
      </div>
    </div>
  );
};
