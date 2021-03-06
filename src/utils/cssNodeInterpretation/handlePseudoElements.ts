import { PseudoElementSelectorPlain } from "css-tree";
import { SupportFlag } from "../../types";
import { addToErrors } from "./selectorInterpretationErrorHandler";

export default function (selectorElement: PseudoElementSelectorPlain): string {
  switch (selectorElement.name) {
    case "before":
      return "the <code>before</code> pseudo-element";
    case "after":
      return "the <code>after</code> pseudo-element";
    case "first-line":
      return "the <code>first line</code>";
    case "first-letter":
      return "the <code>first letter</code>";
    case "backdrop":
      return "the box the size of the viewport which is rendered immediately beneath any element being presented in full-screen mode";

    case "cue":
      return "the WebVTT cues";
    case "cue-region": {
      const flag: SupportFlag = {
        text: "the WebVTT cues",
        status: "Not Supported",
      };

      return JSON.stringify(flag);
    }

    case "grammar-error": {
      const flag: SupportFlag = {
        text:
          "the text segment which the user agent has flagged as grammatically incorrect",
        status: "Not Supported",
      };

      return JSON.stringify(flag);
    }

    case "marker": {
      const flag: SupportFlag = {
        text:
          "the marker box of a list item, which typically contains a bullet or number",
        status: "Experimental",
      };

      return JSON.stringify(flag);
    }

    case "part":
      return handlePart(selectorElement);

    case "placeholder":
      return "the placeholder text in an <code>input</code> or <code>textarea</code>";

    case "spelling-error": {
      const flag: SupportFlag = {
        text: `the text segment which the user agent has flagged as incorrectly spelled`,
        status: "Not Supported",
      };

      return JSON.stringify(flag);
    }

    default:
      addToErrors(
        `This pseudo element <code>${selectorElement.name}</code> is invalid [${selectorElement.loc.start.line}:${selectorElement.loc.start.column}]`
      );
  }
}

function handlePart(selectorElement: PseudoElementSelectorPlain) {
  if (selectorElement.children) {
    const [partValue] = selectorElement.children;

    if (partValue.type === "Raw") {
      const value = partValue.value
        ? `<code>${partValue.value}</code>`
        : "a matching";

      const flag: SupportFlag = {
        text: `the element within a shadow tree that has ${value} <code>part</code> attribute`,
        status: "Experimental",
      };

      return JSON.stringify(flag);
    }
  } else {
    addToErrors(
      `This pseudo element <code>part</code> needs parameters [${selectorElement.loc.start.line}:${selectorElement.loc.start.column}]`
    );
  }
}
