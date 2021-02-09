import { Dispatch, SetStateAction } from "react";

export interface ContextValueType {
  cssValue?: string;
  setCssValue?: Dispatch<SetStateAction<string>>;
}
