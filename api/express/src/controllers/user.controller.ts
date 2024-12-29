import { Request, Response, NextFunction } from 'express';

import { UserService } from '@services/user.service';
import { database } from '@config/database/config';
import { IResourceById } from '@interfaces/IResourceById';
import { IBaseResponse } from '@interfaces/IBaseResponse';
import { IPagination } from '@interfaces/IPagination';
import { User } from '@models/user.model';

export class UserController {
  private _userService: UserService;

  constructor() {
    this._userService = new UserService(database);
  }

  async getAll(req: Request<{}, {}, {}, IPagination>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { items, total } = await this._userService.getAll(req.query);

      const response: IBaseResponse<typeof items> = {
        data: items,
        metadata: {
          total,
          currentPage: req.query.page,
          totalPages: Math.ceil(total / req.query.perPage),
        },
      }

      res.json(response);
    } catch (error) {
      next(error)
    }
  }

  async getById(req: Request<IResourceById>, res: Response, next: NextFunction): Promise<void> {
    try{
      const id = req.params.id;
      const user = await this._userService.getById(id);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    }
    catch (error) {
      next(error);
    }
  }

  async create(req: Request<{}, {}, Omit<User, "id">>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email } = req.body;

      const hasEmail = await this._userService.getByEmail(email);
      if (hasEmail) {
        res.status(400).json({ message: 'Email já cadastrado' });
        return;
      }

      const newUser = await this._userService.create({ name, email });
      res.status(201).json(newUser);
    }
    catch (error) {
      next(error);
    }
  }

  async update(req: Request<IResourceById, {}, User>, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const { name, email } = req.body;

      const updatedUser = await this._userService.update(id, { name, email });
      res.json(updatedUser);
    }
    catch (error) {
      next(error);
    }
  }

  async delete(req: Request<IResourceById>, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      await this._userService.delete(id);
      res.status(204).send();
    }
    catch (error) {
      next(error);
    }
  }
}

export default new UserController();
