import { CodeBlockSmell } from "../../types";

import React, { FC, useState, useEffect } from "react";
import { parse, toPlainObject } from "css-tree";

import { CodeSmellingPropTypes } from "./types";
import smellCode from "../../utils/codeSmelling";

const CodeSmelling: FC<CodeSmellingPropTypes> = ({ cssValue }) => {
  const [codeBlocksSmells, setCodeBlocksSmells] = useState<CodeBlockSmell[][]>(
    []
  );
  useEffect(smellCss, [cssValue]);

  function smellCss() {
    const ast = parse(cssValue);
    const { children: cssRules } = toPlainObject(ast);
    const codeSmells = [];

    cssRules.forEach((rule) => {
      codeSmells.push(smellCode(rule));
    });

    setCodeBlocksSmells(codeSmells);
  }

  return (
    <ul>
      {codeBlocksSmells.map((codeBlockSmells) =>
        codeBlockSmells.map(({ declaration, errorMessages }) => {
          if (errorMessages.length) {
            return (
              <li>
                {declaration}
                <ul>
                  {errorMessages.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </li>
            );
          }
        })
      )}
    </ul>
  );
};

export default CodeSmelling;
