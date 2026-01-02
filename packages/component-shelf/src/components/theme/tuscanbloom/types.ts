import type { ApplicationImageComponent } from "../../../types/image-types";
import type { ApplicationLinkComponent } from "../../../types/link-types";

export type WebsiteSection = {
  id: string;
  enabled: boolean;
  order: number;
};

export interface TuscanBloomLocation {
  fieldLocationName: string;
  fieldPreferredLocationAddressLine1: string;
  fieldPreferredLocationAddressLine2: string;
  fieldPreferredLocationCity: string;
  fieldPreferredLocationState: string;
  fieldPreferredLocationZipCode: string;
  fieldPreferredLocationCountry: string;
}

export interface TuscanBloomCeremony {
  time: string;
  venue: string;
}

export interface TuscanBloomReception {
  time: string;
  venue: string;
}

export interface TuscanBloomProps {
  partner1: string;
  partner2: string;
  date: Date;
  location: TuscanBloomLocation;
  ceremony: TuscanBloomCeremony;
  reception: TuscanBloomReception;
  websiteSections?: WebsiteSection[] | null;
  Image?: ApplicationImageComponent;
  Link?: ApplicationLinkComponent;
}

