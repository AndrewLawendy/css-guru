import { SelectorElement, Selector } from "../types";

import { getArticle, capitalizePhrase } from "./utils";
import handleAttributeSelectedElement from "./handleAttributeSelectedElement";
import handleCombinator from "./handleCombinator";
import handlePseudoClass from "./handlePseudoClass";
import handlePseudoElements from "./handlePsuedoElements";

const interpretationsStore: string[] = [];
const compoundSelector: string[] = [];
let lastElement = "an element with";
const pseudoClasses: string[] = [];
let pseudoElement: string;

function getElementType(selectorElement: SelectorElement): string {
  switch (selectorElement.type) {
    case "TypeSelector":
      return selectorElement.name;
    case "ClassSelector":
      return `class <code>.${selectorElement.name}</code>`;
    case "IdSelector":
      return `id <code>#${selectorElement.name}</code>`;
    case "AttributeSelector":
      return handleAttributeSelectedElement(selectorElement);
    case "PseudoClassSelector":
      return handlePseudoClass(selectorElement);
    case "PseudoElementSelector":
      return handlePseudoElements(selectorElement);
  }
}

function parseElement(selectorElement) {
  const elementType = getElementType(selectorElement);

  return elementType;
}

function resetSelector() {
  compoundSelector.length = 0;
  pseudoClasses.length = 0;
  pseudoElement = "";
  lastElement = "an element with";
}

function updateInterpretations() {
  const compoundSelectorLink = compoundSelector.length > 0 ? " with " : "";
  const pseudoClassLink =
    pseudoClasses.length > 0 ? ` when it ${pseudoClasses.join(" and ")}` : "";
  const pseudoElementLink = pseudoElement ? `${pseudoElement} of ` : "";

  const selectorElementInterpretationInContext = `${pseudoElementLink}${lastElement}${compoundSelectorLink}${compoundSelector.join(
    " and "
  )}${pseudoClassLink}`;

  const selectorElementInterpretationFormatted =
    interpretationsStore.length === 0
      ? capitalizePhrase(selectorElementInterpretationInContext)
      : selectorElementInterpretationInContext;

  interpretationsStore.push(selectorElementInterpretationFormatted);
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

export default function ({ children }: Selector): string[] {
  for (let index = children.length - 1; index >= 0; index--) {
    const selectorElement = children[index];
    const selectorElementInterpretation = parseElement(selectorElement);

    switch (selectorElement.type) {
      case "WhiteSpace":
        handleWhiteSpaceCase();
        break;
      case "Combinator":
        handleCombinatorCase(selectorElement);
        break;
      case "TypeSelector":
        handleTypeSelectorCase(selectorElement);
        break;
      case "PseudoClassSelector":
        pseudoClasses.push(selectorElementInterpretation);
        break;
      case "PseudoElementSelector":
        pseudoElement = selectorElementInterpretation;
        break;
      default:
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
