import React, { FC, useContext, useState, useEffect } from "react";
import { parse, toPlainObject } from "css-tree";

import { AppContext } from "../../context/AppContextProvider";
import { ContextValueType } from "../../context/types";

import parseSelector from "../../utils/parseSelector";

const CodeExplanation: FC = () => {
  const [selectorsInterpretations, setSelectorsInterpretations] = useState([]);
  const { cssValue }: ContextValueType = useContext(AppContext);

  useEffect(parseAndGenerateCssTree, [cssValue]);

  function parseAndGenerateCssTree() {
    const ast = parse(cssValue);
    const { children: cssRules } = toPlainObject(ast);
    cssRules.forEach(({ prelude: { children: selectorList } }) => {
      selectorList.forEach((selector) => {
        const selectorsInterpretation = parseSelector(selector);
      });
    });
  }

  return <div>Parsing...</div>;
};

export default CodeExplanation;
