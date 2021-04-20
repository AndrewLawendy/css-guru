import { CssSmellingRuleSet } from "../types";

const rules: CssSmellingRuleSet = {
  float: {
    conflicts: [
      {
        prop: "display",
        value: "inline",
        message: {
          type: "error",
          content: "display inline has no effect on floated elements",
        },
      },
      {
        prop: "display",
        value: "inline-block",
        message: {
          type: "error",
          content: "display inline-block has no effect on floated elements",
        },
      },
    ],
  },
};

export default rules;
