import { selectorElement, selector } from "../types";

import getArticle from "./getArticle";
import handleAttributeSelectedElement from "./handleAttributeSelectedElement";
import handleCombinator from "./handleCombinator";

function getElementType(selector: selectorElement): string {
  switch (selector.type) {
    case "TypeSelector":
      return selector.name;
    case "ClassSelector":
      return `class "${selector.name}"`;
    case "IdSelector":
      return `id "${selector.name}"`;
    case "AttributeSelector":
      return handleAttributeSelectedElement(selector);
  }
}

function parseElement(selectorElement) {
  const elementType = getElementType(selectorElement);

  return elementType;
}

export default function ({ children }: selector): string {
  const interpretations = [];
  const compoundSelector = [];
  let lastElement = "An element with";

  function resetSelector() {
    compoundSelector.length = 0;
    const article = interpretations.length > 0 ? "an" : "An";
    lastElement = `${article} element with`;
  }

  function updateInterpretations() {
    const selectorElementInterpretationInContext = `${lastElement} ${compoundSelector.join(
      " and "
    )}`;
    interpretations.push(selectorElementInterpretationInContext);
  }

  for (let index = children.length - 1; index >= 0; index--) {
    const selectorElement = children[index];
    const selectorElementInterpretation = parseElement(selectorElement);

    if (selectorElement.type === "WhiteSpace") {
      updateInterpretations();
      resetSelector();
      interpretations.push("...descendant of");
    } else if (selectorElement.type === "Combinator") {
      updateInterpretations();
      resetSelector();
      const combinatorInterpretation = handleCombinator(selectorElement);
      interpretations.push(combinatorInterpretation);
    } else if (selectorElement.type === "TypeSelector") {
      const article = getArticle(selectorElement.name);
      lastElement = `${article} ${selectorElement.name} tag`;
    } else {
      compoundSelector.unshift(selectorElementInterpretation);
    }

    if (index === 0) {
      updateInterpretations();
      resetSelector();
    }
  }

  return interpretations.join("/n");
}
