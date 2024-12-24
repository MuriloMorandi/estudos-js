import { z } from "zod";

export default z.object({
  perPage: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((num) => num > 0,
      { message: 'O número de itens por página deve ser maior que 0.' }),
  page: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((num) => num > 0,
      { message: 'O número da página deve ser maior que 0.' }),
  sortBy: z.string().trim().min(2, 'A string deve conter pelo menos 2 caracteres.'),
  sortDesc: z.string()
    .refine(
      (val) => val.toLowerCase() === 'true' || val.toLowerCase() === 'false', 
      {
        message: 'O valor de ordenarAsc deve ser um booleano.',
      }
    )
    .transform((val) => val.toLowerCase() === 'true'),
    
})