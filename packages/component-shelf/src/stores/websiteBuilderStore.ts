import { create } from "zustand";

export type WebsiteLabels = Record<string, Record<string, string>>;

interface WebsiteBuilderStore {
  savedLabels: WebsiteLabels;
  pendingLabels: WebsiteLabels;
  initializeLabels: (labels: WebsiteLabels) => void;
  updateLabel: (section: string, key: string, value: string) => void;
  commitLabels: (labels: WebsiteLabels) => void;
  discardChanges: () => void;
  hasUnsavedChanges: () => boolean;
}

const areLabelsEqual = (
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

export const useWebsiteBuilderStore = create<WebsiteBuilderStore>(
  (set, get) => ({
    savedLabels: {},
    pendingLabels: {},

    initializeLabels: (labels) => {
      set({
        savedLabels: labels,
        pendingLabels: labels,
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

    commitLabels: (labels) => {
      set({
        savedLabels: labels,
        pendingLabels: labels,
      });
    },

    discardChanges: () => {
      set((state) => ({
        pendingLabels: state.savedLabels,
      }));
    },

    hasUnsavedChanges: () => {
      const { savedLabels, pendingLabels } = get();
      return !areLabelsEqual(savedLabels, pendingLabels);
    },
  })
);

