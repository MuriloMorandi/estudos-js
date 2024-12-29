declare global {
  namespace NodeJS {
    interface ProcessEnv {
         NODE_ENV: 'development' | 'production' | 'test';
        PORT?: string;
        TURSO_DATABASE_URL: string;
        TURSO_AUTH_TOKEN: string;
    }
  }
}
