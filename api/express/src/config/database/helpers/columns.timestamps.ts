import { sql } from "drizzle-orm";
import { integer } from "drizzle-orm/sqlite-core";

export const timestamps = {
    created_at: integer("created_at", {
        mode: 'timestamp'
    }).notNull().default(sql`(unixepoch())`),
    updated_at: integer("updated_at", {
        mode: 'timestamp'
    }).default(sql`NULL`).$onUpdate(() => sql`(unixepoch())`),
}