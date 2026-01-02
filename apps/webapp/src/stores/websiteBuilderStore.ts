import { create } from "zustand";
import type {
  WebsiteTokens,
  GlobalTokens,
  ComponentTokenKey,
} from "@/database/types";
import {
  defaultWebsiteTokens,
  updateGlobalToken as updateGlobalTokenUtil,
  updateComponentToken as updateComponentTokenUtil,
  resetComponentToken as resetComponentTokenUtil,
  isTokenOverridden,
} from "@/lib/wedding/tokens";

export type WebsiteLabels = Record<string, Record<string, string>>;

export type WebsiteSection = {
  id: string;
  enabled: boolean;
  order: number;
};

export type SelectedElement = {
  sectionId: string;
  labelKey?: string;
  currentValue?: string;
} | null;

interface WebsiteBuilderStore {
  savedLabels: WebsiteLabels;
  pendingLabels: WebsiteLabels;
  savedSections: WebsiteSection[];
  pendingSections: WebsiteSection[];
  savedTokens: WebsiteTokens;
  pendingTokens: WebsiteTokens;
  selectedElement: SelectedElement;
  initializeLabels: (labels: WebsiteLabels) => void;
  initializeSections: (sections: WebsiteSection[]) => void;
  initializeTokens: (tokens: WebsiteTokens | null | undefined) => void;
  updateLabel: (section: string, key: string, value: string) => void;
  updateSection: (sectionId: string, enabled: boolean) => void;
  updateGlobalToken: <K extends keyof GlobalTokens>(
    key: K,
    value: GlobalTokens[K]
  ) => void;
  updateComponentToken: <
    C extends ComponentTokenKey,
    K extends keyof WebsiteTokens[C]
  >(
    component: C,
    key: K,
    value: string
  ) => void;
  resetComponentToken: <
    C extends ComponentTokenKey,
    K extends keyof WebsiteTokens[C]
  >(
    component: C,
    key: K
  ) => void;
  isTokenOverridden: <
    C extends ComponentTokenKey,
    K extends keyof WebsiteTokens[C]
  >(
    component: C,
    key: K
  ) => boolean;
  updateTokens: (tokens: Partial<WebsiteTokens>) => void;
  commitLabels: (labels: WebsiteLabels) => void;
  commitSections: (sections: WebsiteSection[]) => void;
  commitTokens: (tokens: WebsiteTokens) => void;
  discardChanges: () => void;
  hasUnsavedChanges: () => boolean;
  setSelectedElement: (element: SelectedElement) => void;
  clearSelectedElement: () => void;
}

export const areLabelsEqual = (
  labels1: WebsiteLabels,
  labels2: WebsiteLabels
): boolean => {
  const keys1 = Object.keys(labels1);
  const keys2 = Object.keys(labels2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const section1 = labels1[key] || {};
    const section2 = labels2[key] || {};
    const sectionKeys1 = Object.keys(section1);
    const sectionKeys2 = Object.keys(section2);

    if (sectionKeys1.length !== sectionKeys2.length) {
      return false;
    }

    for (const sectionKey of sectionKeys1) {
      if (section1[sectionKey] !== section2[sectionKey]) {
        return false;
      }
    }
  }

  return true;
};

export const areSectionsEqual = (
  sections1: WebsiteSection[],
  sections2: WebsiteSection[]
): boolean => {
  if (sections1.length !== sections2.length) {
    return false;
  }

  const map1 = new Map(sections1.map((s) => [s.id, s]));
  const map2 = new Map(sections2.map((s) => [s.id, s]));

  for (const [id, section1] of map1.entries()) {
    const section2 = map2.get(id);
    if (
      !section2 ||
      section1.enabled !== section2.enabled ||
      section1.order !== section2.order
    ) {
      return false;
    }
  }

  return true;
};

export const areTokensEqual = (
  tokens1: WebsiteTokens,
  tokens2: WebsiteTokens
): boolean => {
  const keys = Object.keys(tokens1) as (keyof WebsiteTokens)[];
  for (const key of keys) {
    const val1 = tokens1[key];
    const val2 = tokens2[key];
    if (typeof val1 === "object" && typeof val2 === "object") {
      const nestedKeys = Object.keys(val1) as (keyof typeof val1)[];
      for (const nestedKey of nestedKeys) {
        if (val1[nestedKey] !== val2[nestedKey]) {
          return false;
        }
      }
    } else if (val1 !== val2) {
      return false;
    }
  }
  return true;
};

export const useWebsiteBuilderStore = create<WebsiteBuilderStore>(
  (set, get) => ({
    savedLabels: {},
    pendingLabels: {},
    savedSections: [],
    pendingSections: [],
    savedTokens: defaultWebsiteTokens,
    pendingTokens: defaultWebsiteTokens,
    selectedElement: null,

    initializeLabels: (labels) => {
      set({
        savedLabels: labels,
        pendingLabels: labels,
      });
    },

    initializeSections: (sections) => {
      set({
        savedSections: sections,
        pendingSections: sections,
      });
    },

    initializeTokens: (tokens) => {
      const resolvedTokens = tokens || defaultWebsiteTokens;
      set({
        savedTokens: resolvedTokens,
        pendingTokens: resolvedTokens,
      });
    },

    updateLabel: (section, key, value) => {
      set((state) => ({
        pendingLabels: {
          ...state.pendingLabels,
          [section]: {
            ...(state.pendingLabels[section] || {}),
            [key]: value,
          },
        },
      }));
    },

    updateSection: (sectionId, enabled) => {
      set((state) => ({
        pendingSections: state.pendingSections.map((section) =>
          section.id === sectionId ? { ...section, enabled } : section
        ),
      }));
    },

    updateGlobalToken: (key, value) => {
      set((state) => ({
        pendingTokens: updateGlobalTokenUtil(state.pendingTokens, key, value),
      }));
    },

    updateComponentToken: (component, key, value) => {
      set((state) => ({
        pendingTokens: updateComponentTokenUtil(
          state.pendingTokens,
          component,
          key,
          value
        ),
      }));
    },

    resetComponentToken: (component, key) => {
      set((state) => ({
        pendingTokens: resetComponentTokenUtil(
          state.pendingTokens,
          component,
          key
        ),
      }));
    },

    isTokenOverridden: (component, key) => {
      return isTokenOverridden(get().pendingTokens, component, key);
    },

    updateTokens: (tokens) => {
      set((state) => ({
        pendingTokens: {
          ...state.pendingTokens,
          ...tokens,
        },
      }));
    },

    commitLabels: (labels) => {
      set({
        savedLabels: labels,
        pendingLabels: labels,
      });
    },

    commitSections: (sections) => {
      set({
        savedSections: sections,
        pendingSections: sections,
      });
    },

    commitTokens: (tokens) => {
      set({
        savedTokens: tokens,
        pendingTokens: tokens,
      });
    },

    discardChanges: () => {
      set((state) => ({
        pendingLabels: state.savedLabels,
        pendingSections: state.savedSections,
        pendingTokens: state.savedTokens,
      }));
    },

    hasUnsavedChanges: () => {
      const {
        savedLabels,
        pendingLabels,
        savedSections,
        pendingSections,
        savedTokens,
        pendingTokens,
      } = get();
      return (
        !areLabelsEqual(savedLabels, pendingLabels) ||
        !areSectionsEqual(savedSections, pendingSections) ||
        !areTokensEqual(savedTokens, pendingTokens)
      );
    },

    setSelectedElement: (element) => {
      set({ selectedElement: element });
    },

    clearSelectedElement: () => {
      set({ selectedElement: null });
    },
  })
);
