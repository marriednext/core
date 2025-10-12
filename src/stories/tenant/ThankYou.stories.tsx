import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ThankYouCard } from "@/components/tenant/ThankYou";

const meta = {
  title: "Tenant/ThankYou",
  component: ThankYouCard,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ThankYouCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Full-screen 3D animated thank you card with floating shapes and text overlay.",
      },
    },
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story:
          "Thank you card on mobile viewport with adjusted camera positioning for smaller screens.",
      },
    },
  },
};

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "Thank you card on tablet viewport.",
      },
    },
  },
};

export const DesktopView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story:
          "Thank you card on desktop viewport with optimal 3D scene rendering.",
      },
    },
  },
};

export const WithReducedMotion: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Thank you card respecting reduced motion preferences (animations should be minimal).",
      },
    },
  },
  decorators: [
    (Story) => {
      if (typeof window !== "undefined") {
        const mediaQuery = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        );
        Object.defineProperty(mediaQuery, "matches", {
          writable: true,
          value: true,
        });
      }
      return <Story />;
    },
  ],
};
