import React, { useState, useEffect } from "react";
import { List, Message } from "semantic-ui-react";

import { CssValue, CodeSmellingMessage } from "../../types";
import smellCode from "../../utils/codeSmelling";

import styles from "./CodeSmelling.scss";

const CodeSmelling = (cssValue: CssValue): JSX.Element => {
  const [codeBlocksSmells, setCodeBlocksSmells] = useState<
    CodeSmellingMessage[][]
  >([]);

  useEffect(smellCss, [cssValue]);

  function smellCss() {
    const { cssNodes, nonParsedCssNodes } = cssValue;
    const codeSmells = [];

    cssNodes?.forEach((cssNode, cssNodeIndex) => {
      const codeSmell = smellCode(cssNode, nonParsedCssNodes[cssNodeIndex]);

      if (codeSmell?.length > 0) {
        codeSmells.push(codeSmell);
      }
    });

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
  if (cssValue.cssNodes) {
    if (codeBlocksSmells.length === 0) {
      return (
        <Message
          success
          icon="trophy"
          header="Way to Go!"
          content="Congrats! No errors or warning were spotted in your code according to our rule set"
        />
      );
    } else {
      return (
        <List>
          {codeBlocksSmells.map((codeBlockSmells) =>
            codeBlockSmells.map(
              ({ declarationBlock, errorMessages }, index) => {
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
              }
            )
          )}
        </List>
      );
    }
  } else {
    return (
      <Message
        warning
        content="Please fill the editor with valid CSS and hit Interpret CSS button to check for errors and warnings"
      />
    );
  }
};

export default CodeSmelling;
