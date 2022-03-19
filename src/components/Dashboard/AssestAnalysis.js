import React, { useEffect, useState } from "react";
import { AssetAnalysisRow } from "./AssetAnalysisRow";

export const AssestAnalysis = () => {
  return (
    <>
      <div className="h-full bg-[#075F93] m-2  p-4 pb-2 rounded sm:rounded-xl xl:pb-6">
        <p className="pb-1 text-2xl text-center text-white xl:text-left xl:pl-2">
          Asset Analysis
        </p>
        <div className="w-full h-full rounded-lg">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-3 lg:px-8">
                <div className="overflow-auto">
                  <table className="min-w-full bg-[#122746] rounded-xl mt-2">
                    <thead className="border-b-2">
                      <tr>
                        <th
                          scope="col"
                          className="px-3 py-1 text-base font-medium text-center text-white sm:py-3 xl:px-6 xl:py-4"
                        >
                          Commodity
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-1 text-base font-medium text-center text-white xl:px-6 xl:py-4"
                        >
                          Actual Amount
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-1 text-base font-medium text-center text-white xl:px-6 xl:py-4"
                        >
                          Change
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-1 text-base font-medium text-center text-white xl:px-6 xl:py-4"
                        >
                          %Change
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <AssetAnalysisRow asset={"frxXAUUSD"} />
                      <AssetAnalysisRow asset={"frxXAGUSD"} />
                      <AssetAnalysisRow asset={"frxXPTUSD"} />
                      <AssetAnalysisRow asset={"frxXPDUSD"} />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
