import React, { FC, useState, useEffect } from "react";
import { parse, toPlainObject } from "css-tree";
import reactStringReplace from "react-string-replace";
import flow from "lodash.flow";
import { List } from "semantic-ui-react";

import SelectorFlag from "../SelectorFlag/SelectorFlag";

import interpretCssNode from "../../utils/cssNodeInterpretation";
import { fireInterpretationErrors } from "../../utils/cssNodeInterpretation/selectorInterpretationErrorHandler";

import { CodeExplanationPropTypes } from "./types";
import { CssNodeInterpretation } from "../../types";

const CodeExplanation: FC<CodeExplanationPropTypes> = ({ cssValue }) => {
  const [cssNodesInterpretations, setCssNodesInterpretations] = useState<
    CssNodeInterpretation[]
  >([]);

  useEffect(parseAndGenerateCssTree, [cssValue]);

  function parseAndGenerateCssTree() {
    setCssNodesInterpretations([]);
    const ast = parse(cssValue, { positions: true });
    const cssNode = toPlainObject(ast);
    const nonParsedAst = parse(cssValue, {
      positions: true,
      parseRulePrelude: false,
      parseAtrulePrelude: false,
      parseValue: false,
    });
    const nonParsedCssNode = toPlainObject(nonParsedAst);
    const nodeInterpretations: CssNodeInterpretation[] = [];

    if (
      cssNode.type === "StyleSheet" &&
      nonParsedCssNode.type === "StyleSheet"
    ) {
      const { children: cssNodes } = cssNode;
      const { children: nonParsedCssRules } = nonParsedCssNode;
      cssNodes.forEach((node, nodeIndex) => {
        const nodeInterpretation = interpretCssNode(
          node,
          nonParsedCssRules[nodeIndex]
        );
        nodeInterpretations.push(nodeInterpretation);
      });
    }

    setCssNodesInterpretations(nodeInterpretations);
    fireInterpretationErrors();
  }

  function formatInterpretation(interpretation: string): React.ReactNodeArray {
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
    <List>
      {cssNodesInterpretations.map(
        (
          { mediaQuery, blocksInterpretations },
          cssNodeInterpretationsIndex
        ) => (
          <List.Item key={`${mediaQuery}-${cssNodeInterpretationsIndex}`}>
            <List.Icon name="desktop" />
            <List.Content>
              <List.Header>{mediaQuery}</List.Header>
              {blocksInterpretations.map(
                (
                  { block, location, selectorsInterpretation },
                  interpretationIndex
                ) => {
                  return (
                    <List.List
                      key={`${mediaQuery}-${cssNodeInterpretationsIndex}-${block}-${location}-${interpretationIndex}`}
                    >
                      <List.Item>
                        <List.Icon name="code" color="yellow" />
                        <List.Content>
                          <List.Header>{`${block} ${location}`}</List.Header>
                          <List.List
                            key={`${mediaQuery}-${cssNodeInterpretationsIndex}-${block}-${location}-${interpretationIndex}-selector-interpretations-${cssNodeInterpretationsIndex}-${interpretationIndex}`}
                          >
                            {selectorsInterpretation.map(
                              (
                                selectorInterpretation,
                                selectorInterpretationIndex
                              ) => {
                                const interpretationFormatted = formatInterpretation(
                                  selectorInterpretation
                                );

                                return (
                                  <List.Item
                                    key={`${mediaQuery}-${cssNodeInterpretationsIndex}-${block}-${location}-${interpretationIndex}-selector-interpretations-${cssNodeInterpretationsIndex}-${interpretationIndex}-interpretation-${cssNodeInterpretationsIndex}-${interpretationIndex}-${selectorInterpretationIndex}`}
                                  >
                                    {selectorInterpretationIndex % 2 > 0 ? (
                                      <List.Icon name="linkify" color="olive" />
                                    ) : (
                                      <List.Icon
                                        name="css3 alternate"
                                        color="blue"
                                      />
                                    )}

                                    <List.Content>
                                      {interpretationFormatted}
                                    </List.Content>
                                  </List.Item>
                                );
                              }
                            )}
                          </List.List>
                        </List.Content>
                      </List.Item>
                    </List.List>
                  );
                }
              )}
            </List.Content>
          </List.Item>
        )
      )}
    </List>
  );
};

export default CodeExplanation;
