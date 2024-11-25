import { z } from "zod";

const schemaLesson004 = z.object({
  nome: z.string().trim().min(1).max(25),
  preco: z.number().min(0),
  quantidade: z.number().int().min(0),
  categoria: z.array(z.string()).min(1),
});

export default schemaLesson004;