"use client";

import clsx from "clsx";
import { GuestFieldsViewProps } from "@/components/guest-list/guestList.types";

export default function GuestFieldsView({ entry }: GuestFieldsViewProps) {
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
