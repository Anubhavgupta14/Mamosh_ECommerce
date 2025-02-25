import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import { useState, useEffect } from "react";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import toast, { Toaster } from "react-hot-toast";
import Orders from "./orders";
import Payment from "./payment";
import Security from "./Dashboard_security";
import { styled } from "@mui/material/styles";
import Notification from "./notification";
import Address from "./address";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import {Getone, Updateuser} from "../../api_fetch/admin/User"

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#635ee7",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
      color: "#fff",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(() => {
    // Get the stored tab index from localStorage, defaulting to 0 if not present
    return parseInt(localStorage.getItem("selectedTab"), 10) || 0;
  });

  const [load, setLoad] = useState(false);
  const [dis, Setdis] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Store the selected tab index in localStorage
    localStorage.setItem("selectedTab", newValue);
  };

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneno: "",
    dob: "",
    gender: "",
    country: "",
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneno: "",
    dob: "",
    gender: "",
    country: "",
  });

  const handleData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const [textbtn, Settextbtn] = useState("Edit");

  let validate = () => {
    let formErrors = {};
    let regex = userData.email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (!userData.name) {
      formErrors.name = "Full Name is Required";
    }

    if (!userData.email) {
      formErrors.email = "Email is Required";
    } else if (!regex) {
      formErrors.email = "This is not a valid email format";
    }
    if (!userData.phoneno) {
      formErrors.phoneno = "Phone is Required";
    }
    if (!userData.gender) {
      formErrors.gender = "Gender is Required";
    }
    if (!userData.dob) {
      formErrors.dob = "Date of Birth is Required";
    }
    if (!userData.country) {
      formErrors.country = "Country is Required";
    }

    return formErrors;
  };
  const fetchUserData = async () => {
    try {
      // Extract JWT token from localStorage
      const token = localStorage.getItem("token");

      // const response = await fetch(
      //   `https://backend.mamoshfashion.com/api/user/getone`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ token }),
      //   }
      // );

      const userData = await Getone(token)

      if (!userData) {
        console.log("error");
        throw new Error("Failed to fetch user data");
      }

      // const userData = await response.json();
      console.log("Data :", userData);
      setUserData(userData);
      let s = userData.phoneno.toString();
      setPhone(s);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const Updatefun = async (userData) => {
    if (!dis) {
      Setdis(true);
      Settextbtn("Save");
    } else {
      try {
        setLoad(true);
        // const response = await fetch(
        //   `https://backend.mamoshfashion.com/api/user/updateuser`,
        //   {
        //     method: "POST", // Assuming you're sending data via POST method
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(userData),
        //   }
        // );

        const data = await Updateuser(userData)

        if (!data) {
          throw new Error("Failed to update user");
        }

        // const data = await response.json();
        toast.success(data.message);
        Setdis(false)
        Settextbtn("Edit")

        setLoad(false);
        // Handle success, e.g., show a success message
      } catch (error) {
        console.log(userData, "userData from tab")
        console.error("Error updating user:", error.message);
        toast.error(error.message);
        // Handle error, e.g., show an error message
      }
    }
  };

  const [phone, setPhone] = useState("");
  return (
    <>
      <Toaster />
      <div className="div-tab">
        <Box sx={{ width: "100%" }}>
          <AntTabs
            value={value}
            onChange={handleChange}
            aria-label="ant example"
            sx={{ borderColor: "rgba(0,0,0,0.2)" }}
          >
            <AntTab label="My Profile" />
            <AntTab label="Order History" />
            <AntTab label="Payment Method" />
            <AntTab label="Saved Addresses" />
          </AntTabs>
          <CustomTabPanel value={value} index={0}>
            <div className="noti-main-div">
              <div className="pay-top">
                <div className="pay-head">
                  <h4>Profile Details</h4>
                  <p>
                    Easily update your profile details on our platform for a
                    personalized experience. Your information is safeguarded
                    with us.{" "}
                    <span style={{ color: "#3b82f6", cursor: "pointer" }}>
                      Learn More.
                    </span>{" "}
                  </p>
                  <p></p>
                </div>
              </div>
              <div style={{ width: "50%" }}>
                <div
                  className="fr-cancel"
                  onClick={()=>{Updatefun(userData)}}
                  style={{ position: "relative", left: "85%" }}
                >
                  {textbtn}
                </div>

                <div className="general-container">
                  <div className="user-details-profile">
                    <div className="user-image-profile">
                      <img src="./avatar.jpg" />
                    </div>

                    <div
                      class="fixed-right"
                      style={{ marginTop: "2vh", justifyContent: "center" }}
                    >
                      <div class="fr-save w-9vw">Upload Avatar</div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <div className="input-fields">
                        <div className="div-name">
                          <label className="label-text text-sm font-bold">
                            First Name
                          </label>
                          <input
                            className="general__input"
                            type="text"
                            disabled={!dis}
                            placeholder="First Name"
                            name="firstname"
                            value={userData.firstname || ""}
                            onChange={handleData}
                          />
                        </div>
                        <div className="div-name">
                          <label className="label-text text-sm font-bold">
                            Last Name
                          </label>
                          <input
                            className="general__input"
                            type="text"
                            disabled={!dis}
                            placeholder="Last Name"
                            name="lastname"
                            value={userData.lastname || ""}
                            onChange={handleData}
                          />
                        </div>
                      </div>

                      <div className="input-fields">
                        <div className="div-name">
                          <label className="label-text text-sm font-bold">
                            Email
                          </label>
                          <div className="general__input c0" name="email">
                            {userData.email}
                          </div>
                        </div>
                        <div className="div-name">
                          <label className="label-text text-sm font-bold">
                            Phone No.
                          </label>
                          <PhoneInput
                            defaultCountry="in"
                            disabled={!dis}
                            value={phone}
                            className="phone-con"
                            inputClassName="general__input__phone"
                            onChange={(phone) =>
                              setUserData({ ...userData, phoneno: phone })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Notification />
            <Security email={userData.email} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Orders />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Payment email={userData.email} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Address email={userData.email} />
          </CustomTabPanel>
        </Box>
      </div>
    </>
  );
}
