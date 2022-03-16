import React, { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { BsFillTriangleFill } from "react-icons/bs";

export const AssetAnalysisRow = ({ asset }) => {
  const [price, setPrice] = useState(
    <ScaleLoader color="#00B2FF" height={15} />
  );
  const [icon, setIcon] = useState(<p></p>);
  const [lastPrice, setLastPrice] = useState(0);
  const [change, setChange] = useState(0);
  const [changePercent, setChangePercent] = useState(0);
  const [percent, setPercent] = useState();
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
      latestPrice = parseFloat(res.tick.quote).toFixed(2);

      setPrice(latestPrice);
      setLastPrice(price);
    };
    return () => {
      ws.close();
      setPrice();
      setLastPrice();
    };
  }, []);

  const CalChange = () => {
    if (price === lastPrice) {
      CalPercent();
    } else {
      if (price > lastPrice) {
        setIcon(<BsFillTriangleFill color="green" className="mt-[0.2em]" />);
        CalPercent();
      } else {
        setIcon(
          <BsFillTriangleFill color="red" className="mt-[0.2em] rotate-180" />
        );
        CalPercent();
      }
    }
  };

  const CalPercent = () => {
    setLastPrice(price);
    if (parseFloat(lastPrice) === 0) {
      setIcon(<></>);
      setChangePercent(<ScaleLoader color="#00B2FF" height={15} />);
      setChange(<ScaleLoader color="#00B2FF" height={15} />);
    } else {
      setPercent("%");
      let changes =
        (parseFloat(price) - parseFloat(lastPrice)) / parseFloat(lastPrice);
      if (isNaN(changes)) {
        setIcon(<></>);
        setChange(0);
        setChangePercent(0);
      } else {
        setChange((parseFloat(price) - parseFloat(lastPrice)).toFixed(2));
        setChangePercent((changes * 100).toFixed(4));
      }
    }
  };

  useEffect(() => {
    CalChange();
  }, [price]);

  return (
    <>
      <tr className="">
        <td className="px-6 py-4 text-base font-medium text-white whitespace-nowrap">
          {asset === "frxXAUUSD"
            ? "Gold/USD"
            : asset === "frxXAGUSD"
            ? "Silver/USD"
            : asset === "frxXPTUSD"
            ? "Platinium/USD"
            : "Palladium/USD"}
        </td>
        <td
          className={
            "px-6 py-4 text-base font-light whitespace-nowrap text-white"
          }
        >
          {price}
        </td>
        <td
          className={
            change === 0
              ? "text-white px-6 py-4 text-base font-light whitespace-nowrap"
              : change >= 0
              ? "text-[#5CEE21] flex px-6 py-4 text-base font-light whitespace-nowrap gap-1 justify-center"
              : "text-[#FB512D] flex px-6 py-4 text-base font-light whitespace-nowrap gap-1 justify-center"
          }
        >
          {icon}
          {change}
        </td>
        <td
          className={
            changePercent === 0
              ? "text-white px-6 py-4 text-base font-light whitespace-nowrap"
              : changePercent >= 0
              ? "text-[#5CEE21] px-6 py-4 text-base font-light whitespace-nowrap"
              : "text-[#FB512D]  px-6 py-4 text-base font-light whitespace-nowrap"
          }
        >
          {changePercent}
          {percent}
        </td>
      </tr>
    </>
  );
};
