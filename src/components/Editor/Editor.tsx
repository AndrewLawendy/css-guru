import React, { FC, useState } from "react";
import AceEditor from "react-ace";
// import { validate } from "csstree-validator";

import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/snippets/css";
import "ace-builds/src-noconflict/theme-monokai";
import { parse, toPlainObject } from "css-tree";

import styles from "./Editor.scss";

const Editor: FC = () => {
  const [cssText, setCssText] = useState("");

  function handleChange(value) {
    setCssText(value);
    const ast = parse(value);
    const { children } = toPlainObject(ast);
  }

  function onValidate(annotations) {
    console.log("onValidate", annotations);
  }

  return (
    <AceEditor
      className={styles.editor}
      placeholder="Type your CSS here..."
      mode="css"
      theme="monokai"
      name="css_editor"
      onChange={handleChange}
      onValidate={onValidate}
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
  );
};

export default Editor;
