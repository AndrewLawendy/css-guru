import React from "react";
import ReactDOM from "react-dom";

import "semantic-ui-css/semantic.min.css";

import AppContextProvider from "./context/AppContextProvider";
import Editor from "./components/Editor/Editor";

const App = () => {
  return (
    <AppContextProvider>
      <Editor />
    </AppContextProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
