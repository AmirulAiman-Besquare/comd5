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
import GoldTableData from "../Charts/TradeChart/GoldTableData";
import { toast } from "react-toastify";

export const TradePage = () => {
  const [commodity, setCommodity] = useState("Xau");
  const [selectedAsset, setSelectedAsset] = useState("frxXAUUSD");
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
  const [balance, setBalance] = useState();
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
      ws.send(JSON.stringify({ ticks: selectedAsset }));
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
      // setLastPrice();
    };
  }, [commodity]);

  const setColour = () => {
    console.log(assetQuote, lastPrice);
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

  const [Inputs, setInputs] = useState({
    amount: "",
  });

  const { amount } = Inputs;

  const onChange = (e) => {
    setInputs({ ...Inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (parseInt(amount) <= -1) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [amount]);

  const onSubmitBuy = async (e) => {
    e.preventDefault();
    console.log(typeof amount);

    try {
      const body = { amount };
      const response = await fetch(
        `http://157.245.57.54:5000/buy/${commodity}`,
        {
          method: "PUT",
          headers: {
            token: localStorage.token,
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();
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
      const body = { amount };

      const response = await fetch(
        `http://157.245.57.54:5000/sell/${commodity}`,
        {
          method: "PUT",
          headers: {
            token: localStorage.token,
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();
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
      const response = await fetch("http://157.245.57.54:5000/display/asset", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setGoldAsset(parseRes[0].gold_amount);
      setSilverAsset(parseRes[0].silver_amount);
      setPlatAsset(parseRes[0].plat_amount);
      setPladAsset(parseRes[0].plad_amount);
    } catch (error) {
      console.error(error.message);
    }
  }

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
    getAsset();
    getBalance();
  }, []);

  return (
    <>
      <Header title={"TRADING"} />
      <div className="flex flex-col pb-4 mx-12 mt-8 mb-4 md:flex-row place-content-evenly">
        <div className="flex flex-row">
          <div className="flex justify-center">
            <div className="mx-2 p-2 flex gap-4 m-auto bg-[#075F93] drop-shadow rounded-xl ">
              <div className="flex px-4 py-1 rounded box">
                {commodity === "Xau" ? (
                  <img src={goldicon} className="w-12" />
                ) : (
                  <img src={silvericon} className="w-12" />
                )}
                <div className="flex flex-col w-full ml-3 text-xl leading-none text-center text-white align-middle">
                  <p className="mb-1 ml-1 text-sm">Asset Owned</p>
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
            <div className="my-2 mx-2 p-2 w-40 h-[5.1em] m-auto bg-[#075F93] drop-shadow rounded-xl ">
              <select
                onChange={(e) => setCommodity(e.target.value)}
                className="w-full h-full p-1 px-2 m-auto text-base font-bold text-center text-gray-800 bg-white rounded-md outline-none appearance-none placeholder:text-slate-500"
              >
                <option value="Xau">GOLD</option>
                <option value="Xag">SILVER</option>
                <option value="Xpt">PLATINIUM</option>
                <option value="Xpd">PALLADIUM</option>
              </select>
            </div>
          </div>
          <div className="mx-2 p-2 flex gap-4 m-auto bg-[#075F93] drop-shadow rounded-xl ">
            <div className="flex px-4 py-1 rounded box">
              <div className="flex flex-col w-full text-xl leading-none text-center text-white align-middle">
                <p className="mb-1 ml-1 text-sm">Price Index</p>
                <div
                  className={
                    status === "similar"
                      ? "text-white text-xl flex m-auto gap-2 font-bold leading-none"
                      : status === "higher"
                      ? "text-green-300 text-xl flex m-auto gap-2 font-bold leading-none"
                      : "text-red-600 text-xl flex m-auto gap-2 font-bold leading-none"
                  }
                >
                  {icon}
                  {assetQuote}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-2 p-2 flex gap-4 m-auto bg-[#075F93] drop-shadow rounded-xl ">
            <div className="flex px-4 py-1 rounded box">
              <img src={walleticon} className="w-10" />
              <div className="flex flex-col w-full ml-3 text-xl leading-none text-center text-white align-middle">
                <p className="mb-1 ml-1 text-sm">Balance</p>
                <div className="font-bold">${balance}</div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full mx-2">
            <div className="my-2 mx-2 p-2 w-40 h-[5.1em] m-auto bg-[#075F93] drop-shadow rounded-xl ">
              <input
                type="number"
                placeholder="Insert Amount"
                name="amount"
                value={amount}
                onKeyDown={(event) => {
                  if (event.key === "-" || event.key === "e") {
                    event.preventDefault();
                  }
                }}
                minLength="1"
                maxLength="10"
                onChange={(e) => onChange(e)}
                className="w-full h-full p-1 px-2 m-auto text-base font-bold text-center text-gray-800 rounded-md outline-none appearance-none placeholder:text-slate-500"
              />
            </div>
          </div>
          <div className="flex gap-4 p-3 m-auto mx-2 border-2 box border-[#075F93] drop-shadow rounded-xl ">
            <form onSubmit={onSubmitBuy}>
              <button
                type="submit"
                disabled={disableBtn}
                className="transform transition duration-500 hover:scale-110 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800  rounded-lg text-sm px-7 py-2.5 text-center font-bold"
              >
                Buy
              </button>
            </form>
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
      <div className="mx-36 bg-[#075F93] p-10 rounded-lg">
        <GoldTableData asset={selectedAsset} />
      </div>
    </>
  );
};
