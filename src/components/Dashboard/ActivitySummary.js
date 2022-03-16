import React, { useEffect, useState } from "react";

export const ActivitySummary = () => {
  const [buy, setBuy] = useState(0);
  const [sell, setSell] = useState(0);
  const [topup, setTopUp] = useState(0);
  const [withdraw, setWithdraw] = useState(0);

  async function getTransactionHistory() {
    try {
      const response = await fetch(
        "https://api.comd5.xyz/display/transaction",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();

      let tx_type = parseRes.map((item) => {
        return [item.tx_type];
      });
      const counts = {};
      tx_type.forEach((x) => {
        counts[x] = (counts[x] || 0) + 1;
      });
      if (counts.hasOwnProperty("buy")) {
        setBuy(counts.buy);
      } else {
        setBuy(0);
      }

      if (counts.hasOwnProperty("sell")) {
        setSell(counts.sell);
      } else {
        setSell(0);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getWalletHistory() {
    try {
      const response = await fetch("https://api.comd5.xyz/display/payment", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      let payment_type = parseRes.map((item) => {
        return [item.payment_type];
      });
      const counts = {};
      payment_type.forEach((x) => {
        counts[x] = (counts[x] || 0) + 1;
      });
      if (counts.hasOwnProperty("Topup")) {
        setTopUp(counts.Topup);
      } else {
        setTopUp(0);
      }

      if (counts.hasOwnProperty("Withdraw")) {
        setWithdraw(counts.Withdraw);
      } else {
        setWithdraw(0);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    getTransactionHistory();
    getWalletHistory();
  }, []);

  return (
    <>
      <div className="h-full bg-[#075F93]  p-4 rounded-xl w-96">
        <p className="mb-3 text-2xl text-white">Activity Summary</p>
        <div className=" h-full rounded-lg bg-[#122746] text-white ">
          <div className="flex w-full mb-10">
            <div className="mt-6 grow">
              <div className="bg-[#03C5BE]  rounded-xl mx-7 h-28">
                <p className="pt-3 text-6xl text-center">{buy}</p>
                <p className="text-2xl text-center">BUY</p>
              </div>
            </div>
            <div className="mt-6 grow">
              <div className="bg-[#F2726F]  rounded-xl mx-7 h-28">
                <p className="pt-3 text-6xl text-center">{sell}</p>
                <p className="text-2xl text-center">SELL</p>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="mb-6 grow">
              <div className="bg-[#4761A4]  rounded-xl mx-7 h-28">
                <p className="pt-3 text-6xl text-center">{topup}</p>
                <p className="text-2xl text-center">TOPUP</p>
              </div>
            </div>
            <div className="mb-6 grow">
              <div className="bg-[#2FAFE5]  rounded-xl mx-7 h-28">
                <p className="pt-3 text-6xl text-center">{withdraw}</p>
                <p className="mt-1 text-base text-center">WITHDRAW</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
