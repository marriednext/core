"use client";

import Swipeable from "@/components/tenant/Swipeable";
import { WeddingDataProvider } from "@/contexts/WeddingDataContext";
import type { WeddingData } from "@/lib/tenant/weddingData.types";

export function TenantLayoutContent({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: WeddingData;
}) {
  return (
    <WeddingDataProvider weddingData={initialData}>
      <Swipeable>
        <div className="w-full">{children}</div>
      </Swipeable>
    </WeddingDataProvider>
  );
}
