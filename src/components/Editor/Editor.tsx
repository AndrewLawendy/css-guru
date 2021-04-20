import React, { FC, useState } from "react";
import AceEditor from "react-ace";
import { validate } from "csstree-validator";
import { Button, Dropdown, Message, Popup } from "semantic-ui-react";

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
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

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

const Editor: FC<EditorPropTypes> = ({ setCssValue, editorDisabled }) => {
  const [cssText, setCssText] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [editorTheme, setEditorTheme] = useEditorTheme();

  function handleEditorChange(value) {
    setCssText(value);
    clearErrors();
  }

  function clearErrors() {
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  }

  function handleThemeChange(_, { value }) {
    setEditorTheme(value);
  }

  function handleInterpretCss() {
    const validation = validate(cssText);
    if (validation.length > 0) {
      setValidationErrors(validation);
      setCssValue("");
    } else {
      setCssValue(cssText);
    }
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

        <Button
          color="red"
          onClick={handleInterpretCss}
          disabled={cssText.length === 0 || editorDisabled}
        >
          Interpret Css
        </Button>
      </div>

      <Popup
        content={
          <Message
            error
            floating
            header="CSS Input Error"
            list={validationErrors.map(
              ({ name, message, line, column }) =>
                `${name}: ${message} at ${line}:${column}`
            )}
          />
        }
        open={validationErrors.length > 0}
        trigger={<span />}
        position="bottom right"
        flowing
      />
      <AceEditor
        className={styles.editor}
        placeholder="Type your CSS here..."
        mode="css"
        theme={editorTheme}
        name="css_editor"
        onChange={handleEditorChange}
        fontSize={14}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={cssText}
        readOnly={editorDisabled}
        focus={true}
        onFocus={clearErrors}
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
