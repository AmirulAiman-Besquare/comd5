import React, { useEffect, useState } from "react";

export const ActivitySummary = () => {
  return (
    <>
      <div className="h-full bg-[#075F93]  p-4 rounded-xl w-96">
        <p className="mb-3 text-2xl text-white">Activity Summary</p>
        <div className=" h-full rounded-lg bg-[#122746] text-white ">
          <div className="flex w-full mb-10">
            <div className="mt-6 grow">
              <div className="bg-[#64ECFF]  rounded-xl mx-7 h-28">
                <p className="pt-3 text-6xl text-center">10</p>
                <p className="text-2xl text-center">BUY</p>
              </div>
            </div>
            <div className="mt-6 grow">
              <div className="bg-[#4761A4]  rounded-xl mx-7 h-28">
                <p className="pt-3 text-6xl text-center">10</p>
                <p className="text-2xl text-center">SELL</p>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="mb-6 grow">
              <div className="bg-[#418FCC]  rounded-xl mx-7 h-28">
                <p className="pt-3 text-6xl text-center">10</p>
                <p className="text-2xl text-center">TOPUP</p>
              </div>
            </div>
            <div className="mb-6 grow">
              <div className="bg-[#45BDEA]  rounded-xl mx-7 h-28">
                <p className="pt-3 text-6xl text-center">10</p>
                <p className="mt-1 text-base text-center">WITHDRAW</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
