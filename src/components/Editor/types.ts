import { Dispatch, SetStateAction } from "react";
import { CssValue } from "../../types";

export type EditorPropTypes = {
  setCssValue: Dispatch<SetStateAction<CssValue>>;
  editorDisabled: boolean;
};
