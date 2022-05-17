const mongoose = require("mongoose");
const validator = require("validator");

const PlayListsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    musics: [
      {
        type: mongoose.Types.ObjectId,
        ref: "musics",
      },
    ],
    author: {
      type: String,
    },
    likes: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("playlists", PlayListsSchema);
