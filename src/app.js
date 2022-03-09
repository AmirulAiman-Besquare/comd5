import React from "react";
import { PageRoute } from "./routes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import "app.css";

toast.configure();

function App() {
  return (
    <Router>
      <PageRoute />
    </Router>
  );
}

export default App;
