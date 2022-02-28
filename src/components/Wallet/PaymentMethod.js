import React from "react";
import MasterCard from "../../asset/images/Master.png";
import Visa from "../../asset/images/Visa.png";

export const PaymentMethod = () => {
  return (
    <form className="  mb-10 rounded-lg shadow-xl box w-auto lg:mb-0 2xl:mb-8 lg:pb-1 border-[#376db3] border-8  text-white">
      <p className="mt-2 mb-4 ml-8 text-2xl font-bold">Payment Method</p>
      <div className="flex flex-row justify-around w-auto">
        <div className="inline-block">
          <input type="checkbox" id="cc" name="CreditCard" value="CreditCard" />
          <label htmlFor="CreditCard" className="inline-block float-right pl-1">
            <img src={MasterCard} />
          </label>
          <label htmlFor="CreditCard" className="inline-block float-right pl-3">
            <img src={Visa} />
          </label>
        </div>
        <div className="inline-block">
          <input type="checkbox" id="cc" name="CreditCard" value="CreditCard" />
          <label
            htmlFor="OnlineBanking"
            className="inline-block ml-2 text-base font-bold"
          >
            Online Banking
          </label>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap w-full gap-3 px-5 pt-2">
          <label className="relative flex flex-col w-full">
            <span className="mb-3 font-bold">Card number</span>
            <input
              className="py-2 pl-12 pr-2 text-black placeholder-gray-300 border-2 border-gray-200 rounded-md peer"
              type="text"
              name="card_number"
              placeholder="0000 0000 0000"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </label>

          <label className="relative flex flex-col flex-1">
            <span className="mb-3 font-bold">Expire date</span>
            <input
              className="py-2 pl-12 pr-2 text-black placeholder-gray-300 border-2 border-gray-200 rounded-md peer"
              type="text"
              name="expire_date"
              placeholder="MM/YY"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </label>

          <label className="relative flex flex-col flex-1">
            <span className="flex items-center gap-3 mb-3 font-bold">
              CVC/CVV
              <span className="relative group">
                <span className="absolute items-center justify-center hidden px-2 py-1 text-xs text-white transform translate-x-full -translate-y-1/2 bg-black group-hover:flex -right-2 w-max top-1/2">
                  {" "}
                  Something3
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </span>
            <input
              className="py-2 pl-12 pr-2 text-black placeholder-gray-300 border-2 border-gray-200 rounded-md peer"
              type="text"
              name="card_cvc"
              placeholder="&bull;&bull;&bull;"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </label>
        </div>
        <div className="flex justify-center pt-3">
          <input
            type="submit"
            value="Submit"
            id="topbtn"
            className="border-[#0697E0] hover:bg-[#214172] border-4 rounded-full  py-2 px-4 mb-2 font-bold"
          />
        </div>
      </div>
    </form>
  );
};
