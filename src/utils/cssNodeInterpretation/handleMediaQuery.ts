import {
  CssNodePlain,
  CssLocation,
  BlockPlain,
  AtrulePreludePlain,
  MediaQueryPlain,
  MediaFeature,
} from "css-tree";
import { CssNodeInterpretation, BlockInterpretation } from "../../types";
import { addToErrors } from "./selectorInterpretationErrorHandler";
import { linkPhrases, capitalizePhrase } from "../utils";
import handleSelectorListRule from "./handleSelectorListRule";

export default function (
  prelude: AtrulePreludePlain,
  loc: CssLocation,
  block: BlockPlain,
  nonParsedNode: CssNodePlain
): CssNodeInterpretation {
  if (prelude.type === "AtrulePrelude") {
    const mediaQueryInterpretation = handleMediaQueriesInterpretations(prelude);
    const blocksInterpretations: BlockInterpretation[] = handleMediaQueryBlockInterpretations(
      block,
      nonParsedNode
    );

    return {
      mediaQuery: `${mediaQueryInterpretation} [${loc.start.line}:${loc.start.column}]`,
      blocksInterpretations,
    };
  }
}

function handleMediaQueriesInterpretations(
  prelude: AtrulePreludePlain
): string {
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

  return capitalizePhrase(mediaQueriesInterpretations.join(" or when "));
}

function handleMediaQueryBlockInterpretations(
  block: BlockPlain,
  nonParsedNode: CssNodePlain
): BlockInterpretation[] {
  let blocksInterpretations: BlockInterpretation[] = [];
  if (nonParsedNode.type === "Atrule") {
    const { children: cssNodes } = block;
    const { children: nonParsedCssRules } = nonParsedNode.block;

    cssNodes.forEach((cssNode, cssNodeIndex) => {
      if (cssNode.type === "Rule") {
        const blockInterpretations = handleSelectorListRule(
          cssNode,
          nonParsedCssRules[cssNodeIndex]
        );

        blocksInterpretations = [
          ...blocksInterpretations,
          ...blockInterpretations,
        ];
      }
    });
  }

  return blocksInterpretations;
}

function handleMediaQuery(mediaQuery: MediaQueryPlain): string {
  const mediaFeaturesIndex = mediaQuery.children.findIndex(
    (mediaKey) => mediaKey.type === "MediaFeature"
  );
  let mediaIdentifiers: CssNodePlain[] = [];
  let mediaFeatures: CssNodePlain[] = [];

  if (mediaFeaturesIndex > -1) {
    mediaIdentifiers = mediaQuery.children.slice(0, mediaFeaturesIndex);
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
    // Viewport/ Page Dimensions Media Features
    case "width":
      return `the width of the targeted display area of the output device is ${handleMediaFeatureValue(
        mediaFeature
      )}`;
    case "min-width":
      return `the width of the targeted display area of the output device is equal to or above ${handleMediaFeatureValue(
        mediaFeature
      )}`;
    case "max-width":
      return `the width of the targeted display area of the output device is equal to or below ${handleMediaFeatureValue(
        mediaFeature
      )}`;

    case "height":
      return `the height of the targeted display area of the output device is ${handleMediaFeatureValue(
        mediaFeature
      )}`;
    case "min-height":
      return `the height of the targeted display area of the output device is equal to or above ${handleMediaFeatureValue(
        mediaFeature
      )}`;
    case "max-height":
      return `the height of the targeted display area of the output device is equal to or below ${handleMediaFeatureValue(
        mediaFeature
      )}`;

    case "aspect-ratio":
      return `the ratio between the width and the height of the viewport is ${handleMediaFeatureValue(
        mediaFeature
      )}`;
    case "min-aspect-ratio":
      return `the ratio between the width and the height of the viewport is equal to or above ${handleMediaFeatureValue(
        mediaFeature
      )}`;
    case "max-aspect-ratio":
      return `the ratio between the width and the height of the viewport is equal to or below ${handleMediaFeatureValue(
        mediaFeature
      )}`;

    case "orientation":
      return `the orientation of the viewport is ${handleMediaFeatureValue(
        mediaFeature
      )}`;

    // Display Quality Media Features
    case "resolution":
      return handleMediaFeatureResolution(mediaFeature);
    case "min-resolution":
      return `resolution of the output device, i.e. the density of the pixels is equal to or above ${handleMediaFeatureValue(
        mediaFeature
      )}`;
    case "max-resolution":
      return `resolution of the output device, i.e. the density of the pixels is equal to or below ${handleMediaFeatureValue(
        mediaFeature
      )}`;

    case "scan":
      return handleMediaFeatureScan(mediaFeature);

    case "grid":
      return handleMediaFeatureGrid(mediaFeature);

    case "update":
      return handleMediaFeatureUpdate(mediaFeature);

    case "overflow-block":
      return handleMediaFeatureOverflowBlock(mediaFeature);

    case "overflow-inline":
      return handleMediaFeatureOverflowInline(mediaFeature);

    // Color Media Features
    case "color":
      return handleMediaFeatureColor(mediaFeature);
    case "min-color":
      return `the number of bits per color component for the output device is equal to or above ${handleMediaFeatureValue(
        mediaFeature
      )}`;
    case "max-color":
      return `the number of bits per color component for the output device is equal to or below ${handleMediaFeatureValue(
        mediaFeature
      )}`;

    case "color-index":
      return handleMediaFeatureColorIndex(mediaFeature);
    case "min-color-index":
      return `he number of entries in the color lookup table of the output device is equal to or above ${handleMediaFeatureValue(
        mediaFeature
      )}`;
    case "max-color-index":
      return `the number of entries in the color lookup table of the output device is equal to or below ${handleMediaFeatureValue(
        mediaFeature
      )}`;

    case "monochrome":
      return handleMediaFeatureMonochrome(mediaFeature);
    case "min-monochrome":
      return `the number of bits per pixel in a monochrome frame buffer is equal to or above ${handleMediaFeatureValue(
        mediaFeature
      )}`;
    case "max-monochrome":
      return `the number of bits per pixel in a monochrome frame buffer is equal to or below ${handleMediaFeatureValue(
        mediaFeature
      )}`;

    case "color-gamut":
      return handleMediaFeatureColorGamut(mediaFeature);

    // Interaction Media Features
    case "hover":
      return handleMediaFeatureAnyHover(mediaFeature, "the primary");
    case "any-hover":
      return handleMediaFeatureAnyHover(mediaFeature, "any");

    case "pointer":
      return handleMediaFeaturePointer(mediaFeature, "the primary");
    case "any-pointer":
      return handleMediaFeaturePointer(mediaFeature, "any");
  }
}

function handleMediaFeatureValue({ value }: MediaFeature): string {
  if (value == null) return null;

  switch (value.type) {
    case "Dimension":
      return `${value.value}${value.unit}`;

    case "Identifier":
      return value.name;

    case "Number":
      return value.value;

    case "Ratio":
      return `${value.left} to ${value.right}`;
  }
}

function handleMediaFeatureResolution(mediaFeature: MediaFeature): string {
  const value = handleMediaFeatureValue(mediaFeature);

  if (value === "infinite") {
    return "mediums have no physical constraints on resolution (such as outputting to vector graphics)";
  }

  return `resolution of the output device, i.e. the density of the pixels equals to ${value}`;
}

function handleMediaFeatureScan(mediaFeature: MediaFeature): string {
  const value = handleMediaFeatureValue(mediaFeature);

  switch (value) {
    case "interlace":
      return "displaying on interlaced screens like CRT and some types of plasma TV screens that use “interlaced” rendering";

    case "progressive":
      return "a screen using “progressive” rendering displays each screen fully like most modern screens, and all computer screens";

    default:
      addToErrors(`${value} is not a valid scan media feature value`);
  }
}

function handleMediaFeatureGrid(mediaFeature: MediaFeature): string {
  const value = handleMediaFeatureValue(mediaFeature);

  switch (value) {
    case "1":
    case null:
      return "the output device is grid (e.g., a “tty” terminal, or a phone display with only one fixed font)";

    case "0":
    case "-0":
      return "the output device is bitmap";

    default:
      addToErrors(`${value} is not a valid grid media feature value`);
  }
}

function handleMediaFeatureUpdate(mediaFeature: MediaFeature): string {
  const value = handleMediaFeatureValue(mediaFeature);

  switch (value) {
    case "none":
      return "the output device once rendered, the layout can no longer be updated. Example: documents printed on paper";

    case "slow":
      return "the output device is not able to render or display changes quickly enough for them to be perceived as a smooth animation. Example: E-ink screens or severely under-powered devices";

    case "fast":
    case null:
      return "the output device is not unusually constrained in speed, so regularly-updating things like CSS Animations can be used. Example: computer screens";

    default:
      addToErrors(`${value} is not a valid update media feature value`);
  }
}

function handleMediaFeatureOverflowBlock(mediaFeature: MediaFeature): string {
  const value = handleMediaFeatureValue(mediaFeature);

  switch (value) {
    case "none":
      return "there is no affordance for overflow in the block axis; any overflowing content is simply not displayed";

    case "scroll":
      return "overflowing content in the block axis is exposed by allowing users to scroll to it. Examples: computer screens";

    case "paged":
      return "content is broken up into discrete pages; content that overflows one page in the block axis is displayed on the following page. Examples: printers, ebook readers";

    default:
      addToErrors(`${value} is not a valid overflow-block media feature value`);
  }
}

function handleMediaFeatureOverflowInline(mediaFeature: MediaFeature): string {
  const value = handleMediaFeatureValue(mediaFeature);

  switch (value) {
    case "none":
      return "there is no affordance for overflow in the inline axis; any overflowing content is simply not displayed";

    case "scroll":
      return "overflowing content in the inline axis is exposed by allowing users to scroll to it";

    default:
      addToErrors(
        `${value} is not a valid overflow-inline media feature value`
      );
  }
}

function handleMediaFeatureColor(mediaFeature: MediaFeature): string {
  const value = handleMediaFeatureValue(mediaFeature);

  if (value === null) {
    return "the number of bits per color component for the output device is any";
  } else {
    const numberValue = Number(value);

    if (numberValue > 0) {
      return `the number of bits per color component for the output device is ${handleMediaFeatureValue(
        mediaFeature
      )}`;
    } else {
      return "the device is not a color device";
    }
  }
}

function handleMediaFeatureColorIndex(mediaFeature: MediaFeature): string {
  const value = handleMediaFeatureValue(mediaFeature);

  if (value === null) {
    return "it's all color index devices";
  } else {
    const numberValue = Number(value);

    if (numberValue > 0) {
      return `the number of entries in the color lookup table of the output device is ${handleMediaFeatureValue(
        mediaFeature
      )}`;
    } else {
      return "the device does not use a color lookup table";
    }
  }
}

function handleMediaFeatureMonochrome(mediaFeature: MediaFeature): string {
  const value = handleMediaFeatureValue(mediaFeature);

  if (value === null) {
    return "it's all monochrome devices";
  } else {
    const numberValue = Number(value);

    if (numberValue > 0) {
      return `the number of bits per pixel in a monochrome frame buffer is ${handleMediaFeatureValue(
        mediaFeature
      )}`;
    } else {
      return "the device is not a monochrome device";
    }
  }
}

function handleMediaFeatureColorGamut(mediaFeature: MediaFeature): string {
  const value = handleMediaFeatureValue(mediaFeature);

  switch (value) {
    case "srgb":
      return "the UA and output device can support approximately the sRGB gamut or more (It is expected that the vast majority of color displays will be able to return true to a query of this type)";

    case "p3":
      return "the UA and output device can support approximately the gamut specified by the DCI P3 Color Space or more (The p3 gamut is larger than and includes the srgb gamut)";

    case "rec2020":
      return "the UA and output device can support approximately the gamut specified by the ITU-R Recommendation BT.2020 Color Space or more (The rec2020 gamut is larger than and includes the p3 gamut)";

    default:
      addToErrors(`${value} is not a valied color-gamut media feature value`);
  }
}

function handleMediaFeatureAnyHover(
  mediaFeature: MediaFeature,
  key: string
): string {
  const value = handleMediaFeatureValue(mediaFeature);

  switch (value) {
    case "hover":
      return `${key} device can easily hover over parts of the page. Examples include mice and devices that physically point at the screen, like the Nintendo Wii controller`;
    case "none":
      return `${key} device can’t hover, or that there is no pointing device. Examples include touchscreens and screens that use a basic drawing stylus`;

    default:
      addToErrors(`${value} is not a valid hover media feature value`);
  }
}

function handleMediaFeaturePointer(
  mediaFeature: MediaFeature,
  key: string
): string {
  const value = handleMediaFeatureValue(mediaFeature);

  switch (value) {
    case "fine":
      return `${key} input mechanism of the device includes an accurate pointing device. Examples include mice, touchpads, and drawing styluses`;
    case "coarse":
      return `${key} input mechanism of the device includes a pointing device of limited accuracy. Examples include touchscreens and motion-detection sensors (like the Kinect peripheral for the Xbox.)`;
    case "none":
      return `${key} input mechanism of the device does not include a pointing device`;

    default:
      addToErrors(`${value} is not a valid pointer media feature value`);
  }
}
