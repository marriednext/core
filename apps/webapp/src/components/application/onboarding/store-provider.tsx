"use client";

import type React from "react";

import { useMemo } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../../../lib/component-shelf/store/store";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const store = useMemo(() => makeStore(), []);

  return <Provider store={store}>{children}</Provider>;
}
