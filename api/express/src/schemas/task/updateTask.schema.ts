import { z } from "zod";

export default z.object({
    id: z.string().nanoid("ID inválido"),
    titulo: z.string().trim().min(1, "Mínimo 1 caracteres"),
    descricao: z.string().trim(),
});
