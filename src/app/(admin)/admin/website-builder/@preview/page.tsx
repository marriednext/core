"use client";

import { Suspense } from "react";
import Header from "@/components/tenant/Header";
import { Cormorant_Infant } from "next/font/google";
import HomePage from "@/app/(tenant)/tenant/[id]/page";
import OurStoryPage from "@/app/(tenant)/tenant/[id]/our-story/page";
import PhotosPage from "@/app/(tenant)/tenant/[id]/photos/page";
import WeddingPartyPage from "@/app/(tenant)/tenant/[id]/wedding-party/page";
import QAndAPage from "@/app/(tenant)/tenant/[id]/q-and-a/page";
import TravelPage from "@/app/(tenant)/tenant/[id]/travel/page";
import RegistryPage from "@/app/(tenant)/tenant/[id]/registry/page";
import { useWebsiteBuilderStore } from "@/lib/stores/websiteBuilderStore";
import clsx from "clsx";

const cormorantInfant = Cormorant_Infant({
  variable: "--font-cormorant-infant",
  subsets: ["latin"],
});

const PageComponents = {
  home: HomePage,
  "our-story": OurStoryPage,
  photos: PhotosPage,
  "wedding-party": WeddingPartyPage,
  "q-and-a": QAndAPage,
  travel: TravelPage,
  registry: RegistryPage,
};

export default function PreviewPage() {
  const selectedPage = useWebsiteBuilderStore((state) => state.selectedPage);
  const scale = useWebsiteBuilderStore((state) => state.scale);
  const setScale = useWebsiteBuilderStore((state) => state.setScale);

  const PageComponent = PageComponents[selectedPage] || PageComponents.home;

  return (
    <div className="h-full bg-gray-100">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-gray-700">Preview</h3>
          <div className="h-4 w-px bg-gray-300" />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale(0.75)}
            className={clsx(
              "px-2 py-1 text-xs rounded",
              scale === 0.75
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700"
            )}
          >
            75%
          </button>
          <button
            onClick={() => setScale(1)}
            className={clsx(
              "px-2 py-1 text-xs rounded",
              scale === 1 ? "bg-black text-white" : "bg-gray-200 text-gray-700"
            )}
          >
            100%
          </button>
        </div>
      </div>

      <div className="flex justify-center items-start p-8 min-h-[calc(100vh-57px)]">
        <div
          className="shadow-2xl w-full"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            backgroundColor: "#e9e9ea",
            color: "#5d351c",
          }}
        >
          <div className={`${cormorantInfant.variable} antialiased`}>
            <style jsx global>{`
              :root {
                --background: #e9e9ea;
                --foreground: #5d351c;
              }

              @font-face {
                font-family: "Abramo Script";
                src: url("/fonts/AbramoScript.ttf") format("truetype");
                font-weight: normal;
                font-style: normal;
              }

              @font-face {
                font-family: "Abramo Serif";
                src: url("/fonts/AbramoSerif.ttf") format("truetype");
                font-weight: normal;
                font-style: normal;
              }

              .abramo-script {
                font-family: "Abramo Script", cursive;
              }

              .abramo-serif {
                font-family: "Abramo Serif", serif;
                font-weight: 700;
              }

              .shadow-soft {
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
              }

              .btn-primary {
                display: inline-block;
                border: 2px solid black;
                padding: 12px 32px;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                transition: all 0.3s ease;
                font-weight: 800;
              }

              .btn-primary:hover {
                background-color: black;
                color: white;
              }

              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              .animate-fadeIn {
                animation: fadeIn 0.6s ease-out forwards;
                opacity: 0;
              }
            `}</style>

            <Header />

            <div className="px-4 md:px-0 mx-auto">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-gray-500">Loading page...</div>
                  </div>
                }
              >
                <PageComponent />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
