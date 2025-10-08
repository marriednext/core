"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { DbInvitationGroupWithGuests } from "@/database/drizzle";
import GuestListDisplay from "@/components/GuestListDisplay";

type GuestListData = {
  guestListWithGroups: DbInvitationGroupWithGuests[];
  guestListCount: number;
  guestListWithGroupsCount: number;
  plusOneCount: number;
};

interface UpdateGuestPayload {
  entryId: number;
  guestA: string;
  guestAAttending: boolean | null;
  guestAHasPlusOne: boolean;
  guestB: string | null;
  guestBAttending: boolean | null;
  guestBHasPlusOne: boolean;
}

export default function GuestListPage() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data } = useQuery<GuestListData>({
    queryKey: ["guest-list"],
    queryFn: async () => {
      const res = await fetch("/api/guest-list");
      return res.json();
    },
  });

  const updateGuestMutation = useMutation({
    mutationFn: async (payload: UpdateGuestPayload) => {
      const response = await fetch("/api/guest-list", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update guest");
      }

      return response.json();
    },
    onSuccess: () => {
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ["guest-list"] });
    },
    onError: (error) => {
      console.error("Error updating guest:", error);
      alert("Failed to update guest. Please try again.");
    },
  });

  const guestListWithGroups = data?.guestListWithGroups ?? [];
  const guestListCount = data?.guestListCount ?? 0;
  const guestListWithGroupsCount = data?.guestListWithGroupsCount ?? 0;
  const plusOneCount = data?.plusOneCount ?? 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full mb-4 mt-20">
        <div className="p-6 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg text-gray-900">
          <SignedIn>
            <div className="mb-6">
              <h1 className="text-5xl font-bold mb-1">Our Guest List</h1>
              <p className="text-stone-700 font-handwritten-font text-lg">
                Temecula Wine Country
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-center">
                <p className="text-2xl font-semibold font-handwritten-font">
                  {guestListWithGroupsCount}
                </p>
                <p className="text-stone-700 text-sm">Invitations</p>
              </div>
              <div className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-center">
                <p className="text-2xl font-semibold font-handwritten-font">
                  {guestListCount}
                </p>
                <p className="text-stone-700 text-sm">Expected Guests</p>
              </div>
              <div className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-center">
                <p className="text-2xl font-semibold font-handwritten-font">
                  {plusOneCount}
                </p>
                <p className="text-stone-700 text-sm">Plus Ones</p>
              </div>
            </div>

            <GuestListDisplay
              guestListWithGroups={guestListWithGroups}
              onUpdateGuest={(payload) => updateGuestMutation.mutate(payload)}
              isUpdating={updateGuestMutation.isPending}
              editingId={editingId}
              onEditingIdChange={setEditingId}
            />
          </SignedIn>
          <SignedOut>
            <div className="my-6">
              <p className="text-stone-700 font-handwritten-font text-2xl text-center">
                Please sign in to view the guest list.
              </p>
            </div>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
