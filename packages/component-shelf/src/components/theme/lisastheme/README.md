# Lisa's Theme

A timeless, classic wedding website template.

## Structure

```
lisastheme/
├── LisasTheme.tsx      # Parent component - wires all sections together
├── types.ts            # TypeScript interfaces for all components
├── HeroSection.tsx     # Full-screen hero with names and date
├── CountdownSection.tsx # Live countdown to the wedding
├── OurStorySection.tsx # Timeline of the couple's journey
├── EventDetailsSection.tsx # Ceremony, venue, and dress code
├── GallerySection.tsx  # Photo grid
├── RsvpSection.tsx     # RSVP form or custom component slot
├── FaqSection.tsx      # Expandable FAQ accordion
├── RegistrySection.tsx # Links to gift registries
├── FooterSection.tsx   # Closing section with couple info
└── StickyNav.tsx       # Fixed navigation bar
```

## Phase 1: Data & Customization Props

Components separate **required database data** from **optional customizations**:

### `data` - Database Fields

Values that come from your database. Required for the component to function.

```tsx
<HeroSection
  data={{
    nameA: "Lisa",
    nameB: "Matthew",
    eventDate: "2026-07-26",
    location: "Napa Valley",
  }}
/>
```

### `customization` - Optional Overrides

Labels and style tweaks. All have sensible defaults.

```tsx
<HeroSection
  data={{ nameA: "Lisa", nameB: "Matthew" }}
  customization={{
    subtitleLabel: "We're Getting Married!",
  }}
/>
```

## Phase 2: Editable Labels

Add inline editing for customization labels. Useful for building WYSIWYG editors.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `editable` | `boolean` | When `true`, labels show edit affordances |
| `onCustomizationChange` | `(key, value) => void` | Callback when a label is edited |

### Usage

```tsx
<HeroSection
  data={{ nameA: "Lisa", nameB: "Matthew" }}
  editable={true}
  onCustomizationChange={(key, value) => {
    console.log(`Changed ${key} to ${value}`);
  }}
/>
```

### Parent Orchestration

`LisasTheme` passes editable props to all children with section prefixes:

```tsx
<LisasTheme
  fieldNameA="Lisa"
  fieldNameB="Matthew"
  editable={true}
  onCustomizationChange={(section, key, value) => {
    console.log(`${section}.${key} = ${value}`);
  }}
/>
```

## Type Interfaces

Each component with database data has three interfaces in `types.ts`:

| Interface | Purpose | JSDoc Tag |
|-----------|---------|-----------|
| `*Data` | Database-required fields | `@database` |
| `*Customization` | Optional label/style overrides | `@customizable` |
| `*Props` | Combined props interface | - |

## Components Without Database Data

Some sections don't require database data - they're purely presentational with customizable content:

- `StickyNav` - Navigation labels
- `RegistrySection` - Registry links

These use only `customization?` without a `data` prop.

## Default Labels

All label defaults are defined in `labels.ts`. To customize:

1. Override via the `customization` prop at runtime
2. Or modify `labels.ts` for global changes

## Adding a New Section

1. Create `*Data` interface in `types.ts` (if DB data needed)
2. Create `*Customization` interface with label fields
3. Create `*Props` with `editable` and `onCustomizationChange`
4. Build component with `EditableLabel` wrapping customization labels
5. Add to `LisasTheme.tsx` with data and editable props passed from parent
