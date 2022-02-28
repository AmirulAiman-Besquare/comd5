import styles from "./styles.modules.css";
import noticon from "../../asset/images/noticon.png";
import { FiTrash } from "react-icons/fi";

export const Notification = () => {
  return (
    <div className="w-11/12 m-auto mt-12 rounded-lg shadow-xl box border-[#13407B] border-[20px] xxl:w-9/12">
      <div className="flex flex-row">
        <p className="flex-grow p-6 ml-8 text-4xl font-bold text-white">
          Notifications
        </p>
        <div className="mr-8 text-white tab">
          <button className="mt-6 rounded-tl rounded-bl px-9 py-2 border border-[#088ED5] bg-[#122746] font-bold hover:bg-[#059DE6] ">
            All
          </button>
          <button className="mt-6 rounded-tr rounded-br mr-6 px-6 py-2 border border-[#088ED5] bg-[#122746] hover:bg-[#059DE6] font-bold">
            Unread
          </button>
        </div>
      </div>
      <div className="ml-16 mr-16 overflow-y-auto max-h-[52em] scrollbar mb-10">
        <div className="flex bg-[#096DB1] rounded p-2 text-white shadow-md">
          <div className="m-auto ml-2 mr-4">
            <img src={noticon} />
          </div>
          <div className="w-full ">
            <p className="text-base font-bold">Gold/USD: Consolidation</p>
            <p className="text-sm ">
              Short position below 1.3875 with target at 1.3815 and 1.3900 in
              extension
            </p>
          </div>
          <div className="w-20 hover:cursor-pointer ">
            <FiTrash color="#84C7EF" size={"2em"} className="m-auto" />
            <p className="text-center">Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};
