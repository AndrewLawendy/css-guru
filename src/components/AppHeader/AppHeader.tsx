import React, { FC } from "react";
import { Header } from "semantic-ui-react";

import styles from "./AppHeader.scss";

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <Header className="m-0" as="h1">
        CSS Guru
      </Header>
      <a
        href="https://www.buymeacoffee.com/css.guru"
        target="_blank"
        rel="noreferrer"
        className={styles.buyMeACoffee}
      >
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
        />
      </a>
    </header>
  );
};

export default AppHeader;
