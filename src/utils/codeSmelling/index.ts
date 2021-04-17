import { CssRule, SelectorElement, RegularSelectorElement } from "../../types";
import getElementComputedValue from "./getElementComputedValue";
import getBlockComputedValue from "./getBlockComputedValue";
import { findLastIndex } from "../utils";

export default function ({ block, prelude }: CssRule): string[] {
  prelude.children.forEach((selector) => {
    const elementIndex = findLastIndex<SelectorElement>(
      selector.children,
      (selectorElement: SelectorElement): boolean =>
        selectorElement.type === "TypeSelector"
    );

    const element: SelectorElement =
      elementIndex > -1
        ? selector.children[elementIndex]
        : { type: "TypeSelector", name: "any" };
    assertTypeSelector(element);

    const elementComputedValue = getElementComputedValue(element.name);
    const blockComputedValue = getBlockComputedValue(block.children);
  });

  return [""];
}

function assertTypeSelector(
  element: SelectorElement
): asserts element is RegularSelectorElement {
  if (element.type !== "TypeSelector") {
    throw new Error("This selector is not of type Type");
  }
}
