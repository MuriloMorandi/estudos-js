import { z } from "zod";

export default z.object({
	name: z.string().trim().min(2, "Mínimo 2 caracteres"),
	email: z.string().email("E-mail inválido"),
});
