import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { NextRequest } from "next/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function readWeddingIdFromCookie(request: NextRequest): string {
  return request.cookies.get("weddingId")?.value || "";
}
