import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse, delay } from "@storybook/test";
import RsvpForm from "@/components/RsvpForm";

const meta = {
  title: "Components/RsvpForm",
  component: RsvpForm,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RsvpForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockInvitationSingle = {
  id: "inv-123",
  weddingId: "wedding-123",
  guestA: "John Doe",
  guestB: null,
  guestC: null,
  guestD: null,
  guestE: null,
  guestF: null,
  guestG: null,
  guestH: null,
  createdAt: "2024-01-01",
  lastUpdatedAt: "2024-01-01",
  inviteGroupName: null,
  email: null,
  guest_guestA: {
    id: "guest-1",
    weddingId: "wedding-123",
    nameOnInvitation: "John Doe",
    isAttending: null,
    hasPlusOne: false,
    dateEntrySubmitted: null,
  },
  guest_guestB: null,
  guest_guestC: null,
  guest_guestD: null,
  guest_guestE: null,
  guest_guestF: null,
  guest_guestG: null,
  guest_guestH: null,
};

const mockInvitationCouple = {
  ...mockInvitationSingle,
  guestB: "Jane Doe",
  guest_guestB: {
    id: "guest-2",
    weddingId: "wedding-123",
    nameOnInvitation: "Jane Doe",
    isAttending: null,
    hasPlusOne: false,
    dateEntrySubmitted: null,
  },
};

const mockInvitationFamily = {
  ...mockInvitationCouple,
  guestC: "Jimmy Doe",
  guestD: "Jenny Doe",
  guest_guestC: {
    id: "guest-3",
    weddingId: "wedding-123",
    nameOnInvitation: "Jimmy Doe",
    isAttending: null,
    hasPlusOne: false,
    dateEntrySubmitted: null,
  },
  guest_guestD: {
    id: "guest-4",
    weddingId: "wedding-123",
    nameOnInvitation: "Jenny Doe",
    isAttending: null,
    hasPlusOne: false,
    dateEntrySubmitted: null,
  },
};

const mockInvitationAlreadyRsvped = {
  ...mockInvitationSingle,
  email: "john@example.com",
  guest_guestA: {
    ...mockInvitationSingle.guest_guestA!,
    isAttending: true,
    dateEntrySubmitted: "2024-01-15",
  },
};

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post("/api/v3/rsvp/lookup", async () => {
          await delay(500);
          return HttpResponse.json({
            invitation: mockInvitationSingle,
            nameFormat: "FULL_NAME",
          });
        }),
        http.post("/api/v3/rsvp", async () => {
          await delay(500);
          return HttpResponse.json({
            success: true,
            message: "RSVP submitted successfully",
          });
        }),
      ],
    },
  },
};

export const TenantVariant: Story = {
  args: {
    variant: "tenant",
  },
  parameters: {
    msw: {
      handlers: [
        http.post("/api/v3/rsvp/lookup", async () => {
          await delay(500);
          return HttpResponse.json({
            invitation: mockInvitationSingle,
            nameFormat: "FULL_NAME",
          });
        }),
        http.post("/api/v3/rsvp", async () => {
          await delay(500);
          return HttpResponse.json({
            success: true,
            message: "RSVP submitted successfully",
          });
        }),
      ],
    },
  },
};

export const LegacyVariant: Story = {
  args: {
    variant: "legacy",
  },
  parameters: {
    msw: {
      handlers: [
        http.post("/api/v3/rsvp/lookup", async () => {
          await delay(500);
          return HttpResponse.json({
            invitation: mockInvitationSingle,
            nameFormat: "FULL_NAME",
          });
        }),
        http.post("/api/v3/rsvp", async () => {
          await delay(500);
          return HttpResponse.json({
            success: true,
            message: "RSVP submitted successfully",
          });
        }),
      ],
    },
  },
};

export const FirstNameOnlyMode: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post("/api/v3/rsvp/lookup", async () => {
          await delay(500);
          return HttpResponse.json({
            invitation: mockInvitationSingle,
            nameFormat: "FIRST_NAME_ONLY",
          });
        }),
        http.post("/api/v3/rsvp", async () => {
          await delay(500);
          return HttpResponse.json({
            success: true,
            message: "RSVP submitted successfully",
          });
        }),
      ],
    },
  },
};

export const CoupleInvitation: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post("/api/v3/rsvp/lookup", async () => {
          await delay(500);
          return HttpResponse.json({
            invitation: mockInvitationCouple,
            nameFormat: "FULL_NAME",
          });
        }),
        http.post("/api/v3/rsvp", async () => {
          await delay(500);
          return HttpResponse.json({
            success: true,
            message: "RSVP submitted successfully",
          });
        }),
      ],
    },
  },
};

export const FamilyInvitation: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post("/api/v3/rsvp/lookup", async () => {
          await delay(500);
          return HttpResponse.json({
            invitation: mockInvitationFamily,
            nameFormat: "FULL_NAME",
          });
        }),
        http.post("/api/v3/rsvp", async () => {
          await delay(500);
          return HttpResponse.json({
            success: true,
            message: "RSVP submitted successfully",
          });
        }),
      ],
    },
  },
};

export const AlreadyRsvped: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post("/api/v3/rsvp/lookup", async () => {
          await delay(500);
          return HttpResponse.json({
            invitation: mockInvitationAlreadyRsvped,
            nameFormat: "FULL_NAME",
          });
        }),
        http.post("/api/v3/rsvp", async () => {
          await delay(500);
          return HttpResponse.json({
            success: true,
            message: "RSVP updated successfully",
          });
        }),
      ],
    },
  },
};

export const GuestNotFound: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post("/api/v3/rsvp/lookup", async () => {
          await delay(500);
          return HttpResponse.json(
            {
              error: "Guest not found on invitation list",
            },
            { status: 404 }
          );
        }),
      ],
    },
  },
};

export const SubmissionError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post("/api/v3/rsvp/lookup", async () => {
          await delay(500);
          return HttpResponse.json({
            invitation: mockInvitationSingle,
            nameFormat: "FULL_NAME",
          });
        }),
        http.post("/api/v3/rsvp", async () => {
          await delay(500);
          return HttpResponse.json(
            {
              error: "Failed to submit RSVP",
            },
            { status: 500 }
          );
        }),
      ],
    },
  },
};

export const SlowNetwork: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post("/api/v3/rsvp/lookup", async () => {
          await delay(3000);
          return HttpResponse.json({
            invitation: mockInvitationSingle,
            nameFormat: "FULL_NAME",
          });
        }),
        http.post("/api/v3/rsvp", async () => {
          await delay(3000);
          return HttpResponse.json({
            success: true,
            message: "RSVP submitted successfully",
          });
        }),
      ],
    },
  },
};
