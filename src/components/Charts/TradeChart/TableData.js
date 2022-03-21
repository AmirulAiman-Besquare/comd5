import React, { useEffect, useRef } from "react";
import useState from "react-usestateref";
import { CandleStick } from "./CandleStick";
import loadingicon from "../../asset/images/loading.png";

const app_id = 1089; //app_id for testing only

const TableData = ({ asset, granularity }) => {
  const [selectedCommodity, setselectedCommodity, refSelectedCommodity] =
    useState(asset);
  const [selectedTime, setSelectedTime, refSelectedTime] =
    useState(granularity);

  const [loading, setLoading] = useState(true);

  const webSocket = useRef(null);
  const [ws, setWs] = useState(false);

  // Here is where the ws connection first established and kept alive
  useEffect(() => {
    if (webSocket.current === null) {
      webSocket.current = new WebSocket(
        "wss://ws.binaryws.com/websockets/v3?app_id=" + app_id
      );
      webSocket.current.onopen = function (evt) {
        console.log("ws opened");
        setWs(true);
      };
    }
    webSocket.current.onclose = function (e) {
      alert("Connection Disconnected. Please Refresh The Page.");
      setLoading(true);
    };
    return () => webSocket.current.close();
  }, []);

  const [Request, setRequest] = useState(
    JSON.stringify({
      ticks_history: refSelectedCommodity.current,
      adjust_start_time: 1,
      count: 10000,
      end: "latest",
      start: 0,
      granularity: refSelectedTime.current,
      subscribe: 1,
      style: "candles",
    })
  );

  //In this UseEffect is where all the data is cleared, Incoming Message is Stopped and new request is set
  useEffect(() => {
    setLoading(true);
    setTableData([]);
    setRealHistory([]);
    setselectedCommodity(asset);
    setSelectedTime(granularity);
    if (webSocket.current.readyState === WebSocket.OPEN) {
      webSocket.current.send(
        JSON.stringify({
          forget_all: ["ticks", "candles"],
        })
      );
    }
    setRequest(
      JSON.stringify({
        ticks_history: refSelectedCommodity.current,
        adjust_start_time: 1,
        count: 10000,
        end: "latest",
        start: 0,
        granularity: refSelectedTime.current,
        subscribe: 1,
        style: "candles",
      })
    );
  }, [asset, granularity]);

  const [tableData, setTableData] = useState([]);
  const [realhistory, setRealHistory, refRealHistoryData] = useState([]);

  //This useEffect will run on first page load and will retrigger again when there is any changes in the request state
  useEffect(() => {
    const data = [];
    let latesttime = 0;
    let latestohlc = {};
    if (webSocket.current.readyState === WebSocket.OPEN) {
      //send request to ws for tick history and subsribe to it.
      webSocket.current.send(Request);

      webSocket.current.onmessage = function (evt) {
        const parsedData = JSON.parse(evt.data);

        //Remap the history data to the format the graph library wants
        if (parsedData.candles) {
          data.push(parsedData.candles.slice(0, -1));
          setRealHistory(
            data[0].map((d) => {
              return {
                time: d.epoch + 28800,
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
              time: parsedData.ohlc.epoch + 28800,
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
      };
    }
  }, [ws, Request]);

  return (
    <>
      {loading ? (
        <div className="absolute z-50 left-[50%] top-[45%] -translate-y-2/4 -translate-x-2/4 ">
          <img
            src={loadingicon}
            className="block m-auto animate__bounce animate__animated animate__infinite"
          />
        </div>
      ) : (
        <></>
      )}
      {loading ? <div className="z-40 dark-overlay"></div> : <></>}
      <CandleStick data={tableData} />
    </>
  );
};
export default TableData;
