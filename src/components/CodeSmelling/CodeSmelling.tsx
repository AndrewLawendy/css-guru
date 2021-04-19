import React, { FC, useState, useEffect } from "react";
import { parse, toPlainObject } from "css-tree";
import { Icon } from "semantic-ui-react";

import { CodeSmellingMessage } from "../../types";
import { CodeSmellingPropTypes } from "./types";
import smellCode from "../../utils/codeSmelling";

const CodeSmelling: FC<CodeSmellingPropTypes> = ({ cssValue }) => {
  const [codeBlocksSmells, setCodeBlocksSmells] = useState<
    CodeSmellingMessage[][]
  >([]);
  useEffect(smellCss, [cssValue]);

  function smellCss() {
    const ast = parse(cssValue, { positions: true });
    const { children: cssRules } = toPlainObject(ast);
    const codeSmells = [];

    cssRules.forEach((rule) => {
      codeSmells.push(smellCode(rule));
    });

    setCodeBlocksSmells(codeSmells);
  }

  function getTypeIcon(type) {
    switch (type) {
      case "warning":
        return <Icon color="teal" name="lab" />;
      case "error":
        return <Icon color="red" name="exclamation triangle" />;
    }
  }

  return (
    <ul>
      {codeBlocksSmells.map((codeBlockSmells) =>
        codeBlockSmells.map(({ declarationBlock, errorMessages }) => {
          if (errorMessages.length) {
            return (
              <li key={declarationBlock}>
                {declarationBlock}
                <ul>
                  {errorMessages.map(({ type, content }) => (
                    <li key={`${type}-${content}`}>
                      {getTypeIcon(type)}
                      {content}
                    </li>
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
