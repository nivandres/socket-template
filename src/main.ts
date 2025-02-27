import { createServer } from "./server";

export const server = createServer();

server.listen(process.env.PORT);
