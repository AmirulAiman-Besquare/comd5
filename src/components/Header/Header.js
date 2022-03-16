import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { FiSettings, FiChevronDown } from "react-icons/fi";
import { CgLogOut } from "react-icons/cg";
import bellIcon from "../../components/asset/images/bell.svg";
import { FaBars } from "react-icons/fa";
import "animate.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import { slide as Menu } from "react-burger-menu";
import logo from "../asset/CompanyLogo/White Logo no text.png";
import { FiArchive } from "react-icons/fi";
import {
  MdOutlineGraphicEq,
  MdOutlineAutoGraph,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";

import "./Header.modules.css";

export const Header = ({ setAuth, title }) => {
  const [name, setName] = useState(<ScaleLoader color="#00B2FF" height={15} />);

  async function getName() {
    try {
      const response = await fetch("https://api.comd5.xyz/display/user", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setName(parseRes[0].first_name);
    } catch (error) {
      console.error(error.message);
    }
  }

  const logout = (e) => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const unsubscribe = getName(); //subscribe
    return () => unsubscribe, setName(); //unsubscribe
  }, []);

  return (
    <>
      <Menu>
        <div className="w-full border-b-2 bm-header border-[#00B2FF] mt-8 px-5  pb-10">
          <img src={logo} />
          <p className="mt-2 ml-2 text-xl font-bold text-white grow">
            COMMODIFY
          </p>
          <FaBars className="mt-1" color="white" size={"2.5em"} />
        </div>
        <ul className="flex text-xl text-white">
          <Link reloadDocument to={"/dashboard"}>
            <li className="flex flex-1 w-full p-7 text-2xl  border-b-2  border-[#00B2FF] font-[420] hover:bg-[#0A2653]">
              <MdOutlineGraphicEq className="mr-7" size={"1.3em"} />
              Dashboard
            </li>
          </Link>
          <Link reloadDocument to={"/trade"}>
            <li className="flex flex-1 w-full p-7 text-2xl  border-b-2  border-[#00B2FF] font-[420] hover:bg-[#0A2653]">
              <MdOutlineAutoGraph className="mr-7" size={"1.3em"} />
              Trading
            </li>
          </Link>
          <Link reloadDocument to={"/transactionhistory"}>
            <li className="flex flex-1 w-full p-7 text-2xl  border-b-2  border-[#00B2FF] font-[420] hover:bg-[#0A2653]">
              <FiArchive className="mr-7" size={"1.3em"} />
              Transaction
            </li>
          </Link>
          <Link reloadDocument to={"/wallet"}>
            <li className="flex flex-1 w-full p-7 text-2xl  border-b-2  border-[#00B2FF] font-[420] hover:bg-[#0A2653]">
              <MdOutlineAccountBalanceWallet className="mr-7" size={"1.3em"} />
              Wallet
            </li>
          </Link>
        </ul>
      </Menu>
      <nav className="h-[3.5rem] flex justify-between items-center bg-[#0A2653] border-b-2 border-[#075F93] sm:h-20 shadow-lg">
        <div className="logo ">
          <h1 className="text-base font-bold text-white ml-14 sm:ml-24 xs:text-2xl animate__animated animate__fadeIn">
            {title}
          </h1>
        </div>
        <ul className="flex ">
          <li className="hidden m-auto mr-4 text-xl font-bold text-white xs:inline-flex">
            Hi, {name}!
          </li>
          <li>
            <BiUserCircle
              color={"white"}
              size={"3em"}
              className="hidden sm:block"
            />
          </li>
          <li>
            <div className="relative inline-block mr-6 text-left dropdown">
              <span className="rounded-md shadow-sm">
                <button>
                  <FiChevronDown
                    className="mt-2 hover:stroke-white"
                    size={"1.8em"}
                    color={"#00B2FF"}
                  />
                </button>
              </span>
              <div className="z-30 invisible transition-all duration-300 origin-top-right transform scale-95 -translate-y-2 opacity-0 dropdown-menu">
                <div
                  className="absolute right-0 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none w-28"
                  aria-labelledby="headlessui-menu-button-1"
                  id="headlessui-menu-items-117"
                  role="menu"
                >
                  <div className="py-1">
                    <Link
                      reloadDocument
                      to={"/usersetting"}
                      className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700"
                    >
                      <FiSettings
                        className="mr-2"
                        size={"1.4em"}
                        color={"#194886"}
                      />
                      Settings
                    </Link>
                  </div>
                  <div className="py-1" onClick={(e) => logout(e)}>
                    <Link
                      reloadDocument
                      to={"/login"}
                      className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700"
                    >
                      <CgLogOut size={"1.4em"} color={"#194886"} />
                      Log Out
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};
