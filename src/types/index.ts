export type AttributeSelectorElement = {
  flags: "s" | "i";
  type: "AttributeSelector";
  name: { name: string };
  matcher: string;
  value: {
    value: string;
  };
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

export type RegularPseudoClassElement = {
  type: "PseudoClassSelector";
  name: string;
  children?: PseudoClassChild[];
};

export type PseudoClassElement =
  | RegularPseudoClassElement
  | NthPseudoClassElement;

export type RegularSelectorElement = {
  type:
    | "TypeSelector"
    | "ClassSelector"
    | "IdSelector"
    | "WhiteSpace"
    | "Combinator";
  name: string;
};

export type SelectorElement =
  | RegularSelectorElement
  | AttributeSelectorElement
  | PseudoClassElement;

export type Selector = {
  children: SelectorElement[];
};
