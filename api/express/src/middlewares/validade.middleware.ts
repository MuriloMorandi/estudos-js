import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export default <T extends 'body' | 'query' | 'params'>(
    schema: ZodSchema,
    dataSource: T = 'body' as T
  ) => {
  return async (
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = req[dataSource];
      schema.parse(data);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          errors: error.errors.map((e) => ({ path: e.path, message: e.message })),
        });
        return;
      }
      next(error);
    }
  };
};
