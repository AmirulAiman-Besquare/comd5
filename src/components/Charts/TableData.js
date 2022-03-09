import React, { useEffect, useRef } from "react";
import useState from "react-usestateref";
import { CandleStick } from "./CandleStick";

const app_id = 1089; //app_id for testing only
const ws = new WebSocket(
  "wss://ws.binaryws.com/websockets/v3?app_id=" + app_id
);

const TableData = () => {
  const data = [];
  let latesttime = 0;
  let latestohlc = {};

  const [tableData, setTableData] = useState([]);
  const [realhistory, setRealHistory, refRealHistoryData] = useState([]);
  const [selectedTime, setSelectedTime] = useState(0);

  useEffect(() => {
    ws.onopen = () => console.log("ws opened");
    ws.onclose = () => console.log("ws closed");
    console.log("WS Connected");

    ws.onopen = function (evt) {
      //send request to ws for tick history and subsribe to it.

      switch (selectedTime) {
        case "1min":
          break;
        case "2min":
          break;
        case "3min":
          break;
        case "5min":
          break;
        default:
          break;
      }
      ws.send(
        JSON.stringify({
          ticks_history: "frxXAUUSD",
          adjust_start_time: 1,
          count: 1000,
          end: "latest",
          start: 1,
          subscribe: 1,
          style: "candles",
        })
      );
    };
    //Fired when a connection with WebSocket is opened.
    ws.onmessage = function (evt) {
      const parsedData = JSON.parse(evt.data);

      //Remap the history data to the format the graph library wants
      if (parsedData.candles) {
        data.push(parsedData.candles.slice(0, -1));
        console.log(data);
        setRealHistory(
          data[0].map((d) => {
            return {
              time: d.epoch,
              open: d.open,
              high: d.high,
              low: d.low,
              close: d.close,
            };
          })
        );
        //set latest time here to check when to move to the next candle
        latesttime = parsedData.candles[parsedData.candles.length - 1].epoch;
      } else {
        //if true => create the *updating* candle
        if (latesttime === parsedData.ohlc.open_time) {
          latestohlc = {
            time: parsedData.ohlc.epoch,
            open: parseFloat(parsedData.ohlc.open),
            high: parseFloat(parsedData.ohlc.high),
            low: parseFloat(parsedData.ohlc.low),
            close: parseFloat(parsedData.ohlc.close),
          };
          console.log(latestohlc);
          //combine the historyacandles with real candles
          let combinedarr = refRealHistoryData.current.concat(
            tableData.splice(-1, 1, latestohlc)
          );
          //set it to display in table
          setTableData(combinedarr);
          console.log("same time");
        } else {
          //now that the open_time is diff => just push latestohlc to the array so that it moves to the next candles
          refRealHistoryData.current.push(latestohlc);
          console.log("diff time");
          //reset time latesttime with the open_time from OHLC
          latesttime = parsedData.ohlc.open_time;
        }
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <CandleStick data={tableData} />
    </>
  );
};
export default TableData;
