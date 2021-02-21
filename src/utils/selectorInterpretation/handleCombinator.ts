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
      throw new Error(`Combinator ${selectorElement.name} is not valid`);
  }
}
