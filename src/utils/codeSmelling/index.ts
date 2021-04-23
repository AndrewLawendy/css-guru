import {
  CssRule,
  NonParsedCssRule,
  SelectorElement,
  RegularSelectorElement,
  CodeSmellingMessage,
} from "../../types";
import { findLastIndex } from "../utils";
import getElementComputedValue from "./getElementComputedValue";
import getBlockComputedValue from "./getBlockComputedValue";
import sniff from "./sniff";

export default function (
  cssRule: CssRule,
  nonParsedRule: NonParsedCssRule
): CodeSmellingMessage[] {
  switch (cssRule.type) {
    case "Rule":
      return handleRuleType(cssRule, nonParsedRule);
    default:
      return [];
  }
}

function handleRuleType(cssRule: CssRule, nonParsedRule: NonParsedCssRule) {
  return cssRule.prelude.children.reduce(
    (codeSmells: CodeSmellingMessage[], selector) => {
      const elementIndex = findLastIndex<SelectorElement>(
        selector.children,
        (selectorElement: SelectorElement): boolean =>
          selectorElement.type === "TypeSelector"
      );
      const elementParentIndex = findLastIndex<SelectorElement>(
        selector.children,
        (selectorElement: SelectorElement): boolean =>
          selectorElement.type === "TypeSelector",
        elementIndex > 0 ? elementIndex - 1 : undefined
      );

      const element: SelectorElement =
        elementIndex > -1
          ? selector.children[elementIndex]
          : { type: "TypeSelector", name: "any" };

      const elementParent: SelectorElement =
        elementParentIndex > -1
          ? selector.children[elementParentIndex]
          : { type: "TypeSelector", name: "any" };

      assertRegularSelectorElementType(element);
      assertRegularSelectorElementType(elementParent);

      const elementComputedValue =
        element.name !== "any"
          ? getElementComputedValue(element.name, elementParent.name)
          : null;
      const blockComputedValue = getBlockComputedValue(cssRule.block.children);
      const codeSmell = sniff(elementComputedValue, blockComputedValue);

      codeSmells.push({
        declarationBlock: `${nonParsedRule.prelude.value} [${nonParsedRule.prelude.loc.start.line}:${nonParsedRule.prelude.loc.start.column}]`,
        errorMessages: codeSmell,
      });

      return codeSmells;
    },
    []
  );
}

function assertRegularSelectorElementType(
  element: SelectorElement
): asserts element is RegularSelectorElement {
  if (element.type !== "TypeSelector") {
    throw new Error("This selector is not of type Type");
  }
}
