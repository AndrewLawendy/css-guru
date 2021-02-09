import React from "react";
import ReactDOM from "react-dom";

import AppContextProvider from "./context/AppContextProvider";
import Dashboard from "./components/Dashboard/Dashboard";

import "semantic-ui-css/semantic.min.css";
import "./style/style.scss";

const App = () => {
  return (
    <AppContextProvider>
      <Dashboard />
    </AppContextProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
