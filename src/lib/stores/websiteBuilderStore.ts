import { create } from "zustand";

type PageId =
  | "home"
  | "our-story"
  | "photos"
  | "wedding-party"
  | "q-and-a"
  | "travel"
  | "registry";

interface WebsiteBuilderState {
  selectedPage: PageId;
  scale: number;
  editMode: "photos" | "labels" | null;
  setSelectedPage: (page: PageId) => void;
  setScale: (scale: number) => void;
  setEditMode: (mode: "photos" | "labels" | null) => void;
}

export const useWebsiteBuilderStore = create<WebsiteBuilderState>((set) => ({
  selectedPage: "home",
  scale: 1,
  editMode: null,
  setSelectedPage: (page) => set({ selectedPage: page }),
  setScale: (scale) => set({ scale }),
  setEditMode: (mode) => set({ editMode: mode }),
}));
