import { attributeSelectorElement } from "../types";

function getFlagInterpretation(selector: attributeSelectorElement) {
  switch (selector.flags) {
    case "s":
      return `whose value is exactly and case-sensitively equal to ${selector.value.value}`;
    case "i":
      return `whose value is exactly equal to any (ASCII-range) case-insensitive of ${selector.value.value}`;
    default:
      throw new Error(`This flag ${selector.flags} is not a valid one`);
  }
}

function getAttributeMatcherInterpretation(selector: attributeSelectorElement) {
  switch (selector.matcher) {
    case "=":
      if (selector.flags) return getFlagInterpretation(selector);
      return `whose value is exactly equal to ${selector.value.value}`;
    case "~=":
      return `whose value contains exactly the string ${selector.value.value}`;
    case "^=":
      return `whose value starts exactly with the string ${selector.value.value}`;
    case "$=":
      return `whose value ends exactly with the string ${selector.value.value}`;
    case "*=":
      return `whose value contains the substring of the string ${selector.value.value}`;
    case "|=":
      return `whose value is a hyphen-separated list of values beginning with ${selector.value.value}`;
    default:
      throw new Error(
        `This matcher ${selector.matcher} is not a valid attribute matcher`
      );
  }
}

export default function (selector: attributeSelectorElement): string {
  const attributeInterpretation = `with an attribute "${selector.name.name}"`;
  let attributeMatcherInterpretation = "";

  if (selector.matcher) {
    attributeMatcherInterpretation = getAttributeMatcherInterpretation(
      selector
    );
  }
  return (
    attributeInterpretation +
    (attributeMatcherInterpretation ? ` ${attributeMatcherInterpretation}` : "")
  );
}
