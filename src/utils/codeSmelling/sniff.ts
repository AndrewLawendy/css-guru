import {
  RegularObject,
  ComputedValueType,
  CssSmellingRule,
  CssSmellingRuleMessage,
} from "../../types";
import { getRuleSet } from "../../rules";

export default function (
  elementComputedValue: ComputedValueType,
  blockComputedValue: RegularObject
): CssSmellingRuleMessage[] {
  const computedStyle = { ...elementComputedValue, ...blockComputedValue };
  const errorMessages: CssSmellingRuleMessage[] = [];
  const rules = getRuleSet();

  for (const prop in blockComputedValue) {
    if (Object.prototype.hasOwnProperty.call(blockComputedValue, prop)) {
      const propRule = rules[prop];
      const propValue = blockComputedValue[prop];

      handleValueSameAsInitial(
        prop,
        blockComputedValue,
        elementComputedValue,
        errorMessages
      );

      if (propRule) {
        if (propRule.conflicts) {
          handlePropConflicts(
            prop,
            propRule,
            elementComputedValue,
            computedStyle,
            errorMessages
          );
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
  blockComputedProp: string,
  propRule: CssSmellingRule,
  elementComputedValue: ComputedValueType,
  computedStyle: ComputedValueType,
  errorMessages: CssSmellingRuleMessage[]
): void {
  propRule.conflicts.forEach(({ prop, value, message }) => {
    const computedPropValue = computedStyle[prop];

    if (
      computedPropValue === value &&
      elementComputedValue[blockComputedProp] !==
        computedStyle[blockComputedProp]
    ) {
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

function handleValueSameAsInitial(
  prop: string,
  blockComputedValue: RegularObject,
  elementComputedValue: ComputedValueType,
  errorMessages: CssSmellingRuleMessage[]
): void {
  const blockPropValue = blockComputedValue[prop];
  const initialPropValue = elementComputedValue?.[prop];

  if (blockPropValue === initialPropValue) {
    errorMessages.push({
      type: "warning",
      content: `this property "${prop}" has the same value of "${blockPropValue}" as the initial value of this element`,
    });
  }
}
