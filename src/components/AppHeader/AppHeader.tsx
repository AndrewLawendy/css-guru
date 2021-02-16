import React, { FC } from "react";
import { Link, useRoute } from "wouter";
import { Header } from "semantic-ui-react";

import styles from "./AppHeader.scss";

const AppHeader: FC = () => {
  const [isAboutUs] = useRoute("/about-us");

  return (
    <header className={styles.header}>
      <Header className="m-0" as="h1">
        <Link href="/">CSS Guru</Link>
      </Header>

      <nav className={styles.nav}>
        <Link
          href="/about-us"
          className={isAboutUs ? `${styles.active} text-bold` : "text-bold"}
        >
          About Us
        </Link>

        <a
          href="https://www.buymeacoffee.com/css.guru"
          target="_blank"
          rel="noreferrer"
          className={`${styles.buyMeACoffee} text-bold`}
        >
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
          />
        </a>
      </nav>
    </header>
  );
};

export default AppHeader;
