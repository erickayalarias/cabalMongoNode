const mongoose = require("mongoose");

const CommunitiesSchema = new mongoose.Schema(
  {
    communityName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    admin: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    publicCreator: String,
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "posts",
      },
    ],
    userList: [
      {
        type: mongoose.Types.ObjectId,
        ref: "users",
      },
    ],
    pendingInvites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "communityInvitation",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("communities", CommunitiesSchema);
