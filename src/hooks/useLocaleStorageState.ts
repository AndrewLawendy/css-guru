import { createLocalStorageStateHook } from "use-local-storage-state";

export const useEditorTheme = createLocalStorageStateHook(
  "editorTheme",
  "monokai"
);
