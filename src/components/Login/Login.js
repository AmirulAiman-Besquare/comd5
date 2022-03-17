import React, { useState } from "react";
import personpc from "../asset/images/person-pc.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { eye } from "react-icons-kit/fa/eye";
import { eyeSlash } from "react-icons-kit/fa/eyeSlash";
import { Icon } from "react-icons-kit";

export const Login = ({ setAuth }) => {
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

  const onChange = (e) => {
    setInputs({ ...Inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };

      const response = await fetch("https://api.comd5.xyz/user/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      // verify setAuth(true): token is true
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Login successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[url('../asset/images/mainbg.png')] lg:justify-center bg-center bg-no-repeat bg-cover">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md ">
        <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly ">
          <img
            className="object-center mx-auto h-72"
            src={personpc}
            alt="A person interacting with a hologram screen"
          />
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span className="pb-2">Don't have an account?</span>
            <Link to="/register">
              <button className="px-4 py-2 font-bold text-white rounded bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-900 focus:ring-blue-400 focus:ring-4">
                Sign Up!
              </button>
            </Link>
          </p>
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-2 text-2xl font-semibold text-center text-gray-700">
            Welcome Back
          </h3>
          <h5 className="pb-4 text-center">
            It's good to see you again!
            <br /> Log in to start trading!
          </h5>
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
                required
                value={email}
                onChange={(e) => onChange(e)}
                autoFocus
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold">
                  Password
                </label>
                <Link
                  to="/forgotpassword"
                  className="text-sm text-blue-600 hover:underline focus:text-blue-800"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative flex ">
                <input
                  type={type}
                  id="password"
                  name="password"
                  required
                  value={password}
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
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
              />
              <label htmlFor="remember" className="text-sm font-semibold ">
                Remember me
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 rounded-md shadow bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-900 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
