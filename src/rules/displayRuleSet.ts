import { CssSmellingRuleSet } from "../types";

const rules: CssSmellingRuleSet = {
  display: {
    conflicts: [
      {
        prop: "position",
        value: "absolute",
        message: {
          type: "error",
          content:
            "all element with position absolute behave as display block already",
        },
      },
    ],
  },
};

export default rules;
