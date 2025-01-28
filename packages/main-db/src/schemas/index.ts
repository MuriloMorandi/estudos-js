import { relations } from "drizzle-orm";
import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const users = sqliteTable("users", {
	id: text().primaryKey().$defaultFn(nanoid),
	name: text().notNull(),
	email: text().notNull().unique(),
});

export const usersRelations = relations(users, ({ many, one }) => ({
	taskDesignees: many(taskDesignees),
}));

export const tasks = sqliteTable("tasks", {
	id: text().primaryKey().$defaultFn(nanoid),
	title: text().notNull(),
	description: text(),
});

export const tasksRelations = relations(tasks, ({ many, one }) => ({
	taskDesignees: many(taskDesignees),
	taskComments: many(taskComments),
}));

export const taskDesignees = sqliteTable(
	"taskDesignees",
	{
		userId: text()
			.references(() => users.id)
			.notNull(),
		taskId: text()
			.references(() => tasks.id)
			.notNull(),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.userId, t.taskId] }),
	}),
);

export const taskDesigneesRelations = relations(taskDesignees, ({ many, one }) => ({
	tasks: one(tasks, {
		fields: [taskDesignees.taskId],
		references: [tasks.id],
	}),
	users: one(users, {
		fields: [taskDesignees.userId],
		references: [users.id],
	}),
}));

export const taskComments = sqliteTable("taskComments", {
	id: text().primaryKey().$defaultFn(nanoid),
	taskId: text().references(() => tasks.id),
	userId: text().references(() => users.id),
	describe: text().notNull(),
});

export const taskCommentsRelations = relations(taskComments, ({ many, one }) => ({
	tasks: one(tasks, {
		fields: [taskComments.taskId],
		references: [tasks.id],
	}),
	users: one(users, {
		fields: [taskComments.userId],
		references: [users.id],
	}),
}));
