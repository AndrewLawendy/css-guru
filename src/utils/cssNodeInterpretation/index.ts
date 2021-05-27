import { CssNodePlain } from "css-tree";
import handleSelectorListRule from "./handleSelectorListRule";

export default function (node: CssNodePlain): string[] {
  switch (node.type) {
    case "Rule":
      return handleSelectorListRule(node);
  }
}
