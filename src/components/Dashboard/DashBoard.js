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
      <div className="mx-20 mt-10">
        <div className="flex w-full gap-x-10">
          <div className="flex flex-col w-full gap-y-10">
            <div className="bg-[#075F93] rounded-xl h-full">
              <div className="flex justify-around w-full h-full py-6 align-middle ">
                <TicksPriceWs asset={"frxXAUUSD"} />
                <TicksPriceWs asset={"frxXAGUSD"} />
                <TicksPriceWs asset={"frxXPTUSD"} />
                <TicksPriceWs asset={"frxXPDUSD"} />
              </div>
            </div>
          </div>
          <div className="h-80 bg-[#075F93] w-96 p-4 rounded-xl">
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
        <div className="flex justify-center w-full h-full m-auto mt-10 align-middle gap-x-12">
          <AssestAnalysis />

          <DoughnutChart />

          <ActivitySummary />
        </div>
      </div>
    </>
  );
};
