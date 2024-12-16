import { z } from "zod";

export default z.object({
  porPagina: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((num) => num > 0,
      { message: 'O número de itens por página deve ser maior que 0.' }),
  pagina: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((num) => num > 0,
      { message: 'O número da página deve ser maior que 0.' }),
  ordenarPor: z.string().trim().min(2, 'A string deve conter pelo menos 2 caracteres.'),
  ordenarAsc: z.string()
    .refine(
      (val) => val.toLowerCase() === 'true' || val.toLowerCase() === 'false', // 
      {
        message: 'O valor de ordenarAsc deve ser um booleano.',
      }
    )
    .transform((val) => val.toLowerCase() === 'true'),
    
})