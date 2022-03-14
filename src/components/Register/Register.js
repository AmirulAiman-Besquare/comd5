import React, { useState } from "react";
import registericon from "../asset/images/register.png";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
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
    <div className="flex items-center justify-center min-h-screen p-4 bg-[url('../asset/images/mainbg.png')] lg:justify-center bg-center bg-no-repeat bg-cover">
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
              <div className="relative flex ">
                <input
                  type={type}
                  id="password"
                  name="password"
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
        </div>
      </div>
    </div>
  );
};
