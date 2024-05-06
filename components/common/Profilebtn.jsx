import * as React from "react";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { PiAddressBook } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { GoPerson } from "react-icons/go";
import { BsBagCheck } from "react-icons/bs";
import Logout from "@mui/icons-material/Logout";
import { useRouter } from 'next/router';
import {Getone} from "../../api_fetch/admin/User"

export default function AccountMenu() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneno: "",
    dob: "",
    gender: "",
    country: "",
  });
  const fetchUserData = async () => {
    try {
      // Extract JWT token from localStorage
      const token = localStorage.getItem("token");

      // const response = await fetch(
      //   `https://mamosh-backend-two.vercel.app/api/user/getone`,
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
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const pro = () => {
    localStorage.setItem("selectedTab", 0)
    router.push("/profile")
    setAnchorEl(null);
  };
  const live = () => {
    localStorage.setItem("selectedTab", 1)
    router.push("/profile")
    setAnchorEl(null);
  };
  const pay = () => {
    localStorage.setItem("selectedTab", 2)
    router.push("/profile")
    setAnchorEl(null);
  };
  const address = () => {
    localStorage.setItem("selectedTab", 3)
    router.push("/profile")
    setAnchorEl(null);
  };
  const logout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('persist:root');
    setAnchorEl(null);
    window.location.reload();
  }
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center"}}>
        <Tooltip>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 0, boxShadow:'none' }}
            aria-controls={open ? "account-menu" : undefined}
            
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32, backgroundColor:'transparent' }}><GoPerson style={{color:'black', fontSize:'23px'}}/></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            mt: 1.5,
            border:'1px solid rgba(0,0,0,0.2)',
            width:'300px',
            "& .MuiAvatar-root": {
              width: 40,
              border:'1px solid rgba(0,0,0,0.2)',
              height: 40,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              border:'1px solid rgba(0,0,0,0.2)',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: -555,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div style={{display:'flex', gap:'1vw', alignItems:'center'}} className="pro-name">
        <img src="https://res.cloudinary.com/dhlsvwpny/image/upload/v1711185079/avatar_zexe2w.jpg" className="avatar_pro"/>
          <div>
          <p style={{fontWeight:'600'}}>{userData.firstname} {userData.lastname}</p>
          <p>{userData.email}</p>
          </div>
        </div>
        <div className="my-2"></div>
        {/* <Divider /> */}
        
        <MenuItem onClick={pro} className="itempro">
          <ListItemIcon>
          <GoPerson style={{ fontSize:'18px', color:'black'}}/>
          </ListItemIcon>
          My Profile
        </MenuItem>
        <MenuItem onClick={live} className="itempro">
          <ListItemIcon>
          <BsBagCheck style={{fontSize:'18px', color:'black'}}/>
          </ListItemIcon>
          Order History
        </MenuItem>
        <MenuItem onClick={pay} className="itempro">
          <ListItemIcon>
          <MdOutlinePayment style={{fontSize:'18px', color:'black'}}/>
          </ListItemIcon>
          Payment Methods
        </MenuItem>
        <MenuItem onClick={address} className="itempro">
          <ListItemIcon>
          <PiAddressBook style={{fontSize:'18px', color:'black'}}/>
          </ListItemIcon>
          Saved Addresses
        </MenuItem>
        
        <div className="my-2"></div>
        <MenuItem onClick={logout} className="itempro">
          <ListItemIcon>
            <Logout style={{fontSize:'18px', color:'black'}} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
