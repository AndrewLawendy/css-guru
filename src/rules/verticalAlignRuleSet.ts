import { CssSmellingRuleSet } from "../types";

const rules: CssSmellingRuleSet = {
  verticalAlign: {
    conflicts: [
      {
        prop: "display",
        value: "block",
        message: {
          type: "error",
          content: "vertical-align property has no effect on display block",
        },
      },
    ],
  },
};

export default rules;
