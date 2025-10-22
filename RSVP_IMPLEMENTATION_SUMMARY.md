# Multi-Step RSVP Form Implementation Summary

## Overview

Implemented a comprehensive multi-step RSVP form that works across both TENANT and LEGACY websites, with database-backed guest management and configurable name format validation.

## Files Created

### Database Schema

- **drizzle/schema.ts** - Added:
  - `rsvpNameFormatEnum` enum with `FIRST_NAME_ONLY` and `FULL_NAME` values
  - `invitation.email` field for storing guest emails
  - `wedding.controlRsvpNameFormat` field with default `FULL_NAME`
- **drizzle/migrations/0002_add_rsvp_fields.sql** - Migration file for schema changes

### Type Definitions

- **src/types/rsvp.ts** - Complete TypeScript types for:
  - RsvpNameFormat
  - GuestSelection
  - RsvpFormStep
  - RsvpFormState
  - RsvpSubmission
  - InvitationLookupResponse
  - RsvpApiResponse

### Helper Functions with Tests

- **src/lib/tenant/nameMatching.ts** - Name matching logic with support for both formats
- **src/lib/tenant/nameMatching.test.ts** - Comprehensive test suite (20+ test cases)
- **src/lib/tenant/invitationLookup.ts** - Database query for finding invitations
- **src/lib/tenant/invitationLookup.test.ts** - Full test coverage with mocked database
- **src/lib/tenant/getWeddingFromRequest.ts** - Multi-tenant wedding lookup from request

### State Management

- **src/stores/rsvpStore.ts** - Zustand store managing:
  - Form steps progression
  - Guest selection state
  - Loading and error states
  - Email collection
  - Form reset

### API Routes

#### Tenant API (v3)

- **src/app/(tenant)/api/v3/rsvp/lookup/route.ts**

  - POST endpoint to find invitation by guest name
  - Returns invitation with guests and name format setting
  - Multi-tenant aware

- **src/app/(tenant)/api/v3/rsvp/route.ts**
  - POST endpoint for RSVP submission
  - Updates invitation email
  - Updates individual guest attendance
  - Transaction-based for data consistency

#### Admin API

- **src/app/(admin)/api/settings/rsvp-name-format/route.ts**
  - GET endpoint to fetch current name format setting
  - PUT endpoint to update name format setting
  - Clerk authentication protected

### Components

- **src/components/RsvpForm.tsx** - Main multi-step form component:
  - Step 1: Name input with dynamic placeholder
  - Step 2: Guest selection with checkboxes
  - Step 3: Email collection with privacy disclosure
  - Step 4: Success/Error states
  - Support for both tenant and legacy variants
  - Pre-filled data for returning guests
  - Fully responsive design

### UI Integration

- **src/app/(admin)/guest-list/page.tsx** - Added name format dropdown control:

  - Display current RSVP name format setting
  - Update setting via dropdown
  - Real-time sync with API

- **src/app/(tenant)/tenant/[id]/page.tsx** - Integrated RsvpForm with tenant variant
- **src/app/(tenant)/legacy/yulissaandmatthew.com/page.tsx** - Integrated RsvpForm with legacy variant

### Storybook

- **src/stories/RsvpForm.stories.tsx** - Comprehensive stories:
  - Default state
  - Tenant/Legacy variants
  - First name only mode
  - Single/Couple/Family invitations
  - Already RSVP'd state
  - Error states
  - Loading states
  - Network delay simulation

## Key Features

### Multi-Step Flow

1. **Name Input** - Guest enters name based on configured format
2. **Guest Selection** - Shows all guests on invitation with checkboxes
3. **Email Collection** - Required email with privacy disclosure
4. **Confirmation** - Success message with option to RSVP another guest

### Name Format Support

- **FULL_NAME** (default) - Requires exact full name match
- **FIRST_NAME_ONLY** - Matches by first name only
- Configurable per wedding in guest list settings
- Case-insensitive and whitespace-insensitive matching

### Guest Management

- Display all guests on invitation (up to 8 guests supported)
- Individual checkbox selection for each guest
- Pre-check guests who previously RSVP'd
- Support for changing RSVP status
- Email stored at invitation level (one per group)

### Multi-Tenancy

- Full support for subdomain-based tenants
- Support for custom domain tenants
- Wedding ID automatically extracted from request
- Secure data isolation per wedding

### Testing

- Comprehensive unit tests for business-critical functions
- Name matching: 20+ test cases covering edge cases
- Invitation lookup: 10+ test cases with mocked database
- All tests passing and ready for CI/CD

### Error Handling

- Graceful error states with user-friendly messages
- Loading states for all async operations
- Network error handling
- Validation errors with clear messaging
- Sentry integration for error tracking

## API Endpoints

### Tenant Routes

- `POST /api/v3/rsvp/lookup` - Find invitation by guest name
- `POST /api/v3/rsvp` - Submit RSVP

### Admin Routes

- `GET /api/settings/rsvp-name-format` - Get name format setting
- `PUT /api/settings/rsvp-name-format` - Update name format setting

## Database Changes

### Tables Modified

- `wedding` - Added `control_rsvp_name_format` enum column
- `invitation` - Added `email` text column

### Enums Created

- `rsvp_name_format` - Values: `FIRST_NAME_ONLY`, `FULL_NAME`

## Migration Required

Run the following to apply schema changes:

```bash
# Apply migration
pnpm drizzle-kit push
```

## Testing

Run tests:

```bash
# Run all tests
pnpm test

# Run specific test suites
pnpm test nameMatching.test.ts
pnpm test invitationLookup.test.ts
```

## Storybook

View component stories:

```bash
pnpm storybook
```

## Notes

- Old `Rsvp` component from `src/components/tenant/Rsvp.tsx` is now deprecated but not deleted
- Old hardcoded guest list in `src/lib/tenant/guestList.ts` is now deprecated
- All RSVP data is now database-driven
- Email is required for RSVP submission
- Guests can update their RSVP anytime
- Form works across both tenant and legacy sites with consistent behavior
