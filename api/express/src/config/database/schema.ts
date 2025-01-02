import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { timestamps } from './helpers/columns.timestamps';
import { userAudit, userAuditRelation } from './helpers/columns.userAudit';
import { relations } from 'drizzle-orm';
import { nanoid } from 'nanoid'


export const users = sqliteTable('users', {
  id: text('id').primaryKey().$default(()=> nanoid()),
  name: text('name').notNull(),
  email: text('email').notNull(),
  ...timestamps,
});

export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey().$default(()=> nanoid()),
  title: text('title').notNull(),
  description: text('description'),
  ...userAudit,
  ...timestamps,
});

export const tasksRelations = relations(tasks, ({ many, one }) => ({
  ...userAuditRelation(one, tasks),
}));


export const comments = sqliteTable('tasks', {
  id: text('id').primaryKey().$default(()=> nanoid()),
  
  title: text('title').notNull(),
  description: text('description'),
  
  ...timestamps,
});

