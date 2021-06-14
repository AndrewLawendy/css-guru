import { CssNodePlain } from "css-tree";
import { CodeSmellingMessage } from "../../types";

import handleRuleType from "./handleRuleType";
import handleAtRuleType from "./handleAtRuleType";

export default function (
  node: CssNodePlain,
  nonParsedNode: CssNodePlain
): CodeSmellingMessage[] {
  switch (node.type) {
    case "Rule":
      return handleRuleType(node, nonParsedNode);
    case "Atrule":
      return handleAtRuleType(node, nonParsedNode);
  }
}
