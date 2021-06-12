import { CssNodePlain } from "css-tree";
import { CodeSmellingMessage } from "../../types";

import handleRuleType from "./handleRuleType";
import handleAtRuleType from "./handleAtRuleType";

export default function (
  cssRule: CssNodePlain,
  nonParsedRule: CssNodePlain
): CodeSmellingMessage[] {
  switch (cssRule.type) {
    case "Rule":
      return handleRuleType(cssRule, nonParsedRule);
    case "Atrule":
      return handleAtRuleType(cssRule, nonParsedRule);
  }
}
