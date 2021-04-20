import { CssSmellingRuleSet } from "../types";

const rules: CssSmellingRuleSet = {
  "margin-top": {
    conflicts: [
      {
        prop: "display",
        value: "inline",
        message: {
          type: "error",
          content:
            "margin-top has no effect on an element with a display inline",
        },
      },
    ],
  },
  "margin-bottom": {
    conflicts: [
      {
        prop: "display",
        value: "inline",
        message: {
          type: "error",
          content:
            "margin-bottom has no effect on an element with a display inline",
        },
      },
    ],
  },
};

export default rules;
