export type ShellUserData = {
  fullName: string;
  email: string;
  imageUrl: string | null;
  initials: string;
};

export type ShellWeddingData = {
  id: string;
  displayName: string;
  nameA: string;
  nameB: string;
  eventDate: string | null;
};

export type ShellResponse = {
  user: ShellUserData;
  wedding: ShellWeddingData;
  subscriptionPlan: string;
};

export type DashboardUserData = {
  fullName: string;
  email: string;
  imageUrl: string | null;
  initials: string;
  subscriptionPlan: string;
};

export type DashboardWeddingData = {
  displayName: string;
  nameA: string;
  nameB: string;
  eventDate: string | null;
};
