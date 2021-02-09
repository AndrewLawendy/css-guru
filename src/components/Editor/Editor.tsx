import React, { FC, useState, useContext } from "react";
import AceEditor from "react-ace";
import { Button } from "semantic-ui-react";

import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/snippets/css";
import "ace-builds/src-noconflict/theme-monokai";

import { AppContext } from "../../context/AppContextProvider";
import { ContextValueType } from "../../context/types";

import styles from "./Editor.scss";

const Editor: FC = () => {
  const [cssText, setCssText] = useState("");
  const { setCssValue }: ContextValueType = useContext(AppContext);

  function handleChange(value) {
    setCssText(value);
  }

  function handleParseCss() {
    setCssValue(cssText);
  }

  return (
    <>
      <Button color="red" floated="right" onClick={handleParseCss}>
        Parse Css
      </Button>
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
    </>
  );
};

export default Editor;
