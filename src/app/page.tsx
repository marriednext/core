"use client";

import { useQuery } from "@tanstack/react-query";
import { SignedIn, SignedOut } from "@clerk/nextjs";

type GuestListData = {
  displayGuestListWithGroups: {
    guestA: string;
    guestB: string | null;
  }[];
  guestListCount: number;
  guestListWithGroupsCount: number;
  plusOneCount: number;
};

export default function Home() {
  const { data } = useQuery<GuestListData>({
    queryKey: ["guest-list"],
    queryFn: async () => {
      const res = await fetch("/api/guest-list");
      return res.json();
    },
  });

  const guestListWithGroups = data?.displayGuestListWithGroups ?? [];
  const guestListCount = data?.guestListCount ?? 0;
  const guestListWithGroupsCount = data?.guestListWithGroupsCount ?? 0;
  const plusOneCount = data?.plusOneCount ?? 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl w-full mb-4 mt-20">
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

            <ul className="divide-y divide-white/10">
              {guestListWithGroups.map((entry, i) => {
                return (
                  <li
                    key={i}
                    className="py-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="min-w-0">
                        <p className="truncate text-lg font-medium font-handwritten-font">
                          {entry.guestA}

                          {entry.guestB && <> {entry.guestB}</>}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-medium">
                        Pending
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
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

      <SignedIn>
        <div className="max-w-2xl w-full mb-[100vh]">
          <div className="p-6 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg text-gray-900 flex gap-2">
            <span className="font-handwritten-font hover:text-violet-800 cursor-default">
              Our special day, April 23rd, 2026
            </span>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}
