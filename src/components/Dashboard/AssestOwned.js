import React, { useEffect, useState } from "react";
import { AssetAnalysisRow } from "./AssetAnalysisRow";

export const AssetOwned = () => {
  return (
    <>
      <div className="h-full bg-[#075F93]  p-4 rounded-xl ">
        <p className="text-xl text-white">Asset Owned</p>
        <div className="w-full h-full rounded-lg">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full bg-[#122746] rounded-xl mt-2 table-fixed">
                    <thead className="border-b-2">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-4 text-sm font-medium text-center text-white"
                        >
                          Commodity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-sm font-medium text-center text-white"
                        >
                          Total Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-sm font-medium text-center text-white"
                        >
                          Bought Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-sm font-medium text-center text-white"
                        >
                          Market Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <AssetAnalysisRow asset={"RDBEAR"} />
                      <AssetAnalysisRow asset={"RDBEAR"} />
                      <AssetAnalysisRow asset={"RDBEAR"} />
                      <AssetAnalysisRow asset={"RDBEAR"} />
                      {/* <AssetAnalysisRow asset={"frxXAGUSD"} /> */}
                      {/* <AssetAnalysisRow asset={"frxXPTUSD"} /> */}
                      {/* <AssetAnalysisRow asset={"frxXPDUSD"} /> */}
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
