import React, { useState, useEffect } from "react";
import reactStringReplace from "react-string-replace";
import flow from "lodash.flow";
import { List, Message } from "semantic-ui-react";

import SelectorFlag from "../SelectorFlag/SelectorFlag";

import interpretCssNode from "../../utils/cssNodeInterpretation";
import { fireInterpretationErrors } from "../../utils/cssNodeInterpretation/selectorInterpretationErrorHandler";

import { CssValue, CssNodeInterpretation } from "../../types";

import styles from "./CodeExplanation.scss";

const CodeExplanation = (cssValue: CssValue): JSX.Element => {
  const [cssNodesInterpretations, setCssNodesInterpretations] = useState<
    CssNodeInterpretation[]
  >([]);

  useEffect(parseAndGenerateCssTree, [cssValue]);

  function parseAndGenerateCssTree() {
    setCssNodesInterpretations([]);
    const { cssNodes, nonParsedCssNodes } = cssValue;
    const nodeInterpretations: CssNodeInterpretation[] = [];

    cssNodes?.forEach((node, nodeIndex) => {
      const nodeInterpretation = interpretCssNode(
        node,
        nonParsedCssNodes[nodeIndex]
      );
      nodeInterpretations.push(nodeInterpretation);
    });

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

  if (cssValue.cssNodes) {
    return (
      <List>
        {cssNodesInterpretations.map(
          (
            { mediaQuery, blocksInterpretations },
            cssNodeInterpretationsIndex
          ) => (
            <List.Item
              key={`${mediaQuery}-${cssNodeInterpretationsIndex}`}
              className={styles.cssNodesInterpretationsBlock}
            >
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
                                        <List.Icon
                                          name="linkify"
                                          color="olive"
                                        />
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
  } else {
    return (
      <Message
        warning
        content="Please fill the editor with valid CSS and hit Interpret CSS button to read the explanation"
      />
    );
  }
};

export default CodeExplanation;
