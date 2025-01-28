import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/config/database/schema.ts",
	out: "./databese/migrations",
	dialect: "turso",
	dbCredentials: {
		url: process.env.TURSO_CONNECTION_URL!,
		authToken: process.env.TURSO_AUTH_TOKEN!,
	},
});
