
import { integer, pgTable, varchar, timestamp, boolean, uuid } from "drizzle-orm/pg-core";
import { application, response } from "express";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),

  firsname: varchar({ length: 255 }).notNull(),
  lastname: varchar({ length: 255 }),
  
  email: varchar({ length: 255 }).notNull().unique(),
  email_verifyed: boolean().default(false),
  
  password: varchar({ length: 255 }).notNull(),

  image_url: varchar({ length: 255 }),
  is_active: boolean().default(true),

  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow()
});

export const microservicesTable = pgTable("microservices", {
    application_id: uuid().primaryKey().defaultRandom(),

    application_name: varchar({ length: 255 }).notNull(),

    redirect_uri: varchar({ length: 255 }).notNull(),
    app_host_link: varchar({ length: 255 }),

    client_id: varchar({ length: 255 }).notNull().unique(),
    client_secret: varchar({ length: 255 }).notNull(),

    response_type: varchar({ length: 255 }),
    status: boolean().default(true),


    created_at: timestamp().defaultNow(),
    updated_at: timestamp().defaultNow()
});
