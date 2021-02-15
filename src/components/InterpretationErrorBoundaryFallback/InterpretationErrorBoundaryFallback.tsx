import React, { FC } from "react";
import { FallbackProps } from "react-error-boundary";
import { Message, Button, Icon } from "semantic-ui-react";

const InterpretationErrorBoundaryFallback: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <>
      <Message error header="Something went wrong" content={error.message} />
      <Button color="red" onClick={resetErrorBoundary}>
        <Icon name="undo" />
        Retry
      </Button>
    </>
  );
};

export default InterpretationErrorBoundaryFallback;
