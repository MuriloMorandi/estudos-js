import { text, SQLiteTableWithColumns } from "drizzle-orm/sqlite-core";
import { tasks, users } from "../schema";

export const userAudit = {
  criado_por: text("criado_por").references(() => users.id ).notNull(),
  atualizado_por: text("atualizado_por").references(() => users.id ),
}

export const userAuditRelation = <T extends SQLiteTableWithColumns<any>>(
  one: any,
  table: T
) => ({
  criado_por: one(users, {fields:[table.criado_por], references:[users.id], notNull:true}),
  atualizado_por: one(users, { fields: [table.atualizado_por], references: [users.id] }),
})
