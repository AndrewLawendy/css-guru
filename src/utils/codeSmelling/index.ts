import {
  CssRule,
  SelectorElement,
  RegularSelectorElement,
  CodeBlockSmell,
} from "../../types";
import { findLastIndex } from "../utils";
import getElementComputedValue from "./getElementComputedValue";
import getBlockComputedValue from "./getBlockComputedValue";
import sniff from "./sniff";

export default function ({ block, prelude }: CssRule): CodeBlockSmell[] {
  return prelude.children.reduce((codeSmells: CodeBlockSmell[], selector) => {
    const elementIndex = findLastIndex<SelectorElement>(
      selector.children,
      (selectorElement: SelectorElement): boolean =>
        selectorElement.type === "TypeSelector"
    );

    const element: SelectorElement =
      elementIndex > -1
        ? selector.children[elementIndex]
        : { type: "TypeSelector", name: "any" };

    const elementParent: SelectorElement =
      elementIndex > 2
        ? selector.children[elementIndex - 2]
        : { type: "TypeSelector", name: "any" };

    assertRegularSelectorElementType(element);
    assertRegularSelectorElementType(elementParent);

    const elementComputedValue = getElementComputedValue(
      element.name,
      elementParent.name
    );
    const blockComputedValue = getBlockComputedValue(block.children);
    const codeSmell = sniff(elementComputedValue, blockComputedValue);

    codeSmells.push({
      declaration: "div span",
      errorMessages: codeSmell,
    });

    return codeSmells;
  }, []);
}

function assertRegularSelectorElementType(
  element: SelectorElement
): asserts element is RegularSelectorElement {
  if (element.type !== "TypeSelector") {
    throw new Error("This selector is not of type Type");
  }
}
