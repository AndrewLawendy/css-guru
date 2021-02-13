import { regularSelectorElement } from "../types";

export default function (selectorElement: regularSelectorElement): string {
  switch (selectorElement.name) {
    case "hover":
      return "hovered";
    default:
      return selectorElement.name;
  }
}
