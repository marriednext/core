import type { HomeStatsResponse } from "types-shelf/home";
import { homeStatsResponseSchema } from "zod-shelf/home";

export async function fetchHomeStats(): Promise<HomeStatsResponse> {
  const res = await fetch("/api/v2/engaged/home-stats");
  if (!res.ok) {
    throw new Error("Failed to fetch home stats");
  }
  const data = await res.json();
  return homeStatsResponseSchema.parse(data);
}

