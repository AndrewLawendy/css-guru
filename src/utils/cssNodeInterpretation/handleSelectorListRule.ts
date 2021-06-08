import {
  CssNodePlain,
  RulePlain,
  SelectorPlain,
  PseudoClassSelectorPlain,
  PseudoElementSelectorPlain,
  Combinator,
  TypeSelector,
} from "css-tree";
import { CssNodeInterpretation } from "../../types";

import { getArticle, capitalizePhrase } from "../utils";
import handleAttributeSelectedElement from "./handleAttributeSelectedElement";
import handleCombinator from "./handleCombinator";
import handlePseudoClass from "./handlePseudoClass";
import handlePseudoElements from "./handlePseudoElements";

const interpretationsStore: string[] = [];
const compoundSelector: string[] = [];
let lastElement = "an element";
const pseudoClasses: string[] = [];
let pseudoElement: string;

function getElementType(selectorElement: CssNodePlain): string {
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
      if (isElementAPseudoElementWithSingleColon(selectorElement)) {
        return handlePseudoElements(
          (selectorElement as unknown) as PseudoElementSelectorPlain
        );
      } else {
        return handlePseudoClass(selectorElement);
      }
    case "PseudoElementSelector":
      return handlePseudoElements(selectorElement);
  }
}

function parseElement(selectorElement: CssNodePlain) {
  const elementType = getElementType(selectorElement);

  return elementType;
}

function resetSelector() {
  compoundSelector.length = 0;
  pseudoClasses.length = 0;
  pseudoElement = "";
  lastElement = "an element";
}

function updateInterpretations() {
  const compoundSelectorLink = compoundSelector.length > 0 ? " with " : "";
  const pseudoClassLink =
    pseudoClasses.length > 0 ? ` when it ${pseudoClasses.join(" and ")}` : "";
  const pseudoElementLink = pseudoElement ? `${pseudoElement} of ` : "";
  if (pseudoClasses.length > 0 && lastElement === "an element")
    lastElement = "any element";

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

function handleCombinatorCase(selectorElement: Combinator) {
  updateInterpretations();
  resetSelector();
  const combinatorInterpretation = handleCombinator(selectorElement);
  interpretationsStore.push(combinatorInterpretation);
}

function handleTypeSelectorCase(selectorElement: TypeSelector) {
  const article = getArticle(
    selectorElement.name,
    false,
    compoundSelector.length > 0
  );
  const tag =
    selectorElement.name === "*"
      ? "element"
      : `<code>&lt;${selectorElement.name}&#47;&gt;</code> tag`;

  lastElement = `${article} ${tag}`;
}

function isElementAPseudoElementWithSingleColon(
  selectorElement: PseudoClassSelectorPlain
): boolean {
  const validPseudoElements = [
    "before",
    "after",
    "first-line",
    "first-letter",
    "backdrop",
    "cue",
    "cue-region",
    "grammar-error",
    "marker",
    "part",
    "placeholder",
    "spelling-error",
  ];
  return validPseudoElements.includes(selectorElement.name);
}

export function interpretSelector({ children }: SelectorPlain): string[] {
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
        if (isElementAPseudoElementWithSingleColon(selectorElement)) {
          pseudoElement = selectorElementInterpretation;
        } else {
          pseudoClasses.push(selectorElementInterpretation);
        }
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

export default function (
  { prelude }: RulePlain,
  nonParsedNode: CssNodePlain,
  mediaQuery = "All Media"
): CssNodeInterpretation {
  const codeBlockInterpretation: CssNodeInterpretation = {
    mediaQuery,
    blocksInterpretations: [],
  };

  if (prelude.type === "SelectorList") {
    const selectorList = prelude.children;
    selectorList.forEach((selector) => {
      if (
        selector.type === "Selector" &&
        nonParsedNode.type === "Rule" &&
        nonParsedNode.prelude.type === "Raw"
      ) {
        const selectorsInterpretation = interpretSelector(selector);
        codeBlockInterpretation.blocksInterpretations.push({
          block: nonParsedNode.prelude.value,
          location: `[${selector.loc.start.line}:${selector.loc.start.column}]`,
          selectorsInterpretation,
        });
      }
    });
  }

  return codeBlockInterpretation;
}
