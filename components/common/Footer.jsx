import React, { useState } from "react";
import { FaPinterest } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook, FaYoutube, FaTwitter, FaLinkedin } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";

const Footer = ({active2}) => {
  const [active, setactive] = useState(false);
  return (
    <div className={active2?'main-footer op':'main-footer'}>
      <div className="footer-detail">
        <div className="f1">
          <p style={{ fontSize: "18px", marginBottom: "2vh" }}>VISIT STORE</p>
          <p>Jayanagar, Bangalore:</p>
          <p style={{ textDecoration: "underline", cursor: "pointer" }}>
            Get Directions
          </p>
        </div>
        <div className="f1">
          <p className="p-mar">Contact Us</p>
          <p className="p-mar">FAQ</p>
          <p className="p-mar">Blogs</p>
          <p className="p-mar">Terms & Conditions</p>
        </div>
        <div className="f1">
          <p className="p-mar">TRACK ORDER</p>
          <p className="p-mar">PLACE RETURN/EXCHANGE REQUEST</p>
          <p className="p-mar">RETURNS/EXCHANGE POLICY</p>
        </div>
        <div className="f1">
          <p style={{ fontSize: "18px", marginBottom: "2vh" }}>CUSTOMER CARE</p>
          <p className="p-mar">Timings: 10 AM - 7 PM (Mon-Sat)</p>
          <p className="p-mar">
            Whatsapp: <span>+916366966283</span>
          </p>
          <p className="p-mar">Instagram: @snitch.co.in</p>
        </div>
      </div>
      <div className="sign-div">
        <p
          style={{
            fontSize: "20px",
            letterSpacing: "2px",
            marginBottom: "2vh",
          }}
        >
          SIGN UP AND SAVE
        </p>
        <p style={{ marginBottom: "2vh" }}>
          Sign up now and be the first to know about exclusive offers, latest
          fashion trends & style tips!
        </p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <input
              className="input"
              placeholder="Enter your email"
              onClick={() => {
                setactive(true);
              }}
            ></input>
            <TfiEmail className={active ? "mail-logo dis" : "mail-logo"} />
          <p className={active ? "mail-logo" : "mail-logo dis"} style={{fontSize:'18px'}}>Subscribe</p>
          </div>
        </div>
        <div className="social">
          <FaInstagram />
          <FaFacebook />
          <FaYoutube />
          <FaTwitter />
          <FaLinkedin />
          <FaPinterest />
        </div>
      </div>
      <div style={{ marginBlock: "5vh" }}>
        <p style={{ textAlign: "center", fontSize: "15px" }}>
          © 2024 SNITCH | All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
