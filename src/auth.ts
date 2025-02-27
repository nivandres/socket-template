import { verify } from "jsonwebtoken";
import type { Server } from "socket.io";

type Params = Parameters<Parameters<Server["use"]>[0]>;
const { AUTH_SECRET } = process.env;

export function handleAuth(socket: Params[0], next: Params[1]) {
  const { token } = socket.handshake.auth;
  try {
    const decoded = verify(token, AUTH_SECRET);
    socket.decoded = decoded;
  } catch {
    return next(new Error("Auth failed"));
  }
  return next();
}
