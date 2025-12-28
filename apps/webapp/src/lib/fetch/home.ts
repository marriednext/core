import type { HomeStatsResponse } from "@/lib/types/home";
import { homeStatsResponseSchema } from "@/lib/schemas/home";

export async function fetchHomeStats(): Promise<HomeStatsResponse> {
  const res = await fetch("/api/v2/engaged/home-stats");
  if (!res.ok) {
    throw new Error("Failed to fetch home stats");
  }
  const data = await res.json();
  return homeStatsResponseSchema.parse(data);
}
