import React from "react";
import ReactDOM from "react-dom";
import { Route } from "wouter";

import AppHeader from "./components/AppHeader/AppHeader";
import Dashboard from "./components/Dashboard/Dashboard";
import AboutUs from "./components/AboutUs/AboutUs";

import "semantic-ui-css/semantic.min.css";
import "./style/style.scss";

const App = () => {
  return (
    <>
      <AppHeader />
      <div className="app-container">
        <Route path="/" component={Dashboard} />
        <Route path="/about-us" component={AboutUs} />
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
