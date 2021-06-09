import { Combinator } from "css-tree";
import { addToErrors } from "./selectorInterpretationErrorHandler";

export default function (selectorElement: Combinator): string {
  switch (selectorElement.name) {
    case ">":
      return "...is directly child of";
    case "+":
      return "...is immediately preceded by ";
    case "~":
      return "...is preceded by";
    default:
      addToErrors(
        `This combinator <code>${selectorElement.name}</code> is not valid`
      );
  }
}
