import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import React, { useEffect } from "react";
import CharpataLabels from "chartjs-plugin-datalabels";
import useState from "react-usestateref";

Chart.register(CharpataLabels);

export function DoughnutChart() {
  const [GoldAsset, setGoldAsset] = useState(0);
  const [SilverAsset, setSilverAsset] = useState(0);
  const [PlatAsset, setPlatAsset] = useState(0);
  const [PladAsset, setPladAsset] = useState(0);
  const [CheckData, setCheckData] = useState(false);

  async function getAsset() {
    try {
      const response = await fetch("https://api.comd5.xyz/display/asset", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setGoldAsset(parseRes[0].gold_amount);
      setSilverAsset(parseRes[0].silver_amount);
      setPlatAsset(parseRes[0].platinum_amount);
      setPladAsset(parseRes[0].palladium_amount);
      if (
        parseRes[0].gold_amount === 0 &&
        parseRes[0].silver_amount === 0 &&
        parseRes[0].platinum_amount === 0 &&
        parseRes[0].palladium_amount === 0
      ) {
        setCheckData(false);
      } else {
        setCheckData(true);
      }
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

  const options = {
    // aspectRatio: 3 / 3,
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
        backgroundColor: "black",
        bodyColor: "white",
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
    <div className="m-2 flex flex-col sm:flex-row rounded shadow-xl bg-[#122746] pb-64 sm:pb-0 w-auto border-[#075F93] border-[1.2rem] xl:max-w-xl xl:rounded-xl">
      <p className="absolute mt-5 ml-16 text-2xl font-bold text-white sm:ml-20 md:ml-44 dtitle xl:ml-10">
        Asset Owned
      </p>
      <div
        className={
          "flex h-full mt-16 sm:mt-[7rem] sm:mx-20 md:mx-32 text-white align-middle ddesc xl:ml-10 xl:mx-0 xl:mr-4"
        }
      >
        <div>
          <p className="bg-[#FFC533] text-xs text-[#FFC533] mb-3 mt-1">gold</p>
          <p className="bg-[#BC95DF] text-xs text-[#BC95DF] mb-3">silv</p>
          <p className="bg-[#02D3CC] text-xs text-[#02D3CC] mb-3">plad</p>
          <p className="bg-[#F2726F] text-xs text-[#F2726F] mb-3">plat</p>
        </div>
        <div className="ml-5 text-base">
          <p className="pb-1 font-bold">Gold</p>
          <p className="pb-1 font-bold">Silver</p>
          <p className="pb-1 font-bold">Platinium</p>
          <p className="pb-1 font-bold">Palladium</p>
        </div>
        <div className="ml-4 text-base">
          <p className="pb-1 font-medium">{GoldAsset}oz</p>
          <p className="pb-1 font-medium">{SilverAsset}oz</p>
          <p className="pb-1 font-medium">{PlatAsset}oz</p>
          <p className="pb-1 font-medium">{PladAsset}oz</p>
        </div>
      </div>
      {CheckData ? (
        <div className="absolute sm:static w-[20rem] h-full  mt-36  sm:mt-1 right right2">
          <Doughnut
            data={{
              labels: ["Gold", "Silver", "Platinium", "Palladium"],
              datasets: [
                {
                  datalabels: {
                    // backgroundColor: function (context) {
                    //   return context.dataset.backgroundColor;
                    // },
                    // borderRadius: 4,
                    // borderColor: "black",
                    // borderWidth: 0,
                    // color: "white",
                    font: {
                      weight: "bold",
                      size: "16px",
                    },
                    labels: {
                      index: {
                        align: "center",
                        anchor: "center",
                        color: "white",
                        font: { size: 13 },
                        formatter: (value, ctx) => {
                          let sum = 0;
                          let dataArr = ctx.chart.data.datasets[0].data;
                          dataArr.map((data) => {
                            sum += data;
                          });
                          let percentage =
                            ((value * 100) / sum).toFixed(2) + "%";
                          return ctx.dataset.data[ctx.dataIndex] === null ||
                            ctx.dataset.data[ctx.dataIndex] === 0
                            ? null
                            : percentage;
                        },
                        // offset: 8,
                      },
                    },
                  },
                  data: [GoldAsset, SilverAsset, PlatAsset, PladAsset],
                  backgroundColor: ["#FFC533", "#BC95DF", "#02D3CC", "#F2726F"],
                  borderWidth: [0, 0, 0, 0],
                },
              ],
            }}
            options={options}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
