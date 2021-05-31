import { AtrulePlain } from "css-tree";
import { addToErrors } from "./selectorInterpretationErrorHandler";
import handleMediaQuery from "./handleMediaQuery";

export default function ({ prelude, name }: AtrulePlain): string[] {
  if (prelude.type === "AtrulePrelude") {
    switch (name) {
      case "media":
        return [handleMediaQuery(prelude)];
      case "supports":
      case "page":
      case "font-face":
      case "keyframes":
      case "counter-style":
      case "font-feature-values":
      case "property":
      case "color-profile":
        break;
      default:
        addToErrors(`${name} is not a valid at-rule identifier`);
    }
  }
}
