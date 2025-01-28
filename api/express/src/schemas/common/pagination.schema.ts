import { z } from "zod";

export default z.object({
	perPage: z
		.string()
		.transform((val) => parseInt(val, 10))
		.refine((num) => num > 0, { message: "O número de itens por página deve ser maior que 0." }),
	page: z
		.string()
		.transform((val) => parseInt(val, 10))
		.refine((num) => num > 0, { message: "O número da página deve ser maior que 0." }),
	sortBy: z
		.string()
		.trim()
		.min(2, "O valor de 'sortBy' deve conter pelo menos 2 caracteres, indicando a coluna que vai ser ordernada."),
	sortDesc: z
		.string()
		.refine((val) => val.toLowerCase() === "true" || val.toLowerCase() === "false", {
			message: "O valor de 'sortDesc' deve ser 'true' ou 'false', indicando se a ordenação é descendente.",
		})
		.transform((val) => val.toLowerCase() === "true"),
	filter: z.string().trim().optional(),
});
