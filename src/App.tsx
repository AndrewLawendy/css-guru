import React from "react";
import ReactDOM from "react-dom";

import Dashboard from "./components/Dashboard/Dashboard";

import "semantic-ui-css/semantic.min.css";
import "./style/style.scss";

const App = () => {
  return <Dashboard />;
};

ReactDOM.render(<App />, document.getElementById("root"));
