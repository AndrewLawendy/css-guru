import { AttributeSelectorElement } from "../../types";

function getFlagInterpretation(selector: AttributeSelectorElement) {
  switch (selector.flags) {
    case "s":
      return `whose value is exactly and case-sensitively equal to <code>${selector.value.value}</code>`;
    case "i":
      return `whose value is exactly equal to any (ASCII-range) case-insensitive of <code>${selector.value.value}</code>`;
    default:
      throw new Error(`This flag ${selector.flags} is not a valid one`);
  }
}

function getAttributeMatcherInterpretation(selector: AttributeSelectorElement) {
  switch (selector.matcher) {
    case "=":
      if (selector.flags) return getFlagInterpretation(selector);
      return `whose value is exactly equal to <code>${selector.value.value}</code>`;
    case "~=":
      return `whose value contains exactly the string <code>${selector.value.value}</code>`;
    case "^=":
      return `whose value starts exactly with the string <code>${selector.value.value}</code>`;
    case "$=":
      return `whose value ends exactly with the string <code>${selector.value.value}</code>`;
    case "*=":
      return `whose value contains the substring of the string <code>${selector.value.value}</code>`;
    case "|=":
      return `whose value is a hyphen-separated list of values beginning with <code>${selector.value.value}</code>`;
    default:
      throw new Error(
        `This matcher ${selector.matcher} is not a valid attribute matcher`
      );
  }
}

export default function (selector: AttributeSelectorElement): string {
  const attributeInterpretation = `an attribute <code>${selector.name.name}</code>`;
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