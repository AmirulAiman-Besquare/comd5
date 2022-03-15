import React, { useState, useEffect } from "react";
import walleticon from "../asset/images/wallet.png";
import "reactjs-popup/dist/index.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { toast } from "react-toastify";

export const Balance = () => {
  const [topupInputs, setTopupInputs] = useState({
    amount: "",
  });

  const [withdrawInputs, setwithdrawInputs] = useState({
    withdraw_amount: "",
  });

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [disableTopup, setDisableTopup] = useState(0);
  const [showCfmModal1, setshowCfmModal1] = useState(false);

  const { amount } = topupInputs;
  const { withdraw_amount } = withdrawInputs;

  // const onChangeTopUp = (e) => {
  //   setTopupInputs({ ...topupInputs, [e.target.name]: e.target.value });
  // };

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
      toast.success("Top-Up Succeed");
    } catch (error) {
      console.error(error.message);
      toast.error("Top-up Failed");
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
      if (parseRes === "Insufficient Balance") {
        toast.error("Withdraw Failed");
      } else {
        toast.success("Withdraw Succeed");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const [balance, setBalance] = useState(
    <ScaleLoader color="#00B2FF" height={40} width={10} />
  );

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
      if (balance > 5000) {
        setDisableTopup(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getBalance();
  }, []);

  const ShowMdl1 = () => {
    setShowModal1(true);
  };
  const HideMdl1 = () => {
    setShowModal1(false);
  };

  const ShowMdl2 = () => {
    setShowModal2(true);
  };
  const HideMdl2 = () => {
    setShowModal2(false);
  };
  const ShowCfmMdl1 = () => {
    setshowCfmModal1(true);
  };
  const HideCfmMdl1 = () => {
    setshowCfmModal1(false);
  };
  const CloseWithdraw = () => {
    HideMdl1();
    ShowCfmMdl1();
  };
  const CloseCfmWithdraw = () => {
    getBalance();
    getBalance();
    getBalance();
    HideCfmMdl1();
  };
  const CloseTopUp = () => {
    getBalance();
    getBalance();
    HideMdl2();
  };

  return (
    <div className="mt-3 mx-3 mb-3 pb-1 rounded-lg shadow-xl box w-auto border-[#376db3] border-8 xl:max-w-xl ">
      <div className="text-white ">
        <div className="flex">
          <img
            src={walleticon}
            className="h-16 mt-5 ml-8 animate__animated animate__swing"
          />
          <div className="mt-3 text-center grow">
            <p className="pt-3 text-xl font-medium leading-none">
              Total Balance
            </p>
            <p className="py-2 text-3xl leading-none sm:text-6xl">${balance}</p>
          </div>
        </div>
        <div className="flex justify-center gap-2 text-[1.3em] py-2">
          <button
            id="topbtn"
            className="border-[#0697E0] hover:bg-[#214172] border-4 rounded-full px-2  font-medium"
            onClick={ShowMdl1}
          >
            Withdraw
          </button>
          <button
            id="topbtn"
            className="border-[#0697E0] hover:bg-[#214172] border-4 rounded-full px-2 font-medium"
            onClick={ShowMdl2}
            disabled={disableTopup}
          >
            Top-Up
          </button>
        </div>
      </div>
      {/* Withdraw */}
      <Rodal visible={showModal1} onClose={HideMdl1} height={180} width={300}>
        <div className="text-[#122746] mx-8 ">
          <p className="mb-2 text-2xl text-center">WITHDRAWAL</p>
          <p className="text-base">Amount</p>
          <input
            type="number"
            name="withdraw_amount"
            value={withdraw_amount}
            onChange={(e) => onChangeWithdraw(e)}
            className="w-full h-10 rounded"
          />
          <div className="flex justify-center h-full gap-2 mt-3">
            <button
              type="button"
              id="topbtn"
              className="border-[#0697E0] hover:bg-[#214172] border-2 rounded-full px-4 font-bold"
              onClick={HideMdl1}
            >
              Cancel
            </button>
            <button
              type="button"
              id="topbtn"
              className="border-[#0697E0] hover:bg-[#214172] border-4 rounded-full px-4 font-bold text-white bg-[#0697E0]"
              onClick={CloseWithdraw}
              disabled={withdraw_amount <= 0 ? true : false}
            >
              Withdraw
            </button>
          </div>
        </div>
      </Rodal>

      <Rodal
        visible={showCfmModal1}
        onClose={HideCfmMdl1}
        height={140}
        width={300}
      >
        <div className="text-[#122746] mx-8 ">
          <p className="mb-2 text-xl text-center">Confirm Withdrawal?</p>
          <p className="text-xl text-center">Amount: ${withdraw_amount}</p>
          <form onSubmit={onSubmitWithdraw}>
            <div className="flex justify-center h-full gap-2 mt-3">
              <button
                type="button"
                id="topbtn"
                className="border-[#0697E0] hover:bg-[#214172] border-2 rounded-full px-4 font-bold"
                onClick={HideCfmMdl1}
              >
                Cancel
              </button>
              <button
                type="submit"
                id="topbtn"
                className="border-[#0697E0] hover:bg-[#214172] border-4 rounded-full px-4 font-bold text-white bg-[#0697E0]"
                onClick={CloseCfmWithdraw}
                disabled={withdraw_amount <= 0 ? true : false}
              >
                Withdraw
              </button>
            </div>
          </form>
        </div>
      </Rodal>
      {/* TopUp */}
      <Rodal visible={showModal2} onClose={HideMdl2} height={140} width={300}>
        <div className="text-[#122746] mx-8 ">
          <p className="mb-2 text-xl text-center">Confirm TopUp?</p>
          <p className="text-xl text-center">Amount: $500</p>
          <form onSubmit={onSubmitTopUp}>
            <div className="flex justify-center h-full gap-2 mt-3">
              <button
                type="button"
                id="topbtn"
                className="border-[#0697E0] hover:bg-[#214172] border-2 rounded-full px-4 font-bold"
                onClick={HideMdl2}
              >
                Cancel
              </button>
              <button
                type="submit"
                id="topbtn"
                className="border-[#0697E0] hover:bg-[#214172] border-4 rounded-full px-4 font-bold text-white bg-[#0697E0]"
                onClick={CloseTopUp}
              >
                TopUp
              </button>
            </div>
          </form>
        </div>
      </Rodal>
    </div>
  );
};
