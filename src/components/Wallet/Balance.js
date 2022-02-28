import React from "react";
import walleticon from "../../asset/images/wallet.png";

export const Balance = () => {
  return (
    <div className=" mb-10 pb-1 rounded-lg shadow-xl box w-auto px-32 border-[#376db3] border-8 xl:max-w-xl ">
      <div className="flex flex-col items-center w-auto text-white ">
        <img src={walleticon} className="w-4/12 pt-3 mt-3" />
        <p className="pt-3 text-2xl font-bold">Total Balance</p>
        <p className="py-2 text-6xl font-bold">$16,0290.92</p>
        <div className="flex gap-20 text-[1.3em] py-4">
          <button id="withdrawbtn" className="p-2 font-bold rounded-lg">
            Withdraw
          </button>
          <button
            id="topbtn"
            className="border-[#0697E0] hover:bg-[#214172] border-4 rounded-full px-2 font-bold"
          >
            Top-Up
          </button>
        </div>
      </div>
    </div>
  );
};
