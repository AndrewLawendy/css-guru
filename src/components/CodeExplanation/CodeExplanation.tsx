import React, { FC, useState, useEffect } from "react";
import { parse, toPlainObject } from "css-tree";
import reactStringReplace from "react-string-replace";

import SelectorFlag from "../SelectorFlag/SelectorFlag";

import interpretSelector from "../../utils/selectorInterpretation";

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
        const selectorsInterpretations = interpretSelector(selector);
        setSelectorsInterpretations((selectorsInterpretationsArray) => [
          ...selectorsInterpretationsArray,
          selectorsInterpretations,
        ]);
      });
    });
  }

  function formatInterpretation(interpretation: string) {
    const flagReplacement = reactStringReplace(
      interpretation,
      /({.+})/g,
      (match, i) => {
        if (match) {
          const flag = JSON.parse(match);
          return <SelectorFlag {...flag} />;
        }

        return match;
      }
    );

    const codeTagReplacement = reactStringReplace(
      flagReplacement,
      /<code>(.+?)<\/code>/g,
      (match) => <code dangerouslySetInnerHTML={{ __html: match }} />
    );

    return codeTagReplacement;
  }

  return (
    <>
      {selectorsInterpretations.map((selectorInterpretations, index) => (
        <ul key={`selector-interpretations-${index}`}>
          {selectorInterpretations.map(
            (interpretation, interpretationIndex) => {
              const interpretationFormatted = formatInterpretation(
                interpretation
              );

              return (
                <li key={`interpretation-${interpretationIndex}`}>
                  {interpretationFormatted}
                </li>
              );
            }
          )}
        </ul>
      ))}
    </>
  );
};

export default CodeExplanation;
