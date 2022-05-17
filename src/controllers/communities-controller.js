const { sendResponse, sendError } = require("../utils/response");
const CommunityModel = require("../models/Communities-model");
const UserModel = require("../models/User-model");
const PostModel = require("../models/Post-model");

//INDICE DE COMENTARIOS
//TODO [ 1 ] => for manage error we verify if all parameters to search do exist,
//TODO [ 2 ] => if one parameter do not exists, trow a error,
//TODO [ 3 ] => if all parameters are corrects pass to next step, create, find, delete, update.
//TODO [ 4 ] => after execute return a status and result
//TODO [ R ] => requiments
async function addCommunity(req, res) {
  try {
    const { communityName, description, adminPublicKey, avatar,password } = req.body;

    //TODO [ 1 ]
    const user = await UserModel.findOne({ publicKey: adminPublicKey });

    //TODO [ 2 ]
    if (!user) {
      return res
        .status(404)
        .json(sendError("this User do not exist, verify your data"));
    }

    //TODO [ 3 ]
    const newCommunity = await CommunityModel.create({
      communityName,
      description,
      admin: user._id,
      userList: user._id,
      avatar: avatar,
      password: password,
      publicCreator: adminPublicKey,
    });

    //TODO [ 4 ]
    return res.status(201).json(sendResponse(newCommunity));
  } catch (error) {
    res.status(500).json(sendError());
  }
}

async function getCommunity(req, res) {
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

    //TODO [ 3 ]
    const community = await CommunityModel.findById(id).populate("posts");

    //TODO [ 2 ]
    if (!community) {
      return res.json(sendError("This community not exist"));
    }

    //TODO [ 4 ]
    return res.status(201).json(sendResponse(community));
  } catch (error) {
    res.status(500).json(sendError());
  }
}

async function communitiesByUser(req, res) {
  try {
    //TODO [ R ]
    const { publicKey } = req.body;

    //TODO [ 1 ]
    const user = await UserModel.findOne({ publicKey: publicKey });

    //TODO [ 2 ]
    if (!user) {
      return res
        .status(404)
        .json(sendError("this User do not exist, verify your data"));
    }

    //TODO [ 3 ]
    const communities = await CommunityModel.find({
      userList: user._id,
    }).populate({
      path: "posts",
      populate: {
        path: "author",
        model: "users",
      },
    });

    //TODO [ 2 ]
    if (communities.length <= 0) {
      return res.json(sendError("This User do not have communities"));
    }

    //TODO [ 4 ]
    return res.status(200).json(sendResponse(communities));
  } catch (error) {
    return res.status(500).json(sendError());
  }
}

async function communityByPosts(req, res) {
  try {
    //TODO [ R ]
    const { id } = req.params;

    //TODO [ 3 ]
    const communities = await CommunityModel.findById(id).populate("posts");

    //TODO [ 2 ]
    if (communities) {
      return res.json(sendError("This User do not have communities"));
    }

    //TODO [ 4 ]
    return res.status(201).json(sendResponse(communities.posts));
  } catch (error) {
    return res.status(500).json(sendError());
  }
}

async function acceptCommunity(req, res) {
  //TODO [ R ]
  const { communityId, publicKey } = req.body;

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
    const community = await CommunityModel.findOne({ _id: communityId });

    //TODO [ 2 ]
    if (!community) {
      return res.json(sendError("Community not found"));
    }

    // //TODO [ 3 ]
    const checkComunity = await CommunityModel.findOne({
      $and: [{ _id: community._id }, { userList: user._id }],
    });

    //Update list of likes
    if (checkComunity) {
      var result = "This User already Join this Community";
    } else {
      var result = {
        community: await CommunityModel.updateOne(
          { _id: community._id },
          { $push: { userList: user._id } },
          { new: true }
        ),
        User: await UserModel.updateOne(
          { _id: user._id },
          { $push: { communities: community._id } },
          { new: true }
        ),
      };
    }

    const result2 = await CommunityModel.findOne({ _id: community._id });
    //TODO [ 4 ]
    return res.json(sendResponse(result, result2));
  } catch (error) {
    res.status(500).json(sendError());
  }
}

async function leaveCommunity(req, res) {
  //TODO [ R ]
  const { communityId, publicKey } = req.body;

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
    const community = await CommunityModel.findOne({ _id: communityId });

    //TODO [ 2 ]
    if (!community) {
      return res.json(sendError("Community not found"));
    }

    // //TODO [ 3 ]
    const checkComunity = await CommunityModel.findOne({
      $and: [{ _id: community._id }, { userList: user._id }],
    });

    if (checkComunity) {
      var result = await CommunityModel.updateOne(
        { _id: community._id },
        { $pull: { userList: user._id } },
        { new: true }
      );
    } else {
      var result = "This User isn't a User in this Community";
    }

    const result2 = await CommunityModel.findOne({ _id: communityId });
    //TODO [ 4 ]
    return res.json(sendResponse(result, result2));
  } catch (error) {
    res.status(500).json(sendError());
  }
}

async function updateCommunity(req, res) {
  //TODO [ R ]
  const { id, communityName, description, adminPublicKey, avatar } = req.body;

  try {
    //TODO [ 1 ]
    const user = await UserModel.findOne({ publicKey: adminPublicKey });

    //TODO [ 2 ]
    if (!user) {
      return res
        .status(404)
        .json(sendError("this User do not exist, verify your data"));
    }

    //TODO [ 1 ]
    const community = await CommunityModel.findOne({ _id: id });

    // //TODO [ 2 ]
    if (!community) {
      return res.json(sendError("This community do not exist"));
    }

    // //TODO [ 3 ]
    const updateCommunity = await CommunityModel.findOneAndUpdate(
      { _id: id },
      {
        communityName,
        description,
        admin: user._id,
        userList: user._id,
        avatar: avatar || community.avatar,
        publicCreator: adminPublicKey,
      },
      { new: true }
    );

    // //TODO [ 4 ]
    return res.json(sendResponse(updateCommunity));
  } catch (error) {
    res.status(500).json(sendError());
  }
}

async function addPostCommunity(req, res) {
  //TODO [ R ]
  const { publicKey, type, title, description, file } = req.body;
  const { id } = req.params;
  //TODO [ 1 ]
  try {
    const user = await UserModel.findOne({ publicKey: publicKey });

    //TODO [ 2 ]
    if (!user) {
      return res
        .status(404)
        .json(sendError("this User do not exist, verify your data"));
    }

    //TODO [ 1 ]
    const foundCommunity = await CommunityModel.findById(id);

    //TODO [ 2 ]
    if (!foundCommunity) {
      return res.json(sendError("Community not found"));
    }

    //TODO [ 3 ]
    const newPost = await PostModel.create({
      author: user._id,
      type: type,
      title: title,
      description: description,
      file: file,
      publicationDate: Date.now(),
    });

    const community = await CommunityModel.findOneAndUpdate(
      { _id: id },
      { $push: { posts: newPost._id } },
      { new: true }
    ).populate({
      path: "posts",
      populate: {
        path: "author",
        model: "users",
      },
    });

    //TODO [ 4 ]
    return res.status(201).json(sendResponse(community));
  } catch (error) {
    res.status(500).json(sendError());
  }
}

async function updatePostCommunity(req, res) {
  //TODO [ R ]
  const { publicKey, type, title, description, file } = req.body;
  const { communityId, postId } = req.params;
  //TODO [ 1 ]
  try {
    const user = await UserModel.findOne({ publicKey: publicKey });

    //TODO [ 2 ]
    if (!user) {
      return res
        .status(404)
        .json(sendError("this User do not exist, verify your data"));
    }

    //TODO [ 1 ]
    const foundCommunity = await CommunityModel.findById(communityId);

    //TODO [ 2 ]
    if (!foundCommunity) {
      return res.json(sendError("Community not found"));
    }

    const foundPost = await CommunityModel.findById(postId);

    //TODO [ 2 ]
    if (!foundPost) {
      return res.json(sendError("Post not found"));
    }

    //TODO [ 3 ]
    const updatePost = await PostModel.findOneAndUpdate(
      { _id: postId },
      {
        author: user._id,
        type: type,
        title: title,
        description: description,
        file: file,
        publicationDate: Date.now(),
      },
      { new: true }
    );

    const community = await CommunityModel.findOneAndUpdate(
      { _id: communityId },
      { $push: { posts: updatePost._id } },
      { new: true }
    ).populate("posts");

    //TODO [ 4 ]
    return res.status(201).json(sendResponse(community));
  } catch (error) {
    res.status(500).json(sendError());
  }
}

async function deletePostCommunity(req, res) {
  //TODO [ R ]
  const { publicKey, type, title, description, file } = req.body;
  const { communityId, postId } = req.params;
  //TODO [ 1 ]
  try {
    const user = await UserModel.findOne({ publicKey: publicKey });

    //TODO [ 2 ]
    if (!user) {
      return res
        .status(404)
        .json(sendError("this User do not exist, verify your data"));
    }

    //TODO [ 1 ]
    const foundCommunity = await CommunityModel.findById(communityId);

    //TODO [ 2 ]
    if (!foundCommunity) {
      return res.json(sendError("Community not found"));
    }

    const foundPost = await CommunityModel.findById(postId);

    //TODO [ 2 ]
    if (!foundPost) {
      return res.json(sendError("Post not found"));
    }

    //TODO [ 3 ]
    const deletePost = await PostModel.deleteOne({ _id: _id });

    const community = await CommunityModel.deleteOne(
      { _id: communityId },
      { $pull: { posts: deletePost._id } },
      { new: true }
    ).populate("posts");

    //TODO [ 4 ]
    return res.status(201).send(sendResponse(community));
  } catch (error) {
    res.status(500).json(sendError());
  }
}

module.exports = {
  addCommunity,
  getCommunity,
  communitiesByUser,
  communityByPosts,
  acceptCommunity,
  leaveCommunity,
  updateCommunity,
  addPostCommunity,
  updatePostCommunity,
  deletePostCommunity,
};
