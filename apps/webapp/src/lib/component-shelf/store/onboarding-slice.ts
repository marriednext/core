import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface OnboardingState {
  currentStep: number;
  formData: {
    // Step 1: Couple Names
    fieldNameA: string;
    fieldNameB: string;
    // Step 2: Wedding Details
    subdomain: string;
    fieldEventDate: string;
    fieldEventTime: string;
    // Step 3: Venue Information
    fieldLocationName: string;
    fieldPreferredLocationAddressLine1: string;
    fieldPreferredLocationAddressLine2: string;
    fieldPreferredLocationCity: string;
    fieldPreferredLocationState: string;
    fieldPreferredLocationZipCode: string;
    fieldPreferredLocationCountry: string;
  };
  isComplete: boolean;
}

const initialState: OnboardingState = {
  currentStep: 1,
  formData: {
    fieldNameA: "",
    fieldNameB: "",
    subdomain: "",
    fieldEventDate: "",
    fieldEventTime: "",
    fieldLocationName: "",
    fieldPreferredLocationAddressLine1: "",
    fieldPreferredLocationAddressLine2: "",
    fieldPreferredLocationCity: "",
    fieldPreferredLocationState: "",
    fieldPreferredLocationZipCode: "",
    fieldPreferredLocationCountry: "",
  },
  isComplete: false,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < 3) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    updateFormData: (
      state,
      action: PayloadAction<Partial<OnboardingState["formData"]>>,
    ) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    completeOnboarding: (state) => {
      state.isComplete = true;
    },
    resetOnboarding: () => {
      return initialState;
    },
  },
});

export const {
  setStep,
  nextStep,
  prevStep,
  updateFormData,
  completeOnboarding,
  resetOnboarding,
} = onboardingSlice.actions;
export default onboardingSlice.reducer;
