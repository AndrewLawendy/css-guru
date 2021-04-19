import { CssSmellingRuleSet } from "../types";

import { addToRuleSet } from "./index";

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
  "margin-right": {
    conflicts: [
      {
        prop: "display",
        value: "inline",
        message: {
          type: "error",
          content:
            "margin-right has no effect on an element with a display inline",
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
  "margin-left": {
    conflicts: [
      {
        prop: "display",
        value: "inline",
        message: {
          type: "error",
          content:
            "margin-left has no effect on an element with a display inline",
        },
      },
    ],
  },
};

addToRuleSet(rules);
