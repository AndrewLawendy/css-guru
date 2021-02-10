export type attributeSelectorElement = {
  flags: "s" | "i";
  type: "AttributeSelector";
  name: { name: string };
  matcher: string;
  value: {
    value: string;
  };
};

export type regularSelectorElement = {
  type:
    | "TypeSelector"
    | "ClassSelector"
    | "IdSelector"
    | "WhiteSpace"
    | "Combinator";
  name: string;
};

export type selectorElement = regularSelectorElement | attributeSelectorElement;

export type selector = {
  children: selectorElement[];
};
