import { describe, it, expect } from "vitest";
import {
  extractGuestNames,
  getDefaultDisplayName,
  getDisplayName,
  mapGuestFieldsToObject,
} from "./guestNames";
import { DbInvitationGroup } from "@/database/drizzle";

const createMockEntry = (
  partial: Partial<DbInvitationGroup>
): DbInvitationGroup => ({
  id: 1,
  guestA: "John Doe",
  guestB: null,
  guestC: null,
  guestD: null,
  guestE: null,
  guestF: null,
  guestG: null,
  guestH: null,
  createdAt: "2024-01-01T00:00:00Z",
  lastUpdatedAt: "2024-01-01T00:00:00Z",
  inviteGroupName: null,
  ...partial,
});

describe("extractGuestNames", () => {
  it("should extract single guest name", () => {
    const entry = createMockEntry({
      guestA: "John Doe",
    });
    expect(extractGuestNames(entry)).toEqual(["John Doe"]);
  });

  it("should extract multiple guest names", () => {
    const entry = createMockEntry({
      guestA: "John Doe",
      guestB: "Jane Smith",
      guestC: "Bob Johnson",
    });
    expect(extractGuestNames(entry)).toEqual([
      "John Doe",
      "Jane Smith",
      "Bob Johnson",
    ]);
  });

  it("should filter out null values", () => {
    const entry = createMockEntry({
      guestA: "John Doe",
      guestB: null,
      guestC: "Jane Smith",
      guestD: null,
    });
    expect(extractGuestNames(entry)).toEqual(["John Doe", "Jane Smith"]);
  });

  it("should return all 8 guests when present", () => {
    const entry = createMockEntry({
      guestA: "Guest A",
      guestB: "Guest B",
      guestC: "Guest C",
      guestD: "Guest D",
      guestE: "Guest E",
      guestF: "Guest F",
      guestG: "Guest G",
      guestH: "Guest H",
    });
    expect(extractGuestNames(entry)).toEqual([
      "Guest A",
      "Guest B",
      "Guest C",
      "Guest D",
      "Guest E",
      "Guest F",
      "Guest G",
      "Guest H",
    ]);
  });

  it("should return empty array when only guestA is required but empty string", () => {
    const entry = createMockEntry({
      guestA: "",
    });
    expect(extractGuestNames(entry)).toEqual([""]);
  });
});

describe("getDefaultDisplayName", () => {
  it("should return single guest name", () => {
    const entry = createMockEntry({
      guestA: "John Doe",
    });
    expect(getDefaultDisplayName(entry)).toBe("John Doe");
  });

  it("should return two guests with ampersand", () => {
    const entry = createMockEntry({
      guestA: "John Doe",
      guestB: "Jane Smith",
    });
    expect(getDefaultDisplayName(entry)).toBe("John Doe & Jane Smith");
  });

  it("should return first guest and count for 3+ guests", () => {
    const entry = createMockEntry({
      guestA: "John Doe",
      guestB: "Jane Smith",
      guestC: "Bob Johnson",
    });
    expect(getDefaultDisplayName(entry)).toBe("John Doe & 2 others");
  });

  it("should handle 8 guests", () => {
    const entry = createMockEntry({
      guestA: "Guest A",
      guestB: "Guest B",
      guestC: "Guest C",
      guestD: "Guest D",
      guestE: "Guest E",
      guestF: "Guest F",
      guestG: "Guest G",
      guestH: "Guest H",
    });
    expect(getDefaultDisplayName(entry)).toBe("Guest A & 7 others");
  });

  it("should return first guest and count for 4 guests", () => {
    const entry = createMockEntry({
      guestA: "Alice",
      guestB: "Bob",
      guestC: "Charlie",
      guestD: "David",
    });
    expect(getDefaultDisplayName(entry)).toBe("Alice & 3 others");
  });

  it("should handle sparse guest list", () => {
    const entry = createMockEntry({
      guestA: "First Guest",
      guestB: null,
      guestC: null,
      guestD: "Fourth Guest",
      guestE: "Fifth Guest",
    });
    expect(getDefaultDisplayName(entry)).toBe("First Guest & 2 others");
  });
});

describe("getDisplayName", () => {
  it("should return inviteGroupName when present", () => {
    const entry = createMockEntry({
      guestA: "John Doe",
      guestB: "Jane Smith",
      inviteGroupName: "The Doe Family",
    });
    expect(getDisplayName(entry)).toBe("The Doe Family");
  });

  it("should fallback to default display name when inviteGroupName is null", () => {
    const entry = createMockEntry({
      guestA: "John Doe",
      guestB: "Jane Smith",
      inviteGroupName: null,
    });
    expect(getDisplayName(entry)).toBe("John Doe & Jane Smith");
  });

  it("should prefer inviteGroupName over guest names", () => {
    const entry = createMockEntry({
      guestA: "Guest A",
      guestB: "Guest B",
      guestC: "Guest C",
      inviteGroupName: "Custom Group Name",
    });
    expect(getDisplayName(entry)).toBe("Custom Group Name");
  });

  it("should handle empty inviteGroupName string as falsy", () => {
    const entry = createMockEntry({
      guestA: "John Doe",
      inviteGroupName: "",
    });
    expect(getDisplayName(entry)).toBe("John Doe");
  });
});

describe("mapGuestFieldsToObject", () => {
  it("should map single guest to guestA", () => {
    const guests = ["John Doe"];
    expect(mapGuestFieldsToObject(guests)).toEqual({
      guestA: "John Doe",
      guestB: null,
      guestC: null,
      guestD: null,
      guestE: null,
      guestF: null,
      guestG: null,
      guestH: null,
    });
  });

  it("should map multiple guests to respective fields", () => {
    const guests = ["Guest A", "Guest B", "Guest C"];
    expect(mapGuestFieldsToObject(guests)).toEqual({
      guestA: "Guest A",
      guestB: "Guest B",
      guestC: "Guest C",
      guestD: null,
      guestE: null,
      guestF: null,
      guestG: null,
      guestH: null,
    });
  });

  it("should map all 8 guests", () => {
    const guests = [
      "Guest A",
      "Guest B",
      "Guest C",
      "Guest D",
      "Guest E",
      "Guest F",
      "Guest G",
      "Guest H",
    ];
    expect(mapGuestFieldsToObject(guests)).toEqual({
      guestA: "Guest A",
      guestB: "Guest B",
      guestC: "Guest C",
      guestD: "Guest D",
      guestE: "Guest E",
      guestF: "Guest F",
      guestG: "Guest G",
      guestH: "Guest H",
    });
  });

  it("should handle empty array", () => {
    const guests: (string | null)[] = [];
    expect(mapGuestFieldsToObject(guests)).toEqual({
      guestA: null,
      guestB: null,
      guestC: null,
      guestD: null,
      guestE: null,
      guestF: null,
      guestG: null,
      guestH: null,
    });
  });

  it("should handle array with null values", () => {
    const guests = ["Guest A", null, "Guest C", null];
    expect(mapGuestFieldsToObject(guests)).toEqual({
      guestA: "Guest A",
      guestB: null,
      guestC: "Guest C",
      guestD: null,
      guestE: null,
      guestF: null,
      guestG: null,
      guestH: null,
    });
  });

  it("should ignore extra guests beyond H", () => {
    const guests = [
      "Guest A",
      "Guest B",
      "Guest C",
      "Guest D",
      "Guest E",
      "Guest F",
      "Guest G",
      "Guest H",
      "Guest I",
      "Guest J",
    ];
    expect(mapGuestFieldsToObject(guests)).toEqual({
      guestA: "Guest A",
      guestB: "Guest B",
      guestC: "Guest C",
      guestD: "Guest D",
      guestE: "Guest E",
      guestF: "Guest F",
      guestG: "Guest G",
      guestH: "Guest H",
    });
  });

  it("should handle array with undefined values", () => {
    const guests = ["Guest A", undefined, "Guest C"] as (string | null)[];
    expect(mapGuestFieldsToObject(guests)).toEqual({
      guestA: "Guest A",
      guestB: null,
      guestC: "Guest C",
      guestD: null,
      guestE: null,
      guestF: null,
      guestG: null,
      guestH: null,
    });
  });
});

