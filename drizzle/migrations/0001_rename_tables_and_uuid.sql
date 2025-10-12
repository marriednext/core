-- Migration: Rename tables and convert IDs to UUID
-- WARNING: This is a breaking change that will require downtime
-- IMPORTANT: Back up your database before running this migration

-- Step 1: Drop the old telemetry table (no longer needed)
DROP TABLE IF EXISTS "admin_telemetry_events" CASCADE;

-- Step 2: Create new wedding table
CREATE TABLE IF NOT EXISTS "weddings" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "subdomain" TEXT UNIQUE,
  "custom_domain" TEXT UNIQUE,
  "created_at" TIMESTAMP DEFAULT now() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT now() NOT NULL
);

-- Step 3: Create temporary tables with new structure
CREATE TABLE IF NOT EXISTS "guest_temp" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "wedding_id" UUID REFERENCES "weddings"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "date_entry_submitted" TIMESTAMP DEFAULT now(),
  "name_on_invitation" TEXT NOT NULL,
  "is_attending" BOOLEAN,
  "has_plus_one" BOOLEAN,
  CONSTRAINT "uq_guest_name" UNIQUE("name_on_invitation")
);

CREATE TABLE IF NOT EXISTS "invitation_temp" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "wedding_id" UUID REFERENCES "weddings"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "guest_a" TEXT NOT NULL,
  "guest_b" TEXT,
  "guest_c" TEXT,
  "guest_d" TEXT,
  "guest_e" TEXT,
  "guest_f" TEXT,
  "guest_g" TEXT,
  "guest_h" TEXT,
  "created_at" TIMESTAMP DEFAULT now() NOT NULL,
  "last_updated_at" TIMESTAMP DEFAULT now() NOT NULL,
  "invite_group_name" TEXT,
  CONSTRAINT "fk_invitation_wedding" FOREIGN KEY ("wedding_id") REFERENCES "weddings"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "fk_guest_a" FOREIGN KEY ("guest_a") REFERENCES "guest_temp"("name_on_invitation") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "fk_guest_b" FOREIGN KEY ("guest_b") REFERENCES "guest_temp"("name_on_invitation") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "fk_guest_c" FOREIGN KEY ("guest_c") REFERENCES "guest_temp"("name_on_invitation") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "fk_guest_d" FOREIGN KEY ("guest_d") REFERENCES "guest_temp"("name_on_invitation") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "fk_guest_e" FOREIGN KEY ("guest_e") REFERENCES "guest_temp"("name_on_invitation") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "fk_guest_f" FOREIGN KEY ("guest_f") REFERENCES "guest_temp"("name_on_invitation") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "fk_guest_g" FOREIGN KEY ("guest_g") REFERENCES "guest_temp"("name_on_invitation") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "fk_guest_h" FOREIGN KEY ("guest_h") REFERENCES "guest_temp"("name_on_invitation") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Step 4: Create a default wedding for existing data
INSERT INTO "weddings" ("id", "subdomain", "created_at", "updated_at")
VALUES (gen_random_uuid(), 'default', now(), now())
ON CONFLICT DO NOTHING;

-- Step 5: Migrate data from invitations to guest_temp
INSERT INTO "guest_temp" ("id", "wedding_id", "date_entry_submitted", "name_on_invitation", "is_attending", "has_plus_one")
SELECT 
  gen_random_uuid(),
  (SELECT "id" FROM "weddings" WHERE "subdomain" = 'default' LIMIT 1),
  "date_entry_submitted",
  "name_on_invitation",
  "is_attending",
  "has_plus_one"
FROM "invitations";

-- Step 6: Migrate data from invitation_groups to invitation_temp
INSERT INTO "invitation_temp" ("id", "wedding_id", "guest_a", "guest_b", "guest_c", "guest_d", "guest_e", "guest_f", "guest_g", "guest_h", "created_at", "last_updated_at", "invite_group_name")
SELECT 
  gen_random_uuid(),
  (SELECT "id" FROM "weddings" WHERE "subdomain" = 'default' LIMIT 1),
  "guest_a",
  "guest_b",
  "guest_c",
  "guest_d",
  "guest_e",
  "guest_f",
  "guest_g",
  "guest_h",
  "created_at",
  "last_updated_at",
  "invite_group_name"
FROM "invitation_groups";

-- Step 7: Drop old tables
DROP TABLE IF EXISTS "invitation_groups" CASCADE;
DROP TABLE IF EXISTS "invitations" CASCADE;

-- Step 8: Rename temporary tables to final names
ALTER TABLE "guest_temp" RENAME TO "guest";
ALTER TABLE "invitation_temp" RENAME TO "invitation";

-- Step 9: Add indexes for performance
CREATE INDEX IF NOT EXISTS "idx_guest_wedding_id" ON "guest"("wedding_id");
CREATE INDEX IF NOT EXISTS "idx_guest_name" ON "guest"("name_on_invitation");
CREATE INDEX IF NOT EXISTS "idx_invitation_wedding_id" ON "invitation"("wedding_id");
CREATE INDEX IF NOT EXISTS "idx_invitation_created_at" ON "invitation"("created_at");
CREATE INDEX IF NOT EXISTS "idx_invitation_updated_at" ON "invitation"("last_updated_at");

-- Migration complete

