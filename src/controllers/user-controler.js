const { sendResponse, sendError } = require('../utils/response');
const UserModel = require('../models/User-model');
const { createMyLikesPlayList } = require('../../helpers/createMyLikesPlayList');

//! Comments Index
//TODO [ 1 ] => for manage error we verify if all parameters to search do exist,
//TODO [ 2 ] => if one parameter do not exists, trow a error,
//TODO [ 3 ] => if all parameters are corrects pass to next step, create, find, delete, update.
//TODO [ 4 ] => after execute return a status and result
//TODO [ R ] => requiments

async function signup(req, res) {
  try {
    //TODO [ R ]
    const { publicKey, password, alias, avatar } = req.body;
    //TODO [ 1 ]
    const user = await UserModel.findOne({ publicKey: publicKey });
    //TODO [ 2 ]
    if (user) {
      return res.json(sendError('this user already exists'));
    }

    //TODO [ 3 ]
    //TODO create user in Mongo DB
    const newUser = await UserModel.create({
      uid: publicKey,
      username: alias,
      publicKey: publicKey,
      password: password,
      avatar: avatar,
      images:[0, 0, 0]
    });
    //TODO [ 4 ]
    return res.status(201).json(sendResponse(newUser));
  } catch (error) {
    return res.status(500).json(sendError());
  }
}

async function login(req, res) {
  //TODO [ R ]
  const { uid } = req.body;

  try {
    //TODO [ 1 ]
    const foundUser = await UserModel.findOne({ uid: uid });

    //TODO [ 2 ]
    if (!foundUser) {
      return res
        .status(404)
        .json(sendError('this User do not exist, verify your data'));
    }

    //TODO [ 4 ]
    return res.json(sendResponse(foundUser));
  } catch (error) {
    res.status(404).json(sendError());
  }
}

async function checkPublicKey(req, res) {
  //TODO [ R ]
  const { publicKey } = req.body;

  try {
    //TODO [ 1 ]
    const user = await UserModel.findOne({ publicKey: publicKey });

    //TODO [ 2 ]
    if (!user) {
      return res.json(sendError('This public Key do not exist'));
    }

    await createMyLikesPlayList(publicKey);

    //TODO [ 4 ]
    return res.send(
      sendResponse({
        alias: user.username,
        publicKey: user.publicKey,
        password: user.password,
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(sendError());
  }
}

async function getUser(req, res) {
  //TODO [ R ]
  const { publicKey } = req.body;

  try {
    //TODO [ 1 ]
    const user = await UserModel.findOne({ publicKey: publicKey });

    //TODO [ 2 ]
    if (!user) {
      return res.json(sendError('This public Key do not exist'));
    }

    //TODO [ 4 ]
    return res.json(sendResponse(user));
  } catch (error) {
    res.status(500).json(sendError());
  }
}




async function updateUser(req, res) {
  //TODO [ R ]
  const { publicKey, data } = req.body;
  console.log("bodyrequest", req.body);
  try {
    //TODO [ 1 ]
    const user = await UserModel.findOne({ publicKey: publicKey });

    //TODO [ 2 ]
    if (!user) {
      return res.json(sendError('This public Key do not exist'));
    }

    //TODO [ 3 ]
    const updateUser = await UserModel.updateOne(
      { _id: user._id },
      { $set: data }
    );

    console.log("usuario sin actualizar", updateUser);
    
    const userresult = await UserModel.findOne({ publicKey: publicKey });
    console.log("esto es lo que te envio", userresult);
    
    //TODO [ 4 ]
    return res.json(sendResponse(userresult));
  } catch (error) {
    return res.status(500).json(sendError());
  }
}

module.exports = {
  signup,
  login,
  checkPublicKey,
  getUser,
  updateUser,
};
