import type {
  ShellResponse,
  DashboardUserData,
  DashboardWeddingData,
} from "types-shelf/shell";

export function transformShellToUserData(
  response: ShellResponse
): DashboardUserData {
  return {
    fullName: response.user.fullName,
    email: response.user.email,
    imageUrl: response.user.imageUrl,
    initials: response.user.initials,
    subscriptionPlan: response.subscriptionPlan,
  };
}

export function transformShellToWeddingData(
  response: ShellResponse
): DashboardWeddingData {
  return {
    displayName: response.wedding.displayName,
    nameA: response.wedding.nameA,
    nameB: response.wedding.nameB,
    eventDate: response.wedding.eventDate,
  };
}
