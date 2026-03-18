import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			enum: ["student", "admin", "lecturer"],
			default: "student",
		},
		studentId: {
			type: String,
		},
		faculty: {
			type: String,
		},
		programme: {
			type: String,
		},
		yearOfStudy: {
			type: String,
		},
		
	},
	{ timestamps: true }
);

export const User = mongoose.model("User", userSchema);
