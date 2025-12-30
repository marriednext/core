"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils/cn";
import { useRsvpStore } from "@/stores/rsvpStore";

export type RsvpFormTokens = {
  primary: string;
  primaryForeground: string;
  background: string;
  headingColor: string;
  bodyColor: string;
  headingFont: string;
  bodyFont: string;
};

export type RsvpFormStyles = {
  container?: string;
  title?: string;
  subtitle?: string;
  input?: string;
  button?: string;
  buttonBack?: string;
  guestItem?: string;
  guestLabel?: string;
  checkbox?: string;
  successMessage?: string;
  errorMessage?: string;
};

interface RsvpFormProps {
  className?: string;
  tokens?: Partial<RsvpFormTokens>;
  styles?: RsvpFormStyles;
  onLookup: (name: string) => void;
  onSubmit: () => void;
}

const defaultTokens: RsvpFormTokens = {
  primary: "#000000",
  primaryForeground: "#ffffff",
  background: "#ffffff",
  headingColor: "#000000",
  bodyColor: "#374151",
  headingFont: "inherit",
  bodyFont: "inherit",
};

const defaultStyles: RsvpFormStyles = {
  container: "max-w-3xl w-full text-center",
  title: "text-5xl md:text-6xl mt-6 md:mt-10",
  subtitle: "mt-4 md:mt-6 text-lg md:text-xl",
  input:
    "w-full text-2xl md:text-4xl py-5 md:py-7 px-6 md:px-8 border shadow-sm focus:outline-none focus:ring-4 leading-7 md:leading-10",
  button:
    "inline-block border-2 px-8 py-3 uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
  buttonBack: "underline text-base md:text-lg transition-colors",
  guestItem:
    "flex items-center justify-between p-4 rounded-lg border-2 transition-colors",
  guestLabel: "text-lg md:text-xl font-medium cursor-pointer flex-1 text-left",
  checkbox: "h-6 w-6",
  successMessage: "mt-6 md:mt-10 text-lg md:text-xl",
  errorMessage: "mt-6 md:mt-10 text-lg md:text-xl",
};

export default function RsvpForm({
  className,
  tokens: tokensProp,
  styles: stylesProp,
  onLookup,
  onSubmit,
}: RsvpFormProps) {
  const tokens = { ...defaultTokens, ...tokensProp };
  const styles = { ...defaultStyles, ...stylesProp };
  const mutedColor = tokens.bodyColor + "cc";

  const {
    step,
    invitation,
    selectedGuests,
    email,
    nameFormat,
    isLoading,
    errorMessage,
    setStep,
    toggleGuest,
    setEmail,
    reset,
  } = useRsvpStore();

  const {
    register: registerName,
    handleSubmit: handleSubmitName,
    formState: { errors: nameErrors },
  } = useForm<{ name: string }>();

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
    setValue: setEmailValue,
  } = useForm<{ email: string }>({
    defaultValues: { email },
  });

  useEffect(() => {
    if (email) {
      setEmailValue("email", email);
    }
  }, [email, setEmailValue]);

  const handleNameSubmit = (data: { name: string }) => {
    onLookup(data.name);
  };

  const handleGuestSelectionNext = () => {
    setStep("email-collection");
  };

  const handleEmailSubmit = (data: { email: string }) => {
    setEmail(data.email);
    onSubmit();
  };

  const getPlaceholder = () => {
    if (nameFormat === "FIRST_NAME_ONLY") {
      return "First Name";
    }
    return "Full Name";
  };

  const attendingCount = selectedGuests.filter((g) => g.isAttending).length;
  const totalGuests = selectedGuests.length;

  return (
    <div
      className={cn(
        "w-full flex flex-col items-center justify-center px-4 pb-12",
        className
      )}
      style={{ fontFamily: tokens.bodyFont }}
    >
      <div className={styles.container}>
        <h2
          className={styles.title}
          style={{ fontFamily: tokens.headingFont, color: tokens.headingColor }}
        >
          RSVP
        </h2>

        {step === "name-input" && (
          <>
            <p className={styles.subtitle} style={{ color: tokens.bodyColor }}>
              Please enter{" "}
              {nameFormat === "FIRST_NAME_ONLY"
                ? "your first name"
                : "your full name"}{" "}
              as it appears on your invitation.
            </p>

            <form
              noValidate
              onSubmit={handleSubmitName(handleNameSubmit)}
              className="mt-10 md:mt-12"
            >
              <label htmlFor="name" className="sr-only">
                {getPlaceholder()}
              </label>
              <input
                id="name"
                type="text"
                inputMode="text"
                autoComplete="name"
                placeholder={getPlaceholder()}
                aria-invalid={nameErrors.name ? "true" : "false"}
                className={styles.input}
                style={{
                  fontFamily: tokens.bodyFont,
                  color: tokens.bodyColor,
                  borderColor: tokens.headingColor + "40",
                  backgroundColor: tokens.background,
                }}
                disabled={isLoading}
                {...registerName("name", {
                  required: `Your ${
                    nameFormat === "FIRST_NAME_ONLY"
                      ? "first name"
                      : "full name"
                  } is required`,
                })}
              />
              {nameErrors.name && (
                <div
                  role="alert"
                  className="text-left mt-2 text-sm md:text-base"
                  style={{ color: "#dc2626" }}
                >
                  {nameErrors.name.message}
                </div>
              )}

              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={styles.button}
                  style={{
                    fontFamily: tokens.bodyFont,
                    backgroundColor: tokens.primary,
                    color: tokens.primaryForeground,
                    borderColor: tokens.primary,
                  }}
                >
                  <span className="text-lg md:text-xl">
                    {isLoading ? "Checking..." : "Continue"}
                  </span>
                </button>
              </div>
            </form>
          </>
        )}

        {step === "guest-selection" && invitation && (
          <>
            <p className={styles.subtitle} style={{ color: tokens.bodyColor }}>
              Great! We found your invitation.
            </p>
            <p
              className="mt-2 text-base md:text-lg"
              style={{ color: mutedColor }}
            >
              Please select who will be attending:
            </p>

            <div className="mt-8 md:mt-10 space-y-3 w-md mx-auto">
              {selectedGuests.map((guest, index) => (
                <div
                  key={index}
                  className={styles.guestItem}
                  style={{
                    backgroundColor: tokens.background,
                    borderColor: tokens.headingColor + "30",
                  }}
                >
                  <Label
                    htmlFor={`guest-${index}`}
                    className={styles.guestLabel}
                    style={{ color: tokens.bodyColor }}
                  >
                    {guest.name}
                  </Label>
                  <Checkbox
                    id={`guest-${index}`}
                    checked={guest.isAttending}
                    onCheckedChange={() => toggleGuest(guest.name)}
                    className={styles.checkbox}
                    style={
                      {
                        "--primary": tokens.primary,
                        borderColor: tokens.headingColor + "60",
                      } as React.CSSProperties
                    }
                  />
                </div>
              ))}
            </div>

            <div
              className="mt-6 text-sm md:text-base"
              style={{ color: mutedColor }}
            >
              {attendingCount === 0 && (
                <p>
                  No guests selected. Please select at least one guest or mark
                  as not attending.
                </p>
              )}
              {attendingCount > 0 && (
                <p>
                  {attendingCount} of {totalGuests}{" "}
                  {totalGuests === 1 ? "guest" : "guests"} attending
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setStep("name-input")}
                disabled={isLoading}
                className={styles.buttonBack}
                style={{ color: mutedColor }}
              >
                ← Back
              </button>
              <button
                onClick={handleGuestSelectionNext}
                disabled={isLoading}
                className={styles.button}
                style={{
                  fontFamily: tokens.bodyFont,
                  backgroundColor: tokens.primary,
                  color: tokens.primaryForeground,
                  borderColor: tokens.primary,
                }}
              >
                <span className="text-lg md:text-xl">Continue</span>
              </button>
            </div>
          </>
        )}

        {step === "email-collection" && (
          <>
            <p className={styles.subtitle} style={{ color: tokens.bodyColor }}>
              Almost done! We just need your email.
            </p>
            <p
              className="mt-2 text-sm md:text-base"
              style={{ color: mutedColor }}
            >
              This will only be used to send you updates about the wedding.
            </p>

            <form
              noValidate
              onSubmit={handleSubmitEmail(handleEmailSubmit)}
              className="mt-10 md:mt-12"
            >
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Email Address"
                aria-invalid={emailErrors.email ? "true" : "false"}
                className={styles.input}
                style={{
                  fontFamily: tokens.bodyFont,
                  color: tokens.bodyColor,
                  borderColor: tokens.headingColor + "40",
                  backgroundColor: tokens.background,
                }}
                disabled={isLoading}
                {...registerEmail("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {emailErrors.email && (
                <div
                  role="alert"
                  className="text-left mt-2 text-sm md:text-base"
                  style={{ color: "#dc2626" }}
                >
                  {emailErrors.email.message}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setStep("guest-selection")}
                  disabled={isLoading}
                  className={styles.buttonBack}
                  style={{ color: mutedColor }}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={styles.button}
                  style={{
                    fontFamily: tokens.bodyFont,
                    backgroundColor: tokens.primary,
                    color: tokens.primaryForeground,
                    borderColor: tokens.primary,
                  }}
                >
                  <span className="text-lg md:text-xl">
                    {isLoading ? "Submitting..." : "Submit RSVP"}
                  </span>
                </button>
              </div>
            </form>
          </>
        )}

        {step === "success" && (
          <>
            <div
              aria-live="polite"
              className={styles.successMessage}
              style={{ color: "#166534" }}
            >
              Thank you! Your RSVP has been submitted successfully.
              {attendingCount > 0 && (
                <span className="block mt-2">
                  We can't wait to see you there! ✨
                </span>
              )}
              {attendingCount === 0 && (
                <span className="block mt-2">We'll miss you! 💝</span>
              )}
            </div>
            <button
              onClick={reset}
              className={cn(styles.button, "mt-6")}
              style={{
                fontFamily: tokens.bodyFont,
                backgroundColor: tokens.primary,
                color: tokens.primaryForeground,
                borderColor: tokens.primary,
              }}
            >
              <span className="text-lg md:text-xl">RSVP Another Guest</span>
            </button>
          </>
        )}

        {step === "error" && (
          <>
            <div
              role="alert"
              className={styles.errorMessage}
              style={{ color: "#991b1b" }}
            >
              {errorMessage || "Something went wrong. Please try again."}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <button
                onClick={reset}
                className={styles.button}
                style={{
                  fontFamily: tokens.bodyFont,
                  backgroundColor: tokens.primary,
                  color: tokens.primaryForeground,
                  borderColor: tokens.primary,
                }}
              >
                <span className="text-lg md:text-xl">Try Again</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
