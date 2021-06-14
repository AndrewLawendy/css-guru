import React from "react";
import { Container, Header } from "semantic-ui-react";
import readingTime from "reading-time";
import { FileReaderPropTypes } from "./types";

import styles from "./MarkdownParser.scss";

const MarkdownParser = ({ title, file }: FileReaderPropTypes): JSX.Element => {
  const readingTimeStats = readingTime(file);

  return (
    <div className={styles.contentWrapper}>
      <Container text>
        <Header as="h1" className="mb-0">
          {title}
        </Header>
        <span className={styles.metaData}>{readingTimeStats.text}</span>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: file }}
        />
      </Container>
    </div>
  );
};

export default MarkdownParser;
