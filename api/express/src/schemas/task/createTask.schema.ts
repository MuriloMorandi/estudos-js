import { z } from "zod";

export default z.object({
    titulo: z.string().trim().min(1, "Mínimo 1 caracteres"),
    descricao: z.string().trim(),
});
