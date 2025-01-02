import { text, SQLiteTableWithColumns } from "drizzle-orm/sqlite-core";
import { users } from "../schema";

export const userAudit = {
  created_by: text("created_by").references(() => users.id ).notNull(),
  updated_by: text("updated_by").references(() => users.id ),
}

export const userAuditRelation = <T extends SQLiteTableWithColumns<any>>(
  one: any,
  table: T
) => ({
  created_by: one(users, {fields:[table.created_by], references:[users.id], notNull:true}),
  updated_by: one(users, { fields: [table.updated_by], references: [users.id] }),
})
