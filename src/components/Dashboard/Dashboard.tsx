import React, { FC, useState, useEffect } from "react";
import { Grid, Segment, Accordion, Icon, Divider } from "semantic-ui-react";
import { ErrorBoundary } from "react-error-boundary";

import InterpretationErrorBoundaryFallback from "../InterpretationErrorBoundaryFallback/InterpretationErrorBoundaryFallback";
import Editor from "../Editor/Editor";
import CodeExplanation from "../CodeExplanation/CodeExplanation";

const Dashboard: FC = () => {
  const [cssValue, setCssValue] = useState("");
  const [editorDisabled, setEditorDisabled] = useState(false);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(-1);
  function handleAccordionClick(_, { index }) {
    const newIndex = activeAccordionIndex === index ? -1 : index;
    setActiveAccordionIndex(newIndex);
  }

  function resetInterpretation() {
    setCssValue("");
    setActiveAccordionIndex(-1);
    setEditorDisabled(false);
  }

  function handleError() {
    setEditorDisabled(true);
  }

  useEffect(() => {
    if (cssValue && activeAccordionIndex === -1) setActiveAccordionIndex(0);
  }, [cssValue]);

  return (
    <Grid>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Editor setCssValue={setCssValue} editorDisabled={editorDisabled} />
        </Grid.Column>

        <Grid.Column>
          <Accordion>
            <Segment>
              <Accordion.Title
                index={0}
                active={activeAccordionIndex === 0}
                onClick={handleAccordionClick}
              >
                <Icon name="dropdown" />
                Explanation
              </Accordion.Title>
              <Accordion.Content active={activeAccordionIndex === 0}>
                <Divider className="mt-0" />
                <ErrorBoundary
                  FallbackComponent={InterpretationErrorBoundaryFallback}
                  onReset={resetInterpretation}
                  onError={handleError}
                >
                  <CodeExplanation cssValue={cssValue} />
                </ErrorBoundary>
              </Accordion.Content>
            </Segment>

            <Segment>
              <Accordion.Title
                index={1}
                active={activeAccordionIndex === 1}
                onClick={handleAccordionClick}
              >
                <Icon name="dropdown" />
                Code Smells
              </Accordion.Title>
              <Accordion.Content active={activeAccordionIndex === 1}>
                <Divider className="mt-0" />
                <ErrorBoundary
                  FallbackComponent={InterpretationErrorBoundaryFallback}
                  onReset={resetInterpretation}
                  onError={handleError}
                >
                  Soon...
                </ErrorBoundary>
              </Accordion.Content>
            </Segment>
          </Accordion>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Dashboard;
