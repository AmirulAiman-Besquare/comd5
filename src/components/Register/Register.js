import React, { useState } from "react";
import registericon from "../asset/images/register.png";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import { DashBoard } from "components";
import { eye } from "react-icons-kit/fa/eye";
import { eyeSlash } from "react-icons-kit/fa/eyeSlash";
import { Icon } from "react-icons-kit";

export const Register = ({ setAuth }) => {
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
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const { first_name, last_name, email, password } = Inputs;

  const onChange = (e) => {
    setInputs({ ...Inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { first_name, last_name, email, password };

      const response = await fetch("http://157.245.57.54:5000/user/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Registered Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md ">
        <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly ">
          <img
            className="object-center mx-auto h-72"
            src={registericon}
            alt="A person interacting with a hologram screen"
          />
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span className="pb-2">Already have an account?</span>
            <Link to="/login">
              <button className="px-4 py-2 font-bold text-white rounded bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-900 focus:ring-blue-400 focus:ring-4">
                Log In
              </button>
            </Link>
          </p>
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-2 text-2xl font-semibold text-center text-gray-700">
            Get Started
          </h3>
          <h5 className="pb-4 text-center">It's now or never!</h5>
          <form
            onSubmit={onSubmitForm}
            action="#"
            className="flex flex-col space-y-3"
          >
            {/* Replace action with Sign Up Function */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="text" className="text-sm font-semibold ">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={first_name}
                onChange={(e) => onChange(e)}
                autoFocus
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="text" className="text-sm font-semibold ">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={last_name}
                onChange={(e) => onChange(e)}
                autoFocus
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
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
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold">
                  Password
                </label>
              </div>
              <div className="flex relative ">
                <input
                  type={type}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 w-full"
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
            </div>
            {/* <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold">
                  Confirm Password
                </label>
              </div>
              <input
                type="password"
                id="confirmpassword"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div> */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
              />
              <label htmlFor="remember" className="text-sm font-semibold ">
                I agree to the{" "}
                <a href="#" className="underline">
                  terms
                </a>{" "}
                and{" "}
                <a href="#" className="underline">
                  conditions
                </a>
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 rounded-md shadow bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-900 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Sign Up
              </button>
            </div>
          </form>
          {/* <div className="flex flex-col space-y-5">
            <span className="flex items-center justify-center space-x-2">
              <span className="h-px bg-gray-400 w-14"></span>
              <span className="font-normal text-gray-500">or sign up with</span>
              <span className="h-px bg-gray-400 w-14"></span>
            </span>
            <div className="flex flex-col space-y-4 ">
              <a
                href="#" //Sign Up WITH GOOGLE BTN
                className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group bg-gradient-to-r from-white to-white hover:from-cyan-500 hover:to-blue-700 focus:outline-none focus:ring-blue-200 focus:ring-4 hover:border-white"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="48"
                    height="48"
                    className="w-5 h-5 text-gray-800 fill-current group-hover:text-white"
                    viewBox="0 0 48 48"
                    version="1.1"
                    aria-hidden="true"
                  >
                    <path
                      fill="#fbc02d"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#e53935"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4caf50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1565c0"
                      d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                </span>
                <span className="text-sm font-medium text-gray-800 group-hover:text-white">
                  Sign Up with Google Account
                </span>
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
