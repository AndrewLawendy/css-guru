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
    const declarationBlocks = getDeclarationBlocks(cssValue);
    const codeSmells = [];

    cssRules.forEach((rule, index) => {
      codeSmells.push(smellCode(rule, declarationBlocks[index]));
    });

    setCodeBlocksSmells(codeSmells);
  }

  function getDeclarationBlocks(cssValue: string): string[] {
    const declarations: string[] = [];
    const matches = [
      ...cssValue.replace(/\n+/g, "").matchAll(/(.+?)\s*{.+?}/g),
    ];

    matches.forEach((match) => {
      const [, declaration] = match;
      declarations.push(declaration);
    });

    return declarations;
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
