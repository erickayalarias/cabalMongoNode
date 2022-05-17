const mongoose = require("mongoose");

const MusicsSchema = new mongoose.Schema(
    {
        artist: {
            type: String,
        },
        name: {
            type: String,
        },
        genere: {
            type: String,
        },
        file: {
            type: String,
        },
        img: {
            type: String,
        },
        openseaLink: {
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

const MusicModel = new mongoose.model("musics", MusicsSchema);

module.exports = MusicModel;
