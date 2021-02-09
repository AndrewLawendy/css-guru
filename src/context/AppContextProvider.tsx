import React, { FC, createContext, useState } from "react";

export const AppContext = createContext({});
import { ContextValueType } from "./types";

const AppContextProvider: FC = ({ children }) => {
  const [cssValue, setCssValue] = useState("");
  const value: ContextValueType = {
    cssValue,
    setCssValue,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
