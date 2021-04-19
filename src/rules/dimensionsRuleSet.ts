import { CssSmellingRuleSet } from "../types";

import { addToRuleSet } from "./index";

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

addToRuleSet(rules);
