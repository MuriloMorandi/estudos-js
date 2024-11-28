import { z } from "zod";

const addressSchema = z.object({
  rua: z.string(),
  numero: z.number().positive(),
  bairro: z.string(),
  cidade: z.string(),
  cep: z.string().regex(/^\d{5}-?\d{3}$/, "CEP inválido"),
});

const schemaLesson007 = z.object({
  nome: z.object({
    id: z.string().uuid(),
    nome: z.string(),
  }),
  enderecos: z.array(addressSchema),
});

export default schemaLesson007;