import "./styles.modules.css";
import { Balance } from "./Balance";
import { PaymentMethod } from "./PaymentMethod";
import { WalletHistory } from "./WalletHistory";
import { Header } from "components/Header";

export const Wallet = () => {
  return (
    <>
      <Header title={"WALLET"} />
      <div className="flex flex-col">
        <div className="justify-center mt-3 align-middle xl:mb-10 xl:flex-row xl:flex xl:mt-10">
          <Balance />
          <PaymentMethod />
        </div>
        <WalletHistory />
      </div>
    </>
  );
};
