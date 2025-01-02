import express, { Request, Response } from 'express';
import cors from 'cors';

import errorHandler from '@middlewares/errorHandle.middleware';
import userRoutes from '@routes/user.routes';
import taskRoutes from '@routes/task.routes';

export const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing de JSON
app.use(express.json());
app.use(cors())

// Rota inicial
app.get('/', (req: Request, res: Response) => {
  res.send('API está rodando!');
});

app.use('/users', userRoutes);
app.use('/task', taskRoutes);

app.use(errorHandler);

// Inicia o servidor
app.listen(PORT, () => {
  console.info(`Servidor rodando na porta ${PORT}`);
});
