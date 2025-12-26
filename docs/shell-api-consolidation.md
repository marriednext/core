# Shell API Consolidation

This document outlines the pages and API routes that can benefit from the `/api/v2/engaged/shell` route to reduce redundant data fetching.

## Shell API Route

**Path:** `/api/v2/engaged/shell`

**Response:**

```typescript
{
  user: {
    fullName: string;
    email: string;
    imageUrl: string | null;
    initials: string;
  }
  wedding: {
    id: string;
    displayName: string;
    nameA: string;
    nameB: string;
    eventDate: string | null;
  }
  subscriptionPlan: string;
}
```

---

## Pages That Can Use This Route

| Page            | File Path                              | Current API                   | Status                       |
| --------------- | -------------------------------------- | ----------------------------- | ---------------------------- |
| Dashboard       | `src/app/engaged/page.tsx`             | `/api/v2/engaged/home-stats`  | Fetches redundant shell data |
| Settings        | `src/app/engaged/settings/page.tsx`    | `/api/v2/engaged/settings`    | Fetches redundant shell data |
| Website Builder | `src/app/engaged/website/page.tsx`     | `/api/website-builder`        | Fetches redundant shell data |
| Guest List      | `src/app/engaged/guests/page.tsx`      | `/api/v2/engaged/guests`      | Fetches redundant shell data |
| Permissions     | `src/app/engaged/permissions/page.tsx` | `/api/v2/engaged/permissions` | Fetches redundant shell data |
| Memories        | `src/app/engaged/memories/page.tsx`    | None                          | **Missing shell data**       |
| Seating         | `src/app/engaged/seating/page.tsx`     | None                          | **Missing shell data**       |

---

## API Routes With Redundant Shell Data

The following API routes currently return duplicated `user`, `wedding`, and `subscriptionPlan` data that could be removed once the shell API is adopted.

### 1. `/api/v2/engaged/home-stats`

**File:** `src/app/api/(application)/v2/engaged/home-stats/route.ts`

**Redundant Fields:**

```typescript
user: {
  fullName: string;
  imageUrl: string | null;
  initials: string;
  email: string;
}
subscriptionPlan: string;
// wedding data spread across: weddingDate, weddingLocation, coupleNames
```

**Lines:** 75-84 (user), 49 (subscriptionPlan), 64-69 (wedding data)

---

### 2. `/api/v2/engaged/settings`

**File:** `src/app/api/(application)/v2/engaged/settings/route.ts`

**Redundant Fields:**

```typescript
user: {
  fullName: string;
  imageUrl: string | null;
  initials: string;
  email: string;
}
wedding: {
  displayName: string;
  nameA: string;
  nameB: string;
  eventDate: string | null;
}
subscriptionPlan: string;
```

**Lines:** 50-65 (user + wedding + subscriptionPlan)

---

### 3. `/api/website-builder`

**File:** `src/app/api/website-builder/route.ts`

**Redundant Fields:**

```typescript
user: {
  fullName: string;
  imageUrl: string | null;
  initials: string;
  email: string;
}
subscriptionPlan: string;
// wedding name data in: nameA, nameB
```

**Lines:** 60-69 (user), 46 (subscriptionPlan), 55-56 (names)

---

### 4. `/api/v2/engaged/guests`

**File:** `src/app/api/(application)/v2/engaged/guests/route.ts`

**Redundant Fields:**

```typescript
user: {
  fullName: string;
  imageUrl: string | null;
  initials: string;
  email: string;
}
wedding: {
  displayName: string;
  nameA: string;
  nameB: string;
  eventDate: string | null;
}
subscriptionPlan: string;
```

**Lines:** 93-108 (user + wedding + subscriptionPlan)

---

### 5. `/api/v2/engaged/permissions`

**File:** `src/app/api/(application)/v2/engaged/permissions/route.ts`

**Redundant Fields:**

```typescript
user: {
  fullName: string;
  imageUrl: string | null;
  initials: string;
  email: string;
}
wedding: {
  displayName: string;
  nameA: string;
  nameB: string;
  eventDate: string | null;
}
subscriptionPlan: string;
```

**Lines:** 108-124 (user + wedding + subscriptionPlan)

---

## Summary

| API Route                     | Redundant Data                          | Can Remove After Shell Adoption |
| ----------------------------- | --------------------------------------- | ------------------------------- |
| `/api/v2/engaged/home-stats`  | user, subscriptionPlan, partial wedding | ✅                              |
| `/api/v2/engaged/settings`    | user, wedding, subscriptionPlan         | ✅                              |
| `/api/website-builder`        | user, subscriptionPlan, nameA/nameB     | ✅                              |
| `/api/v2/engaged/guests`      | user, wedding, subscriptionPlan         | ✅                              |
| `/api/v2/engaged/permissions` | user, wedding, subscriptionPlan         | ✅                              |

**Total:** 5 API routes with redundant shell data
