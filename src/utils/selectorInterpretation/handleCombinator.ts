import { RegularSelectorElement } from "../../types";

export default function (selectorElement: RegularSelectorElement): string {
  switch (selectorElement.name) {
    case ">":
      return "...is directly child of";
    case "+":
      return "...is immediately preceded by ";
    case "~":
      return "...is preceded by";
    default:
      throw new Error(
        `This combinator <code>${selectorElement.name}</code> is not valid`
      );
  }
}
