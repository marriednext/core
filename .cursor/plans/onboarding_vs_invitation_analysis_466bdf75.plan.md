---
name: Onboarding vs Invitation Analysis
overview: Document the differences between the older Onboarding flow and the newer Invitation flow, identifying inconsistencies in authentication approaches, API endpoints, database handling, and user experience.
todos:
  - id: document-findings
    content: Create detailed documentation of flow differences
    status: pending
  - id: test-both-flows
    content: Test both flows to verify behavior matches code analysis
    status: pending
  - id: create-migration-plan
    content: Design migration strategy to consolidate to single pattern
    status: pending
  - id: address-cache-inconsistency
    content: Investigate wedding cache update requirements for invitation flow
    status: pending
---

# Onboarding vs Invitation Flow Analysis

## Overview

The Invitation flow (`/invitation`) is the newer implementation, while the Onboarding flow (`/onboarding`) is older. They handle user invitations differently with some significant architectural inconsistencies.

## Key Architectural Differences

### Authentication Strategy

**Invitation Flow (Newer - `/invitation`):**

- Uses Clerk's **ticket strategy** for direct signup
- Creates new user account immediately via `signUp.create({ strategy: "ticket", ticket: token })`
- User metadata (weddingId, role) is set via Clerk invitation `publicMetadata` during invitation creation
- File: `apps/webapp/src/app/invitation/page.tsx` (lines 87-91)

**Onboarding Flow (Older - `/onboarding`):**

- Assumes user is already authenticated via Clerk
- Checks for pending invitation by **email lookup** in database
- Two paths: accept invitation OR create new wedding
- Files: `apps/webapp/src/app/(application)/engaged/onboarding/page.tsx`, `/api/onboarding/route.ts`

### API Endpoints

**Invitation Flow:**

- Uses `/api/v2/engaged/accept-invitation` (POST)
- Simpler: only creates `weddingUsers` record and updates invitation status
- File: `apps/webapp/src/app/api/(application)/v2/engaged/accept-invitation/route.ts`

**Onboarding Flow:**

- Uses `/api/onboarding` with multiple HTTP methods:
  - GET: Check for pending invitation
  - POST: Create new wedding
  - PUT: Accept existing invitation
- More complex with dual responsibility
- File: `apps/webapp/src/app/api/onboarding/route.ts`

### User Metadata Handling

**Invitation Flow:**

- Metadata set during Clerk invitation creation at `/api/v2/engaged/permissions` (lines 165-174)
- User reads metadata from Clerk on acceptance
- Updates firstName/lastName separately after account creation (lines 101-105)

**Onboarding Flow:**

- Metadata set AFTER user accepts invitation or creates wedding
- Uses `clerkClient.users.updateUserMetadata()` (lines 145-152 for POST, lines 220-227 for PUT)
- Creates potential race condition

### Database Operations

**Invitation Flow:**

```typescript
// Single responsibility: associate user with wedding
await db.insert(weddingUsers).values({
  weddingId,
  clerkUserId: user.id,
  role: role as "spouse" | "family" | "planner",
});
```

**Onboarding Flow:**

```typescript
// Dual responsibility: check invitation OR create wedding
if (hasInvitation) {
  // Accept invitation path
} else {
  // Create new wedding path with cache update
  await updateWeddingCache({ ... });
}
```

### Redirect Paths

**Invitation Flow:**

- Always redirects to `/v2/engaged`

**Onboarding Flow:**

- Invitation accepted: `/engaged/permissions`
- New wedding created: `/engaged/guest-list`
- Different paths based on action taken

### Role Type Handling

**Invitation Flow (`/api/v2/engaged/permissions`):**

- Uses component role types: `"spouse" | "family_member" | "wedding_planner"`
- Maps between component and database roles with helper functions
- Lines 37-51: `mapDatabaseRoleToComponentRole()` and `mapComponentRoleToDatabaseRole()`

**Onboarding Flow (`/api/onboarding` and `/api/permissions`):**

- Uses database role types directly: `"spouse" | "family" | "planner"`
- No mapping layer

### UI/UX Differences

**Invitation Flow:**

- Modern gradient design (`from-rose-50 via-white to-amber-50`)
- Shows error if no token present
- Single form: firstName, lastName, password
- Redirects if already signed in (line 54-57)

**Onboarding Flow:**

- Conditional rendering: invitation acceptance OR wedding creation form
- Wedding creation requires: subdomain, partner names, wedding date
- Checks invitation status on load via react-query
- Nested in EngagedShell layout

## Critical Issues Identified

1. **Inconsistent Authentication Pattern**: Ticket strategy vs. email lookup creates confusion
2. **Duplicate API Endpoints**: `/api/permissions` vs `/api/v2/engaged/permissions` serve similar purposes
3. **Race Condition Risk**: Onboarding sets metadata after operations vs. Invitation sets it before
4. **Type System Mismatch**: Role mapping only in v2, direct usage in v1
5. **No Wedding Cache Update**: Invitation flow doesn't call `updateWeddingCache()` like onboarding does
6. **Different Validation**: Onboarding uses Zod schemas, invitation has basic regex

## Recommended Actions

1. **Consolidate to Invitation Flow Pattern**: Use ticket strategy everywhere
2. **Deprecate Old Onboarding**: Keep only for backward compatibility
3. **Unify Role Types**: Use consistent role mapping across all endpoints
4. **Add Cache Updates**: Ensure invitation flow updates cache when needed
5. **Standardize Redirects**: Use consistent post-action routing

## Files Referenced

- `/apps/webapp/src/app/invitation/page.tsx`
- `/apps/webapp/src/app/(application)/engaged/onboarding/page.tsx`
- `/apps/webapp/src/app/api/(application)/v2/engaged/accept-invitation/route.ts`
- `/apps/webapp/src/app/api/(application)/v2/engaged/permissions/route.ts`
- `/apps/webapp/src/app/api/onboarding/route.ts`
- `/apps/webapp/src/app/api/permissions/route.ts`
- `/packages/orm-shelf/drizzle/schema.ts`