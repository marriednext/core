import type { GlobalTokens, HierarchicalWebsiteTokens } from "@/database/types";

export const defaultGlobalTokens: GlobalTokens = {
  primaryColor: "#0a0a0a",
  bigFont: "Playfair Display",
  defaultFont: "Inter",
  backgroundColor: "#fafafa",
  headingColor: "#0a0a0a",
  bodyColor: "#404040",
};

export const createDefaultTokens = (
  globals: GlobalTokens = defaultGlobalTokens
): HierarchicalWebsiteTokens => ({
  __global: globals,
  page: {
    background: "{__global.backgroundColor}",
    fontFamily: "{__global.defaultFont}",
  },
  primaryButtonOnLightBackground: {
    background: "{__global.primaryColor}",
    color: "{__global.backgroundColor}",
    fontFamily: "{__global.defaultFont}",
  },
  primaryButtonOnDarkBackground: {
    background: "{__global.backgroundColor}",
    color: "{__global.primaryColor}",
    fontFamily: "{__global.defaultFont}",
  },
  secondaryButtonOnLightBackground: {
    background: "{__global.backgroundColor}",
    color: "{__global.primaryColor}",
    fontFamily: "{__global.defaultFont}",
  },
  secondaryButtonOnDarkBackground: {
    background: "{__global.primaryColor}",
    color: "{__global.backgroundColor}",
    fontFamily: "{__global.defaultFont}",
  },
  largeTextOnLightBackground: {
    color: "{__global.headingColor}",
    fontFamily: "{__global.bigFont}",
  },
  largeTextOnDarkBackground: {
    color: "{__global.backgroundColor}",
    fontFamily: "{__global.bigFont}",
  },
  defaultTextOnLightBackground: {
    color: "{__global.bodyColor}",
    fontFamily: "{__global.defaultFont}",
  },
  defaultTextOnDarkBackground: {
    color: "{__global.backgroundColor}",
    fontFamily: "{__global.defaultFont}",
  },
});

export const defaultWebsiteTokens: HierarchicalWebsiteTokens =
  createDefaultTokens();
