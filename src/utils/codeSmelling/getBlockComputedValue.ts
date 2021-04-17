import {
  Declaration,
  DeclarationValue,
  FunctionDeclarationValue,
} from "../../types";
import {
  handleMarginAndPaddingShorthand,
  handleBorderStyleShorthand,
  handleBorderRadiusShorthand,
} from "./handleBoxEdgeDeclarationShorthand";

export default function (block: Declaration[]): { [key: string]: string } {
  return block.reduce((acc, { property, value: { children } }) => {
    const computedDeclarationValues = handleDeclarationValue(children);

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
        acc[property] = computedDeclarationValues.join("");
    }

    return acc;
  }, {});
}

function handleDeclarationValue(
  declarationValues: DeclarationValue[]
): string[] {
  return declarationValues.reduce((acc, declarationValue) => {
    switch (declarationValue.type) {
      case "Dimension":
        acc.push(`${declarationValue.value}${declarationValue.unit}`);
        break;
      case "Function":
        acc.push(constructFunctionDeclaration(declarationValue));
        break;
      default:
        acc.push(declarationValue.value);
    }

    return acc;
  }, []);
}

function constructFunctionDeclaration(
  declarationValue: FunctionDeclarationValue
): string {
  const childrenValue = declarationValue.children.reduce((acc, curr) => {
    switch (curr.type) {
      case "Dimension":
        acc += `${curr.value}${curr.unit}`;
        break;
      default:
        acc += curr.value;
    }

    return acc;
  }, "");

  return `${declarationValue.name}(${childrenValue})`;
}
