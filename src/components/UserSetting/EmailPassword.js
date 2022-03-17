import "./styles.modules.css";
import { AiOutlineLock } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";
import { useState, useEffect } from "react";
import { eye } from "react-icons-kit/fa/eye";
import { eyeSlash } from "react-icons-kit/fa/eyeSlash";
import { Icon } from "react-icons-kit";
import { toast } from "react-toastify";
import PasswordCriteria from "../PasswordCriteriaChecker/PasswordCriteira";
import "../PasswordCriteriaChecker/PasswordCriteria.css";

export const EmailPassword = () => {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

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

    if (btnTextEmailPassword === "Edit") {
      setBtnSubmitColor(
        "px-4 py-2 mt-3 text-base font-bold text-white sm:px-6 sm:py-2 sm:text-xl rounded-3xl xl:mt-7 bg-disabledBtn"
      );
      setBtnSubmitState(true);
    }
    if (btnTextEmailPassword === "Save") {
      setBtnSubmitColor(
        "px-4 py-2 mt-3 text-base font-bold text-white sm:px-6 sm:py-2 sm:text-xl rounded-3xl xl:mt-7 bg-editBtn"
      );
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

    if (btnTextEmailPassword === "Save") {
      setBtnSubmitColor(
        "px-4 py-2 mt-3 text-base font-bold text-white sm:px-6 sm:py-2 sm:text-xl rounded-3xl xl:mt-7 bg-editBtn"
      );
    }
    setBtnSubmitState(false);
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
      const response = await fetch("https://api.comd5.xyz/display/user", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setEmail(parseRes[0].user_email);
      setPass(parseRes[0].user_password);
    } catch (error) {
      console.error(error.message);
    }
  }

  const [passCriteria, setPassCriteria] = useState(false);
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
    specialCharCheck: false,
  });

  const handleOnFocus = () => {
    setPassCriteria(true);
  };

  const handleOnBlur = () => {
    setPassCriteria(false);
  };

  const handleOnKeyUp = (e) => {
    const { value } = e.target;
    const capsLetterCheck = /[A-Z]/.test(value);
    const numberCheck = /[0-9]/.test(value);
    const pwdLengthCheck = value.length >= 8;
    const specialCharCheck = /[!@#$%^&*]/.test(value);
    setChecks({
      capsLetterCheck,
      numberCheck,
      pwdLengthCheck,
      specialCharCheck,
    });
    if (
      capsLetterCheck &&
      numberCheck &&
      pwdLengthCheck &&
      specialCharCheck === true &&
      btnTextEmailPassword === "Save"
    ) {
      setBtnSubmitState(false);
      setBtnSubmitColor(
        "px-4 py-2 mt-3 text-base font-bold text-white sm:px-6 sm:py-2 sm:text-xl rounded-3xl xl:mt-7 bg-editBtn"
      );
    } else {
      setBtnSubmitState(true);
      setBtnSubmitColor(
        "px-4 py-2 mt-3 text-base font-bold text-white sm:px-6 sm:py-2 sm:text-xl rounded-3xl xl:mt-7 bg-disabledBtn"
      );
    }
  };

  //Set Submit button behaviour and appearance
  const [btnSubmitState, setBtnSubmitState] = useState(false);
  const [btnSubmitColor, setBtnSubmitColor] = useState(
    "px-4 py-2 mt-3 text-base font-bold text-white sm:px-6 sm:py-2 sm:text-xl rounded-3xl xl:mt-7 bg-editBtn"
  );

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center pt-4 mt-2 ml-2 lg:mx-10 lg:items-start lg:gap-10 lg:flex-row xl:items-start xl:mt-10 xl:gap-20 xl:flex-row ">
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
                  value={valuePass}
                  onChange={handleUserInputPass}
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                  onKeyUp={handleOnKeyUp}
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
              {passCriteria ? (
                <PasswordCriteria
                  capsLetterFlag={checks.capsLetterCheck ? "valid" : "invalid"}
                  numberFlag={checks.numberCheck ? "valid" : "invalid"}
                  pwdLengthFlag={checks.pwdLengthCheck ? "valid" : "invalid"}
                  specialCharFlag={
                    checks.specialCharCheck ? "valid" : "invalid"
                  }
                />
              ) : null}
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

              <button
                className="px-4 py-2 mt-3 text-base font-bold text-white sm:px-6 sm:py-2 sm:text-xl rounded-3xl xl:mt-7 bg-[#40ABE1] hover:bg-[#10a6f1] disabled:bg-[#505355]"
                disabled={btnSubmitState}
                id="button"
                type="button"
                onClick={handleEmailPasswordBtn}
              >
                {btnTextEmailPassword}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
