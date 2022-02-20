import React from "react";
import { PageRoute } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import "app.css";

function App() {
  return (
    <Router>
      <PageRoute />
    </Router>
  );
}

export default App;
