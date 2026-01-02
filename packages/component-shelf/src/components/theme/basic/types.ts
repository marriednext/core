import type { ReactNode } from "react";
import type { ApplicationLinkComponent } from "../../../types/link-types";
import type { ApplicationImageComponent } from "../../../types/image-types";

export type { ApplicationImageComponent, ApplicationLinkComponent };

export type WebsiteSection = {
  id: string;
  enabled: boolean;
  order: number;
};

export type WebsiteLabels = Record<string, Record<string, string>>;

export interface WebsiteTokens {
  primary: string;
  primaryForeground: string;
  background: string;
  headingColor: string;
  bodyColor: string;
  headingFont: string;
  bodyFont: string;
}

export const defaultWebsiteTokens: WebsiteTokens = {
  primary: "#0a0a0a",
  primaryForeground: "#fafafa",
  background: "#fafafa",
  headingColor: "#0a0a0a",
  bodyColor: "#404040",
  headingFont: "Playfair Display",
  bodyFont: "Inter",
};

export const colorPresets = [
  {
    name: "Classic Black",
    primary: "#0a0a0a",
    primaryForeground: "#fafafa",
    background: "#fafafa",
    headingColor: "#0a0a0a",
    bodyColor: "#404040",
  },
  {
    name: "Midnight",
    primary: "#1e1b4b",
    primaryForeground: "#fafafa",
    background: "#f0f9ff",
    headingColor: "#1e1b4b",
    bodyColor: "#4c4770",
  },
  {
    name: "Forest",
    primary: "#14532d",
    primaryForeground: "#fafafa",
    background: "#f0fdf4",
    headingColor: "#14532d",
    bodyColor: "#3d6b4f",
  },
  {
    name: "Navy",
    primary: "#1e3a5f",
    primaryForeground: "#fafafa",
    background: "#f0f9ff",
    headingColor: "#1e3a5f",
    bodyColor: "#4a6a8a",
  },
  {
    name: "Burgundy",
    primary: "#7f1d1d",
    primaryForeground: "#fafafa",
    background: "#fef2f2",
    headingColor: "#7f1d1d",
    bodyColor: "#8b4a4a",
  },
  {
    name: "Sage",
    primary: "#4d7c5b",
    primaryForeground: "#fafafa",
    background: "#f8faf8",
    headingColor: "#3d5c4b",
    bodyColor: "#5a7a68",
  },
  {
    name: "Dusty Rose",
    primary: "#9d7a8c",
    primaryForeground: "#fafafa",
    background: "#fdf8fa",
    headingColor: "#6d4a5c",
    bodyColor: "#8a7080",
  },
  {
    name: "Terracotta",
    primary: "#c2703e",
    primaryForeground: "#fafafa",
    background: "#fdf8f5",
    headingColor: "#8b4513",
    bodyColor: "#a06a50",
  },
] as const;

export const fontOptions = [
  { value: "Playfair Display", label: "Playfair Display", style: "Elegant Serif" },
  { value: "Cormorant Garamond", label: "Cormorant Garamond", style: "Classic Serif" },
  { value: "Crimson Text", label: "Crimson Text", style: "Traditional Serif" },
  { value: "Libre Baskerville", label: "Libre Baskerville", style: "Book Serif" },
  { value: "Lora", label: "Lora", style: "Modern Serif" },
  { value: "Inter", label: "Inter", style: "Clean Sans" },
  { value: "DM Sans", label: "DM Sans", style: "Geometric Sans" },
  { value: "Work Sans", label: "Work Sans", style: "Friendly Sans" },
  { value: "Outfit", label: "Outfit", style: "Modern Sans" },
  { value: "Space Grotesk", label: "Space Grotesk", style: "Technical Sans" },
] as const;

export interface BasicThemeProps {
  fieldNameA: string | null;
  fieldNameB: string | null;
  fieldLocationName?: string | null;
  fieldLocationAddress?: string | null;
  fieldEventDate?: string | null;
  fieldEventTime?: string | null;
  fieldMapsShareUrl?: string | null;
  heroImageUrl?: string;
  rsvpFormComponent?: ReactNode;
  galleryImages?: string[];
  websiteSections?: WebsiteSection[] | null;
  websiteLabels?: WebsiteLabels | null;
  websiteTokens?: WebsiteTokens | null;
  editable?: boolean;
  onCustomizationChange?: (section: string, key: string, value: string) => void;
  onSectionClick?: (sectionId: string) => void;
  LinkComponent?: ApplicationLinkComponent;
  ImageComponent?: ApplicationImageComponent;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface NavigationCustomization {
  logoLabel?: string;
  navLinks?: NavLink[];
}

export interface NavigationProps {
  customization?: NavigationCustomization;
  editable?: boolean;
  onCustomizationChange?: (
    key: keyof NavigationCustomization,
    value: string
  ) => void;
}

export interface HeroSectionCustomization {
  pretitleLabel?: string;
  ampersandLabel?: string;
  rsvpButtonLabel?: string;
}

export interface HeroSectionData {
  nameA: string | null;
  nameB: string | null;
  eventDate?: string | null;
  locationName?: string | null;
  imageUrl?: string;
}

export interface HeroSectionProps {
  data: HeroSectionData;
  customization?: HeroSectionCustomization;
  editable?: boolean;
  onCustomizationChange?: (
    key: keyof HeroSectionCustomization,
    value: string
  ) => void;
  LinkComponent?: ApplicationLinkComponent;
}

export interface CountdownSectionCustomization {
  pretextLabel?: string;
  daysLabel?: string;
  hoursLabel?: string;
  minutesLabel?: string;
  secondsLabel?: string;
}

export interface CountdownSectionData {
  eventDate?: string | null;
}

export interface CountdownSectionProps {
  data: CountdownSectionData;
  customization?: CountdownSectionCustomization;
  editable?: boolean;
  onCustomizationChange?: (
    key: keyof CountdownSectionCustomization,
    value: string
  ) => void;
}

export interface Milestone {
  date: string;
  title: string;
  description: string;
}

export interface OurStorySectionCustomization {
  sectionNumberLabel?: string;
  titleLabel?: string;
}

export interface OurStorySectionData {
  milestones?: Milestone[];
}

export interface OurStorySectionProps {
  data: OurStorySectionData;
  customization?: OurStorySectionCustomization;
  editable?: boolean;
  onCustomizationChange?: (
    key: keyof OurStorySectionCustomization,
    value: string
  ) => void;
}

export interface EventDetailsSectionCustomization {
  sectionNumberLabel?: string;
  titleLabel?: string;
  ceremonyLabel?: string;
  ceremonyDateLabel?: string;
  ceremonyDayLabel?: string;
  ceremonyTimeLabel?: string;
  ceremonyDoorsOpenLabel?: string;
  receptionLabel?: string;
  receptionTimeLabel?: string;
  receptionDescriptionLabel?: string;
  receptionLocationLabel?: string;
  receptionLocationNoteLabel?: string;
  viewMapButtonLabel?: string;
  dressCodeLabel?: string;
  dressCodeValueLabel?: string;
  dressCodeNoteLabel?: string;
}

export interface EventDetailsSectionData {
  locationName?: string | null;
  locationAddressLine1?: string | null;
  locationAddressLine2?: string | null;
  locationCity?: string | null;
  locationState?: string | null;
  locationZipCode?: string | null;
  eventDate?: string | null;
  eventTime?: string | null;
  mapsShareUrl?: string | null;
}

export interface EventDetailsSectionProps {
  data: EventDetailsSectionData;
  customization?: EventDetailsSectionCustomization;
  editable?: boolean;
  onCustomizationChange?: (
    key: keyof EventDetailsSectionCustomization,
    value: string
  ) => void;
  LinkComponent?: ApplicationLinkComponent;
}

export interface GalleryImage {
  src: unknown;
  alt?: string;
}

export interface GallerySectionCustomization {
  sectionNumberLabel?: string;
  titleLabel?: string;
}

export interface GallerySectionData {
  images?: GalleryImage[];
}

export interface GallerySectionProps {
  data: GallerySectionData;
  customization?: GallerySectionCustomization;
  editable?: boolean;
  onCustomizationChange?: (
    key: keyof GallerySectionCustomization,
    value: string
  ) => void;
  ImageComponent?: ApplicationImageComponent;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionCustomization {
  sectionNumberLabel?: string;
  titleLabel?: string;
}

export interface FaqSectionData {
  faqs?: FaqItem[];
}

export interface FaqSectionProps {
  data: FaqSectionData;
  customization?: FaqSectionCustomization;
  editable?: boolean;
  onCustomizationChange?: (
    key: keyof FaqSectionCustomization,
    value: string
  ) => void;
}

export interface RsvpSectionCustomization {
  sectionNumberLabel?: string;
  titleLabel?: string;
  descriptionLabel?: string;
  formPretitleLabel?: string;
  fullNameLabel?: string;
  fullNamePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  attendanceLabel?: string;
  acceptLabel?: string;
  declineLabel?: string;
  guestCountLabel?: string;
  dietaryLabel?: string;
  dietaryPlaceholder?: string;
  songRequestLabel?: string;
  songRequestPlaceholder?: string;
  submitButtonLabel?: string;
}

export interface RsvpSectionData {
  rsvpFormComponent?: ReactNode;
}

export interface RsvpSectionProps {
  data?: RsvpSectionData;
  customization?: RsvpSectionCustomization;
  editable?: boolean;
  onCustomizationChange?: (
    key: keyof RsvpSectionCustomization,
    value: string
  ) => void;
}

export interface RegistryEntry {
  name: string;
  description: string;
  url?: string;
}

export interface RegistrySectionCustomization {
  sectionNumberLabel?: string;
  titleLabel?: string;
  descriptionLabel?: string;
}

export interface RegistrySectionData {
  registries?: RegistryEntry[];
}

export interface RegistrySectionProps {
  data?: RegistrySectionData;
  customization?: RegistrySectionCustomization;
  editable?: boolean;
  onCustomizationChange?: (
    key: keyof RegistrySectionCustomization,
    value: string
  ) => void;
  LinkComponent?: ApplicationLinkComponent;
}

export interface FooterSectionCustomization {
  signOffLabel?: string;
  hashtag?: string;
  closingLabel?: string;
  madeWithLabel?: string;
  brandLabel?: string;
  logoUrl?: string;
}

export interface FooterSectionData {
  nameA?: string | null;
  nameB?: string | null;
  eventDate?: string | null;
}

export interface FooterSectionProps {
  data: FooterSectionData;
  customization?: FooterSectionCustomization;
  editable?: boolean;
  onCustomizationChange?: (
    key: keyof FooterSectionCustomization,
    value: string
  ) => void;
  LinkComponent?: ApplicationLinkComponent;
  ImageComponent?: ApplicationImageComponent;
}

export interface Photo {
  url: string;
  filename?: string;
  uploadedAt?: string;
  size?: number;
}

export interface PhotoFeedCustomization {
  dropZoneLabel?: string;
  dropZoneSubLabel?: string;
  uploadingLabel?: string;
  photoCountLabel?: string;
  noPhotosLabel?: string;
  noPhotosSubLabel?: string;
  errorLabel?: string;
}

export interface PhotoFeedData {
  photos?: Photo[];
}

export interface PhotoFeedProps {
  data: PhotoFeedData;
  customization?: PhotoFeedCustomization;
  editable?: boolean;
  onUpload?: (files: FileList) => Promise<void>;
  onCustomizationChange?: (
    key: keyof PhotoFeedCustomization,
    value: string
  ) => void;
  ImageComponent?: ApplicationImageComponent;
}

export interface PhotoUploadSectionCustomization {
  sectionNumberLabel?: string;
  titleLine1Label?: string;
  titleLine2Label?: string;
  descriptionLabel?: string;
  noAccountLabel?: string;
  buttonLabel?: string;
  qrCodeLabel?: string;
}

export interface PhotoUploadSectionData {
  photosPageUrl?: string;
}

export interface PhotoUploadSectionProps {
  data?: PhotoUploadSectionData;
  customization?: PhotoUploadSectionCustomization;
  editable?: boolean;
  onCustomizationChange?: (
    key: keyof PhotoUploadSectionCustomization,
    value: string
  ) => void;
  LinkComponent?: ApplicationLinkComponent;
}

export interface PagePhotosData {
  photos?: Photo[];
}

export interface PagePhotosCustomization {
  logoLabel?: string;
  backLabel?: string;
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
}

export interface PagePhotosProps {
  data: PagePhotosData;
  customization?: PagePhotosCustomization;
  backHref?: string;
  onUpload?: (files: FileList) => Promise<void>;
  LinkComponent?: ApplicationLinkComponent;
  ImageComponent?: ApplicationImageComponent;
}

export interface PageSaveTheDateData {
  nameA: string | null;
  nameB: string | null;
  eventDate?: string | null;
  eventTime?: string | null;
  locationName?: string | null;
  locationCity?: string | null;
  locationState?: string | null;
  heroImageUrl?: string;
}

export interface PageSaveTheDateCustomization {
  pretitleLabel?: string;
  dateSectionLabel?: string;
  timeLabel?: string;
  countdownLabel?: string;
  daysLabel?: string;
  hoursLabel?: string;
  minutesLabel?: string;
  secondsLabel?: string;
  venueSectionLabel?: string;
  addToCalendarLabel?: string;
  shareLabel?: string;
  linkCopiedLabel?: string;
  noteLabel?: string;
  hashtag?: string;
}

export interface PageSaveTheDateProps {
  data: PageSaveTheDateData;
  customization?: PageSaveTheDateCustomization;
  ImageComponent?: ApplicationImageComponent;
  LinkComponent?: ApplicationLinkComponent;
}

export interface CollectInfoFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PageCollectInfoData {
  nameA: string | null;
  nameB: string | null;
}

export interface PageCollectInfoCustomization {
  pretitleLabel?: string;
  subtitleLabel?: string;
  personalInfoLabel?: string;
  firstNameLabel?: string;
  lastNameLabel?: string;
  contactInfoLabel?: string;
  emailLabel?: string;
  phoneLabel?: string;
  addressLabel?: string;
  addressLine1Label?: string;
  addressLine1Placeholder?: string;
  addressLine2Label?: string;
  addressLine2Placeholder?: string;
  cityLabel?: string;
  stateLabel?: string;
  zipLabel?: string;
  countryLabel?: string;
  submitLabel?: string;
  privacyNoteLabel?: string;
  successTitleLabel?: string;
  successMessageLabel?: string;
  viewDetailsLabel?: string;
  footerEmailLabel?: string;
  footerEmail?: string;
}

export interface PageCollectInfoProps {
  data: PageCollectInfoData;
  customization?: PageCollectInfoCustomization;
  homeHref?: string;
  onSubmit?: (formData: CollectInfoFormData) => Promise<void>;
  LinkComponent?: ApplicationLinkComponent;
}
