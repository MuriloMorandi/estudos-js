import { aliasedTable, and, AnyColumn, asc, count, desc, eq  } from 'drizzle-orm';
import { LibSQLDatabase } from 'drizzle-orm/libsql';

import { IBaseService } from '@interfaces/IBaseService';
import { IPagination } from '@interfaces/IPagination';
import { tasks, users } from '@config/database/schema';
import { Task } from '@models/task.model';


export class TaskService implements IBaseService<Task, Task['id']> {
  private _database: LibSQLDatabase;

  constructor(databese: LibSQLDatabase) {
    this._database = databese
  }

  async getAll(data: IPagination): Promise<{ items: Task[], total: number }> {

    const colunaOrdenacao = <AnyColumn>(
      tasks[<keyof typeof tasks>data.sortBy]
    );
    
    const criadoPor = aliasedTable(users, 'criadoPor');
    const atualizadoPor = aliasedTable(users, 'atualizadoPor');

    const items = await this._database
      .select({
        id: tasks.id,
        title: tasks.title,
        description: tasks.description,
        created_by: criadoPor.name,
        criado_em: tasks.created_at,
        updated_by: atualizadoPor.name,
        atualizado_em: tasks.updated_at,
      })
      .from(tasks)
      .innerJoin(criadoPor, eq(criadoPor.id, tasks.created_by))
      .leftJoin(atualizadoPor, eq(atualizadoPor.id, tasks.updated_by ))
      .orderBy(
        data.sortDesc ? desc(colunaOrdenacao) : asc(colunaOrdenacao)
      )
      .limit(Number(data.perPage))
      .offset(Number(data.perPage) * (Number(data.page) - 1))
      .execute();

    const [total] = await this._database
      .select({ count: count() })
      .from(tasks)
      .execute();

    return { items, total: total.count };

  }

  async getById(id: Task['id']): Promise<Task | undefined> {
    
    const criadoPor = aliasedTable(users, 'criadoPor');
    const atualizadoPor = aliasedTable(users, 'atualizadoPor');

    const [ret] = await this._database
      .select({
        id: tasks.id,
        title: tasks.title,
        description: tasks.description,
        created_by: criadoPor.name,
        criado_em: tasks.created_at,
        updated_by: atualizadoPor.name,
        atualizado_em: tasks.updated_at
      })
      .from(tasks)
      .innerJoin(criadoPor, eq(tasks.created_by, criadoPor.id))
      .leftJoin(atualizadoPor, eq(tasks.updated_by, atualizadoPor.id))
      .where(eq(tasks.id, id))
      .limit(1)
      .execute();

    return ret;
  }

  async create(data:  typeof tasks.$inferInsert): Promise<Task> {
    const [ret] = await this._database
      .insert(tasks)
      .values(data)
      .returning()
      .execute();

    return ret;
  }

  async update(id: Task['id'], data: Partial<typeof tasks.$inferSelect> ): Promise<Task> {

    const [ret] = await this._database
      .update(tasks)
      .set({
        ...data,
        updated_at: new Date(),
      })
      .where(eq(tasks.id, id))
      .returning()
      .execute();

    return ret;

  }

  async delete(id: Task['id']): Promise<void> {
    await this._database
      .delete(tasks)
      .where(eq(tasks.id, id))
      .execute();
  }

}


