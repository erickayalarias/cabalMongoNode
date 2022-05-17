const { UserModel, PlayListsModel, MusicModel } = require("../models");
const { sendResponse, sendError } = require("../utils/response");

//! Comments Index
//TODO [ 1 ] => for manage error we verify if all parameters to search do exist,
//TODO [ 2 ] => if one parameter do not exists, trow a error,
//TODO [ 3 ] => if all parameters are corrects pass to next step, create, find, delete, update.
//TODO [ 4 ] => after execute return a status and result
//TODO [ R ] => requiments

async function addPlaylist(req, res) {
  try {
    const { title, musics, author, image } = req.body;

    //TODO verify if playlist do exist

    const playlist = await PlayListsModel.findOne({
      $and: [{ title: title }, { author: author }],
    });
    //TODO verify if playlist exist, send a error
    if (playlist) {
      return res
        .status(404)
        .json(sendError("this Playlist do exist, verify your data"));
    }

    //TODO create playlist in mongoDB
    const newPlaylist = await PlayListsModel.create({
      title,
      image,
      author: author,
      likes: [],
    });

    //TODO after create send all data and status
    return res.status(201).send(sendResponse(newPlaylist));
  } catch (error) {
    res.status(500).json(sendError());
  }
}

async function updatePlaylist(req, res) {
  try {
    const { title, musics, publicKey } = req.body;
    const { id } = req.params;

    //TODO verify if playlist do exist
    if (title === "likes") {
      musics.map(async (element) => {
        const infomusicModel = await MusicModel.findOne({ $and: [{ _id: element }, { likes: publicKey }] })
        if (!infomusicModel) {
          const music = await MusicModel.findOneAndUpdate({ _id: element }, { $push: { likes: publicKey } }, { new: true })
        }
      });
    }

    const playlist = await PlayListsModel.findById(id);
    //TODO verify if playlist exist, send a error
    if (!playlist) {
      return res
        .status(404)
        .json(sendError("this Playlist do not exist, verify your data"));
    }

    //TODO create playlist in mongoDB
    const updatePlayLists = await PlayListsModel.findOneAndUpdate(
      { _id: id },
      { title: title, musics: musics },
      { new: true }
    ).populate("musics");

    //TODO after create send all data and status
    return res.status(201).send(sendResponse(updatePlayLists));
  } catch (error) {
    res.status(500).json(sendError());
  }
}

async function getPlaylists(req, res) {
  try {
    const singletitleMusics = await PlayListsModel.find({
      $and: [{ title: "likes" }, { author: req.body.publicKey }],
    }).populate("musics");

    const playlists = await PlayListsModel.find({
      $and: [{ title: { $ne: "likes" } }],
    }).populate("musics");

    singletitleMusics.push(...playlists);

    //TODO results status and all Playlists
    return res.json(sendResponse(singletitleMusics));
  } catch (error) {
    res.status(500).json(sendError());
  }
}

async function deletePlaylist(req, res) {
  try {
    //TODO [ R ]
    const { id } = req.params;

    //TODO [ 1 ]
    const findPlaylist = await PlayListsModel.findOne({ _id: id });

    //TODO [ 2 ]
    if (!findPlaylist) {
      return res.json(sendError("Playlist not found"));
    }

    //TODO [ 3 ]
    const playlist = await PlayListsModel.deleteOne({ _id: id });

    //TODO [ 4 ]
    return res.json(
      sendResponse({
        msg: " the Post have been deleted",
        data: playlist._id,
      })
    );
  } catch (error) {
    res.status(500).json(sendError());
  }
}

const deleteMusicPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { musicId, publicKey } = req.body;

    const playlist = await PlayListsModel.findOne({ _id: id });

    if (!playlist) {
      return res.json(sendError("Playlist not found"));
    }

    if (playlist.title === "likes") {
      const music = await MusicModel.findOneAndUpdate({ _id: musicId }, { $pull: { likes: publicKey } }, { new: true })
    }

    const index = playlist.musics.indexOf(musicId);
    playlist.musics.splice(index, 1);
    playlist.save();
    return res.json(sendResponse(playlist));
  } catch (error) {
    res.status(500).json(sendError());
  }

}

async function likedPlayList(req, res) {
  try {
    //TODO [ R ]
    const { publicKey } = req.body;
    const { id } = req.params;

    //TODO [ 1 ]
    const user = await UserModel.findOne({ publicKey: publicKey });

    //TODO [ 2 ]
    if (!user) {
      return res
        .status(404)
        .json(sendError("this User do not exist, verify your data"));
    }

    const findPlayList = await PlayListsModel.findOne({ _id: id });

    //TODO [ 2 ]
    if (!findPlayList) {
      return res.json(sendError("PlayList not found"));
    }

    //TODO [ 3 ]
    const checkLikesPlayLists = await PlayListsModel.findOne({
      $and: [{ _id: id }, { likes: publicKey }],
    });

    let foundListPlayLists = {};

    if (checkLikesPlayLists) {
      foundListPlayLists = await PlayListsModel.findOneAndUpdate(
        { _id: id },
        { $pull: { likes: publicKey } },
        { new: true }
      );
    } else {
      foundListPlayLists = await PlayListsModel.findOneAndUpdate(
        { _id: id },
        { $push: { likes: publicKey } },
        { new: true }
      );
    }

    //TODO [ 4 ]
    return res.json(sendResponse(foundListPlayLists));
  } catch (error) {
    console.log(error);
    res.status(500).json(sendError());
  }
}

module.exports = {
  addPlaylist,
  getPlaylists,
  updatePlaylist,
  deletePlaylist,
  likedPlayList,
  deleteMusicPlaylist
};
