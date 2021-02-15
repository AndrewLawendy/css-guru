import React from "react";
import ReactDOM from "react-dom";
import ReactNotification from "react-notifications-component";

import AppHeader from "./components/AppHeader/AppHeader";
import Dashboard from "./components/Dashboard/Dashboard";

import "semantic-ui-css/semantic.min.css";
import "react-notifications-component/dist/theme.css";
import "./style/style.scss";

const App = () => {
  return (
    <>
      <AppHeader />
      <Dashboard />;
      <ReactNotification />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
