import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaBars } from "react-icons/fa";
import {
  FiSettings,
  FiSearch,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { CgLogOut } from "react-icons/cg";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Badge, Menu, MenuItem, IconButton, Toolbar } from "@mui/material";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
  hditem: {
    "@media (max-width: 450px)": {
      justifyContent: "space-between",
    },
  },

  appBar: {
    backgroundColor: "#0A2653",
    borderBottom: "solid #2d95d1 5px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    paddingLeft: "10px",
    fontSize: "2em",
    fontFamily: "Readex Pro",

    "@media (max-width: 450px)": {
      display: "none",
    },
  },
}));

export const Header = ({ setAuth, handleToggleSidebar }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [name, setName] = useState();

  async function getName() {
    try {
      const response = await fetch("http://157.245.57.54:5000/display/user", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setName(parseRes[0].first_name);
    } catch (error) {
      console.error(error.message);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <header>
      {/* <div className={classes.root}> */}
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.hditem}>
            <div
              className={`btn-toggle ${classes.menuButton}`}
              onClick={() => handleToggleSidebar(true)}
            >
              <IconContext.Provider value={{ color: "white", size: "2em" }}>
                <FaBars />
              </IconContext.Provider>
            </div>
            <div className="w-1.5 h-10 ml-5 bg-[#00B2FF] text-[#00B2FF] hidden xs:block">
              .
            </div>
            <Typography variant="h6" className={classes.title}></Typography>
            <IconButton>
              <FiSearch
                size="0.8em"
                className="text-[#2093d6] hidden xs:block"
              />
            </IconButton>
            <div>
              <IconButton color="inherit">
                <Link to={"/notification"}>
                  <Badge badgeContent={4} color="secondary">
                    <MdOutlineNotificationsActive className="text-[#2093d6]" />
                  </Badge>
                </Link>
              </IconButton>
              <IconButton
                onClick={handleMenu}
                color="inherit"
                disableRipple={true}
              >
                <p className="mt-1 ml-1 text-base">Hi,{name}</p>
                <AccountCircle fontSize="large" />
                <>
                  {open ? (
                    <FiChevronUp className="m-auto" />
                  ) : (
                    <FiChevronDown className="m-auto" />
                  )}
                </>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                // getContentAnchorEl={null}
                // anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                // transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={open}
                onClose={handleClose}
              >
                <IconContext.Provider
                  value={{ color: "#194886", size: "1.3em" }}
                >
                  <Link to="/usersetting">
                    <MenuItem onClick={handleClose}>
                      <FiSettings className="mr-3 -mt-0.5" />
                      Settings
                    </MenuItem>
                  </Link>

                  <hr className="border-black" />
                  <Button onClick={(e) => logout(e)}>
                    <CgLogOut className="mr-3" />
                    Logout
                  </Button>
                </IconContext.Provider>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </header>
  );
};
