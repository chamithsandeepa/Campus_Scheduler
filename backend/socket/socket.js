import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		// Allow local dev/other hosts without needing an exact match.
		origin: true,
		methods: ["GET", "POST"],
	},
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	// socket.io-client v4 can send extra data via `auth` (preferred) or `query` (legacy).
	const userId = socket.handshake.auth?.userId ?? socket.handshake.query?.userId;
	// Only register sockets with a valid userId; otherwise messages won't reach the correct receiver.
	if (userId && userId !== "undefined") {
		userSocketMap[String(userId)] = socket.id;
	} else {
		console.warn("Socket connected without valid userId:", { userId });
	}

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		if (userId && userId !== "undefined") {
			delete userSocketMap[String(userId)];
		}
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };
