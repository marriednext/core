"use client";

import { useState, useEffect } from "react";
import { DbInvitationGroupWithGuests } from "@/database/drizzle";
import {
  LayoutGrid,
  List,
  MoreVertical,
  Edit,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { telemetry } from "@/lib/telemetry";
import { useDebouncedTelemetry } from "@/hooks/useDebouncedTelemetry";
import clsx from "clsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UpdateGuestPayload {
  entryId: number;
  guestA: string;
  guestAAttending: boolean | null;
  guestAHasPlusOne: boolean;
  guestB: string | null;
  guestBAttending: boolean | null;
  guestBHasPlusOne: boolean;
}

interface GuestListDisplayProps {
  guestListWithGroups: DbInvitationGroupWithGuests[];
  onUpdateGuest: (payload: UpdateGuestPayload) => void;
  isUpdating: boolean;
  editingId: number | null;
  onEditingIdChange: (id: number | null) => void;
}

interface EditFormData {
  guestA: string;
  guestAAttending: boolean | null;
  guestAHasPlusOne: boolean;
  guestB: string | null;
  guestBAttending: boolean | null;
  guestBHasPlusOne: boolean;
}

interface InvitationCardProps {
  entry: DbInvitationGroupWithGuests;
  isEditing: boolean;
  editForm: EditFormData | null;
  onEdit: () => void;
  onRemove: () => void;
  onSave: () => void;
  onCancel: () => void;
  onFormChange: (form: EditFormData) => void;
  isSaving: boolean;
}

interface GuestFieldsEditProps {
  editForm: EditFormData;
  onFormChange: (form: EditFormData) => void;
  disabled?: boolean;
}

interface GuestFieldsViewProps {
  entry: DbInvitationGroupWithGuests;
}

function GuestFieldsEdit({
  editForm,
  onFormChange,
  disabled,
}: GuestFieldsEditProps) {
  return (
    <>
      <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-gray-50 border border-gray-200">
        <Input
          value={editForm.guestA}
          onChange={(e) =>
            onFormChange({ ...editForm, guestA: e.target.value })
          }
          placeholder="Guest A Name"
          className="flex-1"
          disabled={disabled}
        />
        <Select
          value={
            editForm.guestAAttending === null
              ? "pending"
              : editForm.guestAAttending
              ? "attending"
              : "not-attending"
          }
          onValueChange={(value) =>
            onFormChange({
              ...editForm,
              guestAAttending:
                value === "pending" ? null : value === "attending",
            })
          }
          disabled={disabled}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="attending">Attending</SelectItem>
            <SelectItem value="not-attending">Not Attending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {!editForm.guestB && (
        <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-gray-50 border border-gray-200 ml-4">
          <span className="text-sm text-gray-700">Plus One:</span>
          <Select
            value={editForm.guestAHasPlusOne ? "yes" : "no"}
            onValueChange={(value) =>
              onFormChange({
                ...editForm,
                guestAHasPlusOne: value === "yes",
              })
            }
            disabled={disabled}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {editForm.guestB !== null && (
        <>
          <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-gray-50 border border-gray-200">
            <Input
              value={editForm.guestB}
              onChange={(e) =>
                onFormChange({
                  ...editForm,
                  guestB: e.target.value,
                })
              }
              placeholder="Guest B Name"
              className="flex-1"
              disabled={disabled}
            />
            <Select
              value={
                editForm.guestBAttending === null
                  ? "pending"
                  : editForm.guestBAttending
                  ? "attending"
                  : "not-attending"
              }
              onValueChange={(value) =>
                onFormChange({
                  ...editForm,
                  guestBAttending:
                    value === "pending" ? null : value === "attending",
                })
              }
              disabled={disabled}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="attending">Attending</SelectItem>
                <SelectItem value="not-attending">Not Attending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </>
  );
}

function GuestFieldsView({ entry }: GuestFieldsViewProps) {
  const guestAAttending = entry.invitation_guestA?.isAttending;
  const guestBAttending = entry.invitation_guestB?.isAttending;
  const guestAHasPlusOne = entry.invitation_guestA?.hasPlusOne;

  return (
    <>
      {entry.invitation_guestA && (
        <>
          <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50 border border-gray-200">
            <span className="font-semibold text-gray-900">{entry.guestA}</span>
            <span
              className={clsx(
                "text-sm font-bold",
                guestAAttending && "text-green-700",
                !guestAAttending && "text-gray-600"
              )}
            >
              {guestAAttending ? "✓ Attending" : "Pending"}
            </span>
          </div>
          {!entry.guestB && guestAHasPlusOne && (
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50 border border-gray-200 ml-4">
              <span className="font-medium text-gray-800 italic">
                {entry.guestA}&apos;s Plus One
              </span>
              <span
                className={clsx(
                  "text-sm font-bold",
                  guestAAttending && "text-green-700",
                  !guestAAttending && "text-gray-600"
                )}
              >
                {guestAAttending ? "✓ Attending" : "Pending"}
              </span>
            </div>
          )}
        </>
      )}

      {entry.invitation_guestB && (
        <>
          <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50 border border-gray-200">
            <span className="font-semibold text-gray-900">{entry.guestB}</span>
            <span
              className={clsx(
                "text-sm font-bold",
                guestBAttending && "text-green-700",
                !guestBAttending && "text-gray-600"
              )}
            >
              {guestBAttending ? "✓ Attending" : "Pending"}
            </span>
          </div>
        </>
      )}
    </>
  );
}

function InvitationCard({
  entry,
  isEditing,
  editForm,
  onEdit,
  onRemove,
  onSave,
  onCancel,
  onFormChange,
  isSaving,
}: InvitationCardProps) {
  return (
    <li className="rounded-xl bg-white border border-gray-200 p-4 hover:border-gray-300 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold font-handwritten-font text-gray-900">
          {entry.guestA}
          {entry.guestB && (
            <>
              <span className="font-handwritten-font mx-2">&</span>
              {entry.guestB}
            </>
          )}
        </h3>
        {isEditing ? (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onCancel}
              className="h-8"
              disabled={isSaving}
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={onSave}
              className="h-8"
              disabled={isSaving}
            >
              <Check className="w-4 h-4 mr-1" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="p-1 hover:bg-gray-100 rounded transition-colors">
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onRemove}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="space-y-2">
        {isEditing && editForm ? (
          <GuestFieldsEdit
            editForm={editForm}
            onFormChange={onFormChange}
            disabled={isSaving}
          />
        ) : (
          <GuestFieldsView entry={entry} />
        )}
      </div>

      {entry.createdAt && (
        <p className="text-xs text-gray-600 mt-3 font-medium">
          Created:{" "}
          {new Date(entry.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      )}
    </li>
  );
}

type SortOption = "alpha-asc" | "alpha-desc" | "date-newest" | "date-oldest";

export default function GuestListDisplay({
  guestListWithGroups,
  onUpdateGuest,
  isUpdating,
  editingId,
  onEditingIdChange,
}: GuestListDisplayProps) {
  const [viewMode, setViewMode] = useState<"expanded" | "condensed">(
    "expanded"
  );
  const [sortBy, setSortBy] = useState<SortOption>("alpha-asc");
  const [editForm, setEditForm] = useState<EditFormData | null>(null);

  const { trackEvent, trackOnMount } = useDebouncedTelemetry({ delay: 3000 });

  useEffect(() => {
    trackOnMount(() => telemetry.trackGuestListComponentMount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (entry: DbInvitationGroupWithGuests) => {
    onEditingIdChange(entry.id);
    setEditForm({
      guestA: entry.guestA,
      guestAAttending: entry.invitation_guestA?.isAttending ?? null,
      guestAHasPlusOne: entry.invitation_guestA?.hasPlusOne ?? false,
      guestB: entry.guestB ?? null,
      guestBAttending: entry.invitation_guestB?.isAttending ?? null,
      guestBHasPlusOne: entry.invitation_guestB?.hasPlusOne ?? false,
    });
  };

  const handleCancelEdit = () => {
    onEditingIdChange(null);
    setEditForm(null);
  };

  const handleSubmitEdit = (entryId: number) => {
    if (!editForm) return;

    onUpdateGuest({
      entryId,
      ...editForm,
    });
  };

  const sortedGuestList = [...guestListWithGroups].sort((a, b) => {
    switch (sortBy) {
      case "alpha-asc":
        return a.guestA.localeCompare(b.guestA);
      case "alpha-desc":
        return b.guestA.localeCompare(a.guestA);
      case "date-newest":
        if (!a.createdAt || !b.createdAt) return 0;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "date-oldest":
        if (!a.createdAt || !b.createdAt) return 0;
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="flex justify-between items-center gap-2 mb-4">
        <Select
          value={sortBy}
          onValueChange={(value: SortOption) => setSortBy(value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alpha-asc">A → Z</SelectItem>
            <SelectItem value="alpha-desc">Z → A</SelectItem>
            <SelectItem value="date-newest">Newest First</SelectItem>
            <SelectItem value="date-oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setViewMode("expanded");
              trackEvent(() => telemetry.trackGuestListViewToggle("expanded"));
            }}
            className={clsx(
              "p-2 rounded-lg transition-colors border",
              viewMode === "expanded" &&
                "bg-white text-gray-900 border-gray-300 shadow-sm",
              viewMode !== "expanded" &&
                "bg-white/50 text-gray-700 border-gray-200 hover:bg-white hover:border-gray-300"
            )}
            aria-label="Expanded view"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setViewMode("condensed");
              trackEvent(() => telemetry.trackGuestListViewToggle("condensed"));
            }}
            className={clsx(
              "p-2 rounded-lg transition-colors border",
              viewMode === "condensed" &&
                "bg-white text-gray-900 border-gray-300 shadow-sm",
              viewMode !== "condensed" &&
                "bg-white/50 text-gray-700 border-gray-200 hover:bg-white hover:border-gray-300"
            )}
            aria-label="Condensed view"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      <ul className="space-y-3">
        {sortedGuestList.map((entry) => {
          const attending = entry.attending ?? 0;
          const total = entry.total ?? 0;

          if (viewMode === "condensed") {
            return (
              <li
                key={entry.id}
                className="rounded-xl bg-white border border-gray-200 p-4 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold font-handwritten-font text-gray-900">
                    {entry.guestA}
                    {entry.guestB && (
                      <>
                        <span className="text-gray-700 mx-2">&</span>
                        {entry.guestB}
                      </>
                    )}
                  </h3>
                  <span
                    className={clsx(
                      "text-sm font-bold px-2 py-1 rounded",
                      attending === total && "text-green-800 bg-green-50",
                      attending > 0 &&
                        attending < total &&
                        "text-amber-800 bg-amber-50",
                      attending === 0 && "text-gray-700 bg-gray-100"
                    )}
                  >
                    ({attending}/{total})
                  </span>
                </div>
              </li>
            );
          }

          return (
            <InvitationCard
              key={entry.id}
              entry={entry}
              isEditing={editingId === entry.id}
              editForm={editForm}
              onEdit={() => handleEdit(entry)}
              onRemove={() => console.log("Remove", entry.id)}
              onSave={() => handleSubmitEdit(entry.id)}
              onCancel={handleCancelEdit}
              onFormChange={setEditForm}
              isSaving={isUpdating && editingId === entry.id}
            />
          );
        })}
      </ul>
    </div>
  );
}
