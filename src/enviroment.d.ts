declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    NODE_ENV: "development" | "production";
    PORT: number;
    CORS_ORIGIN: string;
    AUTH_SECRET: string;
    INSTRUMENT_USERNAME: string;
    INSTRUMENT_PASSWORD: string;
    ADAPTER: "redis" | "redis-sharded" | "redis-streams";
    ADAPTER_URL: string;
  }
}
