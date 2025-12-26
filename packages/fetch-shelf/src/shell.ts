import type { ShellResponse } from "types-shelf/shell";
import { shellResponseSchema } from "zod-shelf/shell";

export async function fetchShell(): Promise<ShellResponse> {
  const res = await fetch("/api/v2/engaged/shell");
  if (!res.ok) {
    throw new Error("Failed to fetch shell data");
  }
  const data = await res.json();
  return shellResponseSchema.parse(data);
}
