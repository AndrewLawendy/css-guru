import { PseudoClassElement } from "../types";

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
      return "wip";
    case "nth-last-child":
      return "wip";
    case "first-child":
      return "is first child of its parent";
    case "last-child":
      return "is last child of its parent";
    case "only-child":
      return "is only child of its parent";
    case "nth-of-type":
      return "wip";
    case "nth-last-of-type":
      return "wip";
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

function handleCurrentState(selectorElement: PseudoClassElement): string {
  if (selectorElement.children?.length > 0) {
    return `is the deepest <code>:current</code> element that matches selector <code>${selectorElement.children[0].value}</code>`;
  } else {
    return "is currently presented in a time-dimensional canvas";
  }
}
