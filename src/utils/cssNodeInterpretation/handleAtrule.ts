import { AtrulePlain, CssNodePlain, AtrulePreludePlain } from "css-tree";
import { CssNodeInterpretation } from "../../types";
import { addToErrors } from "./selectorInterpretationErrorHandler";
import handleMediaQuery from "./handleMediaQuery";

export default function (
  { prelude, loc, block, name }: AtrulePlain,
  nonParsedNode: CssNodePlain
): CssNodeInterpretation {
  switch (name) {
    case "media":
      return handleMediaQuery(
        prelude as AtrulePreludePlain,
        loc,
        block,
        nonParsedNode
      );
    case "supports":
    case "page":
    case "font-face":
    case "keyframes":
    case "counter-style":
    case "font-feature-values":
    case "property":
    case "color-profile":
    case "import":
    case "charset":
      break;
    default:
      addToErrors(
        `<code>${name}</code> is not a valid at-rule identifier [${loc.start.line}:${loc.start.column}]`
      );
  }
}
