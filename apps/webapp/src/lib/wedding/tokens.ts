import type {
  GlobalTokens,
  HierarchicalWebsiteTokens,
  ComponentTokenKey,
  PageTokens,
  ButtonTokens,
  TextTokens,
} from "@/database/types";
import {
  defaultGlobalTokens,
  createDefaultTokens,
  defaultWebsiteTokens,
} from "./defaultTokens";

export { defaultGlobalTokens, createDefaultTokens, defaultWebsiteTokens };

export const isTokenReference = (value: string): boolean =>
  value.startsWith("{__global.") && value.endsWith("}");

export const extractGlobalKey = (value: string): keyof GlobalTokens | null => {
  if (!isTokenReference(value)) return null;
  const key = value.slice(10, -1);
  if (key in defaultGlobalTokens) {
    return key as keyof GlobalTokens;
  }
  return null;
};

export const resolveTokenValue = (
  value: string,
  globals: GlobalTokens
): string => {
  const key = extractGlobalKey(value);
  if (key) {
    return globals[key];
  }
  return value;
};

export const resolvePageTokens = (
  tokens: PageTokens,
  globals: GlobalTokens
): PageTokens => ({
  background: resolveTokenValue(tokens.background, globals),
  fontFamily: resolveTokenValue(tokens.fontFamily, globals),
});

export const resolveButtonTokens = (
  tokens: ButtonTokens,
  globals: GlobalTokens
): ButtonTokens => ({
  background: resolveTokenValue(tokens.background, globals),
  color: resolveTokenValue(tokens.color, globals),
  fontFamily: resolveTokenValue(tokens.fontFamily, globals),
});

export const resolveTextTokens = (
  tokens: TextTokens,
  globals: GlobalTokens
): TextTokens => ({
  color: resolveTokenValue(tokens.color, globals),
  fontFamily: resolveTokenValue(tokens.fontFamily, globals),
});

export type ResolvedWebsiteTokens = {
  __global: GlobalTokens;
  page: PageTokens;
  primaryButtonOnLightBackground: ButtonTokens;
  primaryButtonOnDarkBackground: ButtonTokens;
  secondaryButtonOnLightBackground: ButtonTokens;
  secondaryButtonOnDarkBackground: ButtonTokens;
  largeTextOnLightBackground: TextTokens;
  largeTextOnDarkBackground: TextTokens;
  defaultTextOnLightBackground: TextTokens;
  defaultTextOnDarkBackground: TextTokens;
};

export const resolveTokens = (
  tokens: HierarchicalWebsiteTokens
): ResolvedWebsiteTokens => {
  const globals = tokens.__global;
  return {
    __global: globals,
    page: resolvePageTokens(tokens.page, globals),
    primaryButtonOnLightBackground: resolveButtonTokens(
      tokens.primaryButtonOnLightBackground,
      globals
    ),
    primaryButtonOnDarkBackground: resolveButtonTokens(
      tokens.primaryButtonOnDarkBackground,
      globals
    ),
    secondaryButtonOnLightBackground: resolveButtonTokens(
      tokens.secondaryButtonOnLightBackground,
      globals
    ),
    secondaryButtonOnDarkBackground: resolveButtonTokens(
      tokens.secondaryButtonOnDarkBackground,
      globals
    ),
    largeTextOnLightBackground: resolveTextTokens(
      tokens.largeTextOnLightBackground,
      globals
    ),
    largeTextOnDarkBackground: resolveTextTokens(
      tokens.largeTextOnDarkBackground,
      globals
    ),
    defaultTextOnLightBackground: resolveTextTokens(
      tokens.defaultTextOnLightBackground,
      globals
    ),
    defaultTextOnDarkBackground: resolveTextTokens(
      tokens.defaultTextOnDarkBackground,
      globals
    ),
  };
};

export const updateGlobalToken = <K extends keyof GlobalTokens>(
  tokens: HierarchicalWebsiteTokens,
  key: K,
  value: GlobalTokens[K]
): HierarchicalWebsiteTokens => ({
  ...tokens,
  __global: {
    ...tokens.__global,
    [key]: value,
  },
});

export const updateComponentToken = <
  C extends ComponentTokenKey,
  K extends keyof HierarchicalWebsiteTokens[C]
>(
  tokens: HierarchicalWebsiteTokens,
  component: C,
  key: K,
  value: string
): HierarchicalWebsiteTokens => ({
  ...tokens,
  [component]: {
    ...tokens[component],
    [key]: value,
  },
});

const defaultTokensTemplate = createDefaultTokens();

export const resetComponentToken = <
  C extends ComponentTokenKey,
  K extends keyof HierarchicalWebsiteTokens[C]
>(
  tokens: HierarchicalWebsiteTokens,
  component: C,
  key: K
): HierarchicalWebsiteTokens => {
  const defaultValue = defaultTokensTemplate[component][key];
  return {
    ...tokens,
    [component]: {
      ...tokens[component],
      [key]: defaultValue,
    },
  };
};

export const isTokenOverridden = <
  C extends ComponentTokenKey,
  K extends keyof HierarchicalWebsiteTokens[C]
>(
  tokens: HierarchicalWebsiteTokens,
  component: C,
  key: K
): boolean => {
  const value = tokens[component][key] as string;
  return !isTokenReference(value);
};

export type FlatRenderTokens = {
  primary: string;
  primaryForeground: string;
  background: string;
  headingColor: string;
  bodyColor: string;
  headingFont: string;
  bodyFont: string;
};

export const toFlatRenderTokens = (
  tokens: HierarchicalWebsiteTokens
): FlatRenderTokens => {
  const resolved = resolveTokens(tokens);
  return {
    primary: resolved.primaryButtonOnLightBackground.background,
    primaryForeground: resolved.primaryButtonOnLightBackground.color,
    background: resolved.page.background,
    headingColor: resolved.largeTextOnLightBackground.color,
    bodyColor: resolved.defaultTextOnLightBackground.color,
    headingFont: resolved.largeTextOnLightBackground.fontFamily,
    bodyFont: resolved.defaultTextOnLightBackground.fontFamily,
  };
};
