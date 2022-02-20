import React from "react";
import { FaBars } from "react-icons/fa";
import { FiSettings, FiSearch } from "react-icons/fi";
import { CgLogOut } from "react-icons/cg";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Badge, Menu, MenuItem, IconButton, Toolbar } from "@mui/material";
import { IconContext } from "react-icons";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
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
  },
}));

export const Header = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header>
      {/* <div className={classes.root}> */}
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <div
              className={`btn-toggle ${classes.menuButton}`}
              onClick={() => props.handleToggleSidebar(true)}
            >
              <IconContext.Provider value={{ color: "white", size: "2em" }}>
                <FaBars />
              </IconContext.Provider>
            </div>
            <div className="w-1.5 h-10 ml-5 bg-[#00B2FF] text-[#00B2FF]">.</div>
            <Typography variant="h6" className={classes.title}>
              Title
            </Typography>
            <IconButton>
              <FiSearch size="0.8em" className="text-[#2093d6]" />
            </IconButton>
            <div>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MdOutlineNotificationsActive className="text-[#2093d6]" />
                </Badge>
              </IconButton>
              <IconButton onClick={handleMenu} color="inherit">
                <p className="mt-1 mr-1 text-base">Hi,Amirul!</p>
                <AccountCircle fontSize="large" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={open}
                onClose={handleClose}
              >
                <IconContext.Provider
                  value={{ color: "#194886", size: "1.3em" }}
                >
                  <MenuItem onClick={handleClose}>
                    <FiSettings className="mr-3" />
                    Settings
                  </MenuItem>
                  <hr className="border-black" />
                  <MenuItem onClick={handleClose}>
                    <CgLogOut className="mr-3" />
                    Logout
                  </MenuItem>
                </IconContext.Provider>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </header>
  );
};
