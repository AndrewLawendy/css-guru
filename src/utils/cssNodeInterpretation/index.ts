import { CssNodePlain } from "css-tree";
import { CssNodeInterpretation } from "../../types";
import handleSelectorListRule from "./handleSelectorListRule";
import handleAtrule from "./handleAtrule";

export default function (
  node: CssNodePlain,
  nonParsedNode: CssNodePlain
): CssNodeInterpretation {
  switch (node.type) {
    case "Rule":
      return handleSelectorListRule(node, nonParsedNode);
    // case "Atrule":
    //   return handleAtrule(node);
  }
}
