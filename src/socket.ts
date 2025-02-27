import { Socket } from "socket.io";
import { z } from "zod";
import { io } from "./io";

const messageSchema = z.string().min(1).max(100);

export function handleSocketConnection(socket: Socket) {
  console.log(`[${socket.id}] connected`);
  io.emit("message", `[${socket.id}] connected`);

  socket.on("message", data => {
    try {
      io.emit("message", `[${socket.id}] ${messageSchema.parse(data)}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        socket.emit("message", `${error.issues[0].message}`);
      } else socket.disconnect();
    }
  });

  socket.on("disconnect", reason => handleSocketDisconnection(socket, reason));
}

export function handleSocketDisconnection(socket: Socket, reason: string) {
  console.log(`[${socket.id}] disconnected (${reason})`);
  io.emit("message", `[${socket.id}] disconnected (${reason})`);
}
