import React, { FC } from "react";
import { FallbackProps } from "react-error-boundary";
import { Message, Button, Icon } from "semantic-ui-react";
import reactStringReplace from "react-string-replace";

const InterpretationErrorBoundaryFallback: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const content = reactStringReplace(
    error.message,
    /<code>(.+?)<\/code>/g,
    (match) => <code dangerouslySetInnerHTML={{ __html: match }} />
  );
  return (
    <>
      <Message error header="Something went wrong" content={content} />
      <Button color="red" onClick={resetErrorBoundary}>
        <Icon name="undo" />
        Retry
      </Button>
    </>
  );
};

export default InterpretationErrorBoundaryFallback;
