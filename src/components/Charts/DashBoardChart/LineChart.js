import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "chart.js";
import { Line, ChartData, LinearComponentProps } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import zoomPlugin from "chartjs-plugin-zoom";

import React from "react";
Chart.register(zoomPlugin, annotationPlugin);

export function LineChart({ gold, silver, plat, plad }) {
  console.log(gold);
  let EpochData = gold.map((gold) => gold.time);
  let GoldPrice = gold.map((gold) => gold.value);
  let SilverPrice = silver.map((silver) => silver.value);
  let PlatPrice = plat.map((plat) => plat.value);
  let PladPrice = plad.map((plad) => plad.value);

  const options = {
    animation: {
      duration: "speed * 1.5",
      easing: "linear",
    },
    scales: {
      xAxis: {
        min: EpochData[EpochData.length - 11],
      },
      yAxis: {
        // position: "right",
        type: "linear",
        grace: "80%",
      },
    },
    responsive: true,

    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          mode: "x",
          speed: 100,
        },
        pan: {
          enabled: true,
          mode: "x",
          speed: 100,
        },
      },
      annotation: {
        annotations: {
          line: {
            drawTime: "afterDraw",
            yScaleID: "yAxis",
            yMin: GoldPrice[GoldPrice.length - 1],
            yMax: GoldPrice[GoldPrice.length - 1],
            mode: "horizontal",
            type: "line",
            borderColor: "rgba(0, 0, 0, 0.0)",
            borderWidth: 2,
            label: {
              padding: 8,
              position: "end",
              backgroundColor: "rgb(255, 109, 122)",
              content: GoldPrice[GoldPrice.length - 1],
              enabled: true,
            },
          },
        },
      },
      tooltip: {
        mode: "nearest",
        intersect: false,
      },
      title: {
        display: true,
        text: "GOLD/USD PRICEs",
        align: "center",
        color: "black",
        font: {
          size: 20,
        },
      },
      legend: {
        display: true,
        position: "right",
        labels: {
          color: "black",
        },
      },
    },
  };
  return (
    <div style={{ width: 1600, margin: "100px" }}>
      <Line
        data={{
          labels: EpochData,
          datasets: [
            {
              label: "Quote Price ",
              data: GoldPrice,
              borderColor: "rgb(255, 99, 132)",
              pointBackgroundColor: "rgb(255, 99, 132)",
              fill: true,
              pointStyle: "circular",
              radius: 3,
            },
            {
              label: "Quote Price ",
              data: SilverPrice,
              borderColor: "rgb(255, 99, 132)",
              pointBackgroundColor: "rgb(255, 99, 132)",
              fill: true,
              pointStyle: "circular",
              radius: 3,
            },
            {
              label: "Quote Price ",
              data: PlatPrice,
              borderColor: "rgb(255, 99, 132)",
              pointBackgroundColor: "rgb(255, 99, 132)",
              fill: true,
              pointStyle: "circular",
              radius: 3,
            },
            {
              label: "Quote Price ",
              data: PladPrice,
              borderColor: "rgb(255, 99, 132)",
              pointBackgroundColor: "rgb(255, 99, 132)",
              fill: true,
              pointStyle: "circular",
              radius: 3,
            },
          ],
        }}
        options={options}
      />
    </div>
  );
}
