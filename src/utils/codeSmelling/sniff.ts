import { ComputedValueType } from "../../types";
import { rules } from "./rules";

export default function (
  elementComputedValue: ComputedValueType,
  blockComputedValue: {
    [key: string]: string;
  }
): string[] {
  const computedStyle = { ...elementComputedValue, ...blockComputedValue };
  const errorMessage: string[] = [];

  for (const prop in blockComputedValue) {
    if (Object.prototype.hasOwnProperty.call(blockComputedValue, prop)) {
      const propRule = rules[prop];

      if (propRule) {
        propRule.forEach(({ prop, value, message }) => {
          const computedPropValue = computedStyle[prop];

          if (computedPropValue === value) {
            errorMessage.push(message);
          }
        });
      }
    }
  }

  return errorMessage;
}
