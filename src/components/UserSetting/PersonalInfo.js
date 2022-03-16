import "./styles.modules.css";
import { FaRegUser } from "react-icons/fa";
import { ImPhone } from "react-icons/im";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import usericon from "../asset/images/usericon.png";

export const PersonalInfo = () => {
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneno, setPhoneNo] = useState("");
  const [id, setId] = useState("");
  const [PhoneNumInputs, setPhoneNumInputs] = useState({
    phone_number: "",
  });
  // const [disableBtn, setDisableBtn] = useState(true);

  //retrieve data
  async function getDetails() {
    try {
      const response = await fetch("https://api.comd5.xyz/display/user", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      console.log(parseRes);

      setFirstName(parseRes[0].first_name);
      setLastName(parseRes[0].last_name);
      setId(parseRes[0].user_id);
      if (parseRes[0].phone_number === "") {
        setPhoneNo("Example: 01234567899");
      } else {
        setPhoneNo(parseRes[0].phone_number);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getDetails();
    return () => {
      getDetails();
    };
  }, []);

  // useEffect(() => {
  //   if (PhoneNumInputs.phone_number !== "") {
  //     setDisableBtn(false);
  //   } else {
  //     setDisableBtn(true);
  //   }
  //   return () => {
  //     setDisableBtn(false);
  //   };
  // }, [PhoneNumInputs]);

  const { phone_number } = PhoneNumInputs;
  const onChangePhoneNum = (e) => {
    setPhoneNumInputs({ ...PhoneNumInputs, [e.target.name]: e.target.value });
  };

  const onSubmitPhoneNum = async (e) => {
    e.preventDefault();
    if (btnTextPersonalInfo === "Save") {
      <></>;
    } else {
      try {
        const body = { phone_number };

        const response = await fetch("https://api.comd5.xyz/updateUser", {
          method: "PUT",
          headers: {
            token: localStorage.token,
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const parseRes = await response.json();
        console.table(parseRes);
        toast.success("Updated phone number successfully");
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  //Personal Info section
  const [isDisabledPersonalInfo, setIsDisabledPersonalInfo] = useState(true);
  const [btnTextPersonalInfo, setBtnTextPersonalInfo] = useState("Edit");
  const [showCancelBtnPersonalInfo, setShowCancelBtnPersonalInfo] =
    useState(false);

  const handlePersonalInfo = () => {
    setPhoneNo("Example : 01234567899");
    setIsDisabledPersonalInfo(!isDisabledPersonalInfo);
    setBtnTextPersonalInfo((prev) => (prev === "Edit" ? "Save" : "Edit"));
    setShowCancelBtnPersonalInfo(!showCancelBtnPersonalInfo);
  };

  //Cancel button in Personal Info section
  const handleCancelBtnTextPersonalInfo = () => {
    setPhoneNo("Example: 01234567899");
    setShowCancelBtnPersonalInfo(!showCancelBtnPersonalInfo);
    setBtnTextPersonalInfo((prev) => (prev === "Edit" ? "Save" : "Edit"));
    setIsDisabledPersonalInfo(!isDisabledPersonalInfo);
  };
  return (
    <div
      className="mb-4 xl:mb-0 rounded-lg shadow-xl box w-11/12
        lg: xl:w-auto border-[#376db3] border-8 md:mt-3 "
    >
      <div className="mx-3 my-5 sm:mx-20 sm:my-10 ">
        <p className="mb-3 text-xl font-bold text-white lg:text-2xl md:text-4xl md:mb-5 xl:text-4xl sm:text-3xl">
          Personal Information
        </p>
        <div className="flex flex-wrap justify-center w-full ">
          <img
            src={usericon}
            alt="..."
            className="h-32 border-none rounded-full shadow md:h-60 xs:h-44 xl:h-40 lg:h-28 "
          />
          <p className="mt-8 ml-2 text-xl font-bold text-white md:text-5xl xl:text-3xl lg:text-xl xxs:text-2xl xxs:mt-8 xxs:ml-6 xs:text-5xl xs:mt-10 xs:ml-10 ">
            {firstname} <br />
            {lastName}
          </p>
        </div>
        <div className="mb-3 ">
          <label
            className="flex gap-2 mt-6 mb-2 text-sm font-bold text-white sm:text-base xl:text-xl"
            htmlFor="id"
          >
            <FaRegUser className="text-xl text-[#10a6f1] xl:text-2xl xl:mb-2" />
            ID
          </label>
          <input
            className="w-full px-3 py-2 border rounded shadow appearance-none disabled:bg-gray-300 text-grey-darker"
            id="id"
            type="text"
            value={id}
            disabled
          />
        </div>

        <div>
          <label
            className="flex gap-1 mt-6 mb-2 text-sm font-bold text-white sm:text-base xl:text-xl "
            htmlFor="address "
          >
            <ImPhone className="text-2xl text-[#10a6f1] xl:text-2xl xl:mb-2" />
            Contact Number
          </label>
          <input
            className="w-full px-3 py-2 mb-3 border rounded shadow appearance-none border-red text-grey-darker disabled:bg-gray-300"
            type="tel"
            name="phone_number"
            value={phone_number}
            maxLength="11"
            onChange={(e) => onChangePhoneNum(e)}
            onKeyDown={(event) => {
              if (event.key === "-" || event.key === "e") {
                event.preventDefault();
              }
            }}
            placeholder={phoneno}
            disabled={isDisabledPersonalInfo}
          />
        </div>
        <div className="flex items-center justify-center gap-5">
          <div className={!showCancelBtnPersonalInfo ? "hidden" : "visible"}>
            <button
              className="px-4 py-2 mt-3 text-base font-bold text-black box cancelBtn sm:px-6 sm:py-2 sm:text-xl rounded-3xl xl:mt-7 "
              type="button"
              onClick={handleCancelBtnTextPersonalInfo}
            >
              Cancel
            </button>
          </div>
          <form onSubmit={onSubmitPhoneNum}>
            <button
              className="px-4 py-2 mt-3 text-base font-bold text-white sm:px-6 sm:py-2 sm:text-xl rounded-3xl xl:mt-7 bg-[#40ABE1] hover:bg-[#10a6f1] disabled:bg-[#505355]"
              type="submit"
              onClick={handlePersonalInfo}
              // disabled={phoneno === "Example: 01234567899" ? false : disableBtn}
            >
              {btnTextPersonalInfo}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
