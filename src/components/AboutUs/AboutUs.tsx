import React from "react";
import MarkdownParser from "../MarkdownParser/MarkdownParser";
import aboutUsArticle from "../../articles/about-us.md";

const AboutUs = (): JSX.Element => {
  return <MarkdownParser title="About Us" file={aboutUsArticle} />;
};

export default AboutUs;
