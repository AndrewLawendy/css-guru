import { AtrulePlain, CssNodePlain } from "css-tree";
import { CodeSmellingMessage } from "../../types";
import handleMediaQuery from "./handleMediaQuery";

export default function (
  node: AtrulePlain,
  nonParsedNode: CssNodePlain
): CodeSmellingMessage[] {
  switch (node.name) {
    case "media":
      return handleMediaQuery(node, nonParsedNode);
  }
}
