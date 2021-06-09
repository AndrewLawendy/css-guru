import { AttributeSelector } from "css-tree";
import { addToErrors } from "./selectorInterpretationErrorHandler";

function getFlagInterpretation(selector: AttributeSelector) {
  switch (selector.flags) {
    case "s":
      return `a case-sensitively of`;
    case "i":
      return `any (ASCII-range) case-insensitive of`;
    case null:
      return "";
    default:
      addToErrors(`This flag <code>${selector.flags}</code> is not valid`);
  }
}

function getAttributeMatcherInterpretation(selector: AttributeSelector) {
  if (selector.value.type === "String") {
    switch (selector.matcher) {
      case "=":
        return `whose value is exactly equal to ${getFlagInterpretation(
          selector
        )} <code>${selector.value.value}</code>`;
      case "~=":
        return `whose value contains exactly ${getFlagInterpretation(
          selector
        )} <code>${selector.value.value}</code>`;
      case "^=":
        return `whose value starts exactly with ${getFlagInterpretation(
          selector
        )} <code>${selector.value.value}</code>`;
      case "$=":
        return `whose value ends exactly with ${getFlagInterpretation(
          selector
        )} <code>${selector.value.value}</code>`;
      case "*=":
        return `whose value contains the substring of ${getFlagInterpretation(
          selector
        )} <code>${selector.value.value}</code>`;
      case "|=":
        return `whose value is a hyphen-separated list of values beginning with ${getFlagInterpretation(
          selector
        )} <code>${selector.value.value}</code>`;
      default:
        addToErrors(
          `This matcher <code>${selector.matcher}</code> is not a valid attribute matcher`
        );
    }
  }
}

export default function (selector: AttributeSelector): string {
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
