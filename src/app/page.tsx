"use client";
import { Users, UserPlus, User } from "lucide-react";
import { useEffect } from "react";

type Entry = [string] | [string, string];

const guestList: Entry[] = [
  ["Ken", "Terri"],
  ["Jordan", "Harlie"],
  ["Letty"],
  ["Brandy"],
  ["Thomas"],
  ["Liam"],
  ["Alex"],
  ["Enzo"],
  ["Ezequiel", "Shayna"],
  ["Javier", "PLUSONE"],
  ["Johnny", "Alyssa"],
  ["Daniel", "Daisy"],
  ["Hunter"],
  ["Zach"],
  ["Tyler", "PLUSONE"],
  ["Jessica", "PLUSONE"],
  ["Barbara", "PLUSONE"],
  ["Jim", "PLUSONE"],
  ["Evelynn", "PLUSONE"],
  ["Elia", "Ofe"],
  ["Greg", "Frida"],
  ["John", "PLUSONE"],
  ["Kathleen", "PLUSONE"],
  ["Cheri", "PLUSONE"],
  ["Illiana", "PLUSONE"],
  ["Dulce", "PLUSONE"],
  ["Lisa", "PLUSONE"],
  ["Teri", "PLUSONE"],
  ["Sydney", "PLUSONE"],
  ["Taylor", "PLUSONE"],
  ["Josh", "PLUSONE"],
  ["Hannah", "Isaac"],
  ["David", "Vickie"],
  ["Ryan", "PLUSONE"],
  ["Lauren", "Cody"],
  ["Tim", "Denise"],
  ["Mike", "Judy"],
  ["Chuck", "Ricky"],
  ["Granny", "Poppy"],
];

function displayName(entry: Entry) {
  const [a, b] = entry;
  if (!b) return a;
  if (b === "PLUSONE") return `${a} + Guest`;
  return `${a} & ${b}`;
}

function entryIcon(entry: Entry) {
  const [, b] = entry;
  if (!b) return <User className="h-5 w-5" />;
  return b === "PLUSONE" ? (
    <UserPlus className="h-5 w-5" />
  ) : (
    <Users className="h-5 w-5" />
  );
}

export default function Home() {
  const invitationsCount = guestList.length;
  const expectedPeople = guestList.reduce((acc, e) => acc + (e[1] ? 2 : 1), 0);
  useEffect(() => {
    fetch("/api/web-analytics-overview")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl w-full mt-20 mb-4">
        <div className="p-6 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg text-gray-900 flex gap-2">
          <span className="font-handwritten-font hover:text-violet-800 cursor-default">
            Home
          </span>
          <span>{" > "}</span>
          <span className="text-violet-800 font-handwritten-font">
            Guest List
          </span>
        </div>
      </div>

      <div className="max-w-2xl w-full mb-4">
        <div className="p-6 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg text-gray-900">
          <div className="mb-6">
            <h1 className="text-5xl font-bold mb-1">Our Guest List</h1>
            <p className="text-stone-700 font-handwritten-font text-lg">
              Temecula Wine Country
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-center">
              <p className="text-2xl font-semibold font-handwritten-font">
                {invitationsCount}
              </p>
              <p className="text-stone-700 text-sm">Invitations</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-center">
              <p className="text-2xl font-semibold font-handwritten-font">
                {expectedPeople}
              </p>
              <p className="text-stone-700 text-sm">Expected Guests</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-center">
              <p className="text-2xl font-semibold font-handwritten-font">
                {guestList.filter(([, b]) => b === "PLUSONE").length}
              </p>
              <p className="text-stone-700 text-sm">Plus Ones</p>
            </div>
          </div>

          <ul className="divide-y divide-white/10">
            {guestList.map((entry, i) => {
              return (
                <li key={i} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-full bg-violet-100 border border-violet-300 flex items-center justify-center text-violet-700 shadow-sm">
                      {entryIcon(entry)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-lg font-medium font-handwritten-font">
                        {displayName(entry)}
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
        </div>
      </div>

      <div className="max-w-2xl w-full mb-[100vh]">
        <div className="p-6 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg text-gray-900 flex gap-2">
          <span className="font-handwritten-font hover:text-violet-800 cursor-default">
            Our special day, April 23rd, 2026
          </span>
        </div>
      </div>
    </div>
  );
}
