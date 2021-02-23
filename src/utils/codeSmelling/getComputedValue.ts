import { ComputedValueType } from "../../types";
import {
  initialComputedValue,
  blockComputedValue,
  hiddenComputedValue,
  tableComputedValue,
  captionComputedValue,
  tHeadComputedValue,
  tBodyComputedValue,
  tFootComputedValue,
  trComputedValue,
  thComputedValue,
  tdComputedValue,
} from "./computedValues";

export default function (element: string): ComputedValueType {
  switch (element) {
    case "html":
    case "body":
    case "div":
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
    case "p":
    case "blockquote":
    case "pre":
    case "address":
    case "center":
    case "dl":
    case "dt":
    case "dd":
    case "ol":
    case "ul":
    case "li":
    case "fieldset":
    case "form":
    case "legend":
    case "summary":
    case "article":
    case "aside":
    case "details":
    case "figcaption":
    case "figure":
    case "footer":
    case "header":
    case "hgroup":
    case "menu":
    case "nav":
    case "section":
      return { ...initialComputedValue, ...blockComputedValue };

    case "head":
    case "audio":
      return { ...initialComputedValue, ...hiddenComputedValue };

    case "table":
      return { ...initialComputedValue, ...tableComputedValue };
    case "caption":
      return { ...initialComputedValue, ...captionComputedValue };
    case "thead":
      return { ...initialComputedValue, ...tHeadComputedValue };
    case "tbody":
      return { ...initialComputedValue, ...tBodyComputedValue };
    case "tfoot":
      return { ...initialComputedValue, ...tFootComputedValue };
    case "tr":
      return { ...initialComputedValue, ...trComputedValue };
    case "th":
      return { ...initialComputedValue, ...thComputedValue };
    case "td":
      return { ...initialComputedValue, ...tdComputedValue };

    default:
      return initialComputedValue;
  }
}
