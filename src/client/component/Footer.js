import { FaYoutube, FaTwitter, FaFacebookSquare } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import React from "react";
import { FOOTERINFO } from "../content/footer/index";
import "./styles/footer.css";

const Footer = () => {
  return (
    <div className="box">
      <div className="container-footer">
        <div className="footer-row">
          <span className="footer-col1">
            <h1 className="footer-copyright">{FOOTERINFO.COPYRIGHT}</h1>
          </span>
          <span className="footer-col2">
            <span className="footer-i1">
              <FaYoutube color="white" />
            </span>
            <span className="footer-i1">
              <FaTwitter color="white" />
            </span>
            <span className="footer-i1">
              <FaFacebookSquare color="white" />
            </span>
          </span>
          <div className="footer-col3">
            <p className="footer-col3-p1">{FOOTERINFO.COL3[0]}</p>
            <p className="footer-col3-p2">{FOOTERINFO.COL3[1]}</p>
            <p className="footer-col3-p3">{FOOTERINFO.COL3[2]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
