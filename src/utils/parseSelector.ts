import { selectorElement, selector } from "../types";

import getArticle from "./getArticle";
import handleAttributeSelectedElement from "./handleAttributeSelectedElement";
import handleCombinator from "./handleCombinator";

const interpretationsStore = [];
const compoundSelector = [];
let lastElement = "An element with";

function getElementType(selectorElement: selectorElement): string {
  switch (selectorElement.type) {
    case "TypeSelector":
      return selectorElement.name;
    case "ClassSelector":
      return `class <code>.${selectorElement.name}</code>`;
    case "IdSelector":
      return `id <code>#${selectorElement.name}</code>`;
    case "AttributeSelector":
      return handleAttributeSelectedElement(selectorElement);
  }
}

function parseElement(selectorElement) {
  const elementType = getElementType(selectorElement);

  return elementType;
}

function resetSelector() {
  compoundSelector.length = 0;
  const article = interpretationsStore.length > 0 ? "an" : "An";
  lastElement = `${article} element with`;
}

function updateInterpretations() {
  const compoundSelectorLink = compoundSelector.length > 0 ? " with " : "";
  const selectorElementInterpretationInContext = `${lastElement}${compoundSelectorLink}${compoundSelector.join(
    " and "
  )}`;
  interpretationsStore.push(selectorElementInterpretationInContext);
}

function handleWhiteSpaceCase() {
  updateInterpretations();
  resetSelector();
  const interpretation =
    interpretationsStore.length > 2
      ? "...who is itself descendant of"
      : "... descendant of";
  interpretationsStore.push(interpretation);
}

function handleCombinatorCase(selectorElement) {
  updateInterpretations();
  resetSelector();
  const combinatorInterpretation = handleCombinator(selectorElement);
  interpretationsStore.push(combinatorInterpretation);
}

function handleTypeSelectorCase(selectorElement) {
  const article = getArticle(
    selectorElement.name,
    interpretationsStore.length === 0,
    compoundSelector.length > 0
  );
  const tag =
    selectorElement.name === "*"
      ? "element"
      : `<code>&lt;${selectorElement.name}&#47;&gt;</code> tag`;

  lastElement = `${article} ${tag}`;
}

export default function ({ children }: selector): string[] {
  for (let index = children.length - 1; index >= 0; index--) {
    const selectorElement = children[index];
    const selectorElementInterpretation = parseElement(selectorElement);

    if (selectorElement.type === "WhiteSpace") {
      handleWhiteSpaceCase();
    } else if (selectorElement.type === "Combinator") {
      handleCombinatorCase(selectorElement);
    } else if (selectorElement.type === "TypeSelector") {
      handleTypeSelectorCase(selectorElement);
    } else {
      compoundSelector.unshift(selectorElementInterpretation);
    }

    if (index === 0) {
      updateInterpretations();
      resetSelector();
    }
  }

  const selectorInterpretations = [...interpretationsStore];
  interpretationsStore.length = 0;
  resetSelector();

  return selectorInterpretations;
}
