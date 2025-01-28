import { dbClient } from "../../dbClient.js";

export async function updateWithTimestamps(table: any, updates: Record<string, any>, condition: any) {
	await dbClient
		.update(table)
		.set({
			...updates,
			updated_at: Date.now(), // Atualiza o campo automaticamente
		})
		.where(condition);
}
