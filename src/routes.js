import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Login,
  Register,
  UserSetting,
  TransactionHistory,
  TradePage,
  Wallet,
  DashBoard,
  Notification,
} from "components";

export const PageRoute = () => {
  return (
    <>
      {/* <Layout /> */}
      <Routes>
        {/* Default Page */}
        <Route exact path="/" element={<DashBoard />} />

        {/* Other Page */}
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/usersetting" element={<UserSetting />} />
        <Route exact path="/tx" element={<TradePage />} />
        <Route exact path="/txhistory" element={<TransactionHistory />} />
        <Route exact path="/wallet" element={<Wallet />} />
        <Route exact path="/notification" element={<Notification />} />
      </Routes>
    </>
  );
};
