import React, { useState, useEffect } from "react";
import { parse, toPlainObject } from "css-tree";
import { List } from "semantic-ui-react";

import { CodeSmellingMessage } from "../../types";
import { CodeSmellingPropTypes } from "./types";
import smellCode from "../../utils/codeSmelling";

import styles from "./CodeSmelling.scss";

const CodeSmelling = ({ cssValue }: CodeSmellingPropTypes): JSX.Element => {
  const [codeBlocksSmells, setCodeBlocksSmells] = useState<
    CodeSmellingMessage[][]
  >([]);
  useEffect(smellCss, [cssValue]);

  function smellCss() {
    const ast = parse(cssValue, { positions: true });
    const styleSheet = toPlainObject(ast);
    const nonParsedAst = parse(cssValue, {
      positions: true,
      parseRulePrelude: false,
      parseAtrulePrelude: false,
      parseValue: false,
    });
    const nonParsedStyleSheet = toPlainObject(nonParsedAst);
    const codeSmells = [];

    if (
      styleSheet.type === "StyleSheet" &&
      nonParsedStyleSheet.type === "StyleSheet"
    ) {
      const { children: cssNodes } = styleSheet;
      const { children: nonParsedCssNodes } = nonParsedStyleSheet;

      cssNodes.forEach((cssNode, cssNodeIndex) => {
        codeSmells.push(smellCode(cssNode, nonParsedCssNodes[cssNodeIndex]));
      });
    }

    setCodeBlocksSmells(codeSmells);
  }

  function getTypeIcon(type) {
    switch (type) {
      case "warning":
        return <List.Icon name="warning sign" color="yellow" />;
      case "error":
        return <List.Icon name="close" color="red" />;
    }
  }

  return (
    <List>
      {codeBlocksSmells.map((codeBlockSmells) =>
        codeBlockSmells.map(({ declarationBlock, errorMessages }, index) => {
          if (errorMessages.length) {
            return (
              <List.Item
                key={`${declarationBlock}-${index}`}
                className={styles.codeBlockSmellsErrorMessageBlock}
              >
                <List.Icon name="code" color="yellow" />
                <List.Content>
                  <List.Header>{declarationBlock}</List.Header>
                  <List.List>
                    {errorMessages.map(({ type, content }, index) => (
                      <List.Item key={`${type}-${content}-${index}`}>
                        {getTypeIcon(type)}
                        <List.Content>{content}</List.Content>
                      </List.Item>
                    ))}
                  </List.List>
                </List.Content>
              </List.Item>
            );
          }
        })
      )}
    </List>
  );
};

export default CodeSmelling;
