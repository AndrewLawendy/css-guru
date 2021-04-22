import {
  CssRule,
  SelectorElement,
  RegularSelectorElement,
  CodeSmellingMessage,
} from "../../types";
import { findLastIndex } from "../utils";
import getElementComputedValue from "./getElementComputedValue";
import getBlockComputedValue from "./getBlockComputedValue";
import sniff from "./sniff";

export default function (
  { block, prelude, type }: CssRule,
  declarationBlock: string
): CodeSmellingMessage[] {
  switch (type) {
    case "Rule":
      return handleRuleType(block, prelude, declarationBlock);
    default:
      return [];
  }
}

function handleRuleType(block, prelude, declarationBlock) {
  return prelude.children.reduce(
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
      const blockComputedValue = getBlockComputedValue(block.children);
      const codeSmell = sniff(elementComputedValue, blockComputedValue);

      codeSmells.push({
        declarationBlock,
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
