import { readFileSync } from "node:fs";
import { getProperties } from "properties-file";

export function parseProperties(filePath: string): Record<string, string> {
  return getProperties(readFileSync(filePath, "utf8"));
}
