import styles from "./Dashboard.modules.css";
import { useState, useEffect } from "react";
import { TicksPriceWs } from "./TicksPriceWs";
import walleticon from "../asset/images/Wallet.svg";
import { Header } from "components/Header";
import { AssestAnalysis } from "./AssestAnalysis";
import { DoughnutChart } from "components/Charts/DashBoardChart/DoughnutChart";
import { ActivitySummary } from "./ActivitySummary";

export const DashBoard = () => {
  const [balance, setBalance] = useState();

  async function getBalance() {
    try {
      const response = await fetch("https://api.comd5.xyz/display/balance", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setBalance(parseRes[0].balance);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    const unsubscribe = getBalance(); //subscribe
    return unsubscribe; //unsubscribe
  }, []);

  return (
    <>
      <Header title={"DASHBOARD"} />
      <div className="lg:mx-0 lg:mt-0 xl:mx-20 xl:mt-5">
        <div className="flex flex-col w-full xl:flex-row gap-x-10 xl:gap-x-7 xl:items-start xl:mb-6 xl:align-middle xl:justify-center">
          <div className="lg:h-80 bg-[#075F93] xl:w-96 p-2 m-2 rounded sm:rounded-xl xl:hidden">
            <div className="flex flex-col justify-center h-full text-center text-white sm:py-2 testt">
              <p className="text-xl sm:text-2xl">Current Balance</p>
              <img
                src={walleticon}
                className="absolute left-[2rem] sm:left-[15rem]  lg:left-0 w-auto h-10 lg:static lg:my-6 lg:h-36 animate__swing animate__animated"
              />
              <p className="text-xl sm:text-2xl">${balance}</p>
            </div>
          </div>
          <div className="bg-[#075F93] rounded sm:rounded-xl m-2 w-auto py-2 xl:m-0 xl:py-0 xl:px-2 h-full">
            <div className="flex flex-col justify-center w-full h-full gap-2 px-5 sm:flex-row lg:justify-around lg:py-6 xl:gap-14">
              <TicksPriceWs asset={"frxXAUUSD"} />
              <TicksPriceWs asset={"frxXAGUSD"} />
              <TicksPriceWs asset={"frxXPTUSD"} />
              <TicksPriceWs asset={"frxXPDUSD"} />
            </div>
          </div>
          <div className="hidden xl:block h-[20.5rem] bg-[#075F93] w-96 p-5 rounded-xl ">
            <div className="flex flex-col justify-center h-full text-2xl text-center text-white testt">
              <p>Current Balance</p>
              <img
                src={walleticon}
                className="w-auto my-6 h-36 animate__swing animate__animated"
                draggable="false"
                dragstart="false;"
              />
              <p>${balance}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center w-full h-full m-auto align-middle xl:flex-row gap-x-4">
          <AssestAnalysis />

          <DoughnutChart />

          <ActivitySummary />
        </div>
      </div>
    </>
  );
};
