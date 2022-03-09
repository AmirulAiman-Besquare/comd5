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
import { Badge, Menu, MenuItem, IconButton, Toolbar } from "@mui/material";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { FaBell } from "react-icons/fa";

export const Header2 = ({ setAuth, handleToggleSidebar }) => {
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
    <nav class="flex justify-between items-center bg-[#0A2653] border-b-2 h-20 shadow-lg">
      <div class="logo">
        <h1 class="ml-5 cursor-pointer text-white font-bold text-2xl">
          TITLE HERE
        </h1>
      </div>
      <ul className="flex ">
        <li>
          <span class="relative inline-block mr-10">
            <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 20 20">
              <path
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg>
            <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              10
            </span>
          </span>
        </li>
        <li></li>
      </ul>
    </nav>
  );
};
