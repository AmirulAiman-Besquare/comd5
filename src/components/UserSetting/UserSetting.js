import "./styles.modules.css";
import { Header } from "../Header/Header";
import { EmailPassword } from "./EmailPassword";
import { PersonalInfo } from "./PersonalInfo";

export const UserSetting = () => {
  return (
    <div>
      <Header title={"TRANSACTION"} />
      <div className="flex flex-col items-center justify-center pt-4 mt-2 ml-2 lg:mx-10 lg:items-start lg:gap-10 lg:flex-row xl:items-start xl:mt-10 xl:gap-20 xl:flex-row ">
        <PersonalInfo />
        <EmailPassword />
      </div>
    </div>
    // </div>
  );
};
