import { Request, Response } from 'express';

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

  async getAll(req: Request<{}, {}, {}, IPagination>, res: Response): Promise<void> {
    try
    {
      const {items, total} = await this._userService.getAll(req.query);
      
      const response: IBaseResponse<typeof items> = {
        data: items,
        metadata: {
          total,
          currentPage: req.query.pagina,
          totalPages : Math.ceil(total / req.query.porPagina),
        },
      }

      res.json(response);
    }
    catch (error)
    {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getById(req: Request<IResourceById>, res: Response): Promise<void> {
    const id = req.params.id;
    const user = await this._userService.getById(id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }

  async create(req: Request<{}, {}, Omit<User, "id">>, res: Response): Promise<void> {
    const { name, email } = req.body;

    const hasEmail = await this._userService.getByEmail(email);
    if (hasEmail)
    {
      res.status(400).json({ message: 'Email já cadastrado' });
      return;
    }

    const newUser = await this._userService.create({ name, email });
    res.status(201).json(newUser);
  }
   
  async update(req: Request<IResourceById, {}, User>, res: Response): Promise<void> {
    const id = req.params.id;
    const { name, email } = req.body;

    try
    { 
      const updatedUser = await this._userService.update(id, { name, email });
      res.json(updatedUser);
    }
    catch (error)
    {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async delete(req: Request<IResourceById>, res: Response): Promise<void> {
    const id = req.params.id;

    await this._userService.delete(id);
    res.status(204).send();
  }
}

export default new UserController();
