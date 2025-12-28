"use client";

import { useMemo, useEffect, useCallback } from "react";
import { useWebsiteBuilderStore } from "../../../stores/websiteBuilderStore";
import { LisasTheme, mergeSectionsWithDefaults, type WebsiteSection } from "component-shelf";
import { postToParent, isBuilderMessage } from "../../../lib/component-shelf/builderMessages";
import { mapWeddingDataToLisasThemeProps } from "@/components/theme/themes/lisastheme/mapper";
import type { WeddingData } from "@/lib/wedding/types";

export type WebsiteBuilderPhoto = {
  id: string;
  themeId: string;
  photoType: "hero" | "story" | "gallery" | "memory";
  blobUrl: string;
  displayOrder: number;
};

export type WebsiteLabels = Record<string, Record<string, string>>;

export type WebsiteBuilderData = {
  fieldNameA: string | null;
  fieldNameB: string | null;
  fieldLocationName: string | null;
  fieldLocationAddress: string | null;
  fieldEventDate: string | null;
  fieldEventTime: string | null;
  fieldMapsShareUrl: string | null;
  photos?: WebsiteBuilderPhoto[];
  websiteSections?: WebsiteSection[] | null;
  websiteLabels?: WebsiteLabels | null;
  subdomain?: string | null;
  customDomain?: string | null;
  subscriptionPlan?: string;
};

export type WebsiteBuilderPreviewProps = {
  data?: WebsiteBuilderData;
  isLoading?: boolean;
};

export function WebsiteBuilderPreview({
  data,
  isLoading = false,
}: WebsiteBuilderPreviewProps) {
  const { pendingLabels, initializeLabels, updateLabel } =
    useWebsiteBuilderStore();

  const sections = useMemo<WebsiteSection[]>(
    () => mergeSectionsWithDefaults(data?.websiteSections),
    [data?.websiteSections]
  );

  const themeProps = useMemo(() => {
    if (!data) return null;
    const weddingData: WeddingData = {
      id: "",
      subdomain: data.subdomain ?? null,
      customDomain: data.customDomain ?? null,
      createdAt: "",
      updatedAt: "",
      fieldDisplayName: null,
      fieldLocationName: data.fieldLocationName,
      fieldLocationAddress: data.fieldLocationAddress,
      fieldEventDate: data.fieldEventDate,
      fieldEventTime: data.fieldEventTime,
      fieldMapsEmbedUrl: null,
      fieldMapsShareUrl: data.fieldMapsShareUrl,
      fieldQuestionsAndAnswers: null,
      fieldOurStory: null,
      fieldNameA: data.fieldNameA,
      fieldNameB: data.fieldNameB,
      controlRsvpNameFormat: "FIRST_NAME_ONLY",
      photos: data.photos,
      websiteSections: data.websiteSections,
      websiteLabels: data.websiteLabels,
    };
    return mapWeddingDataToLisasThemeProps(weddingData);
  }, [data]);

  useEffect(() => {
    if (data?.websiteLabels) {
      initializeLabels(data.websiteLabels);
    }
  }, [data?.websiteLabels, initializeLabels]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!isBuilderMessage(event)) return;

      const message = event.data;
      if (message.type === "UPDATE_LABEL") {
        updateLabel(
          message.payload.sectionId,
          message.payload.labelKey,
          message.payload.value
        );
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [updateLabel]);

  const handleCustomizationChange = (
    section: string,
    key: string,
    value: string
  ) => {
    updateLabel(section, key, value);
    postToParent({
      type: "LABEL_CLICKED",
      payload: { sectionId: section, labelKey: key, currentValue: value },
    });
  };

  const handleSectionClick = useCallback((sectionId: string) => {
    postToParent({
      type: "SECTION_CLICKED",
      payload: { sectionId, sectionName: sectionId },
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <p className="text-muted-foreground">Loading preview...</p>
      </div>
    );
  }

  if (!data || !themeProps) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <p className="text-muted-foreground">No website data available</p>
      </div>
    );
  }

  return (
    <LisasTheme
      {...themeProps}
      websiteSections={sections}
      websiteLabels={pendingLabels}
      editable={true}
      contained={true}
      onCustomizationChange={handleCustomizationChange}
      onSectionClick={handleSectionClick}
    />
  );
}
