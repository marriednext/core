import "style-shelf/tailwind";
import type { Meta, StoryObj } from "@storybook/react-vite";
import WeddingPage from "../../components/theme/tuscanbloom/tuscanbloom";

const meta = {
  title: "Themes/TuscanBloom",
  component: WeddingPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof WeddingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
