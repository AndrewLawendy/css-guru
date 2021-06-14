import { CssNodePlain, RulePlain, TypeSelector } from "css-tree";
import { CodeSmellingMessage } from "../../types";
import { findLastIndex } from "../utils";
import getElementComputedValue from "./getElementComputedValue";
import getBlockComputedValue from "./getBlockComputedValue";
import sniff from "./sniff";

export default function (
  { prelude, block }: RulePlain,
  nonParsedNode: CssNodePlain
): CodeSmellingMessage[] {
  const codeSmells: CodeSmellingMessage[] = [];

  if (
    prelude.type === "SelectorList" &&
    nonParsedNode.type === "Rule" &&
    nonParsedNode.prelude.type === "Raw"
  ) {
    const blocks = nonParsedNode.prelude.value.split(/,\s*/g);
    prelude.children.forEach((selector, selectorIndex) => {
      if (selector.type === "Selector") {
        const elementIndex = findLastIndex<CssNodePlain>(
          selector.children,
          (selectorElement: CssNodePlain): boolean =>
            selectorElement.type === "TypeSelector"
        );
        const elementParentIndex = findLastIndex<CssNodePlain>(
          selector.children,
          (selectorElement: CssNodePlain): boolean =>
            selectorElement.type === "TypeSelector",
          elementIndex > 0 ? elementIndex - 1 : undefined
        );

        const element: CssNodePlain =
          elementIndex > -1
            ? selector.children[elementIndex]
            : { type: "TypeSelector", name: "any" };

        const elementParent: CssNodePlain =
          elementParentIndex > -1
            ? selector.children[elementParentIndex]
            : { type: "TypeSelector", name: "any" };

        const elementComputedValue = getElementComputedValue(
          (element as TypeSelector).name,
          (elementParent as TypeSelector).name
        );
        const blockComputedValue = getBlockComputedValue(block.children);
        const codeSmell = sniff(elementComputedValue, blockComputedValue);

        codeSmells.push({
          declarationBlock: `${blocks[selectorIndex]} [${nonParsedNode.prelude.loc.start.line}:${nonParsedNode.prelude.loc.start.column}]`,
          errorMessages: codeSmell,
        });
      }
    });
  }

  return codeSmells;
}
