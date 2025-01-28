import { z } from "zod";

export default z.object({
	title: z.string().trim().min(1, "Mínimo 1 caracteres"),
	description: z.string().trim(),
});
