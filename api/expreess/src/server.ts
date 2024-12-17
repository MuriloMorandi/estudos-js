import express, { Request, Response } from 'express';
import userRoutes from '@routes/user.routes';
import errorHandler from '@middlewares/errorHandle.middleware';

export const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing de JSON
app.use(express.json());

// Rota inicial
app.get('/', (req: Request, res: Response) => {
  res.send('API está rodando!');
});

app.use('/users', userRoutes);

app.use(errorHandler);

// Inicia o servidor
app.listen(PORT, () => {
  console.info(`Servidor rodando na porta ${PORT}`);
});