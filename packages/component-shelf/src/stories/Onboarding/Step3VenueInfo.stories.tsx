import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Step3VenueInfo,
  type OnboardingFormData,
} from "../../components/application/onboarding/step-3-venue-info";
import { StoreProvider } from "../../components/application/onboarding/store-provider";

const meta = {
  title: "Application/Onboarding/Step3VenueInfo",
  component: Step3VenueInfo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story: React.ComponentType) => (
      <StoreProvider>
        <div style={{ width: "500px" }}>
          <Story />
        </div>
      </StoreProvider>
    ),
  ],
} satisfies Meta<typeof Step3VenueInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: async (data: OnboardingFormData | undefined) => {
      console.log("Form submitted:", data);
    },
    onSkip: async (data: OnboardingFormData | undefined) => {
      console.log("Skipped:", data);
    },
  },
};

export const KeyboardNavigation: Story = {
  args: {
    onSubmit: async () => {},
    onSkip: async () => {},
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const venueNameInput = canvas.getByLabelText("Venue Name");
    const address1Input = canvas.getByLabelText("Address Line 1");
    const address2Input = canvas.getByLabelText("Address Line 2");
    const cityInput = canvas.getByLabelText("City");
    const stateInput = canvas.getByLabelText("State / Province");
    const zipInput = canvas.getByLabelText("ZIP / Postal Code");
    const countryInput = canvas.getByLabelText("Country");

    await userEvent.click(venueNameInput);
    expect(venueNameInput).toHaveFocus();

    await userEvent.tab();
    expect(address1Input).toHaveFocus();

    await userEvent.tab();
    expect(address2Input).toHaveFocus();

    await userEvent.tab();
    expect(cityInput).toHaveFocus();

    await userEvent.tab();
    expect(stateInput).toHaveFocus();

    await userEvent.tab();
    expect(zipInput).toHaveFocus();

    await userEvent.tab();
    expect(countryInput).toHaveFocus();
  },
};

export const FocusVisibility: Story = {
  args: {
    onSubmit: async () => {},
    onSkip: async () => {},
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const venueNameInput = canvas.getByLabelText("Venue Name");
    await userEvent.click(venueNameInput);

    const activeElement = document.activeElement;
    const styles = window.getComputedStyle(activeElement as Element);

    const hasVisibleFocus =
      styles.outline !== "none" ||
      styles.boxShadow !== "none" ||
      styles.borderColor !== styles.getPropertyValue("--border");

    expect(hasVisibleFocus).toBe(true);
  },
};
