import React, { FC, useState, useEffect } from "react";
import { parse, toPlainObject } from "css-tree";
import reactStringReplace from "react-string-replace";
import flow from "lodash.flow";

import SelectorFlag from "../SelectorFlag/SelectorFlag";

import interpretSelector from "../../utils/selectorInterpretation";

import { CodeExplanationPropTypes } from "./types";

const CodeExplanation: FC<CodeExplanationPropTypes> = ({ cssValue }) => {
  const [selectorsInterpretations, setSelectorsInterpretations] = useState([]);

  useEffect(parseAndGenerateCssTree, [cssValue]);

  function parseAndGenerateCssTree() {
    setSelectorsInterpretations([]);
    const ast = parse(cssValue, { positions: true });
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
    function flagReplacement(text: string) {
      return reactStringReplace(text, /({.+})/g, (match, index) => {
        if (match) {
          const flag = JSON.parse(match);
          return <SelectorFlag key={`${match}-${index}`} {...flag} />;
        }

        return match;
      });
    }

    function codeTagReplacement(text: string) {
      return reactStringReplace(
        text,
        /<code>(.+?)<\/code>/g,
        (match, index) => (
          <code
            key={`${match}-${index}`}
            dangerouslySetInnerHTML={{ __html: match }}
          />
        )
      );
    }

    return flow(flagReplacement, codeTagReplacement)(interpretation);
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
