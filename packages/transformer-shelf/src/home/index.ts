import type { HomeStatsResponse, HomeStatsData } from "types-shelf/home";

export function transformHomeStatsToOverviewData(
  response: HomeStatsResponse
): HomeStatsData {
  return {
    totalGuests: response.totalGuests,
    totalInvitations: response.totalInvitations,
    respondedGuests: response.respondedGuests,
    responseRate: response.responseRate,
    attendingGuests: response.attendingGuests,
    declinedGuests: response.declinedGuests,
    pendingGuests: response.pendingGuests,
    weddingDate: response.weddingDate,
    weddingLocation: response.weddingLocation,
    coupleNames: response.coupleNames,
    subscriptionPlan: response.subscriptionPlan,
    siteUrl: response.siteUrl,
    subdomain: response.subdomain,
    customDomain: response.customDomain,
    websiteTemplate: response.websiteTemplate,
  };
}

