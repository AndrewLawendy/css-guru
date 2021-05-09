import { CssSmellingRuleSet } from "../types";
import dimensionsRuleSet from "./dimensionsRuleSet";
import displayRuleSet from "./displayRuleSet";
import floatRuleSet from "./floatRuleSet";
import fontFamilyRuleSet from "./fontFamilyRuleSet";
import marginRuleSet from "./marginRuleSet";
import verticalAlignRuleSet from "./verticalAlignRuleSet";

const ruleSet: CssSmellingRuleSet = {
  ...dimensionsRuleSet,
  ...displayRuleSet,
  ...floatRuleSet,
  ...fontFamilyRuleSet,
  ...marginRuleSet,
  ...verticalAlignRuleSet,
};

export function getRuleSet(): CssSmellingRuleSet {
  return ruleSet;
}
