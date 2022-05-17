const { sendResponse, sendError } = require("../utils/response");
const { UserModel, MusicModel, PlayListsModel } = require("../models");

//TODO add music to mongoDB
async function addMusic(req, res) {
  const { artist, name, genere, file, img } = req.body;

  //TODO verify if music do exist
  try {
    const music = await MusicModel.findOne({ name: name });
    //TODO verify if music exist, send a error
    if (music) {
      return res
        .status(404)
        .json(sendError("this music do exist, verify your data"));
    }

    //TODO create music in mongoDB
    const newMusic = await MusicModel.create({
      artist: artist,
      name: name,
      genere: genere,
      file: file,
      img: img,
    });
    //TODO after create send all data and status
    return res.status(201).send(sendResponse(newMusic));
  } catch (error) {
    console.log(error);
    res.status(500).json(sendError());
  }
}

//TODO get all musics
async function getMusics(req, res) {
  try {
    const musics = await MusicModel.find();

    //TODO verify if user have Music Posts
    if (musics.length <= 0) {
      return res.json(sendError("This User do not have musics Posts"));
    }

    //TODO results status and all musics
    return res.json(sendResponse(musics));
  } catch (error) {
    console.log(error);
    res.status(500).json(sendError());
  }
}

//TODO search one music
async function getMusic(req, res) {
  //TODO music id
  const { id } = req.param;

  //TODO verify if music do exist
  try {
    const music = await MusicModel.findOne({ _id: id });

    //TODO verify if music do not exist, send a error
    if (music) {
      return res.json(sendError("This music do not exist"));
    }

    //TODO verify if music do exist, return music and status
    return res.json(sendResponse(music));
  } catch (error) {
    console.log(error);
    res.status(500).json(sendError());
  }
}

//TODO search music by Name
async function getSearchByName(req, res) {
  const { name } = req.body;

  //TODO verify if music do exist
  try {
    const music = await MusicModel.find({ name: { $regex: name } });

    //TODO verify if music do not exist return error
    if (!music) {
      return res.json(sendError("This music do not exist"));
    }

    //TODO verify if music do exist, return music and status
    return res.json(sendResponse(music));
  } catch (error) {
    console.log(error);
    res.status(500).json(sendError());
  }
}

//TODO liked music
async function likedMusic(req, res) {
  //TODO [ R ]
  const { publicKey } = req.body;
  const { id } = req.params;

  try {
    //TODO [ 1 ]
    const user = await UserModel.findOne({ publicKey: publicKey });

    //TODO [ 2 ]
    if (!user) {
      return res
        .status(404)
        .json(sendError("this User do not exist, verify your data"));
    }

    //TODO [ 1 ]

    const findMusic = await MusicModel.findOne({ _id: id });

    //TODO [ 2 ]
    if (!findMusic) {
      return res.json(sendError("Music not found"));
    }

    //TODO [ 3 ]
    const checkLikesMusic = await MusicModel.findOne({
      $and: [{ _id: id }, { likes: publicKey }],
    });

    let foundListMusics = {};

    if (checkLikesMusic) {
      foundListMusics = await MusicModel.findOneAndUpdate(
        { _id: id },
        { $pull: { likes: publicKey } },
        { new: true }
      );
    } else {
      foundListMusics = await MusicModel.findOneAndUpdate(
        { _id: id },
        { $push: { likes: publicKey } },
        { new: true }
      );
    }

    const myLovePlayList = await PlayListsModel.findOne({
      author: publicKey,
    });

    if (myLovePlayList.musics.includes(id)) {

      await PlayListsModel.findOneAndUpdate(
        { _id: myLovePlayList._id },
        { $pull: { musics: id } },
        { new: true }
      )
    } else {
   await PlayListsModel.findOneAndUpdate(
        { _id: myLovePlayList._id },
        { $push: { musics: id } },
        { new: true }
      );
    }

    //TODO [ 4 ]
    return res.json(sendResponse(foundListMusics));
  } catch (error) {
    console.log(error);
    res.status(500).json(sendError());
  }
}

//TODO exports all functions
module.exports = { addMusic, getMusics, getMusic, getSearchByName, likedMusic };
