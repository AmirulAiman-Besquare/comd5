import "./styles.modules.css";
import { Balance } from "./Balance";
import { PaymentMethod } from "./PaymentMethod";
import { WalletHistory } from "./WalletHistory";
import { Header } from "components/Header";

export const Wallet = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col flex-wrap items-center justify-center pt-4 mt-2 ml-2 xl:items-start xl:mt-10 xl:gap-x-20 xl:flex-row ">
        <Balance />
        <PaymentMethod />
        <WalletHistory />
      </div>
    </>
  );
};
