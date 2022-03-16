import React, { useState } from "react";
import personpc from "../asset/images/person-pc.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { eye } from "react-icons-kit/fa/eye";
import { eyeSlash } from "react-icons-kit/fa/eyeSlash";
import { Icon } from "react-icons-kit";
import PasswordCriteria from "../PasswordCriteriaChecker/PasswordCriteira";
import "../PasswordCriteriaChecker/PasswordCriteria.css";

export const ForgotPassword = () => {
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
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = Inputs;

  const [passwordValidate, setPasswordValidate] = useState("");

  const onChange = (e) => {
    setPasswordValidate(e.target.value);
    setInputs({ ...Inputs, [e.target.name]: e.target.value });
  };

  //Password Criteria
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
      specialCharCheck === true
    ) {
      setBtnSubmitState(false);
      setBtnSubmitColor(
        "w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 rounded-md shadow bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-900 focus:outline-none focus:ring-blue-200 focus:ring-4"
      );
    } else {
      setBtnSubmitColor(
        "w-full px-4 py-2 text-lg font-semibold text-white bg-gray-500"
      );
    }
  };

  //Set Submit button behaviour and appearance
  const [btnSubmitState, setBtnSubmitState] = useState(true);
  const [btnSubmitColor, setBtnSubmitColor] = useState(
    "w-full px-4 py-2 text-lg font-semibold text-white bg-gray-500"
  );

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };

      const response = await fetch("https://api.comd5.xyz/resetPassword", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      toast.success("Update password successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  //password criteria

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[url('../asset/images/mainbg.png')] lg:justify-center ">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md ">
        <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly ">
          <img
            className="object-center mx-auto h-72"
            src={personpc}
            alt="A person interacting with a hologram screen"
          />
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span className="pb-2">Back to Login?</span>
            <Link to="/login">
              <button className="px-4 py-2 font-bold text-white rounded bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-900 focus:ring-blue-400 focus:ring-4">
                Login!
              </button>
            </Link>
          </p>
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-2 text-2xl font-semibold text-center text-gray-700">
            Forgot Password
          </h3>
          <h5 className="pb-4 text-center">Please fill in the details!</h5>
          <form
            onSubmit={onSubmitForm}
            action="#"
            className="flex flex-col space-y-5"
          >
            {/* Replace action with Login Function */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm font-semibold ">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                autoFocus
                disabled
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold">
                  Password
                </label>
              </div>
              <div className="relative flex ">
                <input
                  type={type}
                  id="password"
                  name="password"
                  value={password}
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                  onKeyUp={handleOnKeyUp}
                  disabled
                  onChange={(e) => onChange(e)}
                  className="w-full px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
                <div style={{ color: "#000000	" }}>
                  <span
                    onClick={handlePasswordVisibility}
                    className="absolute top-2 right-1"
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
            <div className="flex items-center space-x-2"></div>
            <div>
              <button
                type="submit"
                className={btnSubmitColor}
                disabled={btnSubmitState}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
