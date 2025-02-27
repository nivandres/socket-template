import { Redis } from "ioredis";

export const redis = new Redis(process.env.ADAPTER_URL);
export const client = redis;
export const pubClient = client.duplicate();
export const subClient = client.duplicate();
