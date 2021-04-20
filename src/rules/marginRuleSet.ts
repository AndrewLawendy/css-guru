import { CssSmellingRuleSet } from "../types";

const rules: CssSmellingRuleSet = {
  marginTop: {
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
  marginBottom: {
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
