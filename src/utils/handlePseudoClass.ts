import { PseudoClassElement } from "../types";

export default function (selectorElement: PseudoClassElement): string {
  switch (selectorElement.name) {
    case "hover":
      return "hovered";
    default:
      return selectorElement.name;
  }
}
