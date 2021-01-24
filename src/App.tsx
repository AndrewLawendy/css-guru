import React from "react";
import ReactDOM from "react-dom";

import "semantic-ui-css/semantic.min.css";

import AppContextProvider from "./context/AppContextProvider";

const App = () => {
  return (
    <AppContextProvider>
      <h1>App is working!</h1>
    </AppContextProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
