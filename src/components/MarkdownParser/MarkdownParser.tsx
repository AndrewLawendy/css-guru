import React, { FC } from "react";
import { Container, Header } from "semantic-ui-react";
import readingTime from "reading-time";
import { FileReaderPropTypes } from "./types";

import styles from "./MarkdownParser.scss";

const MarkdownParser: FC<FileReaderPropTypes> = ({ title, file, children }) => {
  const readingTimeStats = readingTime(file);

  return (
    <div className={styles.contentWrapper}>
      <Container>
        <Header as="h1" className={styles.documentTitle}>
          {title}
        </Header>
        <span className={styles.metaData}>{readingTimeStats.text}</span>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: file }}
        />
        {children}
      </Container>
    </div>
  );
};

export default MarkdownParser;
