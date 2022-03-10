import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  UserSetting,
  TransactionHistory,
  TradePage,
  Wallet,
  Layout,
  Notification,
  DashBoard,
  Register,
  Login,
} from "components";
import Home from "components/LandingPage/pages/Home";
import { ForgotPassword } from "components/ForgotPassword/ForgotPassword";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const PageRoute = () => {
  const [IsAuthenticated, setIsAuthenticated] = useState(true);
  console.log(IsAuthenticated);
  const setAuth = (Boolean) => {
    setIsAuthenticated(Boolean);
  };

  async function checkAuth() {
    try {
      const response = await fetch("http://157.245.57.54:5000/user/verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    checkAuth();
  }, [IsAuthenticated]);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/login"
          element={
            !IsAuthenticated ? (
              <Login setAuth={setAuth} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          exact
          path="/register"
          element={
            !IsAuthenticated ? (
              <Register setAuth={setAuth} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        {/* Default Page */}
        <Route
          exact
          path="/dashboard"
          element={
            IsAuthenticated ? (
              <DashBoard setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          exact
          path="/usersetting"
          element={
            IsAuthenticated ? (
              <UserSetting setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          exact
          path="/trade"
          element={
            IsAuthenticated ? (
              <TradePage setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          exact
          path="/transactionhistory"
          element={
            IsAuthenticated ? (
              <TransactionHistory setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          exact
          path="/wallet"
          element={
            IsAuthenticated ? (
              <Wallet setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          exact
          path="/notification"
          element={
            IsAuthenticated ? (
              <Notification setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
};
