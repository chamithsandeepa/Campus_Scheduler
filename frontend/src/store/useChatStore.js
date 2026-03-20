import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/chat" : "/api/chat";
const SOCKET_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

axios.defaults.withCredentials = true;

export const useChatStore = create((set, get) => ({
	messages: [],
	users: [],
	selectedConversation: null,
	isLoading: false,
	socket: null,
	onlineUsers: [],

	getUsers: async () => {
		set({ isLoading: true });
		try {
			const res = await axios.get(`${API_URL}/users`);
			set({ users: res.data });
		} catch (error) {
			toast.error(error.response?.data?.error || "Error fetching users");
		} finally {
			set({ isLoading: false });
		}
	},

	getMessages: async (userId) => {
		set({ isLoading: true });
		try {
			const res = await axios.get(`${API_URL}/${userId}`);
			set({ messages: res.data });
		} catch (error) {
			toast.error(error.response?.data?.error || "Error fetching messages");
		} finally {
			set({ isLoading: false });
		}
	},

	sendMessage: async (messageData) => {
		const { selectedConversation, messages } = get();
		try {
			const res = await axios.post(`${API_URL}/send/${selectedConversation._id}`, messageData);
			set({ messages: [...messages, res.data] });
		} catch (error) {
			toast.error(error.response?.data?.error || "Error sending message");
		}
	},

	setSelectedConversation: (selectedConversation) => {
		set({ selectedConversation });
	},

	connectSocket: (userId) => {
		if (!userId) return;
		if (get().socket?.connected) return;

		const socket = io(SOCKET_URL, {
			// Prefer `auth` so the server can read it via `socket.handshake.auth`.
			auth: {
				userId: userId,
			},
		});
		socket.connect();

		set({ socket: socket });

		// Global Message Listener (Unified)
		socket.on("newMessage", (newMessage) => {
			const state = get();
			const senderIdStr = String(newMessage.senderId);
			const isMessageFromSelectedUser =
				state.selectedConversation &&
				String(state.selectedConversation._id) === senderIdStr;
			
			if (isMessageFromSelectedUser) {
				set({
					messages: [...state.messages, newMessage],
				});
			}
		});

		socket.on("getOnlineUsers", (users) => {
			set({ onlineUsers: users });
		});
	},

	disconnectSocket: () => {
		const socket = get().socket;
		if (socket) {
			socket.off("newMessage");
			socket.disconnect();
		}
		set({ socket: null });
	},

	subscribeToMessages: () => {},
	unsubscribeFromMessages: () => {},
}));
