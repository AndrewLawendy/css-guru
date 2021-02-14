import {
  PseudoClassElement,
  RegularPseudoClassElement,
  NthPseudoClassElement,
  NthAnPlusBPseudoClassChild,
} from "../types";

export default function (selectorElement: PseudoClassElement): string {
  switch (selectorElement.name) {
    case "dir":
      return `has a ${selectorElement.children[0].name} directionality (the document language specifies how directionality is determined)`;

    case "any-link":
      return "is the source anchor of a hyperlink";
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
      return "is under the cursor, or that has a descendant under the cursor";
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
    case "blank":
      return "has a blank (empty/missing) value";
    case "user-invalid":
      return "is user-altered user-input with incorrect input (invalid, out-of-range, omitted-but-required)";

    case "root":
      return "is root of the document";
    case "empty":
      return "has no children (neither elements nor text) except perhaps white space";
    case "nth-child":
      isNthPseudoClass(selectorElement);
      return `${handleNth(selectorElement)} of its parent`;
    case "nth-last-child":
      isNthPseudoClass(selectorElement);
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
      isNthPseudoClass(selectorElement);
      return `${handleNth(selectorElement)} of its type`;
    case "nth-last-of-type":
      isNthPseudoClass(selectorElement);
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
      throw new Error(`This pseudo class ${selectorElement.name} is invalid`);
  }
}

function handleCurrentState(
  selectorElement: RegularPseudoClassElement
): string {
  if (selectorElement.children?.length > 0) {
    return `is the deepest <code>:current</code> element that matches selector <code>${selectorElement.children[0].value}</code>`;
  } else {
    return "is currently presented in a time-dimensional canvas";
  }
}

function handleNth(selectorElement: NthPseudoClassElement): string {
  const [firstChild] = selectorElement.children;

  switch (firstChild.nth.type) {
    case "Identifier":
      return `is an ${firstChild.nth.name}`;
    case "AnPlusB":
      return handleAnPlusB(firstChild.nth);
  }
}

function handleAnPlusB(firstChildNth: NthAnPlusBPseudoClassChild): string {
  if (firstChildNth.a === null && firstChildNth.b !== null) {
    return `is the ${getNth(firstChildNth.b)} child`;
  } else if (firstChildNth.a !== null) {
    if (firstChildNth.b === null) {
      //An
      switch (firstChildNth.a) {
        case "1":
          return "is any child";
        case "2":
          return "is an even child";
        default:
          return `is any ${getNth(firstChildNth.a)} child`;
      }
    } else {
      // An+B
      if (firstChildNth.a === "0") {
        return `is the ${getNth(firstChildNth.b)} child`;
      } else {
        if (isNegative(firstChildNth.a)) {
          return handleNthNegativeB(firstChildNth.a, firstChildNth.b);
        } else {
          return handleNthPositiveB(firstChildNth.a, firstChildNth.b);
        }
      }
    }
  }
}

function getNth(nth: string): string {
  switch (nth) {
    case "1":
      return "first";
    case "2":
      return "second";
    case "3":
      return "third";
    default:
      return `${nth}th`;
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

function isNthPseudoClass(
  element: PseudoClassElement
): asserts element is NthPseudoClassElement {
  if (
    element.name !== "nth-child" &&
    element.name !== "nth-last-child" &&
    element.name !== "nth-of-type" &&
    element.name !== "nth-of-type"
  ) {
    throw new Error("This element is not an nth pseudo class");
  }
}
