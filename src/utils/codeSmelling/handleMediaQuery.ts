import { AtrulePlain, CssNodePlain } from "css-tree";
import { CodeSmellingMessage } from "../../types";
import handleRuleType from "./handleRuleType";

export default function (
  { block }: AtrulePlain,
  nonParsedNode: CssNodePlain
): CodeSmellingMessage[] {
  let rulesSmellingMessages: CodeSmellingMessage[] = [];

  if (block !== null && nonParsedNode.type === "Atrule") {
    const { children: cssNodes } = block;
    const { children: nonParsedCssNodes } = nonParsedNode.block;

    cssNodes.forEach((cssNode, cssNodeIndex) => {
      if (cssNode.type === "Rule") {
        const ruleSmellingMessages = handleRuleType(
          cssNode,
          nonParsedCssNodes[cssNodeIndex]
        );

        rulesSmellingMessages = [
          ...rulesSmellingMessages,
          ...ruleSmellingMessages,
        ];
      }
    });
  }
  return rulesSmellingMessages;
}
