import {
  PseudoClassSelectorPlain,
  PseudoElementSelectorPlain,
  AnPlusB,
} from "css-tree";
import { SupportFlag } from "../../types";

import { interpretSelector } from "./handleSelectorListRule";
import handlePseudoElements from "./handlePseudoElements";
import { addToErrors } from "./selectorInterpretationErrorHandler";

export default function (selectorElement: PseudoClassSelectorPlain): string {
  switch (selectorElement.name) {
    case "not":
      return `does not match ${handleSelectorListParams(
        selectorElement,
        "or"
      )}`;
    case "is": {
      const flag: SupportFlag = {
        text: `matches ${handleSelectorListParams(selectorElement, "and/or")}`,
        status: "Experimental",
      };

      return JSON.stringify(flag);
    }
    case "where": {
      const flag: SupportFlag = {
        text: `matches ${handleSelectorListParams(
          selectorElement,
          "and/or"
        )} but contributes no specificity`,
        status: "Experimental",
      };

      return JSON.stringify(flag);
    }

    case "has": {
      const flag: SupportFlag = {
        text: `has the relative selectors ${handleSelectorListParams(
          selectorElement,
          "or"
        )} evaluated with the previous element as the :scope elements`,
        status: "Not Supported",
      };

      return JSON.stringify(flag);
    }

    case "dir":
      return handleDir(selectorElement);

    case "any-link": {
      const flag: SupportFlag = {
        text: "is the source anchor of a hyperlink",
        status: "Experimental",
      };

      return JSON.stringify(flag);
    }
    case "link":
      return "is the source anchor of a hyperlink of which the target is not yet visited";
    case "visited":
      return "is the source anchor of a hyperlink of which the target is already visited";
    case "local-link":
      return "is the source anchor of a hyperlink targeting the current URL";
    case "target":
      return "is the target of the current URL";
    case "target-within":
      return "is the target of the current URL or contains an element that does";
    case "scope":
      return "is designated reference element";

    case "current":
      return handleCurrentState(selectorElement);
    case "past":
      return "is in the past in a time-dimensional canvas";
    case "future":
      return "is in the future in a time-dimensional canvas";

    case "active":
      return "is in an activated state";
    case "hover":
      return "is hovered (under the cursor, or that has a descendant under the cursor)";
    case "focus":
      return "has user input focus";
    case "focus-within":
      return "has user input focus or contains an element that has input focus";
    case "focus-visible":
      return "has user input focus, and the UA has determined that a focus ring or other indicator should be drawn for that element";

    case "enabled":
      return "is enabled";
    case "disabled":
      return "is disabled";
    case "read-write":
      return "is user alterable";
    case "read-only":
      return "is not user alterable";
    case "placeholder-shown":
      return "is an input control currently showing placeholder text";
    case "checked":
      return "is checked/selected (for instance a radio-button or checkbox)";
    case "indeterminate":
      return "is in an indeterminate state (neither checked nor unchecked)";
    case "valid":
      return "meets its data validity semantics";
    case "invalid":
      return "doesn’t meet its data validity semantics";
    case "in-range":
      return "has a value in-range";
    case "out-of-range":
      return "has a value out-of-range";
    case "required":
      return "requires input";
    case "optional":
      return "does not require input";
    case "blank": {
      const flag: SupportFlag = {
        text: "has a blank (empty/missing) value",
        status: "Not Supported",
      };

      return JSON.stringify(flag);
    }
    case "user-invalid": {
      const flag: SupportFlag = {
        text:
          "is user-altered user-input with incorrect input (invalid, out-of-range, omitted-but-required)",
        status: "Experimental",
      };

      return JSON.stringify(flag);
    }

    case "root":
      return "is root of the document";
    case "empty":
      return "has no children (neither elements nor text) except perhaps white space";
    case "nth-child":
      return `${handleNth(selectorElement)} of its parent`;
    case "nth-last-child":
      return `${handleNth(
        selectorElement
      )} of its parent counting from the last one`;
    case "first-child":
      return "is first child of its parent";
    case "last-child":
      return "is last child of its parent";
    case "only-child":
      return "is only child of its parent";
    case "nth-of-type":
      return `${handleNth(selectorElement)} of its type`;
    case "nth-last-of-type":
      return `${handleNth(
        selectorElement
      )} of its type counting from the last one`;
    case "first-of-type":
      return "is the first sibling of its type";
    case "last-of-type":
      return "is the last sibling of its type";
    case "only-of-type":
      return "is the only sibling of its type";

    default:
      handleNotValidPseudoClass(selectorElement);
  }
}

function handleDir(selectorElement: PseudoClassSelectorPlain): string {
  if (selectorElement.children?.length > 0) {
    const [dirValue] = selectorElement.children;

    const flag: SupportFlag = {
      text: `has a ${
        dirValue.type === "Identifier" ? dirValue.name : ""
      } directionality (the document language specifies how directionality is determined)`,
      status: "Experimental",
    };

    return JSON.stringify(flag);
  } else {
    addToErrors(
      `<code>dir</code> pseudo class should have at least one parameter [${selectorElement.loc.start.line}:${selectorElement.loc.start.column}]`
    );
  }
}

function handleCurrentState(selectorElement: PseudoClassSelectorPlain): string {
  if (selectorElement.children?.length > 0) {
    const [currentSelector] = selectorElement.children;
    return `is the deepest <code>:current</code> element that matches selector <code>${
      currentSelector.type === "Raw" ? currentSelector.value : ""
    }</code>`;
  } else {
    return "is currently presented in a time-dimensional canvas";
  }
}

function handleNth(selectorElement: PseudoClassSelectorPlain): string {
  const [nthValue] = selectorElement.children;

  if (nthValue.type === "Nth") {
    switch (nthValue.nth.type) {
      case "Identifier":
        return `is an ${nthValue.nth.name}`;
      case "AnPlusB":
        return handleAnPlusB(nthValue.nth);
    }
  }
}

function handleAnPlusB(AnPlusB: AnPlusB): string {
  if (AnPlusB.a === null && AnPlusB.b !== null) {
    return `is the ${getNth(AnPlusB.b)} child`;
  } else if (AnPlusB.a !== null) {
    if (AnPlusB.b === null) {
      //An
      switch (AnPlusB.a) {
        case "1":
          return "is any child";
        case "2":
          return "is an even child";
        default:
          return `is any ${getNth(AnPlusB.a)} child`;
      }
    } else {
      // An+B
      if (AnPlusB.a === "0") {
        return `is the ${getNth(AnPlusB.b)} child`;
      } else {
        if (isNegative(AnPlusB.a)) {
          return handleNthNegativeB(AnPlusB.a, AnPlusB.b);
        } else {
          return handleNthPositiveB(AnPlusB.a, AnPlusB.b);
        }
      }
    }
  }
}

function getNth(nth: string): string {
  function getNthAboveTwenty(nthAboveTwenty: string): string {
    const lastDigit = nthAboveTwenty.slice(-1);

    switch (lastDigit) {
      case "1":
        return `${nthAboveTwenty}st`;
      case "2":
        return `${nthAboveTwenty}nd`;
      case "3":
        return `${nthAboveTwenty}rd`;
      default:
        return `${nthAboveTwenty}th`;
    }
  }

  switch (nth) {
    case "1":
      return "first";
    case "2":
      return "second";
    case "3":
      return "third";
    default:
      return Number(nth) > 20 ? getNthAboveTwenty(nth) : `${nth}th`;
  }
}

function handleNthNegativeB(a: string, b: string): string {
  const aNumber = Math.abs(Number(a));
  const bNumber = Number(b);
  if (aNumber >= bNumber) {
    return `is the ${getNth(b)} child`;
  } else {
    if (a === "-1") {
      return `is one of the first ${b} children`;
    } else {
      const selectedElements = [];
      for (let n = 0; n <= bNumber; n++) {
        const nthElement = bNumber - aNumber * n;
        if (nthElement <= 0) break;

        if (selectedElements.length <= 3) {
          selectedElements.push(`${getNth(nthElement.toString())} child`);
        } else {
          if (n < bNumber) selectedElements.push("etc...");
          break;
        }
      }

      return `is ${selectedElements.join(", ")}`;
    }
  }
}

function handleNthPositiveB(a: string, b: string): string {
  if (b === "1") return "is an odd child";
  return `is every ${getNth(a)} child starting at ${getNth(b)} child`;
}

function isNegative(nth: string): boolean {
  return nth.startsWith("-");
}

function handleSelectorListParams(
  selectorElement: PseudoClassSelectorPlain,
  link: string
): string {
  if (selectorElement.children != null) {
    const [selectorList] = selectorElement.children;
    if (selectorList.type === "SelectorList") {
      const selectors = selectorList.children;
      const selectorsListInterpreted = [];
      const getEither = selectors.length > 1 ? "either " : "";

      selectors.forEach((selector) => {
        if (selector.type === "Selector") {
          const selectorsInterpretations = interpretSelector(selector);
          selectorsListInterpreted.push(
            selectorsInterpretations.join(" ").toLowerCase()
          );
        }
      });

      return `${getEither}${selectorsListInterpreted.join(` ${link} `)}`;
    }
  } else {
    addToErrors(
      `<code>${selectorElement.name}</code> pseudo class should have at least one parameter [${selectorElement.loc.start.line}:${selectorElement.loc.start.column}]`
    );
  }
}

function handleNotValidPseudoClass(selectorElement: PseudoClassSelectorPlain) {
  switch (selectorElement.name) {
    case "before":
    case "after":
    case "first-line":
    case "first-letter":
    case "backdrop":
    case "cue":
    case "cue-region":
    case "grammar-error":
    case "marker":
    case "part":
    case "placeholder":
    case "spelling-error":
      handlePseudoElements(
        (selectorElement as unknown) as PseudoElementSelectorPlain
      );
      break;

    default:
      addToErrors(
        `This pseudo class <code>${selectorElement.name}</code> is invalid [${selectorElement.loc.start.line}:${selectorElement.loc.start.column}]`
      );
  }
}
