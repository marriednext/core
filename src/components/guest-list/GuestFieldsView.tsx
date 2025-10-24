"use client";

import clsx from "clsx";
import { GuestFieldsViewProps } from "@/components/guest-list/guestList.types";

export default function GuestFieldsView({ entry }: GuestFieldsViewProps) {
  const guests = entry.guests;
  const firstGuest = guests[0];
  const hasOnlyOneGuest = guests.length === 1;

  return (
    <>
      {guests.map((guest, index) => (
        <div
          key={guest.id || index}
          className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50 border border-gray-200"
        >
          <span className="font-semibold text-gray-900">
            {guest.nameOnInvitation}
          </span>
          <span
            className={clsx(
              "text-sm font-bold",
              guest.isAttending && "text-green-700",
              !guest.isAttending && "text-gray-600"
            )}
          >
            {guest.isAttending ? "✓ Attending" : "Pending"}
          </span>
        </div>
      ))}

      {hasOnlyOneGuest && firstGuest?.hasPlusOne && (
        <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50 border border-gray-200 ml-4">
          <span className="font-medium text-gray-800 italic">
            {firstGuest.nameOnInvitation}&apos;s Plus One
          </span>
          <span
            className={clsx(
              "text-sm font-bold",
              firstGuest.isAttending && "text-green-700",
              !firstGuest.isAttending && "text-gray-600"
            )}
          >
            {firstGuest.isAttending ? "✓ Attending" : "Pending"}
          </span>
        </div>
      )}
    </>
  );
}
