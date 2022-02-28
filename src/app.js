import React from "react";
import { PageRoute } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import "app.css";
import { Layout } from "components";

function App() {
  return (
    <Router>
      <Layout>
        <PageRoute />
      </Layout>
    </Router>
  );
}

export default App;
