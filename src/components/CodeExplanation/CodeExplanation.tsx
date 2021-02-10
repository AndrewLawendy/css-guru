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
    setSelectorsInterpretations([]);
    const ast = parse(cssValue);
    const { children: cssRules } = toPlainObject(ast);
    cssRules.forEach(({ prelude: { children: selectorList } }) => {
      selectorList.forEach((selector) => {
        const selectorsInterpretations = parseSelector(selector);
        setSelectorsInterpretations((selectorsInterpretationsArray) => [
          ...selectorsInterpretationsArray,
          selectorsInterpretations,
        ]);
      });
    });
  }

  return (
    <>
      {selectorsInterpretations.map((selectorInterpretations, index) => (
        <ul key={`selector-interpretations-${index}`}>
          {selectorInterpretations.map(
            (interpretation, interpretationIndex) => (
              <li
                key={`interpretation-${interpretationIndex}`}
                dangerouslySetInnerHTML={{ __html: interpretation }}
              ></li>
            )
          )}
        </ul>
      ))}
    </>
  );
};

export default CodeExplanation;
