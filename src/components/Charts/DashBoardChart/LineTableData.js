import React, { useEffect } from "react";
import useState from "react-usestateref";
import { LineChart } from "./LineChart";

const app_id = 1089; //app_id for testing only
const ws = new WebSocket(
  "wss://ws.binaryws.com/websockets/v3?app_id=" + app_id
);

const LineTableData = () => {
  const [goldDatas, setGoldData] = useState([]);
  const [silverDatas, setSilverData] = useState([]);
  const [platDatas, setPlatData] = useState([]);
  const [pladDatas, setPladData] = useState([]);
  const goldData = [];
  const liveGoldData = [];
  let goldarr = [];
  const silverData = [];
  const liveSilverData = [];
  let silverarr = [];
  const platData = [];
  const livePlatData = [];
  let platarr = [];
  const pladData = [];
  const livePladData = [];
  let pladarr = [];
  useEffect(() => {
    ws.onopen = () => console.log("ws opened");
    ws.onclose = () => console.log("ws closed");
    console.log("WS Connected");

    ws.onopen = function (evt) {
      //send request to ws for tick history and subsribe to it.
      ws.send(
        JSON.stringify({
          ticks_history: "1HZ100V",
          adjust_start_time: 1,
          count: 100,
          end: "latest",
          start: 1,
          subscribe: 1,
          style: "ticks",
        })
      );
      ws.send(
        JSON.stringify({
          ticks_history: "1HZ200V",
          adjust_start_time: 1,
          count: 100,
          end: "latest",
          start: 1,
          subscribe: 1,
          style: "ticks",
        })
      );
      ws.send(
        JSON.stringify({
          ticks_history: "1HZ300V",
          adjust_start_time: 1,
          count: 100,
          end: "latest",
          start: 1,
          subscribe: 1,
          style: "ticks",
        })
      );
      ws.send(
        JSON.stringify({
          ticks_history: "1HZ50V",
          adjust_start_time: 1,
          count: 100,
          end: "latest",
          start: 1,
          subscribe: 1,
          style: "ticks",
        })
      );
    };
    //Fired when a connection with WebSocket is opened.
    ws.onmessage = function (evt) {
      const parsedData = JSON.parse(evt.data);
      // console.log(parsedData.echo_req.ticks_history);
      //Remap the history data to the format the graph library wants

      switch (parsedData.echo_req.ticks_history) {
        case "1HZ100V":
          if (parsedData.history) {
            goldData.push(parsedData.history);
            let valarr = goldData[0].prices.map((p) => {
              return { value: p };
            });
            let timearr = goldData[0].times.map((t) => {
              return { time: t };
            });
            goldarr = timearr.map((item, i) =>
              Object.assign({}, item, valarr[i])
            );
            setGoldData(goldarr);
          } else {
            let latestGoldData = {
              time: parsedData.tick.epoch,
              value: parseFloat(parsedData.tick.quote),
            };
            liveGoldData.push(latestGoldData);
            setGoldData(goldarr.concat(liveGoldData));
          }
          break;
        case "1HZ200V":
          if (parsedData.history) {
            silverData.push(parsedData.history);
            let valarr = silverData[0].prices.map((p) => {
              return { value: p };
            });
            let timearr = silverData[0].times.map((t) => {
              return { time: t };
            });
            silverarr = timearr.map((item, i) =>
              Object.assign({}, item, valarr[i])
            );
            setSilverData(silverarr);
          } else {
            let latestSilverData = {
              time: parsedData.tick.epoch,
              value: parseFloat(parsedData.tick.quote),
            };
            liveSilverData.push(latestSilverData);
            setSilverData(silverarr.concat(liveSilverData));
          }
          break;
        case "1HZ300V":
          if (parsedData.history) {
            platData.push(parsedData.history);
            let valarr = platData[0].prices.map((p) => {
              return { value: p };
            });
            let timearr = platData[0].times.map((t) => {
              return { time: t };
            });
            platarr = timearr.map((item, i) =>
              Object.assign({}, item, valarr[i])
            );
            setPlatData(platarr);
          } else {
            let latestPlatData = {
              time: parsedData.tick.epoch,
              value: parseFloat(parsedData.tick.quote),
            };
            livePlatData.push(latestPlatData);
            setPlatData(platarr.concat(livePlatData));
          }
          break;
        case "1HZ50V":
          if (parsedData.history) {
            pladData.push(parsedData.history);
            let valarr = pladData[0].prices.map((p) => {
              return { value: p };
            });
            let timearr = pladData[0].times.map((t) => {
              return { time: t };
            });
            pladarr = timearr.map((item, i) =>
              Object.assign({}, item, valarr[i])
            );
            setPladData(pladarr);
          } else {
            let latestPladData = {
              time: parsedData.tick.epoch,
              value: parseFloat(parsedData.tick.quote),
            };
            livePladData.push(latestPladData);
            setPladData(pladarr.concat(livePladData));
          }
          break;
        default:
        // alert("Check your network connection");
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <>{console.log(goldDatas)}</>
      <LineChart
        gold={goldDatas}
        silver={silverDatas}
        plat={platDatas}
        plad={pladDatas}
      />
      {/* <CandleStick data={silverDatas} />
      <CandleStick data={platDatas} />
      <CandleStick data={pladDatas} /> */}
    </>
  );
};
export default LineTableData;
