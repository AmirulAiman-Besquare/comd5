import React, { useState, useEffect } from "react";
import Chart from "@qognicafinance/react-lightweight-charts";
import { pink } from "@mui/material/colors";

export const CandleStick = ({ data }) => {
  console.log(data);
  const options = {
    alignLabels: true,
    grid: {
      vertLines: {
        style: 1,
        visible: true,
      },
      horzLines: {
        style: 1,
        visible: true,
      },
    },
    layout: {
      backgroundColor: "black",
      textColor: "#F2EAD0",
      fontSize: 12,
      fontFamily: "monospace",
    },
    legend: {
      textColor: "#F2EAD0",
      fontSize: 12,
      fontFamily: "monospace",
    },
    timeScale: {
      barSpacing: 20,
      borderColor: "#194886",
      timeVisible: true,
      secondsVisible: false,
      fixRightEdge: true,
      // fixLeftEdge: true,
    },
    // localization: {
    //   priceFormatter: (price) =>
    //     // add $ sign before price
    //     "$" + price,
    // },
    priceScale: {
      // autoScale: false,
      // invertScale: true,
      // alignLabels: false,
      borderColor: "#194886",

      scaleMargins: {
        top: 0.3,
        bottom: 0.25,
      },
    },
    // crosshair: {
    //   vertLine: {
    //     color: "#204990",
    //     width: 1.5,
    //     style: 1,
    //   },
    //   horzLine: {
    //     color: "#204990",
    //     width: 1.5,
    //     style: 1,
    //   },
    //   mode: 1,
    // },
  };

  const [series, setSeries] = useState([
    {
      data: [
        {
          time: 1646802226,
        },
      ],
    },
  ]);

  useEffect(() => {
    // console.log("IM UPDATED");
    setSeries([
      {
        data: data,
        options: {
          borderColor: "#000000",
          borderUpColor: "#4682B4",
          borderDownColor: "#4682B4",
        },
      },
    ]);
  }, [data]);

  return (
    <div id="chart">
      <Chart
        options={options}
        candlestickSeries={series}
        autoWidth={true}
        // autoHeight={true}
        darkTheme
      />
    </div>
  );
};
