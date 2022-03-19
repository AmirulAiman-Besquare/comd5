import React, { useState, useEffect } from "react";
import walleticon from "../asset/images/wallet.png";
import "reactjs-popup/dist/index.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { toast } from "react-toastify";

export const Balance = (props) => {
  const [topupInputs, setTopupInputs] = useState({
    amount: "",
  });

  const [withdrawInputs, setwithdrawInputs] = useState({
    withdraw_amount: "",
  });

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [disableTopup, setDisableTopup] = useState(false);
  const [showCfmModal1, setshowCfmModal1] = useState(false);

  const { amount } = topupInputs;
  let { withdraw_amount } = withdrawInputs;

  // const onChangeTopUp = (e) => {
  //   setTopupInputs({ ...topupInputs, [e.target.name]: e.target.value });
  // };

  const onChangeWithdraw = (e) => {
    const { value } = e.target;
    // check if value includes a decimal point
    if (value.match(/\./g)) {
      const [, decimal] = value.split(".");
      // restrict value to only 2 decimal places
      if (decimal?.length > 2) {
        // do nothing
        return;
      }
    }
    // otherwise, update value in state
    setwithdrawInputs({ ...withdrawInputs, [e.target.name]: e.target.value });
  };

  const onSubmitTopUp = async (e) => {
    e.preventDefault();

    try {
      const body = { amount };

      const response = await fetch("https://api.comd5.xyz/topup/", {
        method: "PUT",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      props.func(1);
      toast.success("Top-Up Succeed");
    } catch (error) {
      console.error(error.message);
      toast.error("Top-up Failed");
    }
  };

  const onSubmitWithdraw = async (e) => {
    e.preventDefault();
    let w_amount = parseFloat(withdraw_amount).toFixed(2).toString();
    withdraw_amount = w_amount;
    try {
      const body = { withdraw_amount };
      const response = await fetch("https://api.comd5.xyz/withdraw/", {
        method: "PUT",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      props.func(1);
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
      const response = await fetch("https://api.comd5.xyz/display/balance", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setBalance(parseRes[0].balance);
      if (balance < 10000) {
        setDisableTopup(false);
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
    getBalance();
    getBalance();
    getBalance();
    HideMdl2();
  };

  return (
    <div className="xl:w-96 mx-3 mb-3 pb-1 rounded-lg shadow-xl box w-auto border-[#376db3] border-8 ">
      <div className="text-white xl:mt-12">
        <div className="flex-col justify-center w-full gap-3 mt-3 align-middle">
          <img
            src={walleticon}
            className="h-16 m-auto animate__animated animate__swing sm:h-24 xl:mb-2"
          />
          <div className="">
            <p className="text-xl font-medium leading-none text-center">
              Total Balance
            </p>
            <p className="text-3xl leading-none text-center sm:text-5xl">
              ${balance}
            </p>
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
            className="border-[#0697E0] hover:bg-[#214172] border-4 rounded-full px-2 font-medium disabled:bg-[#505355] disabled:border-[#505355]"
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
            pattern="^\d*(\.\d{0,2})?$"
            value={withdraw_amount}
            onChange={(e) => onChangeWithdraw(e)}
            onKeyDown={(event) => {
              if (event.key === "-" || event.key === "e") {
                event.preventDefault();
              }
            }}
            minLength="1"
            maxLength="10"
            className="w-full h-10 rounded"
          />
          <div className="flex justify-center h-full gap-2 mt-3">
            <button
              type="button"
              id="topbtn"
              className="border-[#0697E0] hover:bg-[#214172] border-2 rounded-full px-4 font-bold "
              onClick={HideMdl1}
            >
              Cancel
            </button>
            <button
              type="button"
              id="topbtn"
              className="disabled:bg-[#505355] disabled:border-[#505355] border-[#0697E0] hover:bg-[#214172] border-4 rounded-full px-4 font-bold text-white bg-[#0697E0]"
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
          <p className="text-xl text-center">
            Amount: ${parseFloat(withdraw_amount).toFixed(2)}
          </p>
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
