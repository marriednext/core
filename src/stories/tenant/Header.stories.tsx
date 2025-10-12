import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Header from "@/components/tenant/Header";

const meta = {
  title: "Tenant/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full min-h-screen bg-white">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomePage: Story = {
  parameters: {
    docs: {
      description: {
        story: "Header displayed on the home page with home nav item active.",
      },
    },
  },
};

export const OurStoryPage: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/our-story",
      },
    },
    docs: {
      description: {
        story: "Header with 'Our Story' navigation item active.",
      },
    },
  },
};

export const PhotosPage: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/photos",
      },
    },
    docs: {
      description: {
        story: "Header with 'Photos' navigation item active.",
      },
    },
  },
};

export const RegistryPage: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/registry",
      },
    },
    docs: {
      description: {
        story: "Header with 'Registry' navigation item active.",
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
          "Header on mobile view with responsive layout and mobile navigation.",
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
        story:
          "Header on tablet view showing transition between mobile and desktop layouts.",
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
        story: "Header on desktop view with full horizontal navigation.",
      },
    },
  },
};
