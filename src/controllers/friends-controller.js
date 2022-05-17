const { sendResponse, sendError } = require('../utils/response');
const UserModel = require('../models/User-model');

//! Comments Index
//TODO [ 1 ] => for manage error we verify if all parameters to search do exist,
//TODO [ 2 ] => if one parameter do not exists, trow a error,
//TODO [ 3 ] => if all parameters are corrects pass to next step, create, find, delete, update.
//TODO [ 4 ] => after execute return a status and result
//TODO [ R ] => requiments

async function addFriend(req, res) {
  //TODO [ R ]
  const { publicKey, friendPublicKey, password, uid } = req.body;
  try {
    //TODO [ 1 ]
    const user = await UserModel.findOne({ publicKey: publicKey });

    //TODO [ 2 ]
    if (!user) {
      return res.json(sendError('This public Key do not exist'));
    }

    //TODO [ 1 ]
    const userFriend = await UserModel.findOne({
      publicKey: friendPublicKey,
    });

    //TODO [ 2 ]
    if (!userFriend) {
      return res.json(sendError('this Friend user do not exists'));
    }

    //TODO [ 2 ]
    //TODO check if user friend is or not your friend
    const friendExists = checkFriend(user, userFriend);

    //TODO [ 3 ]
    if (friendExists.length >= 1) {
      //TODO if exists in a friends array
      return res.json(sendError('this User already is your Friend'));
    } else {
      //TODO if not exists in a friends array add this friend
      var userAddFriend = await UserModel.updateOne(
        { _id: user._id },
        {
          $push: {
            friends: {
              user: userFriend._id,
              password: password,
            },
          },
        }
      );
    }

    //TODO [ 4 ]
    return res.json(
      sendResponse(
        `Friend Added ,  Nick Name = ${userFriend.username}`
      )
    );
  } catch (error) {
    res.status(500).json(sendError());
  }
}

//!this function we dont use Yet need to check if works
async function searchFriend(req, res) {
  //!teh search field need to insert only one, the another leave a empty string.
  // {
  //     "uid": "P@ssw0rd",
  //     "publicKey": "0x836dA6F6a82f17eD5F222512A09d83439e4F3F28",
  //     "search":{
  //         "friendPublicKey": "",
  //         "friendNickName": "theBoss"
  //     }
  // }
  try {
    //TODO [ R ]
    const { publicKey, search } = req.body;

    //TODO [ 1 ]
    const user = await UserModel.findOne({ publicKey: publicKey });

    //TODO [ 2 ]
    if (!user) {
      return res.json(sendError('This public Key do not exist'));
    }

    //TODO [ 3 ]
    //TODO we put two types of search by, username or publicKey
    //TODO if search by publicKey
    if (search.friendPublicKey) {
      var searchBy = search.friendPublicKey;

      //TODO [ 1 ]
      const userFriend = await UserModel.findOne({
        publicKey: searchBy,
      });

      //TODO [ 2 ]
      if (!userFriend) {
        return res.json(sendError('this Friend user do not exists'));
      }

      //TODO [ 4 ]
      const validate = checkFriend(user, userFriend);
      if (validate) {
        var searchResult = userFriend;
      } else {
        var searchResult =
          'this search does not Match with any friend your ';
      }
    }

    //TODO [ 3 ]
    //TODO if search by username
    if (search.friendNickName) {
      var searchBy = search.friendNickName;

      //TODO [ 1 ]
      const userFriend = await UserModel.findOne({
        username: searchBy,
      });

      //TODO [ 2 ]
      if (!userFriend) {
        return res.json(sendError('this Friend user do not exists'));
      }

      //TODO [ 4 ]
      const validate = checkFriend(user, userFriend);
      if (validate) {
        var searchResult = userFriend;
      } else {
        var searchResult =
          'this search does not Match with any friend your ';
      }
    }

    //TODO [ 4 ]
    return res.json(sendResponse(searchResult));
  } catch (error) {
    res.status(500).json(sendError());
  }
}

async function getAllFriends(req, res) {
  //TODO [ R ]
  const { publicKey } = req.body;

  try {
    //TODO [ 1 ]
    const user = await UserModel.findOne({ publicKey: publicKey });
    //TODO [ 2 ]
    if (!user) {
      return res.json(sendError('This public Key do not exist'));
    }
    //TODO [ 3 ]
    //TODO friends array with populate users, to display friend data
    const friendsArray = await UserModel.findOne({
      publicKey: publicKey,
    }).populate('friends.user');

    //TODO [ 4 ]
    return res.json(sendResponse(friendsArray));
  } catch (error) {
    res.status(500).json(sendError());
  }
}

async function removeFriend(req, res) {
  //TODO [ R ]
  const { publicKey, friendPublicKey } = req.body;
  try {
    //TODO [ 1 ]
    const user = await UserModel.findOne({ publicKey: publicKey });

    //TODO [ 2 ]
    if (!user) {
      return res.json(sendError('This public Key do not exist'));
    }

    //TODO [ 1 ]
    const userFriend = await UserModel.findOne({
      publicKey: friendPublicKey,
    });

    //TODO [ 2 ]
    if (!userFriend) {
      return res.json(sendError('this Friend user do not exists'));
    }

    //TODO [ 2 ]
    //TODO check if user friend is or not your friend
    const friendExists = checkFriend(user, userFriend);

    //TODO [ 3 ]
    if (friendExists.length < 1) {
      //TODO if not exists in a friends array
      return res.json(
        sendError('this user is no longer your friend')
      );
    } else {
      //TODO if exists in a friends array remove this friend
      var userRemoveFriend = await UserModel.updateOne(
        { _id: user._id },
        { $pull: { friends: { user: userFriend._id } } }
      );

      //TODO and remove in your friend your id
      var friendRemoveUser = await UserModel.updateOne(
        { _id: userFriend._id },
        { $pull: { friends: { user: user._id } } }
      );
    }

    //TODO [ 4 ]
    return res.json(
      sendResponse(
        `Friend Removed, Nick Name = ${userFriend.username}`
      )
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(sendError());
  }
}

//TODO this function is for check if friend exists in your friends array
const checkFriend = (user, friend) => {
  const userfriends = user.friends;
  const result = [];

  userfriends.map((value) => {
    const user = JSON.stringify(value.user);
    const friendXX = JSON.stringify(friend._id);
    if (user === friendXX) {
      result.push(user);
    }
  });

  return result;
};

module.exports = {
  addFriend,
  searchFriend,
  removeFriend,
  getAllFriends,
};
