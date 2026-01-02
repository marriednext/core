import type { WeddingData } from "@/lib/wedding/types";

const PLACEHOLDER_PHOTOS = {
  hero: "https://4ctc36zdopsyz0ok.public.blob.vercel-storage.com/photos/placeholders/couple-engagement-photo-garden.jpg",
  story1:
    "https://4ctc36zdopsyz0ok.public.blob.vercel-storage.com/photos/placeholders/couple-laughing-candid-moment.jpg",
  story2:
    "https://4ctc36zdopsyz0ok.public.blob.vercel-storage.com/photos/placeholders/couple-holding-hands-walking.jpg",
  story3:
    "https://4ctc36zdopsyz0ok.public.blob.vercel-storage.com/photos/placeholders/engagement-ring-close-up.jpg",
  gallery1:
    "https://4ctc36zdopsyz0ok.public.blob.vercel-storage.com/photos/placeholders/couple-sunset-silhouette-romantic.jpg",
  gallery2:
    "https://4ctc36zdopsyz0ok.public.blob.vercel-storage.com/photos/placeholders/couple-walking-beach-holding-hands.jpg",
  gallery3:
    "https://4ctc36zdopsyz0ok.public.blob.vercel-storage.com/photos/placeholders/couple-intimate-portrait-close-up.jpg",
  gallery4:
    "https://4ctc36zdopsyz0ok.public.blob.vercel-storage.com/photos/placeholders/happy-engaged-couple-portrait.jpg",
  gallery5:
    "https://4ctc36zdopsyz0ok.public.blob.vercel-storage.com/photos/placeholders/couple-close-up-intimate-portrait.jpg",
  gallery6:
    "https://4ctc36zdopsyz0ok.public.blob.vercel-storage.com/photos/placeholders/couple-engagement-garden-photo.jpg",
};

export const VALID_THEMES = ["basic", "lisastheme", "tuscanbloom"] as const;

export type ValidTheme = (typeof VALID_THEMES)[number];

export function isValidTheme(theme: string): theme is ValidTheme {
  return VALID_THEMES.includes(theme as ValidTheme);
}

export function createDummyWeddingData(theme: ValidTheme): WeddingData {
  return {
    id: "dummy-wedding-id",
    subdomain: `preview-${theme}`,
    customDomain: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fieldDisplayName: "Sarah & Michael",
    fieldLocationName: "The Grand Estate",
    fieldLocationAddress: "1234 Garden Lane, Napa Valley, CA 94558",
    fieldEventDate: "2026-06-15",
    fieldEventTime: "4:00 PM",
    fieldMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3132.123456789!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1234567890",
    fieldMapsShareUrl: "https://maps.google.com/?q=The+Grand+Estate+Napa+Valley",
    fieldQuestionsAndAnswers: [
      {
        question: "What is the dress code?",
        answer: "Formal attire is requested. Please dress in elegant evening wear.",
      },
      {
        question: "Are children welcome?",
        answer:
          "We kindly request this be an adults-only celebration. We hope you understand and enjoy the evening!",
      },
      {
        question: "Is there parking available?",
        answer:
          "Yes, complimentary valet parking will be provided for all guests at the venue.",
      },
      {
        question: "Can I bring a plus one?",
        answer:
          "Due to limited space, we can only accommodate those named on the invitation. Please check your RSVP for details.",
      },
      {
        question: "What time should I arrive?",
        answer:
          "We recommend arriving 30 minutes before the ceremony begins to find your seats.",
      },
    ],
    fieldOurStory: [
      {
        id: "story-1",
        heading: "How We Met",
        photoUrl: PLACEHOLDER_PHOTOS.story1,
        text: "We met at a mutual friend's dinner party in the spring of 2020. What started as a conversation about our shared love of travel quickly turned into hours of talking, laughing, and realizing we had found something special.",
      },
      {
        id: "story-2",
        heading: "The First Date",
        photoUrl: PLACEHOLDER_PHOTOS.story2,
        text: "Our first official date was a walk through the botanical gardens followed by dinner at a cozy Italian restaurant. We talked until the restaurant closed and knew this was just the beginning of our story.",
      },
      {
        id: "story-3",
        heading: "The Proposal",
        photoUrl: PLACEHOLDER_PHOTOS.story3,
        text: "On a crisp autumn evening, during a sunset hike at our favorite overlook, Michael got down on one knee. Through happy tears, Sarah said yes, and we began planning the next chapter of our lives together.",
      },
    ],
    fieldNameA: "Sarah",
    fieldNameB: "Michael",
    controlRsvpNameFormat: "FULL_NAME",
    photos: [
      {
        id: "photo-hero",
        themeId: theme,
        photoType: "hero",
        blobUrl: PLACEHOLDER_PHOTOS.hero,
        displayOrder: 0,
      },
      {
        id: "photo-story-1",
        themeId: theme,
        photoType: "story",
        blobUrl: PLACEHOLDER_PHOTOS.story1,
        displayOrder: 0,
      },
      {
        id: "photo-story-2",
        themeId: theme,
        photoType: "story",
        blobUrl: PLACEHOLDER_PHOTOS.story2,
        displayOrder: 1,
      },
      {
        id: "photo-story-3",
        themeId: theme,
        photoType: "story",
        blobUrl: PLACEHOLDER_PHOTOS.story3,
        displayOrder: 2,
      },
      {
        id: "photo-gallery-1",
        themeId: theme,
        photoType: "gallery",
        blobUrl: PLACEHOLDER_PHOTOS.gallery1,
        displayOrder: 0,
      },
      {
        id: "photo-gallery-2",
        themeId: theme,
        photoType: "gallery",
        blobUrl: PLACEHOLDER_PHOTOS.gallery2,
        displayOrder: 1,
      },
      {
        id: "photo-gallery-3",
        themeId: theme,
        photoType: "gallery",
        blobUrl: PLACEHOLDER_PHOTOS.gallery3,
        displayOrder: 2,
      },
      {
        id: "photo-gallery-4",
        themeId: theme,
        photoType: "gallery",
        blobUrl: PLACEHOLDER_PHOTOS.gallery4,
        displayOrder: 3,
      },
      {
        id: "photo-gallery-5",
        themeId: theme,
        photoType: "gallery",
        blobUrl: PLACEHOLDER_PHOTOS.gallery5,
        displayOrder: 4,
      },
      {
        id: "photo-gallery-6",
        themeId: theme,
        photoType: "gallery",
        blobUrl: PLACEHOLDER_PHOTOS.gallery6,
        displayOrder: 5,
      },
    ],
    websiteSections: [
      { id: "hero", enabled: true, order: 0 },
      { id: "countdown", enabled: true, order: 1 },
      { id: "ourStory", enabled: true, order: 2 },
      { id: "eventDetails", enabled: true, order: 3 },
      { id: "gallery", enabled: true, order: 4 },
      { id: "rsvp", enabled: true, order: 5 },
      { id: "faq", enabled: true, order: 6 },
      { id: "registry", enabled: true, order: 7 },
    ],
    websiteLabels: null,
    websiteTokens: null,
    websiteTemplate: theme,
  };
}

