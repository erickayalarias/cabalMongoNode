const mongoose = require("mongoose");
const validator = require("validator");

const CommunityInviteSchema = new mongoose.Schema(
    {
        community: {
            type: mongoose.Types.ObjectId,
            ref: "communities",
        },
        userRecipient: {
            type: mongoose.Types.ObjectId,
            ref: "users",
        },
        message: {
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

module.exports = mongoose.model("communityInvitation", CommunityInviteSchema);
