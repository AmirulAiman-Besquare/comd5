import React, { useEffect } from "react";
import useState from "react-usestateref";
import { CandleStick } from "./CandleStick";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { css } from "@emotion/react";
import loadingicon from "../../asset/images/loading.png";

const app_id = 1089; //app_id for testing only

const TableData = ({ asset, granularity }) => {
  const data = [];
  let latesttime = 0;
  let latestohlc = {};

  const [ws, setWs] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [realhistory, setRealHistory, refRealHistoryData] = useState([]);
  const [selectedCommodity, setselectedCommodity, refSelectedCommodity] =
    useState(asset);
  const [selectedTime, setSelectedTime, refSelectedTime] =
    useState(granularity);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setselectedCommodity(asset);
    setSelectedTime(granularity);
    const wsClient = new WebSocket(
      "wss://ws.binaryws.com/websockets/v3?app_id=" + app_id
    );
    wsClient.onopen = function (evt) {
      console.log("ws opened");
      //send request to ws for tick history and subsribe to it.
      wsClient.send(
        JSON.stringify({
          ticks_history: refSelectedCommodity.current,
          adjust_start_time: 1,
          count: 100,
          end: "latest",
          start: 1,
          granularity: refSelectedTime.current,
          subscribe: 1,
          style: "candles",
        })
      );
    };

    //Fired when a connection with WebSocket is opened.
    wsClient.onmessage = function (evt) {
      setWs(wsClient);
      const parsedData = JSON.parse(evt.data);
      //Remap the history data to the format the graph library wants
      if (parsedData.candles) {
        data.push(parsedData.candles.slice(0, -1));
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
          //combine the history candles with real candles
          setLoading(false);

          let combinedarr = refRealHistoryData.current.concat(
            tableData.splice(-1, 1, latestohlc)
          );
          //set it to display in table
          setTableData(combinedarr);
        } else {
          //now that the open_time is diff => just push latestohlc to the array so that it moves to the next candles
          refRealHistoryData.current.push(latestohlc);
          //reset time latesttime with the open_time from OHLC
          latesttime = parsedData.ohlc.open_time;
        }
      }
      wsClient.onclose = function (e) {
        setLoading(true);
        console.log(
          "Socket is closed. Reconnect will be attempted in 1 second.",
          e.reason
        );
      };
    };
    return () => {
      wsClient.close();
    };
  }, [asset, granularity]);

  return (
    <>
      {loading ? (
        <div className="absolute z-10 left-[50%] top-[60%] -translate-y-2/4 -translate-x-2/4 ">
          <img
            src={loadingicon}
            className="block m-auto animate__bounce animate__animated animate__infinite"
          />
        </div>
      ) : (
        <></>
      )}
      {loading ? <div className="dark-overlay"></div> : <></>}
      <CandleStick data={tableData} />
    </>
  );
};
export default TableData;
