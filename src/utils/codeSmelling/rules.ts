import { CssSmellingRuleSet } from "../../types";

export const rules: CssSmellingRuleSet = {
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
  display: {
    values: {
      block: [
        {
          prop: "position",
          value: "absolute",
          message: {
            type: "warning",
            content: "position block is not needed when position is absolute",
          },
        },
      ],
    },
  },
};
