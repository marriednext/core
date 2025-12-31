"use client";

import type React from "react";
import { useState } from "react";
import { Mail, MapPin, User, Check, ArrowRight } from "lucide-react";
import type { ApplicationLinkComponent } from "./types";

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

const defaultCustomization: PageCollectInfoCustomization = {
  pretitleLabel: "You're Invited",
  subtitleLabel: "Please share your details so we can send your invitation",
  personalInfoLabel: "Personal Information",
  firstNameLabel: "First Name *",
  lastNameLabel: "Last Name *",
  contactInfoLabel: "Contact Information",
  emailLabel: "Email Address *",
  phoneLabel: "Phone Number",
  addressLabel: "Mailing Address",
  addressLine1Label: "Address Line 1 *",
  addressLine1Placeholder: "Street address",
  addressLine2Label: "Address Line 2",
  addressLine2Placeholder: "Apartment, suite, unit, etc.",
  cityLabel: "City *",
  stateLabel: "State *",
  zipLabel: "ZIP *",
  countryLabel: "Country *",
  submitLabel: "Submit Information",
  privacyNoteLabel: "Your information is kept private and only used for wedding correspondence.",
  successTitleLabel: "Thank You",
  successMessageLabel: "Your information has been saved. We can't wait to celebrate with you!",
  viewDetailsLabel: "View Wedding Details",
  footerEmailLabel: "Questions? Reach out to us at",
  footerEmail: "wedding@example.com",
};

export function PageCollectInfo({
  data,
  customization = defaultCustomization,
  homeHref = "/",
  onSubmit,
  LinkComponent = "a",
}: PageCollectInfoProps) {
  const labels = { ...defaultCustomization, ...customization };
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<CollectInfoFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const coupleNames = [data.nameA, data.nameB].filter(Boolean).join(" & ") || "Partner & Partner";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit(formData);
    }
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 border-2 border-foreground flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10" strokeWidth={1} />
          </div>
          <h1 className="font-serif text-4xl mb-4">{labels.successTitleLabel}</h1>
          <p className="font-sans text-muted-foreground leading-relaxed mb-8">
            {labels.successMessageLabel}
          </p>
          <LinkComponent
            href={homeHref}
            className="inline-flex items-center gap-2 border-2 border-foreground px-6 py-3 font-sans text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
          >
            {labels.viewDetailsLabel}
            <ArrowRight className="w-4 h-4" />
          </LinkComponent>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b-2 border-foreground">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            {labels.pretitleLabel}
          </p>
          <h1 className="font-serif text-5xl md:text-7xl mb-4">{coupleNames.toUpperCase()}</h1>
          <p className="font-sans text-muted-foreground">{labels.subtitleLabel}</p>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-6 py-16">
        <form onSubmit={handleSubmit} className="space-y-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5" strokeWidth={1} />
              <h2 className="font-sans text-xs uppercase tracking-[0.2em]">
                {labels.personalInfoLabel}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  {labels.firstNameLabel}
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border-2 border-foreground bg-transparent px-4 py-3 font-sans focus:outline-none focus:bg-foreground/5"
                />
              </div>
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  {labels.lastNameLabel}
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border-2 border-foreground bg-transparent px-4 py-3 font-sans focus:outline-none focus:bg-foreground/5"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-5 h-5" strokeWidth={1} />
              <h2 className="font-sans text-xs uppercase tracking-[0.2em]">
                {labels.contactInfoLabel}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  {labels.emailLabel}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-2 border-foreground bg-transparent px-4 py-3 font-sans focus:outline-none focus:bg-foreground/5"
                />
              </div>
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  {labels.phoneLabel}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border-2 border-foreground bg-transparent px-4 py-3 font-sans focus:outline-none focus:bg-foreground/5"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-5 h-5" strokeWidth={1} />
              <h2 className="font-sans text-xs uppercase tracking-[0.2em]">
                {labels.addressLabel}
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  {labels.addressLine1Label}
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  required
                  value={formData.addressLine1}
                  onChange={handleChange}
                  placeholder={labels.addressLine1Placeholder}
                  className="w-full border-2 border-foreground bg-transparent px-4 py-3 font-sans focus:outline-none focus:bg-foreground/5 placeholder:text-muted-foreground/50"
                />
              </div>
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  {labels.addressLine2Label}
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  placeholder={labels.addressLine2Placeholder}
                  className="w-full border-2 border-foreground bg-transparent px-4 py-3 font-sans focus:outline-none focus:bg-foreground/5 placeholder:text-muted-foreground/50"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <label className="block font-sans text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    {labels.cityLabel}
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border-2 border-foreground bg-transparent px-4 py-3 font-sans focus:outline-none focus:bg-foreground/5"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    {labels.stateLabel}
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full border-2 border-foreground bg-transparent px-4 py-3 font-sans focus:outline-none focus:bg-foreground/5"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    {labels.zipLabel}
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full border-2 border-foreground bg-transparent px-4 py-3 font-sans focus:outline-none focus:bg-foreground/5"
                  />
                </div>
              </div>
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  {labels.countryLabel}
                </label>
                <input
                  type="text"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border-2 border-foreground bg-transparent px-4 py-3 font-sans focus:outline-none focus:bg-foreground/5"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-foreground text-background py-4 font-sans text-sm uppercase tracking-widest hover:bg-foreground/90 transition-colors"
            >
              {labels.submitLabel}
            </button>
            <p className="text-center text-xs text-muted-foreground mt-4">
              {labels.privacyNoteLabel}
            </p>
          </div>
        </form>
      </section>

      <footer className="border-t-2 border-foreground py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-sans text-xs text-muted-foreground">
            {labels.footerEmailLabel}{" "}
            <a href={`mailto:${labels.footerEmail}`} className="underline">
              {labels.footerEmail}
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
