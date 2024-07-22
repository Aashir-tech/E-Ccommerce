import React, { useEffect, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/lab";
import { Backdrop } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux"
import { logout } from "../../../redux/slice/user";


const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert()
  const dispatch = useDispatch()

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: order },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/dashboard");
  }

  function order() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }

  
  function logoutUser() {
    dispatch(logout())
    alert.success("Logout Successfully")
    navigate('/')
  }

  return (
    <>
    <Backdrop open={open} style={{zIndex : "10"}} />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{zIndex: "11"}}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : <AccountCircleIcon />}
            alt="Profile"
          ></img>
        }
      >
        {options.map((item) => (
          <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
