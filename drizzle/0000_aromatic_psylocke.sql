-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "invitations" (
	"id" serial PRIMARY KEY NOT NULL,
	"wedding_id" integer,
	"invitation_name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "guests" (
	"id" serial PRIMARY KEY NOT NULL,
	"invitation_id" integer,
	"name" varchar(255) NOT NULL,
	"is_plus_one" boolean DEFAULT false,
	"alternative_names" text[],
	"rsvp_status" varchar(20) DEFAULT 'pending',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "weddingv2" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"wedding_date" text,
	"partner_a_name" text,
	"partner_b_name" text,
	"wedding_time" text,
	"custom_domain" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"venue_name" text,
	"venue_address_line_1" text,
	"venue_address_line_2" text,
	"city" text,
	"state" text,
	"zip" text,
	"country" text,
	"subdomain" text,
	"locale_en" text,
	"locale_es" text,
	CONSTRAINT "weddingv2_custom_domain_key" UNIQUE("custom_domain"),
	CONSTRAINT "weddingv2_base_domain_key" UNIQUE("subdomain")
);
--> statement-breakpoint
CREATE TABLE "wedding_owners" (
	"id" serial PRIMARY KEY NOT NULL,
	"wedding_id" integer NOT NULL,
	"clerk_user_id" text NOT NULL,
	"role" varchar(50) DEFAULT 'owner',
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "wedding_owners_wedding_id_clerk_user_id_key" UNIQUE("wedding_id","clerk_user_id")
);
--> statement-breakpoint
CREATE TABLE "weddings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "weddings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"wedding_date" text,
	"partner_a_name" text,
	"partner_b_name" text,
	"wedding_time" text,
	"custom_domain" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"venue_name" text,
	"venue_address" text,
	"subdomain" text,
	CONSTRAINT "weddings_custom_domain_key" UNIQUE("custom_domain"),
	CONSTRAINT "weddings_base_domain_key" UNIQUE("subdomain"),
	CONSTRAINT "weddings_subdomain_key" UNIQUE("subdomain")
);
--> statement-breakpoint
CREATE TABLE "invitationsv2" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"wedding_id" uuid,
	"invitation_name" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "guestsv2" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"invitation_id" uuid,
	"name" varchar(255) NOT NULL,
	"is_plus_one" boolean DEFAULT false,
	"alternative_names" text[],
	"rsvp_status" varchar(20) DEFAULT 'pending',
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "wedding_ownersv2" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"wedding_id" uuid NOT NULL,
	"clerk_user_id" text NOT NULL,
	"role" varchar(50) DEFAULT 'owner',
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "wedding_ownersv2_wedding_id_clerk_user_id_key" UNIQUE("wedding_id","clerk_user_id")
);
--> statement-breakpoint
ALTER TABLE "guests" ADD CONSTRAINT "guests_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "public"."invitations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wedding_owners" ADD CONSTRAINT "wedding_owners_wedding_id_fkey" FOREIGN KEY ("wedding_id") REFERENCES "public"."weddings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitationsv2" ADD CONSTRAINT "invitationsv2_wedding_id_fkey" FOREIGN KEY ("wedding_id") REFERENCES "public"."weddingv2"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guestsv2" ADD CONSTRAINT "guestsv2_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "public"."invitationsv2"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wedding_ownersv2" ADD CONSTRAINT "wedding_ownersv2_wedding_id_fkey" FOREIGN KEY ("wedding_id") REFERENCES "public"."weddingv2"("id") ON DELETE cascade ON UPDATE no action;
*/