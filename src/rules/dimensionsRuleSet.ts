import { CssSmellingRuleSet } from "../types";

const rules: CssSmellingRuleSet = {
  width: {
    conflicts: [
      {
        prop: "display",
        value: "inline",
        message: {
          type: "error",
          content: "width property has no effect on display inline",
        },
      },
    ],
  },
  height: {
    conflicts: [
      {
        prop: "display",
        value: "inline",
        message: {
          type: "error",
          content: "height property has no effect on display inline",
        },
      },
    ],
  },
};

export default rules;
