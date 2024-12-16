import { z } from "zod";

export default z.object({
    id: z.number().int().min(1, "ID inválido"),
    name: z.string().trim().min(2, "Mínimo 2 caracteres"),
    email: z.string().email("E-mail inválido")
});
