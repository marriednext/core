"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GuestFieldsEditProps } from "@/components/guest-list/guestList.types";

export default function GuestFieldsEdit({
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
