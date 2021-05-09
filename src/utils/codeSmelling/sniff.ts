import {
  RegularObject,
  ComputedValueType,
  CssSmellingRule,
  CssSmellingRuleMessage,
  CssSmellingRuleDetail,
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

        if (propRule.value) {
          handlePropValueConflicts(
            propRule,
            propValue,
            computedStyle,
            errorMessages
          );
        }

        if (propRule.fallback) {
          handlePropFallback(propRule, propValue, errorMessages);
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
  { value: { values, units, absolute } }: CssSmellingRule,
  propValue: string,
  computedStyle: ComputedValueType,
  errorMessages: CssSmellingRuleMessage[]
) {
  const [, valueNumber, valueUnit] = propValue.match(/(-?\d+)\s*(\D+)/) || [];

  if (values && values[propValue]) {
    values[propValue].forEach(checkSmellingRuleDetails);
  }

  if (units && units[valueUnit]) {
    units[valueUnit].forEach(checkSmellingRuleDetails);
  }

  if (absolute) {
    const absoluteKey = Number(valueNumber) >= 0 ? "positive" : "negative";

    if (absolute[absoluteKey]) {
      absolute[absoluteKey].forEach(checkSmellingRuleDetails);
    }
  }

  function checkSmellingRuleDetails({
    prop,
    value,
    message,
  }: CssSmellingRuleDetail): void {
    const computedPropValue = computedStyle[prop];

    if (computedPropValue === value) {
      errorMessages.push(message);
    }
  }
}

function handleValueSameAsInitial(
  prop: string,
  blockComputedValue: RegularObject,
  elementComputedValue: ComputedValueType,
  errorMessages: CssSmellingRuleMessage[]
): void {
  const blockPropValue = blockComputedValue[prop];
  const initialPropValue = elementComputedValue[prop];

  if (blockPropValue === initialPropValue) {
    errorMessages.push({
      type: "warning",
      content: `this property "${prop}" has the same value of "${blockPropValue}" as the initial value of this element`,
    });
  }
}

function handlePropFallback(
  { fallback: { delimiter, minimum, message } }: CssSmellingRule,
  propValue: string,
  errorMessages: CssSmellingRuleMessage[]
): void {
  const allValues = propValue.split(delimiter);
  const minimumValues = minimum ?? 2;

  if (allValues.length < minimumValues) {
    errorMessages.push(message);
  }
}
