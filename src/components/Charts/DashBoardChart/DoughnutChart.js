import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import React, { useEffect } from "react";
import CharpataLabels from "chartjs-plugin-datalabels";
import ScaleLoader from "react-spinners/ScaleLoader";
import { BiRectangle } from "react-icons/bi";
import useState from "react-usestateref";

Chart.register(CharpataLabels);

export function DoughnutChart() {
  const [GoldAsset, setGoldAsset] = useState(0);
  const [SilverAsset, setSilverAsset] = useState(0);
  const [PlatAsset, setPlatAsset] = useState(0);
  const [PladAsset, setPladAsset] = useState(0);
  const [CheckData, setCheckData, refCheckData] = useState(false);

  async function getAsset() {
    try {
      const response = await fetch("http://157.245.57.54:5000/display/asset", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setGoldAsset(parseRes[0].gold_amount);
      setSilverAsset(parseRes[0].silver_amount);
      setPlatAsset(parseRes[0].platinum_amount);
      setPladAsset(parseRes[0].palladium_amount);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    getAsset();

    return () => {
      getAsset();
    };
  }, []);

  useEffect(() => {
    if (
      GoldAsset === 0 &&
      SilverAsset === 0 &&
      PladAsset === 0 &&
      PlatAsset === 0
    ) {
      setCheckData(true);
    } else {
      setCheckData(true);
    }

    return () => {
      setCheckData();
    };
  }, [GoldAsset, SilverAsset, PladAsset, PlatAsset]);

  const options = {
    aspectRatio: 3 / 3,
    // cutoutPercentage: 8,
    layout: {
      padding: {
        top: 40,
        bottom: 40,
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
        resize: 1,
      },
    },
    responsive: true,

    plugins: {
      datalabels: {
        display: "auto",
        color: "white",
      },
      tooltip: {
        // mode: "nearest",
        // intersect: false,
      },
      legend: {
        display: false,
        position: "left",
        labels: {
          color: "black",
        },
      },
    },
  };

  return (
    <div className=" flex rounded-lg shadow-xl bg-[#122746] w-auto border-[#075F93] border-[1.2rem] xl:max-w-xl ">
      <p className="absolute mt-5 ml-10 text-2xl font-bold text-white">
        Asset Owned
      </p>
      <div className={"flex h-full mt-[7rem] mx-10 text-white align-middle"}>
        <div>
          <p className="bg-[#64ECFF] text-xs text-[#64ECFF] mb-3 mt-1">gold</p>
          <p className="bg-[#45BDEA] text-xs text-[#45BDEA] mb-3">silv</p>
          <p className="bg-[#418FCC] text-xs text-[#418FCC] mb-3">plad</p>
          <p className="bg-[#4761A4] text-xs text-[#4761A4] mb-3">plat</p>
        </div>
        <div className="ml-5 text-base">
          <p className="pb-1 font-bold">Gold</p>
          <p className="pb-1 font-bold">Silver</p>
          <p className="pb-1 font-bold">Platinium</p>
          <p className="pb-1 font-bold">Palladium</p>
        </div>
        <div className="ml-4 text-base">
          <p className="pb-1 font-normal">{GoldAsset}oz</p>
          <p className="pb-1 font-normal">{SilverAsset}oz</p>
          <p className="pb-1 font-normal">{PlatAsset}oz</p>
          <p className="pb-1 font-normal">{PladAsset}oz</p>
        </div>
      </div>

      <div className="h-full m-auto mt-3 ">
        <Doughnut
          data={{
            labels: ["Gold", "Silver", "Platinium", "Palladium"],
            datasets: [
              {
                datalabels: {
                  // backgroundColor: function (context) {
                  //   return context.dataset.backgroundColor;
                  // },
                  borderRadius: 4,
                  // borderColor: "black",
                  borderWidth: "1",
                  color: "white",
                  font: {
                    weight: "bold",
                    size: "15px",
                  },
                  align: "end",
                  anchor: "end",
                  labels: {
                    index: {
                      align: "end",
                      anchor: "end",
                      color: "white",
                      font: { size: 14 },
                      formatter: function (value, ctx) {
                        return ctx.active
                          ? ctx.chart.data.labels[ctx.dataIndex]
                          : ctx.dataset.data[ctx.dataIndex];
                      },
                      offset: 8,
                    },
                  },
                },
                data: [GoldAsset, SilverAsset, PlatAsset, PladAsset],
                backgroundColor: ["#64ECFF", "#45BDEA", "#418FCC", "#4761A4"],
              },
            ],
          }}
          options={options}
        />
      </div>
    </div>
  );
}
