const mongoose = require("mongoose");
const validator = require("validator");

const PendinFriendsSchema = new mongoose.Schema(
    {
        userSender: {
            type: mongoose.Types.ObjectId,
            ref: "users",
        },
        userRecipient: {
            type: mongoose.Types.ObjectId,
            ref: "users",
        },
        mensage: {
            type: String,
        },
        password: {
            type: String,
        },
        status: {
            type: String,
            enum: ["pending", "acepted", "denied"],
            default: "pending"
        },
        envitationDate: {
            type: Date,
        },
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("friendEnvitation", PendinFriendsSchema);
