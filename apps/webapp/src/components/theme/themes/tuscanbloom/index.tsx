"use client";

import { TuscanBloom } from "component-shelf";
import { mapWeddingDataToTuscanBloomProps } from "./mapper";
import type { ThemeProps } from "../../types";

export default function TuscanBloomEntry({ weddingData }: ThemeProps) {
  const props = mapWeddingDataToTuscanBloomProps(weddingData);
  return <TuscanBloom {...props} />;
}

