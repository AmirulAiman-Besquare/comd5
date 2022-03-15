import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  UserSetting,
  TransactionHistory,
  TradePage,
  Wallet,
  Notification,
  DashBoard,
  Register,
  Login,
  NotFoundPage,
} from "components";
import Home from "components/LandingPage/pages/Home";
import { ForgotPassword } from "components/ForgotPassword/ForgotPassword";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HashLoader from "react-spinners/HashLoader";

toast.configure();

export const PageRoute = () => {
  const [IsAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
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
            ) : isLoading ? (
              <div className="flex items-center justify-center h-full ">
                <HashLoader color="#00B2FF" size={100} />
              </div>
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
            ) : isLoading ? (
              <div className="flex items-center justify-center h-full ">
                <HashLoader color="#00B2FF" size={100} />
              </div>
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
        <Route exact path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
