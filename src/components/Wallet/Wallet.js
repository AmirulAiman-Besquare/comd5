import "./styles.modules.css";
import { MdAccountBalanceWallet } from "react-icons/md";
import { Balance } from "./Balance";
import { PaymentMethod } from "./PaymentMethod";
import { WalletHistory } from "./WalletHistory";

export const Wallet = () => {
  return (
    <div>
      <div className="flex flex-col flex-wrap items-center justify-center pt-4 mt-2 ml-2 xl:items-start xl:mt-10 xl:gap-x-20 xl:flex-row ">
        <Balance />
        <PaymentMethod />
        <WalletHistory />
      </div>
    </div>
  );
};
