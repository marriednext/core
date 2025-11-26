import "style-shelf/tailwind-hybrid";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { EventDetailsSection } from "./EventDetailsSection";

const meta = {
  title: "LisasTheme/EventDetailsSection",
  component: EventDetailsSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EventDetailsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

