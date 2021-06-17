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
      {
        prop: "position",
        value: "absolute",
        message: {
          type: "error",
          content:
            "margin-top has no effect on an element with a position absolute as it's now out of the flow",
        },
      },
      {
        prop: "position",
        value: "fixed",
        message: {
          type: "error",
          content:
            "margin-top has no effect on an element with a position fixed as it's now out of the flow",
        },
      },
    ],
  },
  marginRight: {
    conflicts: [
      {
        prop: "position",
        value: "absolute",
        message: {
          type: "error",
          content:
            "margin-right has no effect on an element with a position absolute as it's now out of the flow",
        },
      },
      {
        prop: "position",
        value: "fixed",
        message: {
          type: "error",
          content:
            "margin-right has no effect on an element with a position fixed as it's now out of the flow",
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
      {
        prop: "position",
        value: "absolute",
        message: {
          type: "error",
          content:
            "margin-bottom has no effect on an element with a position absolute as it's now out of the flow",
        },
      },
      {
        prop: "position",
        value: "fixed",
        message: {
          type: "error",
          content:
            "margin-bottom has no effect on an element with a position fixed as it's now out of the flow",
        },
      },
    ],
  },
  marginLeft: {
    conflicts: [
      {
        prop: "position",
        value: "absolute",
        message: {
          type: "error",
          content:
            "margin-left has no effect on an element with a position absolute as it's now out of the flow",
        },
      },
      {
        prop: "position",
        value: "fixed",
        message: {
          type: "error",
          content:
            "margin-left has no effect on an element with a position fixed as it's now out of the flow",
        },
      },
    ],
  },
};

export default rules;
