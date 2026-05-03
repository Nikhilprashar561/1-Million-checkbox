CREATE TABLE "microservices" (
	"application_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_name" varchar(255) NOT NULL,
	"redirect_uri" varchar(255) NOT NULL,
	"app_host_link" varchar(255),
	"client_id" varchar(255) NOT NULL,
	"client_secret" varchar(255) NOT NULL,
	"response_type" varchar(255),
	"status" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "microservices_client_id_unique" UNIQUE("client_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"firsname" varchar(255) NOT NULL,
	"lastname" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verifyed" boolean DEFAULT false,
	"password" varchar(255) NOT NULL,
	"image_url" varchar(255),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
