export type AttributeSelectorElement = {
  flags: "s" | "i";
  type: "AttributeSelector";
  name: { name: string };
  matcher: string;
  value: {
    value: string;
  };
};

export type PseudoClassElement = {
  type: "PseudoClassSelector";
  name: string;
  children?: SelectorElement[];
};

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
