import React, { useState, useEffect } from "react";
import Chart from "@qognicafinance/react-lightweight-charts";

export const CandleStick = ({ data }) => {
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
      fontSize: 15,
      fontFamily: "Roboto",
    },
    legend: {
      textColor: "#F2EAD0",
      fontSize: 12,
      fontFamily: "Roboto",
    },
    timeScale: {
      barSpacing: 20,
      borderColor: "#194886",
      timeVisible: true,
      secondsVisible: false,
      fixRightEdge: true,
      fixLeftEdge: true,
    },
    // localization: {
    //   priceFormatter: (price) =>
    //     // add $ sign before price
    //     "$" + price,
    // },
    priceScale: {
      borderColor: "#194886",

      scaleMargins: {
        top: 0.3,
        bottom: 0.25,
      },
    },
    crosshair: {
      vertLine: {
        color: "#204990",
        width: 1.5,
        style: 3,
      },
      horzLine: {
        color: "#204990",
        width: 1.5,
        style: 3,
      },
    },
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
    <div id="chart" className="w-full h-[30rem]  xl:h-[45rem] ">
      <Chart
        className="z-0"
        options={options}
        candlestickSeries={series}
        autoWidth={true}
        autoHeight={true}
        darkTheme
      />
    </div>
  );
};
