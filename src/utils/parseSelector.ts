import { selectorElement, selector } from "../types";

import handleAttributeSelectedElement from "./handleAttributeSelectedElement";

function getElementType(selector: selectorElement): string {
  switch (selector.type) {
    case "TypeSelector":
      return selector.name;
    case "ClassSelector":
      return `with class "${selector.name}"`;
    case "IdSelector":
      return `with id "${selector.name}"`;
    case "AttributeSelector":
      return handleAttributeSelectedElement(selector);
  }
}

function parseElement(selectorElement) {
  const elementType = getElementType(selectorElement);

  return elementType;
}

function parseElementLink() {}

export default function ({ children }: selector): string {
  const interpretations = [];
  let lastElement = "An element";

  for (let index = children.length - 1; index >= 0; index--) {
    const selectorElement = children[index];
    const selectorElementInterpretation = parseElement(selectorElement);
    const selectorElementInterpretationInContext = `${lastElement} ${selectorElementInterpretation}`;

    interpretations.push(selectorElementInterpretationInContext);
  }

  return interpretations.join("/n");
}

// "Combinator" "WhiteSpace"
