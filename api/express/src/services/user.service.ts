import { AnyColumn, asc, count, desc, eq } from "drizzle-orm";
import { LibSQLDatabase } from "drizzle-orm/libsql";
import { users } from "@estudos/main-db";

import { IBaseService } from "@interfaces/IBaseService";
import { IPagination } from "@interfaces/IPagination";
import { User } from "@models/user.model";

export class UserService implements IBaseService<User, User["id"]> {
	private _database: LibSQLDatabase;

	constructor(databese: LibSQLDatabase) {
		this._database = databese;
	}

	async getAll(data: IPagination): Promise<{ items: User[]; total: number }> {
		const colunaOrdenacao = <AnyColumn>users[<keyof typeof users>data.sortBy];

		const items = await this._database
			.select()
			.from(users)
			.orderBy(data.sortDesc ? desc(colunaOrdenacao) : asc(colunaOrdenacao))
			.limit(Number(data.perPage))
			.offset(Number(data.perPage) * (Number(data.page) - 1))
			.execute();

		const [total] = await this._database.select({ count: count() }).from(users).execute();

		return { items, total: total.count };
	}

	async getById(id: User["id"]): Promise<User | undefined> {
		const [ret] = await this._database.select().from(users).where(eq(users.id, id)).limit(1).execute();

		return ret;
	}

	async create(data: Omit<User, "id">): Promise<User> {
		const [ret] = await this._database.insert(users).values(data).returning().execute();

		return ret;
	}

	async update(id: User["id"], data: Partial<User>): Promise<User> {
		const [ret] = await this._database
			.update(users)
			.set({
				name: data.name,
				email: data.email,
				updated_at: new Date(),
			})
			.where(eq(users.id, id))
			.returning()
			.execute();

		return ret;
	}

	async delete(id: User["id"]): Promise<void> {
		await this._database.delete(users).where(eq(users.id, id)).execute();
	}

	async getByEmail(email: User["email"]): Promise<User | undefined> {
		const ret = await this._database.select().from(users).where(eq(users.email, email)).limit(1).execute();

		return ret[0];
	}
}
