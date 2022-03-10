import styles from "./Dashboard.modules.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DashBoardFav } from "./DashboardFav";
import linegraph from "../asset/images/linegraph.png";
import walleticon from "../asset/images/Wallet.svg";
import Select, { components } from "react-select";
import TableData from "../Charts/TableData";
import { Header } from "components/Header";

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#509AC6",
    border: "0",
    boxShadow: "none",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: "#509AC6",
      color: "white", //option text color
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
  singleValue: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "white",
    };
  },
  dropdownIndicator: (provided) => ({
    ...provided,
    svg: {
      fill: "white",
    },
  }),
  menuList: (base) => ({
    ...base,

    "::-webkit-scrollbar": {
      width: "4px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "gray",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }),
};
const options = [
  { value: "realtime", label: "Real-Time" },
  { value: "5min", label: "5 Minutes" },
  { value: "10min", label: "10 Minutes" },
  { value: "15min", label: "15 Minutes" },
  { value: "30min", label: "30 Minutes" },
  { value: "1hr", label: "1 Hour" },
  { value: "2hr", label: "2 Hours" },
  { value: "3hr", label: "3 Hours" },
  { value: "4hr", label: "4 Hours" },
  { value: "1day", label: "1 Day" },
];

export const DashBoard = () => {
  const [open, setOpen] = useState(false);

  const [balance, setBalance] = useState();

  async function getBalance() {
    try {
      const response = await fetch(
        "http://157.245.57.54:5000/display/balance",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();
      setBalance(parseRes[0].balance);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <>
      <Header title={"DASHBOARD"} />
      <div className="m-10 ">
        <div className="flex w-full gap-x-10">
          <div className="flex flex-col w-full gap-y-10">
            <div className="bg-[#075F93] p-3 rounded-xl">
              <div className="flex flex-row items-center pb-5 text-2xl text-white testt">
                <img className="ml-10 mr-20 w-96" src={linegraph} />
                <p className="flex-grow mt-2 ml-3 font-bold leading-none">
                  Come And Modify Your Life With Commodify!
                </p>
                <Link to={"/tx"}>
                  <button className="px-6 py-1 mt-4 mr-4 font-bold text-center justify-self-end dashboard-button">
                    Go Trade
                  </button>
                </Link>
              </div>
            </div>
            <DashBoardFav />
          </div>
          <div className="h-80 bg-[#075F93] w-96 p-4 rounded-xl">
            <div className="flex flex-col justify-center h-full text-2xl text-center text-white testt">
              <p>Current Balance</p>
              <img
                src={walleticon}
                className="w-auto my-6 h-36"
                draggable="false"
                dragstart="false;"
              />
              <p>${balance}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="h-full mt-10 bg-[#075F93] rounded-lg">
            <div className="flex flex-row">
              <p className="flex-grow p-6 ml-8 text-3xl font-bold text-white ">
                Market Overview
              </p>
              <Select
                styles={colourStyles}
                options={options}
                className="p-6 mr-8 text-base font-bold"
                isSearchable={false}
                defaultValue={options[0]}
                onBlur={() => setOpen(false)}
              />
              <TableData />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
