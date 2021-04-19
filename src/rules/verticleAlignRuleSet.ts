import { CssSmellingRuleSet } from "../types";

import { addToRuleSet } from "./index";

const rules: CssSmellingRuleSet = {
  "vertical-align": {
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

addToRuleSet(rules);
