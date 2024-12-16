import { drizzle } from 'drizzle-orm/libsql';
import { Config, createClient, } from "@libsql/client";

export const turso = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
} as Config);

export const database = drizzle(turso);
