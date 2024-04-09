import * as React from "react";
import Box from "@mui/material/Box";

import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoIosArrowDown } from "react-icons/io";
import { PiAddressBookLight } from "react-icons/pi";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { AiOutlineDelete } from "react-icons/ai";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import { FaRegStar } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa6";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { CiDollar } from "react-icons/ci";
import { MdOutlinePayments } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
// import { useNavigate } from "react-router-dom";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { MdLiveTv } from "react-icons/md";

export default function AccountMenu() {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip>
          <p
            onClick={handleClick}
            size="small"
            sx={{
              ml: 2,
              boxShadow: "none",
              width: 50,
              height: 32,
              backgroundColor: "transparent",
            }}
            className="ava"
            aria-controls={open ? "account-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
          >
            <p style={{fontWeight:'300'}}>Actions <IoIosArrowDown /></p>
          </p>
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
            mt: 0.5,
            border: "1px solid rgba(0,0,0,0.2)",
            width: "30vh",
            "& .MuiAvatar-root": {
              width: 40,
              border: "1px solid rgba(0,0,0,0.2)",
              height: 40,
              ml: -0.5,
              mr: 1,
              bgcolor:'#f2f9ff'
            },
            "&::hover":{
                bgcolor:'#f2f9ff'
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              border: "1px solid rgba(0,0,0,0.2)",
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
        

        <MenuItem >
          <ListItemIcon>
          <FaRegStar style={{ fontSize: "18px", color:'black' }} />
          </ListItemIcon>
          Make Primary
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FaRegEdit style={{ fontSize: "18px", color:'black' }} />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <AiOutlineDelete style={{ fontSize: "18px", color:'black' }} />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
