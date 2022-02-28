import React from "react";
import { BsCaretUpFill, BsCaretDownFill } from "react-icons/bs";

export const WalletHistory = () => {
  return (
    <div className="m-auto rounded-lg shadow-xl box  border-[#376db3] border-8 w-full mx-40">
      <div className="flex flex-row">
        <p className="flex-grow p-6 text-2xl font-bold text-white">
          Wallet Activity
        </p>
        <div className="text-white tab">
          <button className="mt-6 rounded-tl rounded-bl px-6 py-2 border border-[#088ED5] bg-[#122746] font-bold hover:bg-[#059DE6] ">
            Monthly
          </button>
          <button className="mt-6  px-6 py-2 border border-[#088ED5] bg-[#122746] font-bold hover:bg-[#059DE6] ">
            Weekly
          </button>
          <button className="mt-6 rounded-tr rounded-br mr-6 px-6 py-2 border border-[#088ED5] bg-[#122746] hover:bg-[#059DE6] font-bold">
            Daily
          </button>
        </div>
      </div>
      <div className="overflow-y-auto max-h-80 scrollbar">
        <table className="w-10/12 m-auto mb-6 overflow-scroll text-xl font-bold text-white rounded table-fixed">
          <tbody>
            <tr className="bg-[#059DE6] h-12 border border-[#059DE6]">
              <td className="w-10">
                <BsCaretUpFill className="m-auto fill-[#00FF38]" />
              </td>
              <td className="w-32">Top-Up</td>
              <td>22/02/2022</td>
              <td>00:00:00</td>
              <td>+$1200</td>
              <td className="text-[#00FF38]">Completed</td>
            </tr>
            <tr className="bg-[#122746] h-12 border-[#059DE6] border">
              <td className="w-10">
                <BsCaretDownFill className="m-auto fill-red-500" />
              </td>
              <td className="w-20 text-center">Withdraw</td>
              <td>22/02/2022</td>
              <td>00:00:00</td>
              <td>-$5347</td>
              <td className="text-[#DE0016]">Cancelled</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
