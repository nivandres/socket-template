import { JwtPayload } from "jsonwebtoken";
import { Socket as Socket_ } from "socket.io";

declare module "socket.io" {
  interface Socket extends Socket_ {
    decoded: string | JwtPayload;
  }
}
