import { sql } from "drizzle-orm";
import { integer } from "drizzle-orm/sqlite-core";

export const timestamps = {
    criado_em: integer("criado_em", {
        mode: 'timestamp'
    }).notNull().default(sql`(unixepoch())`),
    atualizado_em: integer("atualizado_em", {
        mode: 'timestamp'
    }).default(sql`NULL`).$onUpdate(() => sql`(unixepoch())`),
}