import "./styles.modules.css";
import { Balance } from "./Balance";
import { PaymentMethod } from "./PaymentMethod";
import { WalletHistory } from "./WalletHistory";
import { Header } from "components/Header";
import { useState } from "react";

export const Wallet = () => {
  const [trigger, settrigger] = useState(0);
  const pull_data = (data) => {
    settrigger(trigger + data);
  };

  return (
    <>
      <Header title={"WALLET"} />
      <div className="flex flex-col">
        <div className="justify-center mt-3 align-middle xl:mb-10 xl:flex-row xl:flex xl:mt-10">
          <Balance func={pull_data} />
          <PaymentMethod />
        </div>
        <WalletHistory func={trigger} />
      </div>
    </>
  );
};
