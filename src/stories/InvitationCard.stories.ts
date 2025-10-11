import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn, within, userEvent, waitFor } from "storybook/test";
import InvitationCard from "@/components/guest-list/InvitationCard";
import { DbInvitationGroupWithGuests } from "@/database/drizzle";
import { EditFormData } from "@/components/guest-list/guestList.types";

const createMockEntry = (
  overrides?: Partial<DbInvitationGroupWithGuests>
): DbInvitationGroupWithGuests => ({
  id: 1,
  guestA: "John Doe",
  guestB: null,
  guestC: null,
  guestD: null,
  guestE: null,
  guestF: null,
  guestG: null,
  guestH: null,
  createdAt: "2024-01-15T10:00:00.000Z",
  lastUpdatedAt: "2024-01-15T10:00:00.000Z",
  inviteGroupName: null,
  invitation_guestA: {
    id: 1,
    nameOnInvitation: "John Doe",
    isAttending: true,
    hasPlusOne: false,
    dateEntrySubmitted: "2024-01-15T10:00:00.000Z",
  },
  invitation_guestB: null,
  invitation_guestC: null,
  invitation_guestD: null,
  invitation_guestE: null,
  invitation_guestF: null,
  invitation_guestG: null,
  invitation_guestH: null,
  ...overrides,
});

const createEditForm = (entry: DbInvitationGroupWithGuests): EditFormData => ({
  guestA: entry.guestA,
  guestAAttending: entry.invitation_guestA?.isAttending ?? null,
  guestAHasPlusOne: entry.invitation_guestA?.hasPlusOne ?? false,
  guestB: entry.guestB,
  guestBAttending: entry.invitation_guestB?.isAttending ?? null,
  guestBHasPlusOne: entry.invitation_guestB?.hasPlusOne ?? false,
  guestC: entry.guestC,
  guestCAttending: entry.invitation_guestC?.isAttending ?? null,
  guestCHasPlusOne: entry.invitation_guestC?.hasPlusOne ?? false,
  guestD: entry.guestD,
  guestDAttending: entry.invitation_guestD?.isAttending ?? null,
  guestDHasPlusOne: entry.invitation_guestD?.hasPlusOne ?? false,
  guestE: entry.guestE,
  guestEAttending: entry.invitation_guestE?.isAttending ?? null,
  guestEHasPlusOne: entry.invitation_guestE?.hasPlusOne ?? false,
  guestF: entry.guestF,
  guestFAttending: entry.invitation_guestF?.isAttending ?? null,
  guestFHasPlusOne: entry.invitation_guestF?.hasPlusOne ?? false,
  guestG: entry.guestG,
  guestGAttending: entry.invitation_guestG?.isAttending ?? null,
  guestGHasPlusOne: entry.invitation_guestG?.hasPlusOne ?? false,
  guestH: entry.guestH,
  guestHAttending: entry.invitation_guestH?.isAttending ?? null,
  guestHHasPlusOne: entry.invitation_guestH?.hasPlusOne ?? false,
  inviteGroupName: entry.inviteGroupName,
});

const meta = {
  title: "GuestList/InvitationCard",
  component: InvitationCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InvitationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleGuest: Story = {
  args: {
    entry: createMockEntry(),
    isEditing: false,
    editForm: null,
    onEdit: fn(),
    onRemove: fn(),
    onSave: fn(),
    onCancel: fn(),
    onFormChange: fn(),
    isSaving: false,
    root: "div",
  },
};

export const TwoGuests: Story = {
  args: {
    entry: createMockEntry({
      guestB: "Jane Smith",
      invitation_guestB: {
        id: 2,
        nameOnInvitation: "Jane Smith",
        isAttending: true,
        hasPlusOne: false,
        dateEntrySubmitted: "2024-01-15T10:00:00.000Z",
      },
    }),
    isEditing: false,
    editForm: null,
    onEdit: fn(),
    onRemove: fn(),
    onSave: fn(),
    onCancel: fn(),
    onFormChange: fn(),
    isSaving: false,
    root: "div",
  },
};

export const LargeGroup: Story = {
  args: {
    entry: createMockEntry({
      guestB: "Jane Smith",
      guestC: "Bob Johnson",
      guestD: "Alice Williams",
      guestE: "Charlie Brown",
      invitation_guestB: {
        id: 2,
        nameOnInvitation: "Jane Smith",
        isAttending: true,
        hasPlusOne: false,
        dateEntrySubmitted: "2024-01-15T10:00:00.000Z",
      },
      invitation_guestC: {
        id: 3,
        nameOnInvitation: "Bob Johnson",
        isAttending: null,
        hasPlusOne: false,
        dateEntrySubmitted: "2024-01-15T10:00:00.000Z",
      },
      invitation_guestD: {
        id: 4,
        nameOnInvitation: "Alice Williams",
        isAttending: false,
        hasPlusOne: false,
        dateEntrySubmitted: "2024-01-15T10:00:00.000Z",
      },
      invitation_guestE: {
        id: 5,
        nameOnInvitation: "Charlie Brown",
        isAttending: true,
        hasPlusOne: false,
        dateEntrySubmitted: "2024-01-15T10:00:00.000Z",
      },
    }),
    isEditing: false,
    editForm: null,
    onEdit: fn(),
    onRemove: fn(),
    onSave: fn(),
    onCancel: fn(),
    onFormChange: fn(),
    isSaving: false,
    root: "div",
  },
};

export const WithGroupName: Story = {
  args: {
    entry: createMockEntry({
      inviteGroupName: "The Smith Family",
      guestB: "Jane Smith",
      invitation_guestB: {
        id: 2,
        nameOnInvitation: "Jane Smith",
        isAttending: true,
        hasPlusOne: false,
        dateEntrySubmitted: "2024-01-15T10:00:00.000Z",
      },
    }),
    isEditing: false,
    editForm: null,
    onEdit: fn(),
    onRemove: fn(),
    onSave: fn(),
    onCancel: fn(),
    onFormChange: fn(),
    isSaving: false,
    root: "div",
  },
};

export const EditMode: Story = {
  args: {
    entry: createMockEntry({
      guestB: "Jane Smith",
      invitation_guestB: {
        id: 2,
        nameOnInvitation: "Jane Smith",
        isAttending: true,
        hasPlusOne: false,
        dateEntrySubmitted: "2024-01-15T10:00:00.000Z",
      },
    }),
    isEditing: true,
    editForm: createEditForm(
      createMockEntry({
        guestB: "Jane Smith",
        invitation_guestB: {
          id: 2,
          nameOnInvitation: "Jane Smith",
          isAttending: true,
          hasPlusOne: false,
          dateEntrySubmitted: "2024-01-15T10:00:00.000Z",
        },
      })
    ),
    onEdit: fn(),
    onRemove: fn(),
    onSave: fn(),
    onCancel: fn(),
    onFormChange: fn(),
    isSaving: false,
    root: "div",
  },
};

export const EditModeWithGroupName: Story = {
  args: {
    entry: createMockEntry({
      inviteGroupName: "The Smith Family",
      guestB: "Jane Smith",
      invitation_guestB: {
        id: 2,
        nameOnInvitation: "Jane Smith",
        isAttending: true,
        hasPlusOne: false,
        dateEntrySubmitted: "2024-01-15T10:00:00.000Z",
      },
    }),
    isEditing: true,
    editForm: createEditForm(
      createMockEntry({
        inviteGroupName: "The Smith Family",
        guestB: "Jane Smith",
        invitation_guestB: {
          id: 2,
          nameOnInvitation: "Jane Smith",
          isAttending: true,
          hasPlusOne: false,
          dateEntrySubmitted: "2024-01-15T10:00:00.000Z",
        },
      })
    ),
    onEdit: fn(),
    onRemove: fn(),
    onSave: fn(),
    onCancel: fn(),
    onFormChange: fn(),
    isSaving: false,
    root: "div",
  },
};

export const SavingState: Story = {
  args: {
    entry: createMockEntry({
      guestB: "Jane Smith",
      invitation_guestB: {
        id: 2,
        nameOnInvitation: "Jane Smith",
        isAttending: true,
        hasPlusOne: false,
        dateEntrySubmitted: "2024-01-15T10:00:00.000Z",
      },
    }),
    isEditing: true,
    editForm: createEditForm(
      createMockEntry({
        guestB: "Jane Smith",
        invitation_guestB: {
          id: 2,
          nameOnInvitation: "Jane Smith",
          isAttending: true,
          hasPlusOne: false,
          dateEntrySubmitted: "2024-01-15T10:00:00.000Z",
        },
      })
    ),
    onEdit: fn(),
    onRemove: fn(),
    onSave: fn(),
    onCancel: fn(),
    onFormChange: fn(),
    isSaving: true,
    root: "div",
  },
};

export const WithCollapseButton: Story = {
  args: {
    entry: createMockEntry({
      guestB: "Jane Smith",
      invitation_guestB: {
        id: 2,
        nameOnInvitation: "Jane Smith",
        isAttending: true,
        hasPlusOne: false,
        dateEntrySubmitted: "2024-01-15T10:00:00.000Z",
      },
    }),
    isEditing: false,
    editForm: null,
    onEdit: fn(),
    onRemove: fn(),
    onSave: fn(),
    onCancel: fn(),
    onFormChange: fn(),
    isSaving: false,
    onCollapse: fn(),
    root: "div",
  },
};

export const InteractiveEditFlow: Story = {
  args: {
    entry: createMockEntry({
      guestB: "Jane Smith",
      invitation_guestB: {
        id: 2,
        nameOnInvitation: "Jane Smith",
        isAttending: true,
        hasPlusOne: false,
        dateEntrySubmitted: "2024-01-15T10:00:00.000Z",
      },
    }),
    isEditing: false,
    editForm: null,
    onEdit: fn(),
    onRemove: fn(),
    onSave: fn(),
    onCancel: fn(),
    onFormChange: fn(),
    isSaving: false,
    root: "div",
  },

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Open menu and click Edit", async () => {
      const menuButton = canvas.getByRole("button", {
        name: "Open guest menu",
      });
      await userEvent.click(menuButton);

      await waitFor(() => {
        const portalContent = within(document.body).queryByRole("menu");
        if (!portalContent) throw new Error("Menu not found");
      });

      await userEvent.keyboard("{Escape}");
      await waitFor(() => {
        const portalContent = within(document.body).queryByRole("menu");
        if (portalContent) throw new Error("Menu still open");
      });
    });
  },
};

export const MixedAttendanceStatus: Story = {
  args: {
    entry: createMockEntry({
      guestB: "Jane Smith",
      guestC: "Bob Johnson",
      guestD: "Alice Williams",
      invitation_guestB: {
        id: 2,
        nameOnInvitation: "Jane Smith",
        isAttending: true,
        hasPlusOne: false,
        dateEntrySubmitted: "2024-01-15T10:00:00.000Z",
      },
      invitation_guestC: {
        id: 3,
        nameOnInvitation: "Bob Johnson",
        isAttending: false,
        hasPlusOne: false,
        dateEntrySubmitted: "2024-01-15T10:00:00.000Z",
      },
      invitation_guestD: {
        id: 4,
        nameOnInvitation: "Alice Williams",
        isAttending: null,
        hasPlusOne: false,
        dateEntrySubmitted: "2024-01-15T10:00:00.000Z",
      },
    }),
    isEditing: false,
    editForm: null,
    onEdit: fn(),
    onRemove: fn(),
    onSave: fn(),
    onCancel: fn(),
    onFormChange: fn(),
    isSaving: false,
    root: "div",
  },
};

export const SingleGuestWithPlusOne: Story = {
  args: {
    entry: createMockEntry({
      invitation_guestA: {
        id: 1,
        nameOnInvitation: "John Doe",
        isAttending: true,
        hasPlusOne: true,
        dateEntrySubmitted: "2024-01-15T10:00:00.000Z",
      },
    }),
    isEditing: false,
    editForm: null,
    onEdit: fn(),
    onRemove: fn(),
    onSave: fn(),
    onCancel: fn(),
    onFormChange: fn(),
    isSaving: false,
    root: "div",
  },
};
