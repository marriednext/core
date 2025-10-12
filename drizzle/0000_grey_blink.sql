-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "guest" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"wedding_id" uuid,
	"date_entry_submitted" timestamp DEFAULT now(),
	"name_on_invitation" text NOT NULL,
	"is_attending" boolean,
	"has_plus_one" boolean,
	CONSTRAINT "uq_guest_name" UNIQUE("name_on_invitation")
);
--> statement-breakpoint
CREATE TABLE "invitation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"wedding_id" uuid,
	"guest_a" text NOT NULL,
	"guest_b" text,
	"guest_c" text,
	"guest_d" text,
	"guest_e" text,
	"guest_f" text,
	"guest_g" text,
	"guest_h" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_updated_at" timestamp DEFAULT now() NOT NULL,
	"invite_group_name" text
);
--> statement-breakpoint
CREATE TABLE "wedding" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"subdomain" text,
	"custom_domain" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"labels_en" jsonb,
	"labels_es" jsonb,
	CONSTRAINT "weddings_subdomain_unique" UNIQUE("subdomain"),
	CONSTRAINT "weddings_custom_domain_unique" UNIQUE("custom_domain")
);
--> statement-breakpoint
ALTER TABLE "guest" ADD CONSTRAINT "fk_guest_wedding" FOREIGN KEY ("wedding_id") REFERENCES "public"."wedding"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "fk_invitation_wedding" FOREIGN KEY ("wedding_id") REFERENCES "public"."wedding"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "fk_guest_a" FOREIGN KEY ("guest_a") REFERENCES "public"."guest"("name_on_invitation") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "fk_guest_b" FOREIGN KEY ("guest_b") REFERENCES "public"."guest"("name_on_invitation") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "fk_guest_c" FOREIGN KEY ("guest_c") REFERENCES "public"."guest"("name_on_invitation") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "fk_guest_d" FOREIGN KEY ("guest_d") REFERENCES "public"."guest"("name_on_invitation") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "fk_guest_e" FOREIGN KEY ("guest_e") REFERENCES "public"."guest"("name_on_invitation") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "fk_guest_f" FOREIGN KEY ("guest_f") REFERENCES "public"."guest"("name_on_invitation") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "fk_guest_g" FOREIGN KEY ("guest_g") REFERENCES "public"."guest"("name_on_invitation") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "fk_guest_h" FOREIGN KEY ("guest_h") REFERENCES "public"."guest"("name_on_invitation") ON DELETE cascade ON UPDATE cascade;
*/