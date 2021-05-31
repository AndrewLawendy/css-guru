import { CssNodePlain } from "css-tree";
import handleSelectorListRule from "./handleSelectorListRule";
import handleAtrule from "./handleAtrule";

export default function (node: CssNodePlain): string[] {
  switch (node.type) {
    case "Rule":
      return handleSelectorListRule(node);
    case "Atrule":
      return handleAtrule(node);
  }
}
