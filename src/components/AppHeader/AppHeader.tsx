import React, { FC } from "react";
import { Link, useRoute } from "wouter";
import { Header } from "semantic-ui-react";

import logo from "../../assets/css-guru-logo.png";
import styles from "./AppHeader.scss";

const AppHeader: FC = () => {
  const [isAboutUs] = useRoute("/about-us");
  const [isHowItWorks] = useRoute("/how-it-works");

  return (
    <header className={styles.header}>
      <Header className={styles.logo} as="h1">
        <Link href="/" title="CSS Guru">
          <img src={logo} alt="CSS Guru Logo" />
          <span>CSS Guru</span>
        </Link>
      </Header>

      <nav className={styles.nav}>
        <Link
          href="/how-it-works"
          className={isHowItWorks ? `${styles.active} text-bold` : "text-bold"}
        >
          How It Works
        </Link>
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
