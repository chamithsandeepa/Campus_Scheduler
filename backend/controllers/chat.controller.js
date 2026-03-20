import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { User } from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.userId;

		// Security Check: Verify Roles
		const [sender, receiver] = await Promise.all([
			User.findById(senderId),
			User.findById(receiverId)
		]);

		if (!sender || !receiver) {
			return res.status(404).json({ error: "User not found" });
		}

		// Students can only message lecturers
		if (sender.role === "student" && receiver.role !== "lecturer") {
			return res.status(403).json({ error: "Students can only message lecturers." });
		}

		// Add other logic here if needed (e.g. lecturers can't message... whoever)

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await Promise.all([conversation.save(), newMessage.save()]);

		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.userId;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages");

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.userId;
		const currentUser = await User.findById(loggedInUserId);

		if (!currentUser) {
			return res.status(401).json({ error: "User not found" });
		}

		let query = { _id: { $ne: loggedInUserId } };

		// Case 1: Student -> Can only see Lecturers
		if (currentUser.role === "student") {
			query.role = "lecturer";
		}
		// Case 2: Lecturer -> Can see Students and other Lecturers
		else if (currentUser.role === "lecturer") {
			query.role = { $in: ["student", "lecturer"] };
		}
		// Case 3: Admin -> Can see everyone
		// (Default query handles this)

		const filteredUsers = await User.find(query).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
