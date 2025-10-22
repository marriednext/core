DO $$ BEGIN
 CREATE TYPE "public"."rsvp_name_format" AS ENUM('FIRST_NAME_ONLY', 'FULL_NAME');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "invitation" ADD COLUMN "email" text;

ALTER TABLE "wedding" ADD COLUMN "control_rsvp_name_format" "rsvp_name_format" DEFAULT 'FULL_NAME' NOT NULL;

