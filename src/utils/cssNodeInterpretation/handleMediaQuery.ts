import {
  CssNodePlain,
  AtrulePreludePlain,
  MediaQueryPlain,
  MediaFeature,
} from "css-tree";
import { addToErrors } from "./selectorInterpretationErrorHandler";
import { linkPhrases } from "../utils";

export default function (prelude: AtrulePreludePlain): string {
  const mediaQueriesInterpretations: string[] = [];
  const [mediaQueryList] = prelude.children;
  if (mediaQueryList.type === "MediaQueryList") {
    const { children: mediaQueries } = mediaQueryList;

    mediaQueries.forEach((mediaQuery) => {
      if (mediaQuery.type === "MediaQuery") {
        mediaQueriesInterpretations.push(handleMediaQuery(mediaQuery));
      }
    });
  }

  return mediaQueriesInterpretations.join(" and ");
}

function handleMediaQuery(mediaQuery: MediaQueryPlain): string {
  const mediaFeaturesIndex = mediaQuery.children.findIndex(
    (mediaKey) => mediaKey.type === "MediaFeature"
  );
  let mediaIdentifiers: CssNodePlain[] = [];
  let mediaFeatures: CssNodePlain[] = [];

  if (mediaFeaturesIndex > 3) {
    mediaIdentifiers = mediaQuery.children.slice(0, mediaFeaturesIndex - 3);
    mediaFeatures = mediaQuery.children.slice(mediaFeaturesIndex);
  } else {
    mediaIdentifiers = mediaQuery.children;
  }

  const mediaIdentifiersInterpretations = handleMediaIdentifiers(
    mediaIdentifiers
  );
  const mediaFeaturesInterpretations = handleMediaFeatures(mediaFeatures);

  return linkPhrases(
    mediaIdentifiersInterpretations,
    mediaFeaturesInterpretations,
    "when"
  );
}

function handleMediaIdentifiers(mediaIdentifiers: CssNodePlain[]): string {
  let mediaConditionInterpretation = "";
  let mediaTypeInterpretation = "";

  mediaIdentifiers.forEach((identifier) => {
    if (identifier.type === "Identifier") {
      switch (identifier.name) {
        case "not":
        case "only": {
          mediaConditionInterpretation = identifier.name;
          break;
        }
        case "and":
          break;
        case "all": {
          mediaTypeInterpretation = "on all media type devices";
          break;
        }
        case "print": {
          mediaTypeInterpretation = "for printers";
          break;
        }
        case "screen": {
          mediaTypeInterpretation =
            "on computer screens, tablets, smart-phones, etc.";
          break;
        }
        case "speech": {
          mediaTypeInterpretation =
            "for screen readers that reads the page out loud";
          break;
        }
        default:
          addToErrors(
            `<code>${identifier.name}</code> is not a valid media query identifier`
          );
      }
    }
  });

  return linkPhrases(mediaConditionInterpretation, mediaTypeInterpretation);
}

function handleMediaFeatures(mediaFeatures: CssNodePlain[]): string {
  const mediaFeaturesInterpretations: string[] = [];

  mediaFeatures.forEach((mediaFeature) => {
    if (mediaFeature.type === "MediaFeature") {
      mediaFeaturesInterpretations.push(handleMediaFeature(mediaFeature));
    }
  });

  return mediaFeaturesInterpretations.join(" and ");
}

function handleMediaFeature(mediaFeature: MediaFeature): string {
  switch (mediaFeature.name) {
    case "max-width":
      return `the maximum width of the display area is not above ${handleMediaFeatureValue(
        mediaFeature
      )}`;
    case "orientation":
      return `the orientation of the viewport is ${handleMediaFeatureValue(
        mediaFeature
      )}`;
  }
}

function handleMediaFeatureValue({ value }: MediaFeature): string {
  switch (value.type) {
    case "Dimension":
      return `${value.value}${value.unit}`;

    case "Identifier":
      return value.name;
  }
}
