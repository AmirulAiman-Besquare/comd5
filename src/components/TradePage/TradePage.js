import React, { useEffect } from "react";
import useState from "react-usestateref";
import "./styles.modules.css";
import goldicon from "../asset/images/goldcoin.png";
import silvericon from "../asset/images/silvercoin.png";
import { Header } from "components/Header";
import walleticon from "../asset/images/Wallet.svg";
import ScaleLoader from "react-spinners/ScaleLoader";
import downicon from "../asset/images/down.png";
import upicon from "../asset/images/up.png";
import GoldTableData from "../Charts/TradeChart/TableData";
import { toast } from "react-toastify";

export const TradePage = () => {
  const [commodity, setCommodity] = useState("Xau");
  const [selectedAsset, setSelectedAsset, refselectedAsset] =
    useState("frxXAUUSD");
  const [granularity, setGranularity, refGranularity] = useState(60);
  const [assetQuote, setAssetQuote] = useState(
    <ScaleLoader color="#00B2FF" height={15} />
  );
  const [GoldAsset, setGoldAsset] = useState(
    <ScaleLoader color="#00B2FF" height={15} />
  );
  const [SilverAsset, setSilverAsset] = useState(
    <ScaleLoader color="#00B2FF" height={15} />
  );
  const [PlatAsset, setPlatAsset] = useState(
    <ScaleLoader color="#00B2FF" height={15} />
  );
  const [PladAsset, setPladAsset] = useState(
    <ScaleLoader color="#00B2FF" height={15} />
  );
  const [balance, setBalance] = useState(0);
  const [status, setStatus] = useState("similar");
  const app_id = 1089; //app_id for testing only
  let latestPrice = null;
  const [disableBtn, setDisableBtn] = useState(false);
  const [icon, setIcon] = useState(<></>);
  const [lastPrice, setLastPrice] = useState(0);

  useEffect(() => {
    setAssetQuote(<ScaleLoader color="#00B2FF" height={15} />);
    switch (commodity) {
      case "Xau":
        setSelectedAsset("frxXAUUSD");
        break;
      case "Xag":
        setSelectedAsset("frxXAGUSD");
        break;
      case "Xpt":
        setSelectedAsset("frxXPTUSD");
        break;
      case "Xpd":
        setSelectedAsset("frxXPDUSD");
        break;
    }
    const ws = new WebSocket(
      "wss://ws.binaryws.com/websockets/v3?app_id=" + app_id
    );
    ws.onopen = function (evt) {
      ws.send(JSON.stringify({ ticks: refselectedAsset.current }));
    };

    ws.onmessage = (evt) => {
      let res = JSON.parse(evt.data);
      latestPrice = "$" + parseFloat(res.tick.quote).toFixed(2);
      setAssetQuote(latestPrice);
      setLastPrice(assetQuote);
    };
    return () => {
      ws.close();
      setAssetQuote();
      setLastPrice();
    };
  }, [commodity]);

  const setColour = () => {
    if (lastPrice === assetQuote) {
      setStatus("similar");
      setLastPrice(assetQuote);
      setIcon();
    } else {
      if (assetQuote > lastPrice) {
        setIcon(<img src={upicon} />);
        setStatus("higher");
        setLastPrice(assetQuote);
      } else {
        setIcon(<img src={downicon} />);
        setStatus("lower");
        setLastPrice(assetQuote);
      }
    }
  };

  useEffect(() => {
    setColour();
  }, [assetQuote]);

  const [BuyInputs, setBuyInputs] = useState({
    buy_amount: "",
  });
  const [SellInputs, setSellInputs] = useState({
    sell_amount: "",
  });
  const { buy_amount } = BuyInputs;
  const { sell_amount } = SellInputs;

  const onChangeBuy = (e) => {
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
    setBuyInputs({ ...BuyInputs, [e.target.name]: e.target.value });
  };

  const onChangeSell = (e) => {
    const { value } = e.target;
    // check if value includes a decimal point
    if (value.match(/\./g)) {
      const [, decimal] = value.split(".");
      // restrict value to only 2 decimal places
      if (decimal?.length > 3) {
        // do nothing
        return;
      }
    }
    // otherwise, update value in state
    setSellInputs({ ...SellInputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (parseInt(buy_amount) <= -1) {
      setDisableBtn(true);
    } else if (parseInt(sell_amount) <= -1) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [buy_amount, sell_amount]);

  const onSubmitBuy = async (e) => {
    e.preventDefault();

    try {
      const body = { buy_amount };
      const response = await fetch(`https://api.comd5.xyz/buy/${commodity}`, {
        method: "PUT",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      console.log(JSON.stringify(body));
      console.log(parseRes);
      if (parseRes === "Purchase Failed") {
        toast.error("Purchase Failed");
      } else {
        toast.success("Purchase Succeed");
      }
      getAsset();
      getBalance();
    } catch (error) {
      console.error(error.message);
      toast.error("Buy Failed");
    }
  };

  const onSubmitSell = async (e) => {
    e.preventDefault();
    try {
      const body = { sell_amount };

      const response = await fetch(`https://api.comd5.xyz/sell/${commodity}`, {
        method: "PUT",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      console.log(JSON.stringify(body));
      console.log(parseRes);
      if (parseRes === "Not enough gold to sell") {
        toast.error("Sell Failed");
      } else {
        toast.success("Sell Succeed");
      }
      getAsset();
      getBalance();
    } catch (error) {
      console.error(error.message);
    }
  };

  async function getAsset() {
    try {
      const response = await fetch("https://api.comd5.xyz/display/asset", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setGoldAsset(parseRes[0].gold_amount);
      setSilverAsset(parseRes[0].silver_amount);
      setPlatAsset(parseRes[0].platinum_amount);
      setPladAsset(parseRes[0].palladium_amount);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getBalance() {
    try {
      const response = await fetch("https://api.comd5.xyz/display/balance", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setBalance(parseRes[0].balance);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getAsset();
    getBalance();
  }, []);

  return (
    <>
      <Header title={"TRADING"} className="z-50" />
      {/* <div className="mx-36 bg-[#075F93] p-10 rounded-lg"> */}
      <div className="rounded-lg ">
        <div className="absolute z-40">
          <div className="flex flex-col w-full xl:flex-row">
            <div className=" p-2 w-40 h-[3.8em] sm:h-[4.6em] xl:h-[5.6em] m-auto  drop-shadow rounded-xl ">
              <select
                onChange={(e) => setGranularity(e.target.value)}
                className="w-full h-full p-1 px-2 m-auto text-base font-bold text-center text-white bg-gray-800 border border-black rounded-md outline-none appearance-none placeholder:text-slate-500 hover:bg-gray-900 focus:ring-1 focus:ring-gray-300"
              >
                <option value={60}>1 Min</option>
                <option value={120}>2 Mins</option>
                <option value={180}>3 Mins</option>
                <option value={300}>5 Mins</option>
                <option value={600}>10 Mins</option>
                <option value={900}>15 Mins</option>
                <option value={1800}>30 Mins</option>
                <option value={3600}>1 Hours</option>
                <option value={7200}>2 Hours</option>
                <option value={14400}>4 Hours</option>
                <option value={28800}>8 Hours</option>
                {/* <option value={86400}>1 Day</option> */}
              </select>
            </div>
            <div className="p-2 w-40 h-[3.8em] sm:h-[4.6em] xl:h-[5.6em] m-auto  drop-shadow rounded-xl  ">
              <select
                onChange={(e) => setCommodity(e.target.value)}
                className="w-full h-full p-1 px-2 m-auto text-base font-bold text-center text-white bg-gray-800 border border-black rounded-md outline-none appearance-none placeholder:text-slate-500 hover:bg-gray-900 focus:ring-1 focus:ring-gray-300"
              >
                <option value="Xau">GOLD</option>
                <option value="Xag">SILVER</option>
                <option value="Xpt">PLATINIUM</option>
                <option value="Xpd">PALLADIUM</option>
              </select>
            </div>
            <div className="flex gap-4 p-2 m-auto mx-2 drop-shadow rounded-xl ">
              <div className="hidden sm:flex px-4 py-[0.35rem] bg-gray-800 rounded w-36">
                <div className="flex flex-col w-full text-xl leading-none text-center text-white align-middle ">
                  <p className="mb-1 ml-1 text-sm text-white ">Price Index</p>
                  <div
                    className={
                      status === "similar"
                        ? "text-white text-xl flex m-auto gap-2 font-bold leading-none"
                        : status === "higher"
                        ? "text-[#5CEE21] text-xl flex m-auto gap-2 font-bold leading-none"
                        : "text-[#FB512D] text-xl flex m-auto gap-2 font-bold leading-none"
                    }
                  >
                    {icon}
                    {assetQuote}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <GoldTableData
          asset={refselectedAsset.current}
          granularity={refGranularity.current}
        />
      </div>
      <div className="flex flex-col sm:pb-4 sm:mx-12 sm:mt-8 sm:mb-4 md:flex-row place-content-evenly">
        <div className="flex flex-col xl:flex-row gap-y-2">
          <div className="flex flex-col justify-center gap-y-2 sm:flex-row">
            <div className="sm:w-[15rem]  mx-2 p-2 flex gap-4 m-auto bg-[#075F93] drop-shadow rounded-xl ">
              <div className="flex px-4 py-1 w-full rounded bg-[#0A2458]">
                <img src={walleticon} className="w-10" />
                <div className="flex flex-col w-full ml-3 text-xl leading-none text-center text-white align-middle">
                  <p className="mb-1 ml-1 text-sm">Balance</p>
                  <div className="font-bold">${balance}</div>
                </div>
              </div>
            </div>
            <div className=" sm:w-[15rem] flex gap-4 p-3 m-auto mx-2  bg-[#075F93] drop-shadow rounded-xl ">
              <input
                type="number"
                placeholder="Min 10$"
                name="buy_amount"
                value={buy_amount}
                onKeyDown={(event) => {
                  if (event.key === "-" || event.key === "e") {
                    event.preventDefault();
                  }
                }}
                minLength="1"
                maxLength="10"
                onChange={(e) => onChangeBuy(e)}
                className=" px-2 m-auto text-base font-bold text-center text-gray-800 rounded-md outline-none appearance-none placeholder:text-[#878787] shadow-inner bg-[#F9F7F7] w-full sm:w-28"
              />
              <form onSubmit={onSubmitBuy}>
                <button
                  type="submit"
                  disabled={disableBtn}
                  className="transform transition duration-500 hover:scale-110 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800  rounded-lg text-sm px-7 py-2.5 text-center font-bold"
                >
                  Buy
                </button>
              </form>
            </div>
          </div>
          <div className="hidden w-20 xl:block"></div>
          <div className="flex flex-col justify-center gap-y-2 sm:flex-row">
            <div className="sm:w-[15rem] mx-2 p-2  flex gap-4 m-auto bg-[#075F93] drop-shadow rounded-xl ">
              <div className="flex px-4 py-1 w-full rounded bg-[#0A2458]">
                {commodity === "Xau" ? (
                  <img src={goldicon} className="w-12" />
                ) : (
                  <img src={silvericon} className="w-12" />
                )}
                <div className="flex flex-col ml-3 text-xl leading-none text-center text-white align-middle grow w-34">
                  <p className="w-full mb-1 ml-1 text-sm">Asset Owned</p>
                  <div className="font-bold">
                    {commodity === "Xau"
                      ? GoldAsset
                      : commodity === "Xag"
                      ? SilverAsset
                      : commodity === "Xpt"
                      ? PlatAsset
                      : PladAsset}
                    oz
                  </div>
                </div>
              </div>
            </div>
            <div className=" sm:w-[15rem] flex gap-4 p-3 m-auto mx-2 bg-[#075F93] drop-shadow rounded-xl">
              <input
                type="number"
                placeholder="oz"
                name="sell_amount"
                value={sell_amount}
                onKeyDown={(event) => {
                  if (event.key === "-" || event.key === "e") {
                    event.preventDefault();
                  }
                }}
                minLength="1"
                maxLength="10"
                onChange={(e) => onChangeSell(e)}
                className="w-full sm:w-28 px-2 m-auto text-base font-bold text-center text-gray-800 rounded-md outline-none appearance-none placeholder:text-[#878787] shadow-inner bg-[#F9F7F7]"
              />
              <form onSubmit={onSubmitSell}>
                <button
                  type="submit"
                  disabled={disableBtn}
                  className="transform transition duration-500 hover:scale-110 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800  rounded-lg text-sm px-7 py-2.5 text-center font-bold"
                >
                  Sell
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
