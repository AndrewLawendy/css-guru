import { CssSmellingRuleSet } from "../types";

const ruleSet: CssSmellingRuleSet = {};

export function addToRuleSet(rules: CssSmellingRuleSet): void {
  Object.assign(ruleSet, rules);
}

export function getRuleSet(): CssSmellingRuleSet {
  return ruleSet;
}

require("./*.ts");
