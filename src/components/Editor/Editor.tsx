import React, { FC, useState } from "react";
import AceEditor from "react-ace";
import { Button, Dropdown } from "semantic-ui-react";

import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/snippets/css";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-terminal";

import styles from "./Editor.scss";
import { EditorPropTypes } from "./types";
import { useEditorTheme } from "../../hooks/useLocaleStorageState";

const themeOptions = [
  { key: "monokai", value: "monokai", text: "Monokai" },
  { key: "github", value: "github", text: "Github" },
  { key: "tomorrow", value: "tomorrow", text: "Tomorrow" },
  { key: "kuroir", value: "kuroir", text: "Kuroir" },
  { key: "twilight", value: "twilight", text: "Twilight" },
  { key: "xcode", value: "xcode", text: "Xcode" },
  { key: "textmate", value: "textmate", text: "Textmate" },
  { key: "solarized_dark", value: "solarized_dark", text: "Solarized Dark" },
  { key: "solarized_light", value: "solarized_light", text: "Solarized Light" },
  { key: "terminal", value: "terminal", text: "Terminal" },
];

const Editor: FC<EditorPropTypes> = ({ setCssValue }) => {
  const [cssText, setCssText] = useState("");
  const [editorTheme, setEditorTheme] = useEditorTheme();

  function handleChange(value) {
    setCssText(value);
  }

  function handleInterpretCss() {
    setCssValue(cssText);
  }

  function handleThemeChange(_, { value }) {
    setEditorTheme(value);
  }

  return (
    <div className={styles.editorWrapper}>
      <div className={styles.editorActions}>
        <Dropdown
          value={editorTheme}
          placeholder="Select Editor Theme"
          search
          selection
          options={themeOptions}
          onChange={handleThemeChange}
        />

        <Button color="red" onClick={handleInterpretCss}>
          Interpret Css
        </Button>
      </div>

      <AceEditor
        className={styles.editor}
        placeholder="Type your CSS here..."
        mode="css"
        theme={editorTheme}
        name="css_editor"
        onChange={handleChange}
        fontSize={14}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={cssText}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default Editor;
