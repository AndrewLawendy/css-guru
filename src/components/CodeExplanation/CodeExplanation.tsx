import React, { FC, useState, useEffect } from "react";
import { parse, toPlainObject } from "css-tree";

import parseSelector from "../../utils/parseSelector";

import { CodeExplanationPropTypes } from "./types";

const CodeExplanation: FC<CodeExplanationPropTypes> = ({ cssValue }) => {
  const [selectorsInterpretations, setSelectorsInterpretations] = useState([]);

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
