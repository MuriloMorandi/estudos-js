import { sql } from "drizzle-orm";
import { integer } from "drizzle-orm/sqlite-core";

export const timestamps = {
    created_at: integer({mode: "timestamp_ms"}).notNull().$defaultFn(()=> sql`STRFTIME('%s', 'now')`),
    updated_at: integer({mode: "timestamp_ms"}),
}