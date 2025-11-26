import { InferSelectModel } from "drizzle-orm";
import {
  guest,
  invitation,
  weddingUsers,
  seatingTable,
  seatAssignment,
} from "./drizzle/schema";

export type DbGuest = InferSelectModel<typeof guest>;
export type DbInvitation = InferSelectModel<typeof invitation>;
export type DbWeddingUser = InferSelectModel<typeof weddingUsers>;
export type DbSeatingTable = InferSelectModel<typeof seatingTable>;
export type DbSeatAssignment = InferSelectModel<typeof seatAssignment>;

export type DbInvitationWithGuests = DbInvitation & {
  guests: DbGuest[];
  attending?: number;
  total?: number;
};

export type DbInvitationGroupWithGuests = DbInvitationWithGuests;
export type DbInvitationGroup = DbInvitation;

export interface GuestFormData {
  id?: string;
  nameOnInvitation: string;
  isAttending: boolean | null;
  hasPlusOne: boolean;
}

export interface UpdateGuestPayload {
  entryId: string;
  guests: GuestFormData[];
  inviteGroupName: string | null;
}

export interface GuestListDisplayProps {
  guestListWithGroups: DbInvitationGroupWithGuests[];
  onUpdateGuest: (payload: UpdateGuestPayload) => void;
  onDeleteGuest: (entryId: string) => void;
  isUpdating: boolean;
  editingId: string | null;
  onEditingIdChange: (id: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchResults: DbInvitationGroupWithGuests[] | null;
  searchResultsCount: number;
  isSearching: boolean;
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
  isSorting: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  isLoadingMore: boolean;
}

export interface EditFormData {
  guests: GuestFormData[];
  inviteGroupName: string | null;
}

export interface InvitationCardProps {
  entry: DbInvitationGroupWithGuests;
  isEditing: boolean;
  editForm: EditFormData | null;
  onEdit: () => void;
  onRemove: () => void;
  onSave: () => void;
  onCancel: () => void;
  onFormChange: (form: EditFormData) => void;
  isSaving: boolean;
  onCollapse?: () => void;
  root?: "div" | "li";
}

export interface GuestFieldsEditProps {
  editForm: EditFormData;
  onFormChange: (form: EditFormData) => void;
  disabled?: boolean;
}

export interface GuestFieldsViewProps {
  entry: DbInvitationGroupWithGuests;
}

export type SortOption =
  | "alpha-asc"
  | "alpha-desc"
  | "date-newest"
  | "date-oldest"
  | "updated-newest";

export type GuestListData = {
  guestListWithGroups: DbInvitationGroupWithGuests[];
  guestListCount: number;
  guestListWithGroupsCount: number;
  plusOneCount: number;
  hasMore: boolean;
  currentOffset: number;
  currentLimit: number;
};
