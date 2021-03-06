export function handleMarginAndPaddingShorthand(
  property: string,
  computedDeclarationValues: string[]
): { [key: string]: string } {
  const { top, right, bottom, left } = handleBoxEdgeShorthand(
    computedDeclarationValues
  );

  return {
    [`${property}Top`]: top,
    [`${property}Right`]: right,
    [`${property}Bottom`]: bottom,
    [`${property}Left`]: left,
  };
}

export function handleBorderStyleShorthand(
  computedDeclarationValues: string[]
): { [key: string]: string } {
  const { top, right, bottom, left } = handleBoxEdgeShorthand(
    computedDeclarationValues
  );

  return {
    borderTopStyle: top,
    borderRightStyle: right,
    borderBottomStyle: bottom,
    borderLeftStyle: left,
  };
}

export function handleBorderRadiusShorthand(
  computedDeclarationValues: string[]
): { [key: string]: string } {
  let top: string, right: string, bottom: string, left: string;
  const percentageOperatorIndex = computedDeclarationValues.indexOf("/");

  if (percentageOperatorIndex > -1) {
    ({ top, right, bottom, left } = handleBorderRadiusPercentageOperator(
      computedDeclarationValues,
      percentageOperatorIndex
    ));
  } else {
    ({ top, right, bottom, left } = handleBoxEdgeShorthand(
      computedDeclarationValues
    ));
  }

  return {
    borderTopLeftRadius: top,
    borderTopRightRadius: right,
    borderBottomRightRadius: bottom,
    borderBottomLeftRadius: left,
  };
}

function handleBoxEdgeSingleShorthand(
  computedDeclarationValues: string[]
): { top: string; right: string; bottom: string; left: string } {
  const [allSides] = computedDeclarationValues;
  return {
    top: allSides,
    right: allSides,
    bottom: allSides,
    left: allSides,
  };
}

function handleBoxEdgeDoubleShorthand(
  computedDeclarationValues: string[]
): { top: string; right: string; bottom: string; left: string } {
  const [topAndBottom, rightAndLeft] = computedDeclarationValues;
  return {
    top: topAndBottom,
    right: rightAndLeft,
    bottom: topAndBottom,
    left: rightAndLeft,
  };
}

function handleBoxTripleShorthand(
  computedDeclarationValues: string[]
): { top: string; right: string; bottom: string; left: string } {
  const [top, rightAndLeft, bottom] = computedDeclarationValues;
  return {
    top,
    right: rightAndLeft,
    bottom,
    left: rightAndLeft,
  };
}

function handleBoxNoShorthand(
  computedDeclarationValues: string[]
): { top: string; right: string; bottom: string; left: string } {
  const [top, right, bottom, left] = computedDeclarationValues;
  return {
    top,
    right,
    bottom,
    left,
  };
}

function handleBoxEdgeShorthand(
  computedDeclarationValues: string[]
): { top: string; right: string; bottom: string; left: string } {
  switch (computedDeclarationValues.length) {
    case 1:
      return handleBoxEdgeSingleShorthand(computedDeclarationValues);
    case 2:
      return handleBoxEdgeDoubleShorthand(computedDeclarationValues);
    case 3:
      return handleBoxTripleShorthand(computedDeclarationValues);
    case 4:
      return handleBoxNoShorthand(computedDeclarationValues);
  }
}

function handleBorderRadiusPercentageOperator(
  computedDeclarationValues: string[],
  percentageOperatorIndex: number
): { top: string; right: string; bottom: string; left: string } {
  const declarationBocks = [
    computedDeclarationValues.slice(0, percentageOperatorIndex - 1),
    computedDeclarationValues.slice(percentageOperatorIndex + 2),
  ];
  const handledBlocks = declarationBocks.map(handleBoxEdgeShorthand);

  return handledBlocks.reduce(
    (acc, curr, index, arr) => {
      const whitespace = index < arr.length - 1 ? " " : "";
      acc.top += curr.top + whitespace;
      acc.right += curr.right + whitespace;
      acc.bottom += curr.bottom + whitespace;
      acc.left += curr.left + whitespace;

      return acc;
    },
    { top: "", right: "", bottom: "", left: "" }
  );
}
