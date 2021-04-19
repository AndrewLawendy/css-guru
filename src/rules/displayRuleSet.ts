import { CssSmellingRuleSet } from "../types";

import { addToRuleSet } from "./index";

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

addToRuleSet(rules);
