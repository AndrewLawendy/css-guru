import { SelectorElement } from "../../types";

export default function (selectorElement: SelectorElement): string {
  switch (selectorElement.name) {
    case "before":
      return "the <code>before</code> pseudo-element";
    case "after":
      return "the <code>after</code> pseudo-element";
    case "first-line":
      return "the <code>first line</code>";
    case "first-letter":
      return "the <code>first letter</code>";
    default:
      throw new Error(
        `This pseudo element <code>${selectorElement.name}</code> is invalid`
      );
  }
}
