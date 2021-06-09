export type RegularObject = {
  [key: string]: string;
};

export type AttributeSelectorElement = {
  flags: "s" | "i";
  type: "AttributeSelector";
  name: { name: string };
  matcher: string;
  value: {
    value: string;
  };
};

export type RegularPseudoClassElement = {
  type: "PseudoClassSelector";
  name: string;
  children?: PseudoClassChild[];
};

type NthIdentifierPseudoClassChild = {
  type: "Identifier";
  name: string;
};

export type NthAnPlusBPseudoClassChild = {
  type: "AnPlusB";
  a: null | string;
  b: null | string;
};

type NthPseudoClassChild = {
  type: "Nth";
  nth: NthIdentifierPseudoClassChild | NthAnPlusBPseudoClassChild;
};

export type NthPseudoClassElement = {
  type: "PseudoClassSelector";
  name: "nth-child" | "nth-last-child" | "nth-of-type" | "nth-last-of-type";
  children?: NthPseudoClassChild[];
};

type PseudoClassChild = {
  type: string;
  name?: string;
  value?: string;
};

export type SelectorListParamsPseudoClassElement = {
  type: "PseudoClassSelector";
  name: "not" | "is" | "where" | "has";
  children: SelectorElement[];
};

export type PseudoClassElement =
  | RegularPseudoClassElement
  | NthPseudoClassElement
  | SelectorListParamsPseudoClassElement;

export type RegularSelectorElement = {
  type:
    | "TypeSelector"
    | "ClassSelector"
    | "IdSelector"
    | "WhiteSpace"
    | "Combinator"
    | "PseudoElementSelector";
  name: string;
};

export type SelectorElement =
  | RegularSelectorElement
  | AttributeSelectorElement
  | PseudoClassElement;

export type Selector = {
  children: SelectorElement[];
};

export type Declaration = {
  important: boolean;
  property: string;
  value: {
    children: DeclarationValue[];
  };
};

export type NonParsedDeclaration = {
  important: boolean;
  property: string;
  value: {
    value: string;
  };
};

export type DeclarationValue =
  | CommonDeclarationValue
  | PercentageDeclarationValue
  | IdentifierDeclarationValue
  | FunctionDeclarationValue;

export type CommonDeclarationValue = {
  type: "Dimension" | "Whitespace" | "Operator";
  unit: string;
  value: string;
};

export type FunctionDeclarationValue = {
  type: "Function";
  name: string;
  children: CommonDeclarationValue[];
};

export type IdentifierDeclarationValue = {
  type: "Identifier";
  name: string;
};

export type PercentageDeclarationValue = {
  type: "Percentage";
  value: string;
};

export type CssRule = {
  block: {
    children: Declaration[];
  };
  prelude: {
    children: Selector[];
  };
  type: string;
};

export type NonParsedCssRule = {
  block: {
    children: NonParsedDeclaration[];
    loc: Location;
  };
  prelude: {
    value: string;
    loc: Location;
  };
  type: string;
};

export type Location = {
  start: {
    column: number;
    line: number;
    offset: number;
  };
};

export type Flag = {
  text: string;
  status: "Experimental" | "Not Supported";
};

export type ComputedValueType = {
  alignContent: string;
  alignItems: string;
  alignSelf: string;
  alignmentBaseline: string;
  all: string;
  animation: string;
  animationDelay: string;
  animationDirection: string;
  animationDuration: string;
  animationFillMode: string;
  animationIterationCount: string;
  animationName: string;
  animationPlayState: string;
  animationTimingFunction: string;
  appearance: string;
  ascentOverride: string;
  aspectRatio: string;
  backdropFilter: string;
  backfaceVisibility: string;
  background: string;
  backgroundAttachment: string;
  backgroundBlendMode: string;
  backgroundClip: string;
  backgroundColor: string;
  backgroundImage: string;
  backgroundOrigin: string;
  backgroundPosition: string;
  backgroundPositionX: string;
  backgroundPositionY: string;
  backgroundRepeat: string;
  backgroundRepeatX: string;
  backgroundRepeatY: string;
  backgroundSize: string;
  baselineShift: string;
  blockSize: string;
  border: string;
  borderBlock: string;
  borderBlockColor: string;
  borderBlockEnd: string;
  borderBlockEndColor: string;
  borderBlockEndStyle: string;
  borderBlockEndWidth: string;
  borderBlockStart: string;
  borderBlockStartColor: string;
  borderBlockStartStyle: string;
  borderBlockStartWidth: string;
  borderBlockStyle: string;
  borderBlockWidth: string;
  borderBottom: string;
  borderBottomColor: string;
  borderBottomLeftRadius: string;
  borderBottomRightRadius: string;
  borderBottomStyle: string;
  borderBottomWidth: string;
  borderCollapse: string;
  borderColor: string;
  borderImage: string;
  borderImageOutset: string;
  borderImageRepeat: string;
  borderImageSlice: string;
  borderImageSource: string;
  borderImageWidth: string;
  borderInline: string;
  borderInlineColor: string;
  borderInlineEnd: string;
  borderInlineEndColor: string;
  borderInlineEndStyle: string;
  borderInlineEndWidth: string;
  borderInlineStart: string;
  borderInlineStartColor: string;
  borderInlineStartStyle: string;
  borderInlineStartWidth: string;
  borderInlineStyle: string;
  borderInlineWidth: string;
  borderLeft: string;
  borderLeftColor: string;
  borderLeftStyle: string;
  borderLeftWidth: string;
  borderRadius: string;
  borderRight: string;
  borderRightColor: string;
  borderRightStyle: string;
  borderRightWidth: string;
  borderSpacing: string;
  borderStyle: string;
  borderTop: string;
  borderTopColor: string;
  borderTopLeftRadius: string;
  borderTopRightRadius: string;
  borderTopStyle: string;
  borderTopWidth: string;
  borderWidth: string;
  bottom: string;
  boxShadow: string;
  boxSizing: string;
  breakAfter: string;
  breakBefore: string;
  breakInside: string;
  bufferedRendering: string;
  captionSide: string;
  caretColor: string;
  clear: string;
  clip: string;
  clipPath: string;
  clipRule: string;
  color: string;
  colorInterpolation: string;
  colorInterpolationFilters: string;
  colorRendering: string;
  colorScheme: string;
  columnCount: string;
  columnFill: string;
  columnGap: string;
  columnRule: string;
  columnRuleColor: string;
  columnRuleStyle: string;
  columnRuleWidth: string;
  columnSpan: string;
  columnWidth: string;
  columns: string;
  contain: string;
  containIntrinsicSize: string;
  content: string;
  contentVisibility: string;
  counterIncrement: string;
  counterReset: string;
  counterSet: string;
  cursor: string;
  cx: string;
  cy: string;
  d: string;
  descentOverride: string;
  direction: string;
  display: string;
  dominantBaseline: string;
  emptyCells: string;
  fill: string;
  fillOpacity: string;
  fillRule: string;
  filter: string;
  flex: string;
  flexBasis: string;
  flexDirection: string;
  flexFlow: string;
  flexGrow: string;
  flexShrink: string;
  flexWrap: string;
  float: string;
  floodColor: string;
  floodOpacity: string;
  font: string;
  fontDisplay: string;
  fontFamily: string;
  fontFeatureSettings: string;
  fontKerning: string;
  fontOpticalSizing: string;
  fontSize: string;
  fontStretch: string;
  fontStyle: string;
  fontVariant: string;
  fontVariantCaps: string;
  fontVariantEastAsian: string;
  fontVariantLigatures: string;
  fontVariantNumeric: string;
  fontVariationSettings: string;
  fontWeight: string;
  gap: string;
  grid: string;
  gridArea: string;
  gridAutoColumns: string;
  gridAutoFlow: string;
  gridAutoRows: string;
  gridColumn: string;
  gridColumnEnd: string;
  gridColumnGap: string;
  gridColumnStart: string;
  gridGap: string;
  gridRow: string;
  gridRowEnd: string;
  gridRowGap: string;
  gridRowStart: string;
  gridTemplate: string;
  gridTemplateAreas: string;
  gridTemplateColumns: string;
  gridTemplateRows: string;
  height: string;
  hyphens: string;
  imageOrientation: string;
  imageRendering: string;
  inherits: string;
  initialValue: string;
  inlineSize: string;
  inset: string;
  insetBlock: string;
  insetBlockEnd: string;
  insetBlockStart: string;
  insetInline: string;
  insetInlineEnd: string;
  insetInlineStart: string;
  isolation: string;
  justifyContent: string;
  justifyItems: string;
  justifySelf: string;
  left: string;
  letterSpacing: string;
  lightingColor: string;
  lineBreak: string;
  lineGapOverride: string;
  lineHeight: string;
  listStyle: string;
  listStyleImage: string;
  listStylePosition: string;
  listStyleType: string;
  margin: string;
  marginBlock: string;
  marginBlockEnd: string;
  marginBlockStart: string;
  marginBottom: string;
  marginInline: string;
  marginInlineEnd: string;
  marginInlineStart: string;
  marginLeft: string;
  marginRight: string;
  marginTop: string;
  marker: string;
  markerEnd: string;
  markerMid: string;
  markerStart: string;
  mask: string;
  maskType: string;
  maxBlockSize: string;
  maxHeight: string;
  maxInlineSize: string;
  maxWidth: string;
  maxZoom: string;
  minBlockSize: string;
  minHeight: string;
  minInlineSize: string;
  minWidth: string;
  minZoom: string;
  mixBlendMode: string;
  objectFit: string;
  objectPosition: string;
  offset: string;
  offsetDistance: string;
  offsetPath: string;
  offsetRotate: string;
  opacity: string;
  order: string;
  orientation: string;
  orphans: string;
  outline: string;
  outlineColor: string;
  outlineOffset: string;
  outlineStyle: string;
  outlineWidth: string;
  overflow: string;
  overflowAnchor: string;
  overflowWrap: string;
  overflowX: string;
  overflowY: string;
  overscrollBehavior: string;
  overscrollBehaviorBlock: string;
  overscrollBehaviorInline: string;
  overscrollBehaviorX: string;
  overscrollBehaviorY: string;
  padding: string;
  paddingBlock: string;
  paddingBlockEnd: string;
  paddingBlockStart: string;
  paddingBottom: string;
  paddingInline: string;
  paddingInlineEnd: string;
  paddingInlineStart: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  page: string;
  pageBreakAfter: string;
  pageBreakBefore: string;
  pageBreakInside: string;
  pageOrientation: string;
  paintOrder: string;
  perspective: string;
  perspectiveOrigin: string;
  placeContent: string;
  placeItems: string;
  placeSelf: string;
  pointerEvents: string;
  position: string;
  quotes: string;
  r: string;
  resize: string;
  right: string;
  rowGap: string;
  rubyPosition: string;
  rx: string;
  ry: string;
  scrollBehavior: string;
  scrollMargin: string;
  scrollMarginBlock: string;
  scrollMarginBlockEnd: string;
  scrollMarginBlockStart: string;
  scrollMarginBottom: string;
  scrollMarginInline: string;
  scrollMarginInlineEnd: string;
  scrollMarginInlineStart: string;
  scrollMarginLeft: string;
  scrollMarginRight: string;
  scrollMarginTop: string;
  scrollPadding: string;
  scrollPaddingBlock: string;
  scrollPaddingBlockEnd: string;
  scrollPaddingBlockStart: string;
  scrollPaddingBottom: string;
  scrollPaddingInline: string;
  scrollPaddingInlineEnd: string;
  scrollPaddingInlineStart: string;
  scrollPaddingLeft: string;
  scrollPaddingRight: string;
  scrollPaddingTop: string;
  scrollSnapAlign: string;
  scrollSnapStop: string;
  scrollSnapType: string;
  shapeImageThreshold: string;
  shapeMargin: string;
  shapeOutside: string;
  shapeRendering: string;
  size: string;
  speak: string;
  src: string;
  stopColor: string;
  stopOpacity: string;
  stroke: string;
  strokeDasharray: string;
  strokeDashoffset: string;
  strokeLinecap: string;
  strokeLinejoin: string;
  strokeMiterlimit: string;
  strokeOpacity: string;
  strokeWidth: string;
  syntax: string;
  tabSize: string;
  tableLayout: string;
  textAlign: string;
  textAlignLast: string;
  textAnchor: string;
  textCombineUpright: string;
  textDecoration: string;
  textDecorationColor: string;
  textDecorationLine: string;
  textDecorationSkipInk: string;
  textDecorationStyle: string;
  textDecorationThickness: string;
  textIndent: string;
  textOrientation: string;
  textOverflow: string;
  textRendering: string;
  textShadow: string;
  textSizeAdjust: string;
  textTransform: string;
  textUnderlineOffset: string;
  textUnderlinePosition: string;
  top: string;
  touchAction: string;
  transform: string;
  transformBox: string;
  transformOrigin: string;
  transformStyle: string;
  transition: string;
  transitionDelay: string;
  transitionDuration: string;
  transitionProperty: string;
  transitionTimingFunction: string;
  unicodeBidi: string;
  unicodeRange: string;
  userSelect: string;
  userZoom: string;
  vectorEffect: string;
  verticalAlign: string;
  visibility: string;
  webkitAlignContent: string;
  webkitAlignItems: string;
  webkitAlignSelf: string;
  webkitAnimation: string;
  webkitAnimationDelay: string;
  webkitAnimationDirection: string;
  webkitAnimationDuration: string;
  webkitAnimationFillMode: string;
  webkitAnimationIterationCount: string;
  webkitAnimationName: string;
  webkitAnimationPlayState: string;
  webkitAnimationTimingFunction: string;
  webkitAppRegion: string;
  webkitAppearance: string;
  webkitBackfaceVisibility: string;
  webkitBackgroundClip: string;
  webkitBackgroundOrigin: string;
  webkitBackgroundSize: string;
  webkitBorderAfter: string;
  webkitBorderAfterColor: string;
  webkitBorderAfterStyle: string;
  webkitBorderAfterWidth: string;
  webkitBorderBefore: string;
  webkitBorderBeforeColor: string;
  webkitBorderBeforeStyle: string;
  webkitBorderBeforeWidth: string;
  webkitBorderBottomLeftRadius: string;
  webkitBorderBottomRightRadius: string;
  webkitBorderEnd: string;
  webkitBorderEndColor: string;
  webkitBorderEndStyle: string;
  webkitBorderEndWidth: string;
  webkitBorderHorizontalSpacing: string;
  webkitBorderImage: string;
  webkitBorderRadius: string;
  webkitBorderStart: string;
  webkitBorderStartColor: string;
  webkitBorderStartStyle: string;
  webkitBorderStartWidth: string;
  webkitBorderTopLeftRadius: string;
  webkitBorderTopRightRadius: string;
  webkitBorderVerticalSpacing: string;
  webkitBoxAlign: string;
  webkitBoxDecorationBreak: string;
  webkitBoxDirection: string;
  webkitBoxFlex: string;
  webkitBoxOrdinalGroup: string;
  webkitBoxOrient: string;
  webkitBoxPack: string;
  webkitBoxReflect: string;
  webkitBoxShadow: string;
  webkitBoxSizing: string;
  webkitClipPath: string;
  webkitColumnBreakAfter: string;
  webkitColumnBreakBefore: string;
  webkitColumnBreakInside: string;
  webkitColumnCount: string;
  webkitColumnGap: string;
  webkitColumnRule: string;
  webkitColumnRuleColor: string;
  webkitColumnRuleStyle: string;
  webkitColumnRuleWidth: string;
  webkitColumnSpan: string;
  webkitColumnWidth: string;
  webkitColumns: string;
  webkitFilter: string;
  webkitFlex: string;
  webkitFlexBasis: string;
  webkitFlexDirection: string;
  webkitFlexFlow: string;
  webkitFlexGrow: string;
  webkitFlexShrink: string;
  webkitFlexWrap: string;
  webkitFontFeatureSettings: string;
  webkitFontSmoothing: string;
  webkitHighlight: string;
  webkitHyphenateCharacter: string;
  webkitJustifyContent: string;
  webkitLineBreak: string;
  webkitLineClamp: string;
  webkitLocale: string;
  webkitLogicalHeight: string;
  webkitLogicalWidth: string;
  webkitMarginAfter: string;
  webkitMarginBefore: string;
  webkitMarginEnd: string;
  webkitMarginStart: string;
  webkitMask: string;
  webkitMaskBoxImage: string;
  webkitMaskBoxImageOutset: string;
  webkitMaskBoxImageRepeat: string;
  webkitMaskBoxImageSlice: string;
  webkitMaskBoxImageSource: string;
  webkitMaskBoxImageWidth: string;
  webkitMaskClip: string;
  webkitMaskComposite: string;
  webkitMaskImage: string;
  webkitMaskOrigin: string;
  webkitMaskPosition: string;
  webkitMaskPositionX: string;
  webkitMaskPositionY: string;
  webkitMaskRepeat: string;
  webkitMaskRepeatX: string;
  webkitMaskRepeatY: string;
  webkitMaskSize: string;
  webkitMaxLogicalHeight: string;
  webkitMaxLogicalWidth: string;
  webkitMinLogicalHeight: string;
  webkitMinLogicalWidth: string;
  webkitOpacity: string;
  webkitOrder: string;
  webkitPaddingAfter: string;
  webkitPaddingBefore: string;
  webkitPaddingEnd: string;
  webkitPaddingStart: string;
  webkitPerspective: string;
  webkitPerspectiveOrigin: string;
  webkitPerspectiveOriginX: string;
  webkitPerspectiveOriginY: string;
  webkitPrintColorAdjust: string;
  webkitRtlOrdering: string;
  webkitRubyPosition: string;
  webkitShapeImageThreshold: string;
  webkitShapeMargin: string;
  webkitShapeOutside: string;
  webkitTapHighlightColor: string;
  webkitTextCombine: string;
  webkitTextDecorationsInEffect: string;
  webkitTextEmphasis: string;
  webkitTextEmphasisColor: string;
  webkitTextEmphasisPosition: string;
  webkitTextEmphasisStyle: string;
  webkitTextFillColor: string;
  webkitTextOrientation: string;
  webkitTextSecurity: string;
  webkitTextSizeAdjust: string;
  webkitTextStroke: string;
  webkitTextStrokeColor: string;
  webkitTextStrokeWidth: string;
  webkitTransform: string;
  webkitTransformOrigin: string;
  webkitTransformOriginX: string;
  webkitTransformOriginY: string;
  webkitTransformOriginZ: string;
  webkitTransformStyle: string;
  webkitTransition: string;
  webkitTransitionDelay: string;
  webkitTransitionDuration: string;
  webkitTransitionProperty: string;
  webkitTransitionTimingFunction: string;
  webkitUserDrag: string;
  webkitUserModify: string;
  webkitUserSelect: string;
  webkitWritingMode: string;
  whiteSpace: string;
  widows: string;
  width: string;
  willChange: string;
  wordBreak: string;
  wordSpacing: string;
  wordWrap: string;
  writingMode: string;
  x: string;
  y: string;
  zIndex: string;
  zoom: string;
};

export type CssSmellingRuleSet = {
  [propName: string]: CssSmellingRule;
};

export type CssSmellingRuleMessage = {
  type: "error" | "warning";
  content: string;
};

export type CssSmellingRuleDetail = {
  prop: string;
  value: string;
  message: CssSmellingRuleMessage;
};

export type CssSmellingRule = {
  conflicts?: CssSmellingRuleDetail[];
  value?: {
    values?: {
      [value: string]: CssSmellingRuleDetail[];
    };
    units?: {
      [unit: string]: CssSmellingRuleDetail[];
    };
    absolute?: {
      positive?: CssSmellingRuleDetail[];
      negative?: CssSmellingRuleDetail[];
    };
  };
  fallback?: {
    delimiter: string | RegExp;
    minimum?: number;
    message: CssSmellingRuleMessage;
  };
};

export type CodeSmellingMessage = {
  declarationBlock: string;
  errorMessages: CssSmellingRuleMessage[];
};

export type BlockInterpretation = {
  block: string;
  location: string;
  selectorsInterpretation: string[];
};

export type CssNodeInterpretation = {
  mediaQuery: string;
  blocksInterpretations: BlockInterpretation[];
};
