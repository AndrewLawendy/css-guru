import { AtrulePlain, CssNodePlain } from "css-tree";
import { CssNodeInterpretation } from "../../types";
import { addToErrors } from "./selectorInterpretationErrorHandler";
import handleMediaQuery from "./handleMediaQuery";

export default function (
  { prelude, loc, block, name }: AtrulePlain,
  nonParsedNode: CssNodePlain
): CssNodeInterpretation {
  if (prelude.type === "AtrulePrelude") {
    switch (name) {
      case "media":
        return handleMediaQuery(prelude, loc, block, nonParsedNode);
      case "supports":
      case "page":
      case "font-face":
      case "keyframes":
      case "counter-style":
      case "font-feature-values":
      case "property":
      case "color-profile":
        break;
      default:
        addToErrors(`${name} is not a valid at-rule identifier`);
    }
  }
}
