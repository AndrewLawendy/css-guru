import React, { FC } from "react";
import MarkdownParser from "../MarkdownParser/MarkdownParser";
const howItWorksArticle = require("../../articles/how-it-works.md");

const HowItWorks: FC = () => {
  return <MarkdownParser title="How It Works" file={howItWorksArticle} />;
};

export default HowItWorks;
