import React, { FC } from "react";
import MarkdownParser from "../MarkdownParser/MarkdownParser";
import howItWorksArticle from "../../articles/how-it-works.md";

const HowItWorks: FC = () => {
  return <MarkdownParser title="How It Works" file={howItWorksArticle} />;
};

export default HowItWorks;
