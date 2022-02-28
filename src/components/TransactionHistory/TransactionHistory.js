import "./styles.modules.css";
import buyicon from "../../asset/images/buy_icon.png";
import sellicon from "../../asset/images/sell_icon.png";
import goldicon from "../../asset/images/gold.png";
import silvericon from "../../asset/images/silver.png";

export const TransactionHistory = () => {
  return (
    <div className="w-11/12 m-auto mt-12 rounded-lg bg-[#13407B] shadow-xl xxl:w-9/12">
      <div className="flex flex-row">
        <p className="flex-grow p-6 ml-8 text-4xl font-bold text-white">
          History
        </p>
        <div className="mr-8 text-white tab">
          <button className="mt-6 rounded-tl rounded-bl px-6 py-2 border border-[#088ED5] bg-[#122746] font-bold hover:bg-[#059DE6] ">
            Monthly
          </button>
          <button className="mt-6  px-6 py-2 border border-[#088ED5] bg-[#122746] font-bold hover:bg-[#059DE6] ">
            Weekly
          </button>
          <button className="mt-6 rounded-tr rounded-br mr-6 px-6 py-2 border border-[#088ED5] bg-[#122746] hover:bg-[#059DE6] font-bold">
            Today
          </button>
        </div>
      </div>
      <div className="overflow-y-auto max-h-[52em] scrollbar">
        <table className="w-11/12 m-auto mb-6 overflow-scroll text-white rounded table-fixed">
          <thead className="bg-[#689ebd] text-xl border-[#689ebd] border">
            <tr>
              <th className="w-20 ">Type</th>
              <th className="w-48 ">Ref. ID</th>
              <th className="w-32 ">Quantity</th>
              <th>Transaction Time</th>
              <th className="w-48 ">Transaction Type</th>
              <th className="w-32 ">Amount</th>
              <th className="w-48 ">Credit/Debit</th>
            </tr>
          </thead>
          <tbody className="text-base">
            <tr className="bg-[#059DE6] h-12 border border-[#059DE6]">
              <td>
                <img className="m-auto" src={goldicon} />
              </td>
              <td>23456798</td>
              <td>200g</td>
              <td>
                12 Feb 2022
                <br /> 06:24:45 GMT
              </td>
              <td>
                <img className="m-auto" src={buyicon} />
              </td>
              <td>10,928.00</td>
              <td>-1000</td>
            </tr>
            <tr className="bg-[#122746] h-12 border-[#059DE6] border">
              <td>
                <img className="m-auto" src={silvericon} />
              </td>
              <td>23456798</td>
              <td>200g</td>
              <td>
                12 Feb 2022
                <br /> 06:24:45 GMT
              </td>
              <td>
                <img className="m-auto" src={sellicon} />
              </td>
              <td>10,928.00</td>
              <td>-1000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
