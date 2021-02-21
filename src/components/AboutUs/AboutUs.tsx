import React, { FC } from "react";
import MarkdownParser from "../MarkdownParser/MarkdownParser";
const aboutUs = require("../../articles/about-us.md");

const AboutUs: FC = () => {
  return <MarkdownParser title="About Us" file={aboutUs} />;
};

export default AboutUs;
