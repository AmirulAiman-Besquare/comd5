import React, { useState, useEffect } from "react";
import walleticon from "../asset/images/wallet.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export const Balance = () => {
  const [topupInputs, setTopupInputs] = useState({
    amount: "",
  });

  const [withdrawInputs, setwithdrawInputs] = useState({
    withdraw_amount: "",
  });

  const { amount } = topupInputs;
  const { withdraw_amount } = withdrawInputs;

  const onChangeTopUp = (e) => {
    setTopupInputs({ ...topupInputs, [e.target.name]: e.target.value });
  };

  const onChangeWithdraw = (e) => {
    setwithdrawInputs({ ...withdrawInputs, [e.target.name]: e.target.value });
  };

  const onSubmitTopUp = async (e) => {
    e.preventDefault();

    try {
      const body = { amount };

      const response = await fetch("http://157.245.57.54:5000/topup/", {
        method: "PUT",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      console.log(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  };

  const onSubmitWithdraw = async (e) => {
    e.preventDefault();

    try {
      const body = { withdraw_amount };

      const response = await fetch("http://157.245.57.54:5000/withdraw/", {
        method: "PUT",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      console.log(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  };

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
  }, [balance]);

  return (
    <div className=" mb-10 pb-1 rounded-lg shadow-xl box w-auto px-32 border-[#376db3] border-8 xl:max-w-xl ">
      <div className="flex flex-col items-center w-auto text-white ">
        <img src={walleticon} className="w-4/12 pt-3 mt-3" />
        <p className="pt-3 text-2xl font-bold">Total Balance</p>
        <p className="py-2 text-6xl font-bold">${balance}</p>
        <div className="flex gap-20 text-[1.3em] py-4">
          {/* <button id="withdrawbtn" className="p-2 font-bold rounded-lg">
            Withdraw
          </button> */}
          <Popup
            trigger={
              <button
                id="topbtn"
                className="border-[#0697E0] hover:bg-[#214172] border-4 rounded-full px-2 font-bold"
              >
                Withdraw
              </button>
            }
            position="right center"
          >
            <div>
              <form onSubmit={onSubmitWithdraw}>
                <input
                  type="number"
                  name="withdraw_amount"
                  value={withdraw_amount}
                  onChange={(e) => onChangeWithdraw(e)}
                />
                <button
                  type="submit"
                  className="w-full p-6 mt-3 text-white bg-blue-900 hover:bg-blue-600"
                >
                  Withdraw
                </button>
              </form>
            </div>
          </Popup>

          <Popup
            trigger={
              <button
                id="topbtn"
                className="border-[#0697E0] hover:bg-[#214172] border-4 rounded-full px-2 font-bold"
              >
                Top-Up
              </button>
            }
            position="right center"
          >
            <div>
              <form onSubmit={onSubmitTopUp}>
                <input
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={(e) => onChangeTopUp(e)}
                />
                <button
                  type="submit"
                  className="w-full p-6 mt-3 text-white bg-blue-900 hover:bg-blue-600"
                >
                  TOP UP
                </button>
              </form>
            </div>
          </Popup>
        </div>
      </div>
    </div>
  );
};
