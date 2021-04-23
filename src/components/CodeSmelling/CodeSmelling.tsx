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
    const nonParsedAst = parse(cssValue, {
      positions: true,
      parseRulePrelude: false,
      parseAtrulePrelude: false,
      parseValue: false,
    });
    const { children: cssRules } = toPlainObject(ast);
    const { children: nonParsedCssRules } = toPlainObject(nonParsedAst);
    const codeSmells = [];

    cssRules.forEach((rule, index) => {
      codeSmells.push(smellCode(rule, nonParsedCssRules[index]));
    });

    setCodeBlocksSmells(codeSmells);
  }

  function getTypeIcon(type) {
    switch (type) {
      case "warning":
        return <Icon color="yellow" name="warning sign" />;
      case "error":
        return <Icon color="red" name="close" />;
    }
  }

  return (
    <ul>
      {codeBlocksSmells.map((codeBlockSmells) =>
        codeBlockSmells.map(({ declarationBlock, errorMessages }, index) => {
          if (errorMessages.length) {
            return (
              <li key={`${declarationBlock}-${index}`}>
                {declarationBlock}
                <ul>
                  {errorMessages.map(({ type, content }, index) => (
                    <li key={`${type}-${content}-${index}`}>
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
