import React, { FC } from "react";
import MarkdownParser from "../MarkdownParser/MarkdownParser";
const aboutUsArticle = require("../../articles/about-us.md");

const AboutUs: FC = () => {
  return <MarkdownParser title="About Us" file={aboutUsArticle} />;
};

export default AboutUs;
