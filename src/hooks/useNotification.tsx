import React from "react";
import { store } from "react-notifications-component";
import { Message } from "semantic-ui-react";

type NotificationPropTypes = {
  info?: boolean;
  positive?: boolean;
  negative?: boolean;
  icon: string;
  header: string;
  content?: string;
};

type ReturnHookType = [
  ({
    info,
    positive,
    negative,
    icon,
    header,
    content,
  }: NotificationPropTypes) => void
];

const useNotification = (): ReturnHookType => {
  const showNotification = ({
    info = false,
    positive = false,
    negative = false,
    icon = "",
    header = "",
    content = "",
  }: NotificationPropTypes) => {
    store.addNotification({
      content: (
        <Message
          info={info}
          position={positive}
          negative={negative}
          icon={icon}
          header={header}
          content={content}
        />
      ),
      container: "bottom-right",
      animationOut: ["animationOut"],
      dismiss: {
        duration: 1700,
      },
    });
  };

  return [showNotification];
};

export default useNotification;
