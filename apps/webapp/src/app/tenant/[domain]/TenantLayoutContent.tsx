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
        <div className="px-4 md:px-0 mx-auto">{children}</div>
      </Swipeable>
    </WeddingDataProvider>
  );
}
