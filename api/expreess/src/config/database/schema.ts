import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey().unique(),
  name: text('name').notNull(),
  email: text('email').notNull()
});
