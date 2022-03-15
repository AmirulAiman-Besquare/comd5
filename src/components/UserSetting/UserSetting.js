import "./styles.modules.css";
// import personpc from "../../asset/images/person-pc.png";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { FaRegUser, FaPhoneAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { AiOutlineLock } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";
import { useState, useEffect } from "react";
import { eye } from "react-icons-kit/fa/eye";
import { eyeSlash } from "react-icons-kit/fa/eyeSlash";
import { Icon } from "react-icons-kit";
import { Header } from "../Header/Header";
import { toast } from "react-toastify";

export const UserSetting = () => {
  const [firstname, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [id, setId] = useState();
  const [pass, setPass] = useState();
  const [phoneno, setPhoneNo] = useState();

  const [PhoneNumInputs, setPhoneNumInputs] = useState({
    phone_number: "",
  });

  const [PasswordInputs, setPasswordInputs] = useState({
    password: "",
  });

  const { phone_number } = PhoneNumInputs;
  const { password } = PasswordInputs;

  const onChangePhoneNum = (e) => {
    setPhoneNumInputs({ ...PhoneNumInputs, [e.target.name]: e.target.value });
  };

  const onChangePassword = (e) => {
    setPasswordInputs({ ...PasswordInputs, [e.target.name]: e.target.value });
  };

  const onSubmitPhoneNum = async (e) => {
    e.preventDefault();
    if (btnTextPersonalInfo === "Save") {
      <></>;
    } else {
      try {
        const body = { phone_number };

        const response = await fetch("http://157.245.57.54:5000/updateUser", {
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

  const onSubmitPassword = async (e) => {
    e.preventDefault();
    if (btnTextEmailPassword === "Save") {
      <></>;
    } else {
      try {
        const body = { email, password };

        const response = await fetch(
          "http://157.245.57.54:5000/resetPassword",
          {
            method: "POST",
            headers: {
              token: localStorage.token,
              "Content-type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );
        console.log(JSON.stringify(body));

        const parseRes = await response.json();
        console.table(parseRes);
        toast.success("Updated password successfully");
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  //Email & Password section
  const [isDisabledEmailPassword, setIsDisabledEmailPassword] = useState(true);
  const [btnTextEmailPassword, setBtnTextEmailPassword] = useState("Edit");
  const [showElementPasswordSection, setShowElementPasswordSection] =
    useState(false);

  //Save button behaviour for Email & Password section
  const handleEmailPasswordBtn = () => {
    setIsDisabledEmailPassword(!isDisabledEmailPassword);
    setBtnTextEmailPassword((prev) => (prev === "Edit" ? "Save" : "Edit"));
    setShowElementPasswordSection(!showElementPasswordSection);
    setValuePass("");
    if (type === "text") {
      setIcon(eyeSlash);
      setType("password");
    }
  };

  //Cancel button behaviour for Email & Password section
  const handleCancelBtnEmailPassword = () => {
    setShowElementPasswordSection(!showElementPasswordSection);
    setIsDisabledEmailPassword(!isDisabledEmailPassword);
    setBtnTextEmailPassword((prev) => (prev === "Edit" ? "Save" : "Edit"));
    setValuePass("");
    if (type === "text") {
      setIcon(eyeSlash);
      setType("password");
    }
  };

  //Personal Info section
  const [isDisabledPersonalInfo, setIsDisabledPersonalInfo] = useState(true);
  const [btnTextPersonalInfo, setBtnTextPersonalInfo] = useState("Edit");
  const [showCancelBtnPersonalInfo, setShowCancelBtnPersonalInfo] =
    useState(false);

  const handlePersonalInfo = () => {
    setIsDisabledPersonalInfo(!isDisabledPersonalInfo);
    setBtnTextPersonalInfo((prev) => (prev === "Edit" ? "Save" : "Edit"));
    setShowCancelBtnPersonalInfo(!showCancelBtnPersonalInfo);
  };

  //Cancel button in Personal Info section
  const handleCancelBtnTextPersonalInfo = () => {
    setShowCancelBtnPersonalInfo(!showCancelBtnPersonalInfo);
    setBtnTextPersonalInfo((prev) => (prev === "Edit" ? "Save" : "Edit"));
    setIsDisabledPersonalInfo(!isDisabledPersonalInfo);
  };

  //toggle password feature
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeSlash);

  const handlePasswordVisibility = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeSlash);
      setType("password");
    }
  };

  //clear user input for password
  const [valuePass, setValuePass] = useState();

  //update user input for Password
  const handleUserInputPass = (e) => {
    setValuePass(e.target.value);
  };

  //retrieve data
  async function getDetails() {
    try {
      const response = await fetch("http://157.245.57.54:5000/display/user", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      console.log(parseRes);

      setFirstName(parseRes[0].first_name);
      setLastName(parseRes[0].last_name);
      setEmail(parseRes[0].user_email);
      setId(parseRes[0].user_id);
      setPass(parseRes[0].user_password);
      setPhoneNo(parseRes[0].phone_number);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      <Header title={"TRANSACTION"} />
      <div className="flex flex-col items-center justify-center pt-4 mt-2 ml-2 lg:mx-10 lg:items-start lg:gap-10 lg:flex-row xl:items-start xl:mt-10 xl:gap-20 xl:flex-row ">
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
                src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-1-800x800.jpg"
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
                className="w-full px-3 py-2 border rounded shadow appearance-none text-grey-darker"
                id="id"
                type="text"
                value={id}
                disabled="disabled"
              />
            </div>

            <div>
              <label
                className="flex gap-1 mt-6 mb-2 text-sm font-bold text-white sm:text-base xl:text-xl"
                htmlFor="address "
              >
                <IoMdHome className="text-2xl text-[#10a6f1] xl:text-2xl xl:mb-2" />
                Contact Number
              </label>
              <input
                className="w-full px-3 py-2 mb-3 border rounded shadow appearance-none border-red text-grey-darker"
                type="tel"
                name="phone_number"
                value={phone_number}
                onChange={(e) => onChangePhoneNum(e)}
                placeholder={phoneno}
                disabled={isDisabledPersonalInfo}
              />
            </div>
            <div className="flex items-center justify-center gap-5">
              {/* {showCancelBtnPersonalInfo ? { btnCancel } : <></>} */}
              <div
                className={!showCancelBtnPersonalInfo ? "hidden" : "visible"}
              >
                <button
                  className="px-4 py-2 mt-3 text-base font-bold text-black cancelBtn sm:px-6 sm:py-2 sm:text-xl rounded-3xl xl:mt-7"
                  id="button"
                  type="button"
                  onClick={handleCancelBtnTextPersonalInfo}
                >
                  Cancel
                </button>
              </div>
              <form onSubmit={onSubmitPhoneNum}>
                <button
                  className="px-4 py-2 mt-3 text-base font-bold text-white sm:px-6 sm:py-2 sm:text-xl rounded-3xl xl:mt-7"
                  id="button"
                  type="submit"
                  onClick={handlePersonalInfo}
                >
                  {btnTextPersonalInfo}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div
          className="col-span-1 mb-5 rounded-lg shadow-xl box w-11/12
          
        md:my-3 md:mb-10 lg:mb-0 2xl:mb-8 lg:pb-1 border-[#376db3] border-8 xl:max-w-xl  xl:w-full"
        >
          <div className="h-full mx-3 my-5 sm:mx-20 sm:my-10">
            <p className="mb-3 text-xl font-bold text-white md:text-4xl xl:text-4xl lg:text-2xl sm:text-2xl">
              Email & Password
            </p>
            <div className="mb-3">
              <label
                className="flex gap-2 mt-6 mb-2 text-sm font-bold text-white sm:text-base xl:text-xl"
                htmlFor="email"
              >
                <MdOutlineMailOutline className="text-2xl text-[#10a6f1] xl:text-2xl xl:mb-2" />
                Email
              </label>
              <input
                className="w-full px-3 py-2 border rounded shadow appearance-none text-grey-darker"
                type="email"
                value={email}
                disabled
                // placeholder="fetch email from db"
              />
            </div>
            <div className={!showElementPasswordSection ? "hidden" : "visible"}>
              <label
                className="flex gap-2 mt-6 mb-2 text-sm font-bold text-white sm:text-base xl:text-xl "
                htmlFor="password"
              >
                <AiOutlineLock className="text-2xl text-[#10a6f1] xl:text-2xl xl:mb-2" />
                Password
              </label>
              <div className=" text-container">
                <input
                  className="w-full px-3 py-2 border rounded shadow appearance-none text-grey-darker"
                  type={type}
                  disabled={isDisabledEmailPassword}
                  name="password"
                  value={password}
                  onChange={(e) => onChangePassword(e)}
                  placeholder="Enter new password"
                ></input>
                <div style={{ color: "#000000	" }}>
                  <span
                    id="toggleVisibility1"
                    onClick={handlePasswordVisibility}
                    className="toggleVisibility"
                  >
                    <Icon icon={icon} size={25} />
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-5">
              <div
                className={!showElementPasswordSection ? "hidden" : "visible"}
              >
                <button
                  className="px-4 py-2 mt-3 text-base font-bold text-black cancelBtn sm:px-6 sm:py-2 sm:text-xl rounded-3xl xl:mt-7"
                  id="button"
                  type="button"
                  onClick={handleCancelBtnEmailPassword}
                >
                  Cancel
                </button>
              </div>
              <form onSubmit={onSubmitPassword}>
                <button
                  className="px-4 py-2 mt-3 text-base font-bold text-white sm:px-6 sm:py-2 sm:text-xl rounded-3xl xl:mt-7"
                  id="button"
                  type="submit"
                  onClick={handleEmailPasswordBtn}
                >
                  {btnTextEmailPassword}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};
