import React from "react";
import ReactDOM from "react-dom";

import AppHeader from "./components/AppHeader/AppHeader";
import Dashboard from "./components/Dashboard/Dashboard";

import "semantic-ui-css/semantic.min.css";
import "./style/style.scss";

const App = () => {
  return (
    <>
      <AppHeader />
      <Dashboard />;
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
