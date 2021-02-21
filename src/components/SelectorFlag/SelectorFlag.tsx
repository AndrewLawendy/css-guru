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
          <Icon color="teal" name="lab" /> This feature is experimental,
          supported by limited browsers and should not be used in production
          code
        </span>
      );
      break;

    case "Not Supported":
      popupContent = (
        <span>
          <Icon color="red" name="exclamation triangle" /> This feature is not
          supported yet by any browser
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
      flowing
      hoverable
    />
  );
};

export default SelectorFlag;
