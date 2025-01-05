import { LibsqlError } from '@libsql/client';
import { ErrorRequestHandler } from 'express';
 

// Middleware de tratamento de erros
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    
    if (err instanceof LibsqlError)
    {
        res.status(500).json({
            message: 'Ocorreu um erro com o banco de dados.',
            details: err.message,
        });
    }
    else
    {    
        res.status(500).json({
            message: 'Ocorreu um erro no servidor.',
            error: err.message,
        });
    }
    
    
};

export default errorHandler;
