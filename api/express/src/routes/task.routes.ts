import { Router } from 'express';

import taskController from '@controllers/task.controller';
import validate  from '@middlewares/validade.middleware';
import paginationSchema from '@schemas/common/pagination.schema';
import createTaskSchema from '@schemas/task/createTask.schema';
import updateTaskSchema from '@schemas/task/updateTask.schema';


const taskRoutes = Router();

taskRoutes.get('/',
    validate(paginationSchema, 'query'),
    taskController.getAll.bind(taskController)
);

taskRoutes.get('/:id',
    taskController.getById.bind(taskController)
);

taskRoutes.post('/',
    validate(createTaskSchema, 'body'),
    taskController.create.bind(taskController)
);

taskRoutes.put('/:id',
    validate(updateTaskSchema, 'body'),
    taskController.update.bind(taskController)
);

taskRoutes.delete('/:id',
    taskController.delete.bind(taskController)
);

export default taskRoutes;
