import React from "react";
import { Link } from "react-router-dom";
import { VscWarning } from "react-icons/vsc";

export const NotFoundPage = () => {
  return (
    <div>
      <div className="bg-[#30648C] text-center text-white h-full flex-col justify-center align-middle w-auto mx-4 my-28 sm:mx-20 sm:my-40 md:m-40  xl:m-56 rounded-2xl animate__animated animate__shakeX">
        <VscWarning className="pt-10 m-auto" color="#FFA522" size={"8rem"} />
        <p className="py-6 text-6xl">404</p>
        <p className="pb-6 mx-2 text-xl xs:text-2xl">
          The page you were looking for is not found!
        </p>
        <p className="pb-12 mx-2 text-base font-light xs:text-2xl">
          You may have mistyped the address or the page may have moved.
        </p>
        <Link reloadDocument to={"/"}>
          <button
            type="button"
            className="px-4 py-2 mb-10 text-lg font-semibold text-white transition-colors duration-300 rounded-md shadow bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-900 focus:outline-none focus:ring-blue-200 focus:ring-4"
          >
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};
