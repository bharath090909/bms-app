import { WebSocketServer } from "ws";
import { prisma } from "@repo/db/client";

const server = new WebSocketServer({ port: 3001 });

server.on("connection", async (socket) => {
  try {
    await prisma.user.create({
      data: {
        email: `example+${Math.floor(Math.random() * 1000)}@example.com`,
        name: `Example User${Math.floor(Math.random() * 1000)}`,
      },
    });
  } catch (error) {
    console.error("Failed to create user on websocket connect", error);
  }
  console.log("Client connected");

  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
    // Echo the message back to the client
    socket.send(`Echo: ${message}`);
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:3001");
