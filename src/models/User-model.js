const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
    {
        publicKey: {
            type: String,
        },
        uid: {
            type: String,
        },
        username: {
            type: String,
            unique: true,
        },
        avatar: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        communities: [
            {
                type: mongoose.Types.ObjectId,
                ref: "communities",
            },
        ],
        playlist: [
            {
                type: mongoose.Types.ObjectId,
                ref: "playlist",
            },
        ],
        music: [
            {
                type: mongoose.Types.ObjectId,
                ref: "music",
            },
        ],
        friends: [
            {
                user: {
                    type: mongoose.Types.ObjectId,
                    ref: "users",
                },
                password: {
                    type: String,
                },
            },
        ],
        pendingfriends: [
            {
                type: mongoose.Types.ObjectId,
                ref: "friendEnvitation",
            },
        ],
        pendingcommunities: [
            {
                type: mongoose.Types.ObjectId,
                ref: "communityInvitation",
            },
        ],
        videos: [
            {
                type: mongoose.Types.ObjectId,
                ref: "videos",
            },
        ],
        images: [
            {
            type: Number,
          },
        ],
        chat: [
            {
                type: mongoose.Types.ObjectId,
                ref: "chat",
            },
        ],
        posts: [
            {
                type: mongoose.Types.ObjectId,
                ref: "posts",
            },
        ],
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("users", UserSchema);
