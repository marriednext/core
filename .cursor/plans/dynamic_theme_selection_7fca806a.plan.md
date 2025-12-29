---
name: Dynamic Theme Selection
overview: Enable users to dynamically select and change their wedding website theme. The database field exists but isn't wired through the entire stack - we need to add it to types, data fetching, and create the selection UI.
todos:
  - id: add-type
    content: Add websiteTemplate to WeddingData type
    status: completed
  - id: fix-query
    content: Add websiteTemplate to getWeddingByDomain select query
    status: completed
    dependencies:
      - add-type
  - id: fix-tenant
    content: Use weddingData.websiteTemplate in tenant page instead of hardcoded value
    status: completed
    dependencies:
      - fix-query
  - id: extend-api
    content: Add websiteTemplate to website-builder PATCH schema
    status: completed
  - id: theme-selector
    content: Add theme selection UI for authenticated users in templates page
    status: completed
    dependencies:
      - extend-api
---

# Dynamic Theme Selection

The `websiteTemplate` database field exists but isn't fully wired. The tenant page currently hardcodes `"lisastheme"` instead of reading from the database.

## Current State

```mermaid
flowchart LR
    subgraph works [Working]
        DB[(Database<br/>websiteTemplate)]
        GCW[getCurrentWedding]
        API["/api/website"]
    end
    subgraph broken [Not Wired]
        GWBD[getWeddingByDomain]
        TYPE[WeddingData type]
        TENANT[Tenant Page]
    end
    DB --> GCW
    GCW --> API
    DB -.->|missing| GWBD
    GWBD -->|missing field| TYPE
    TYPE --> TENANT
    TENANT -->|hardcoded| HARD["lisastheme"]
```



## Changes Required

### 1. Add `websiteTemplate` to `WeddingData` type

[apps/webapp/src/lib/wedding/types.ts](apps/webapp/src/lib/wedding/types.ts) - Add the field to the type definition

### 2. Add `websiteTemplate` to `getWeddingByDomain()` query  

[apps/webapp/src/lib/wedding/getWeddingByDomain.ts](apps/webapp/src/lib/wedding/getWeddingByDomain.ts) - Include `websiteTemplate: wedding.websiteTemplate` in the select

### 3. Update tenant page to use dynamic theme

[apps/webapp/src/app/(tenant)/tenant/[domain]/page.tsx](apps/webapp/src/app/(tenant)/tenant/[domain]/page.tsx) - Change hardcoded `"lisastheme"` to `weddingData.websiteTemplate ?? "lisastheme"`

### 4. Add `websiteTemplate` to the website-builder PATCH schema

[apps/webapp/src/app/api/website-builder/route.ts](apps/webapp/src/app/api/website-builder/route.ts) - Extend `patchBodySchema` to accept `websiteTemplate` and update the DB

### 5. Create theme selector in templates page (for authenticated users)

[apps/webapp/src/components/application/templates/TemplatesGrid.tsx](apps/webapp/src/components/application/templates/TemplatesGrid.tsx) - Add selection functionality that calls the API when a user picks a theme

## Implementation Notes

- `ThemeId` type already exists: `"lisastheme" | "tuscanbloom"`