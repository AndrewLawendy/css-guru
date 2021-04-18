import {
  ComputedValueType,
  CssSmellingRule,
  CssSmellingRuleMessage,
} from "../../types";
import { rules } from "./rules";

export default function (
  elementComputedValue: ComputedValueType,
  blockComputedValue: {
    [key: string]: string;
  }
): CssSmellingRuleMessage[] {
  const computedStyle = { ...elementComputedValue, ...blockComputedValue };
  const errorMessages: CssSmellingRuleMessage[] = [];

  for (const prop in blockComputedValue) {
    if (Object.prototype.hasOwnProperty.call(blockComputedValue, prop)) {
      const propRule = rules[prop];
      const propValue = blockComputedValue[prop];

      if (propRule) {
        if (propRule.conflicts) {
          handlePropConflicts(propRule, computedStyle, errorMessages);
        }

        if (propRule.values) {
          handlePropValueConflicts(
            propRule,
            propValue,
            computedStyle,
            errorMessages
          );
        }
      }
    }
  }

  return errorMessages;
}

function handlePropConflicts(
  propRule: CssSmellingRule,
  computedStyle: ComputedValueType,
  errorMessages: CssSmellingRuleMessage[]
): void {
  propRule.conflicts.forEach(({ prop, value, message }) => {
    const computedPropValue = computedStyle[prop];

    if (computedPropValue === value) {
      errorMessages.push(message);
    }
  });
}

function handlePropValueConflicts(
  propRule: CssSmellingRule,
  propValue: string,
  computedStyle: ComputedValueType,
  errorMessages: CssSmellingRuleMessage[]
) {
  if (propRule.values[propValue]) {
    propRule.values[propValue].forEach(({ prop, value, message }) => {
      const computedPropValue = computedStyle[prop];

      if (computedPropValue === value) {
        errorMessages.push(message);
      }
    });
  }
}
