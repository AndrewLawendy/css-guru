import React, { FC, useState } from "react";
import { Grid, Segment, Accordion, Icon, Divider } from "semantic-ui-react";

import Editor from "../Editor/Editor";
import CodeExplanation from "../CodeExplanation/CodeExplanation";

const Dashboard: FC = () => {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0);
  function handleAccordionClick(_, { index }) {
    const newIndex = activeAccordionIndex === index ? -1 : index;
    setActiveAccordionIndex(newIndex);
  }

  return (
    <Grid>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Editor />
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
                <CodeExplanation />
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
                Smelling...
              </Accordion.Content>
            </Segment>
          </Accordion>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Dashboard;
