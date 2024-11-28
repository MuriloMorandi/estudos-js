import { z } from "zod";

const baseUserSchemaLesson008 = z.object({
  username: z.string().min(2),
  nome: z.string(),
});

const schemaLesson008 = baseUserSchemaLesson008.merge(z.object({
  role: z.enum(["admin", 'user'])
}))

export default schemaLesson008;