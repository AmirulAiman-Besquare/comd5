import React, { useState } from "react";
import { Header } from "./Header";
import { SideBar } from "./SideBar";

export const Layout = (props) => {
  const [toggled, setToggled] = useState(false);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <div className={`app ${toggled ? "toggled" : ""}`}>
      <SideBar toggled={toggled} handleToggleSidebar={handleToggleSidebar} />
      <main>
        <Header handleToggleSidebar={handleToggleSidebar} />
        <div className="app-content">{props.children}</div>
      </main>
    </div>
  );
};
