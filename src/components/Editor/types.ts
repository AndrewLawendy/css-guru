import { Dispatch, SetStateAction } from "react";

export type EditorPropTypes = {
  setCssValue: Dispatch<SetStateAction<string>>;
  editorDisabled: boolean;
};
