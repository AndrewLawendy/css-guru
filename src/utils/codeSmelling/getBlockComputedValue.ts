import { CssNodePlain, FunctionNodePlain } from "css-tree";
import {
  handleMarginAndPaddingShorthand,
  handleBorderStyleShorthand,
  handleBorderRadiusShorthand,
} from "./handleBoxEdgeDeclarationShorthand";
import camelCase from "lodash.camelcase";

export default function (block: CssNodePlain[]): { [key: string]: string } {
  return block.reduce((acc, node) => {
    if (node.type === "Declaration") {
      const { property, value } = node;
      let computedDeclarationValues = [];
      if (value.type === "Value") {
        computedDeclarationValues = handleDeclarationValue(value.children);
      }

      switch (property) {
        case "margin":
        case "padding":
          acc = {
            ...acc,
            ...handleMarginAndPaddingShorthand(
              property,
              computedDeclarationValues
            ),
          };
          break;
        case "border-style":
          acc = {
            ...acc,
            ...handleBorderStyleShorthand(computedDeclarationValues),
          };
          break;
        case "border-radius":
          acc = {
            ...acc,
            ...handleBorderRadiusShorthand(computedDeclarationValues),
          };
          break;

        default:
          acc[camelCase(property)] = computedDeclarationValues.join("");
      }
    }

    return acc;
  }, {});
}

function handleDeclarationValue(declarationValues: CssNodePlain[]): string[] {
  return declarationValues.reduce((acc, declarationValue) => {
    switch (declarationValue.type) {
      case "Dimension":
        acc.push(`${declarationValue.value}${declarationValue.unit}`);
        break;
      case "Function":
        acc.push(constructFunctionDeclaration(declarationValue));
        break;
      case "Identifier":
        acc.push(declarationValue.name);
        break;
      case "Percentage":
        acc.push(`${declarationValue.value}%`);
        break;
      case "Raw":
        acc.push(
          declarationValue.value === "0" ? "0px" : declarationValue.value
        );
    }

    return acc;
  }, []);
}

function constructFunctionDeclaration(
  declarationValue: FunctionNodePlain
): string {
  const childrenValue = declarationValue.children.reduce((acc, curr) => {
    switch (curr.type) {
      case "Dimension":
        acc += `${curr.value}${curr.unit}`;
        break;
      case "Raw":
        acc += curr.value;
    }

    return acc;
  }, "");

  return `${declarationValue.name}(${childrenValue})`;
}
