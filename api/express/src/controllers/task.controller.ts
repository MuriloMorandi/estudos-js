import { Request, Response, NextFunction } from "express";
import { dbClient } from "@estudos/main-db";

import { TaskService } from "@services/task.service";
import { IResourceById } from "@interfaces/IResourceById";
import { IBaseResponse } from "@interfaces/IBaseResponse";
import { IPagination } from "@interfaces/IPagination";
import { Task } from "@models/task.model";

export class TaskController {
	private _taskService: TaskService;

	constructor() {
		this._taskService = new TaskService(dbClient);
	}

	async getAll(req: Request<{}, {}, {}, IPagination>, res: Response, next: NextFunction): Promise<void> {
		try {
			const { items, total } = await this._taskService.getAll(req.query);

			const response: IBaseResponse<typeof items> = {
				data: items,
				metadata: {
					total,
					currentPage: req.query.page,
					totalPages: Math.ceil(total / req.query.perPage),
				},
			};

			res.json(response);
		} catch (error) {
			next(error);
		}
	}

	async getById(req: Request<IResourceById>, res: Response, next: NextFunction): Promise<void> {
		try {
			const id = req.params.id;
			const task = await this._taskService.getById(id);

			if (!task) {
				res.status(404).json({ message: "Task not found" });
			}

			res.json(task);
		} catch (error) {
			next(error);
		}
	}

	async create(req: Request<{}, {}, Omit<Task, "id">>, res: Response, next: NextFunction): Promise<void> {
		try {
			const { description, title } = req.body;

			const newTask = await this._taskService.create({ description, title, created_by: "8lNQXuP9RBm81yPOZbOsr" });
			res.status(201).json(newTask);
		} catch (error) {
			next(error);
		}
	}

	async update(req: Request<IResourceById, {}, Omit<Task, "id">>, res: Response, next: NextFunction): Promise<void> {
		try {
			const id = req.params.id;
			const { description, title } = req.body;

			const updatedUser = await this._taskService.update(id, {
				description,
				title,
				updated_by: "8lNQXuP9RBm81yPOZbOsr",
			});
			res.json(updatedUser);
		} catch (error) {
			next(error);
		}
	}

	async delete(req: Request<IResourceById>, res: Response, next: NextFunction): Promise<void> {
		try {
			const id = req.params.id;
			await this._taskService.delete(id);
			res.status(204).send();
		} catch (error) {
			next(error);
		}
	}
}

export default new TaskController();
