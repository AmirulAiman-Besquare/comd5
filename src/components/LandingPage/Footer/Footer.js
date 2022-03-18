import React from "react";
import { View, Text } from "react-native";
import "./Footer.css";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineChrome } from "react-icons/ai";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-links">
          <div className="footer-link-items">
            <div className="footer-details">
              <p >
              © All right reserved
              </p>
            </div>
        </div>
      </div>
      {/* <img className="comD5-logo-white" src={ComD5White} alt="COMD5" /> */}
    </div>
  );
}

export default Footer;
