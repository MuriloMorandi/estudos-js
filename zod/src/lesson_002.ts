import { z } from "zod";

const schemaLesson002 = z.object({
  nome: z.string().trim().min(1).max(25),
  idade: z.number().min(18),
  email: z.string().email(),
  apelido : z.string().trim().min(2).optional()
});

export default schemaLesson002;