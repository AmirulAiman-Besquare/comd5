import "./styles.modules.css";
// import personpc from "../../asset/images/person-pc.png";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { FaRegUser, FaPhoneAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { AiOutlineLock } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";
import { useState, useEffect } from "react";

export const UserSetting = () => {
  const [firstname, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [id, setId] = useState();

  async function getDetails() {
    try {
      const response = await fetch("http://157.245.57.54:5000/display/user", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setFirstName(parseRes[0].first_name);
      setLastName(parseRes[0].last_name);
      setEmail(parseRes[0].user_email);
      setId(parseRes[0].user_id);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      {/* <div className="w-full h-screen"> */}
      <div
        className="flex flex-col items-center justify-center
       pt-4 mt-2 ml-2 

       lg:mx-10
       lg:items-start 
        lg:gap-10 lg:flex-row 

       xl:items-start xl:mt-10 xl:gap-20 xl:flex-row
        "
      >
        <div
          className="mb-4 xl:mb-0 rounded-lg shadow-xl box w-11/12
        lg: xl:w-auto border-[#376db3] border-8
        "
        >
          <div className="mx-3 my-5 sm:mx-20 sm:my-10 ">
            <p className="mb-3 lg:text-2xl text-xl xl:text-4xl font-bold text-white sm:text-3xl">
              Personal Information
            </p>
            <div className="flex flex-wrap justify-center w-full ">
              <img
                src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-1-800x800.jpg"
                alt="..."
                className="h-32 border-none rounded-full shadow xs:h-44 xl:h-40
                lg:h-28"
              />
              <p
                className="mt-8 ml-2 text-xl font-bold text-white xl:text-3xl
              lg:text-xl xxs:text-2xl xxs:mt-8 xxs:ml-6 xs:text-5xl xs:mt-10 xs:ml-10 "
              >
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
                placeholder="CHANGE THIS TO DISPLAY"
                disabled="disabled"
              />
            </div>
            <div>
              <label
                className="flex gap-2 mt-6 mb-2 text-sm font-bold text-white sm:text-base xl:text-xl"
                htmlFor="contact"
              >
                <FaPhoneAlt className="text-xl text-[#10a6f1] xl:text-2xl xl:mb-2 " />
                Contact
              </label>
              <input
                className="w-full px-3 py-2 border rounded shadow appearance-none border-red text-grey-darker"
                type="tel"
                placeholder="Fetch contact from db"
              />
            </div>
            <div>
              <label
                className="flex gap-1 mt-6 mb-2 text-sm font-bold text-white sm:text-base xl:text-xl"
                htmlFor="address "
              >
                <IoMdHome className="text-2xl text-[#10a6f1] xl:text-2xl xl:mb-2" />
                Address
              </label>
              <input
                className="w-full px-3 py-2 mb-3 border rounded shadow appearance-none border-red text-grey-darker"
                type="text"
                placeholder="Fetch address from db here."
              />
            </div>
            <div className="flex items-center justify-center ">
              <button
                className="px-4 py-2 mt-3 text-base font-bold text-white sm:px-6 sm:py-2 sm:text-xl rounded-3xl xl:mt-7"
                id="button"
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div
          className="col-span-1 mb-5 rounded-lg shadow-xl box w-11/12
          
        md:my-3 lg:mb-0 2xl:mb-8 lg:pb-1 border-[#376db3] border-8 xl:max-w-xl  xl:w-full"
        >
          {" "}
          <div className="h-full mx-3 my-5 sm:mx-20 sm:my-10">
            <p
              className="mb-3 text-xl xl:text-4xl
            lg:text-2xl  font-bold text-white sm:text-2xl"
            >
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
                placeholder="fetch email from db"
              />
            </div>
            <div>
              <label
                className="flex gap-2 mt-6 mb-2 text-sm font-bold text-white sm:text-base xl:text-xl "
                htmlFor="password"
              >
                <AiOutlineLock className="text-2xl text-[#10a6f1] xl:text-2xl xl:mb-2" />
                Password
              </label>
              <input
                className="w-full px-3 py-2 mb-3 border rounded shadow appearance-none border-red text-grey-darker"
                type="password"
                placeholder="Fetch password from db"
              />
            </div>
            <div className="flex items-center justify-center ">
              <button
                className="px-4 py-2 mt-3 text-base font-bold text-white sm:px-6 sm:py-2 sm:text-xl rounded-3xl  xl:mt-7"
                id="button"
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};
