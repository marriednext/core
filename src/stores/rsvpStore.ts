import { create } from "zustand";
import {
  RsvpFormState,
  RsvpFormStep,
  GuestSelection,
  RsvpNameFormat,
} from "@/types/rsvp";
import { DbInvitationWithGuests } from "@/database/drizzle";

interface RsvpStore extends RsvpFormState {
  setStep: (step: RsvpFormStep) => void;
  setInputName: (name: string) => void;
  setInvitation: (
    invitation: DbInvitationWithGuests,
    nameFormat: RsvpNameFormat
  ) => void;
  toggleGuest: (guestName: string) => void;
  setEmail: (email: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (errorMessage: string) => void;
  reset: () => void;
}

const initialState: RsvpFormState = {
  step: "name-input",
  inputName: "",
  invitation: null,
  selectedGuests: [],
  email: "",
  nameFormat: "FULL_NAME",
  isLoading: false,
  errorMessage: null,
};

export const useRsvpStore = create<RsvpStore>((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),

  setInputName: (inputName) => set({ inputName }),

  setInvitation: (invitation, nameFormat) => {
    const guests: GuestSelection[] = [];
    const guestSlots = [
      invitation.guestA,
      invitation.guestB,
      invitation.guestC,
      invitation.guestD,
      invitation.guestE,
      invitation.guestF,
      invitation.guestG,
      invitation.guestH,
    ];
    const guestData = [
      invitation.guest_guestA,
      invitation.guest_guestB,
      invitation.guest_guestC,
      invitation.guest_guestD,
      invitation.guest_guestE,
      invitation.guest_guestF,
      invitation.guest_guestG,
      invitation.guest_guestH,
    ];

    guestSlots.forEach((guestName, index) => {
      if (guestName) {
        guests.push({
          name: guestName,
          isAttending: guestData[index]?.isAttending ?? true,
        });
      }
    });

    set({
      invitation,
      selectedGuests: guests,
      nameFormat,
      email: invitation.email || "",
    });
  },

  toggleGuest: (guestName) =>
    set((state) => ({
      selectedGuests: state.selectedGuests.map((guest) =>
        guest.name === guestName
          ? { ...guest, isAttending: !guest.isAttending }
          : guest
      ),
    })),

  setEmail: (email) => set({ email }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (errorMessage) => set({ step: "error", errorMessage }),

  reset: () => set(initialState),
}));
