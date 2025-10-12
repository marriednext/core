import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Rsvp from "@/components/tenant/Rsvp";

const meta = {
  title: "Tenant/Rsvp",
  component: Rsvp,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen w-full max-w-4xl mx-auto py-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Rsvp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NameInput: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Initial state where user enters their first name to find their invitation.",
      },
    },
  },
};

export const AttendanceQuestion: Story = {
  parameters: {
    docs: {
      description: {
        story: "State after name is validated, asking if the guest can attend.",
      },
    },
  },
};

export const PlusOneQuestion: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "State for guests with a plus one invitation, asking if they're bringing someone.",
      },
    },
  },
};

export const KnownCompanionQuestion: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "State for guests with a known companion, asking if the companion is attending.",
      },
    },
  },
};

export const LoadingState: Story = {
  parameters: {
    docs: {
      description: {
        story: "Component in loading state while submitting or validating.",
      },
    },
  },
};

export const ErrorState: Story = {
  parameters: {
    docs: {
      description: {
        story: "Error state when something goes wrong during the RSVP process.",
      },
    },
  },
};

export const SuccessState: Story = {
  parameters: {
    docs: {
      description: {
        story: "Success state after RSVP is successfully submitted.",
      },
    },
  },
};
