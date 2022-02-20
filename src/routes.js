import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Register } from "components";

export const PageRoute = () => {
  return (
    <>
      {/* <Layout /> */}
      <Routes>
        {/* Default Page */}
        <Route exact path="/" element={<Login />} />

        {/* Other Page */}
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </>
  );
};
