import React, { FC, ReactNodeArray } from "react";
import { FallbackProps } from "react-error-boundary";
import { Message, Button, Icon } from "semantic-ui-react";
import reactStringReplace from "react-string-replace";

const InterpretationErrorBoundaryFallback: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  function replaceCode(message: string): ReactNodeArray {
    return reactStringReplace(
      message,
      /<code>(.+?)<\/code>/g,
      (match, index) => (
        <code
          key={`${match}-${index}`}
          dangerouslySetInnerHTML={{ __html: match }}
        />
      )
    );
  }

  const content = error.message
    .split("\n")
    .map((message, index) => (
      <li key={`${message}-${index}`}>{replaceCode(message)}</li>
    ));

  return (
    <>
      <Message
        error
        header="Something went wrong"
        content={<ul>{content}</ul>}
      />
      <Button color="red" onClick={resetErrorBoundary}>
        <Icon name="undo" />
        Retry
      </Button>
    </>
  );
};

export default InterpretationErrorBoundaryFallback;
