import { CssSmellingRuleSet } from "../types";

import { addToRuleSet } from "./index";

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

addToRuleSet(rules);
