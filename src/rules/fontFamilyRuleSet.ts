import { CssSmellingRuleSet } from "../types";

const rules: CssSmellingRuleSet = {
  fontFamily: {
    fallback: {
      delimiter: ",",
      message: {
        type: "warning",
        content: "It's preferable to have a fallback font",
      },
    },
  },
};

export default rules;
