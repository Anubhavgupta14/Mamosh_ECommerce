// import ProfileLayout from "../../components/user_data/User";
import { useState, useEffect } from "react";
// import "../../styles/dashboard.css";
import { BsChevronDown } from "react-icons/bs";
import Tab from "./tabs";
import Navbar from "../common/Navbar2";

const General = () => {
  const [section, setSection] = useState(0);

  const handleTabChange = (newValue) => {
    setSection(newValue);
  };

  return (
    <>
      <Navbar />
      <div className="parent-div">
        <div className="outerdiv-pro">
          <Tab />
        </div>
      </div>
    </>
  );
};

export default General;
