import React, { useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import downicon from "../asset/images/down.png";
import upicon from "../asset/images/up.png";
import useState from "react-usestateref";

export const AssetAnalysisRow = ({ asset }) => {
  const [price, setPrice, refPrice] = useState(0);
  const [icon, setIcon] = useState(<p></p>);
  const [status, setStatus] = useState("similar");
  const [lastPrice, setLastPrice, refLastPrice] = useState(0);
  const [change, setChange, refChange] = useState(0);
  const [changePercent, setChangePercent] = useState(0);
  const app_id = 1089; //app_id for testing only
  let oldprice = null;
  let latestPrice = null;
  let pricechange = null;
  let pricepercentchange = null;
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
      setLastPrice(parseFloat(refPrice.current));
      setChange(parseFloat(refLastPrice.current) - parseFloat(latestPrice));
      console.log(parseFloat(refLastPrice.current), parseFloat(latestPrice));
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

  const CalChange = () => {};

  useEffect(() => {
    setColour();
  }, [price]);

  return (
    <>
      <tr className="">
        <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap">
          {asset === "frxXAUUSD"
            ? "Gold/USD"
            : asset === "frxXAGUSD"
            ? "Silver/USD"
            : asset === "frxXPTUSD"
            ? "Platinium/USD"
            : "Palladium/USD"}
        </td>
        <td className="px-6 py-4 text-sm font-light text-white whitespace-nowrap">
          {price}
        </td>
        <td className="px-6 py-4 text-sm font-light text-white whitespace-nowrap">
          {refChange.current}
        </td>
        <td className="px-6 py-4 text-sm font-light text-white whitespace-nowrap">
          @mdo
        </td>
      </tr>
    </>
  );
};
