export type HomeStatsData = {
  totalGuests: number;
  totalInvitations: number;
  respondedGuests: number;
  responseRate: number;
  attendingGuests: number;
  declinedGuests: number;
  pendingGuests: number;
  weddingDate: string | null;
  weddingLocation: string | null;
  coupleNames: {
    nameA: string;
    nameB: string;
    displayName: string;
  };
  subscriptionPlan: string;
  siteUrl: string;
  subdomain: string | null;
  customDomain: string | null;
  websiteTemplate: string;
};

export type HomeStatsResponse = {
  totalGuests: number;
  totalInvitations: number;
  respondedGuests: number;
  responseRate: number;
  attendingGuests: number;
  declinedGuests: number;
  pendingGuests: number;
  weddingDate: string | null;
  weddingLocation: string | null;
  coupleNames: {
    nameA: string;
    nameB: string;
    displayName: string;
  };
  subscriptionPlan: string;
  siteUrl: string;
  user: {
    fullName: string;
    imageUrl: string | null;
    initials: string;
    email: string;
  };
  websiteTemplate: string;
  subdomain: string | null;
  customDomain: string | null;
};

