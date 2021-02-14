import React, { FC, useState } from "react";
import AceEditor from "react-ace";
import { Button } from "semantic-ui-react";

import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/snippets/css";
import "ace-builds/src-noconflict/theme-monokai";

import styles from "./Editor.scss";
import { EditorPropTypes } from "./types";

const Editor: FC<EditorPropTypes> = ({ setCssValue }) => {
  const [cssText, setCssText] = useState("");

  function handleChange(value) {
    setCssText(value);
  }

  function handleParseCss() {
    setCssValue(cssText);
  }

  return (
    <div className={styles.editorWrapper}>
      <div>
        <Button color="red" floated="right" onClick={handleParseCss}>
          Parse Css
        </Button>
      </div>

      <AceEditor
        className={styles.editor}
        placeholder="Type your CSS here..."
        mode="css"
        theme="monokai"
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
