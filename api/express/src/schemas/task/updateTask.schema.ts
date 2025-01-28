import { z } from "zod";

export default z.object({
	id: z.string().nanoid("ID inválido"),
	title: z.string().trim().min(1, "Mínimo 1 caractere"),
	description: z.string().trim(),
});
