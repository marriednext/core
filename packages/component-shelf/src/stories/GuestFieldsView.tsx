"use client";

import clsx from "clsx";
import type { GuestFieldsViewProps } from "orm-shelf/types";

export default function GuestFieldsView({ entry }: GuestFieldsViewProps) {
  const guests = entry.guests;
  const firstGuest = guests[0];
  const hasOnlyOneGuest = guests.length === 1;

  return (
    <>
      {guests.map((guest, index) => (
        <div
          key={guest.id || index}
          className={clsx(
            "flex items-center justify-between py-2 px-3",
            index !== guests.length - 1 && "border-b border-gray-200"
          )}
        >
          <span className="font-semibold text-gray-900">
            {guest.nameOnInvitation}
          </span>
          <span
            className={clsx(
              "text-sm font-bold",
              guest.isAttending === true && "text-green-700",
              guest.isAttending === false && "text-red-700",
              guest.isAttending === null && "text-gray-600"
            )}
          >
            {guest.isAttending === true && "✓ Attending"}
            {guest.isAttending === false && "✗ Not Attending"}
            {guest.isAttending === null && "Pending"}
          </span>
        </div>
      ))}

      {hasOnlyOneGuest && firstGuest?.hasPlusOne && (
        <div
          className={clsx(
            "grid grid-cols-4 items-center justify-between py-2 px-3 w-full border-t border-gray-200"
          )}
        >
          <span className="font-medium text-gray-800 italic col-span-3">
            {firstGuest.nameOnInvitation}&apos;s Plus One
          </span>
          <span
            className={clsx(
              "text-sm font-bold col-span-1 text-right",
              firstGuest.isAttending === true && "text-green-700",
              firstGuest.isAttending === false && "text-red-700",
              firstGuest.isAttending === null && "text-gray-600"
            )}
          >
            {firstGuest.isAttending === true && "✓ Attending"}
            {firstGuest.isAttending === false && "✗ Not Attending"}
            {firstGuest.isAttending === null && "Pending"}
          </span>
        </div>
      )}
    </>
  );
}
