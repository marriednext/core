import "style-shelf/tailwind";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LisasTheme } from "../../components/theme/lisastheme/LisasTheme";

const meta = {
  title: "Themes/LisasTheme",
  component: LisasTheme,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LisasTheme>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fieldNameA: "Yulissa",
    fieldNameB: "Matthew",
    fieldLocationName: "Bel Vino Winery",
    fieldLocationAddress: "33515 Rancho California Rd, Temecula, CA 92591",
    fieldEventDate: "2026-07-26",
    fieldEventTime: "4:00 PM",
    fieldMapsShareUrl: "https://maps.app.goo.gl/example",
  },
};

export const WithImages: Story = {
  args: {
    fieldNameA: "Yulissa",
    fieldNameB: "Matthew",
    fieldLocationName: "Bel Vino Winery",
    fieldLocationAddress: "33515 Rancho California Rd, Temecula, CA 92591",
    fieldEventDate: "2026-07-26",
    fieldEventTime: "4:00 PM",
    fieldMapsShareUrl: "https://maps.app.goo.gl/example",
    heroImageUrl: "/weddingcouple.png",
    ourStoryImageUrl: "/weddingcouple.png",
    galleryImages: [
      "/weddingcouple.png",
      "/weddingcouple.png",
      "/weddingcouple.png",
      "/weddingcouple.png",
      "/weddingcouple.png",
      "/weddingcouple.png",
    ],
  },
};

export const Editable: Story = {
  args: {
    fieldNameA: "Yulissa",
    fieldNameB: "Matthew",
    fieldLocationName: "Bel Vino Winery",
    fieldLocationAddress: "33515 Rancho California Rd, Temecula, CA 92591",
    fieldEventDate: "2026-07-26",
    fieldEventTime: "4:00 PM",
    fieldMapsShareUrl: "https://maps.app.goo.gl/example",
    heroImageUrl: "/weddingcouple.png",
    ourStoryImageUrl: "/weddingcouple.png",
    editable: true,
    onCustomizationChange: (section, key, value) => {
      console.log("Customization changed:", { section, key, value });
    },
  },
};

export const MinimalSections: Story = {
  args: {
    fieldNameA: "Yulissa",
    fieldNameB: "Matthew",
    fieldLocationName: "Bel Vino Winery",
    fieldLocationAddress: "33515 Rancho California Rd, Temecula, CA 92591",
    fieldEventDate: "2026-07-26",
    fieldEventTime: "4:00 PM",
    fieldMapsShareUrl: "https://maps.app.goo.gl/example",
    websiteSections: [
      { id: "hero", enabled: true, order: 0 },
      { id: "countdown", enabled: true, order: 1 },
      { id: "ourStory", enabled: false, order: 2 },
      { id: "eventDetails", enabled: true, order: 3 },
      { id: "gallery", enabled: false, order: 4 },
      { id: "faq", enabled: false, order: 5 },
      { id: "rsvp", enabled: true, order: 6 },
    ],
  },
};
