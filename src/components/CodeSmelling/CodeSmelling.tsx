import React, { FC, useState, useEffect } from "react";
import { parse, toPlainObject } from "css-tree";

import { CodeSmellingPropTypes } from "./types";
import smellCode from "../../utils/codeSmelling";

const CodeSmelling: FC<CodeSmellingPropTypes> = ({ cssValue }) => {
  useEffect(smellCss, [cssValue]);

  function smellCss() {
    const ast = parse(cssValue);
    const { children: cssRules } = toPlainObject(ast);
    cssRules.forEach((rule) => {
      const smellings = smellCode(rule);
    });
  }

  return <div>Smelling</div>;
};

export default CodeSmelling;
