import React, { FC } from "react";
import reactStringReplace from "react-string-replace";
import { Popup, Icon } from "semantic-ui-react";
import { Flag } from "../../types";

import styles from "./SelectorFlag.scss";

const SelectorFlag: FC<Flag> = ({ text, status }) => {
  let popupContent;
  switch (status) {
    case "Experimental":
      popupContent = (
        <span>
          <Icon color="teal" name="lab" /> This feature is experimental ans is
          supported by limited browsers
        </span>
      );
      break;

    case "Not Supported":
      popupContent = (
        <span>
          <Icon color="red" name="exclamation triangle" /> This feature is not
          supported yet
        </span>
      );
      break;
  }

  const spanContent = reactStringReplace(
    text,
    /<code>(.+?)<\/code>/g,
    (match) => <code dangerouslySetInnerHTML={{ __html: match }} />
  );

  return (
    <Popup
      content={popupContent}
      trigger={<span className={styles.popupTrigger}>{spanContent}</span>}
      wide
      hoverable
    />
  );
};

export default SelectorFlag;
