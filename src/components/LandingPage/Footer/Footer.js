import React from "react";
import { View, Text } from "react-native";
import "./Footer.css";
import { IoCallOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineChrome } from "react-icons/ai";
import ComD5White from "../../asset/CompanyLogo/comD5-white.png";

function Footer() {
  let oneLine = {
    flexDirection: "row",
    justifyContent: "space-between",
  };
  let iconStyles = { color: "white", fontSize: "1.8em" };
  let textStyle = {
    fontFamily: "Roboto",
    fontSize: "28px",
    fontStyle: "italic",
    lineHeight: "33px",
    letterSpacing: "0.06em",
    color: "#ffffff",
    marginLeft: "15px",
    paddingBottom: "3px",
  };

  return (
    <div className="footer-container">
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2 className="contact-us-text">Contact Us</h2>

            <View style={oneLine}>
              <IoCallOutline style={iconStyles} />
              <Text style={textStyle}>+60123456789</Text>
            </View>

            <div></div>
            <View style={oneLine}>
              <AiOutlineMail style={iconStyles} />
              <Text style={textStyle}>comD5@besquare.com.my</Text>
            </View>

            <div></div>
            <View style={oneLine}>
              <AiOutlineChrome style={iconStyles} />
              <Text style={textStyle}>www.comd5.com.my</Text>
            </View>
          </div>
        </div>
      </div>
      <img className="comD5-logo-white" src={ComD5White} />
    </div>
  );
}

export default Footer;
