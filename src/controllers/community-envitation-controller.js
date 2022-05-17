const { sendResponse, sendError } = require("../utils/response");
const CommunityInviteModel = require("../models/CommunityInvitation-model");
const CommunityModel = require("../models/Communities-model");
const UserModel = require("../models/User-model");

//! Comments Index
//TODO [ 1 ] => for manage error we verify if all parameters to search do exist,
//TODO [ 2 ] => if one parameter do not exists, trow a error,
//TODO [ 3 ] => if all parameters are corrects pass to next step, create, find, delete, update.
//TODO [ 4 ] => after execute return a status and result
//TODO [ R ] => requiments

async function sendInviteCommunity(req, res) {
  try {
    //TODO [ R ]
    const { uid, communityId, userPublicKey, message } = req.body;

    //TODO [ 1 ]
    const community = await CommunityModel.findOne({ _id: communityId });

    //TODO [ 2 ]
    if (!community) {
      return res
        .status(404)
        .json(sendError("this Community do not exist, verify your data"));
    }

    //TODO [ 1 ]
    const user = await UserModel.findOne({ publicKey: userPublicKey });

    //TODO [ 2 ]
    if (!user) {
      return res
        .status(404)
        .json(sendError("this User do not exist, verify your data"));
    }

    const communityList = community.userList;

    const userExists = checkUser(communityList, user);

    if (userExists >= 1) {
      //TODO if exists in a userList array
      return res.json(sendError("this User already is member this community "));
    } else {

      //TODO if not exists in a userList array create a invite
      var newInvite = await CommunityInviteModel.create({
        uid: uid,
        community: community._id,
        userRecipient: user._id,
        message,
        envitationDate: Date.now(),
      });

      //TODO add community invite into community pending array
      const communityAddUser = await CommunityModel.updateOne(
        { _id: community._id },
        {
          $push: { pendingInvites: newInvite._id },
        }
      );

      //TODO and add community invite into user pending array
      const userAddcommunity = await UserModel.updateOne(
        { _id: user._id },
        {
          $push: { pendingcommunities: newInvite._id },
        }
      );
    }

    //TODO find the invite to return populated
    const communityInvite = await CommunityInviteModel.find({
      userRecipient: user._id,
    }).populate("userRecipient");

    //TODO [ 4 ]
    return res.json(sendResponse(communityInvite));
  } catch (error) {
    res.status(500).json(sendError());
  }
}

async function cancelCommunityInvitation(req, res) {
  try {
    const { inviteId } = req.body;
    //TODO [ 1 ]
    const invite = await CommunityInviteModel.findOne({ _id: inviteId })
      .populate("userRecipient")
      .populate("community");

    //TODO [ 2 ]
    if (!invite) {
      return res
        .status(404)
        .json(sendError("this Invite do not exist, verify your data"));
    } else {
      //TODO if exists Remove this invite to user
      const userRemoveinvite = await UserModel.updateOne(
        { _id: invite.userRecipient._id },
        {
          $pull: { pendingcommunities: invite._id },
        }
      );

      //TODO and Remove the invite to community
      const communityRemoveInvite = await CommunityModel.updateOne(
        { _id: invite.community._id },
        {
          $pull: { pendingInvites: invite._id },
        }
      );
    }

    //TODO after remove delete the invitation
    const deleted = await CommunityInviteModel.deleteOne({ _id: invite._id });

    //TODO check if exists and return
    const checkInvitation = await CommunityInviteModel.find({
      _id: invite._id,
    });

    //TODO [ 4 ]
    return res.json(sendResponse(checkInvitation));
  } catch (error) {
    res.status(500).json(sendError());
  }
}

async function getPendingCommunityInvite(req, res) {
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
    const communityDetail = await CommunityDetail(user.pendingcommunities);

    //TODO [ 4 ]
    return res.json(sendResponse(communityDetail));
  } catch (error) {
    res.status(500).json(sendError());
  }
}

async function checkCommunityInvite(req, res) {
  const { communityId, userPublicKey } = req.body;

  try {
    //TODO [ 1 ]
    const user = await UserModel.findOne({ publicKey: userPublicKey });

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
      return res
        .status(404)
        .json(sendError("this Community do not exist, verify your data"));
    }

    const userInvites = user.pendingcommunities;
    const commInvites = community.pendingInvites;

    let inviteResult = null;

    //TODO check if exists invites in communities
    for (let index = 0; index < userInvites.length; index++) {
      if (commInvites.includes(userInvites[index])) {
        inviteResult = userInvites[index];
      }
    }

    //TODO [ 4 ]
    return res.json(sendResponse(inviteResult));
  } catch (error) {
    res.status(500).json(sendError());
  }
}

//TODO this function is for check if friend exists in your friends array
const checkUser = (community, friend) => {
  const result = [];

  community.map((value) => {
    const user = JSON.stringify(value.user);
    const friendXX = JSON.stringify(friend._id);
    if (user === friendXX) {
      result.push(user);
    }
  });
  return result;
};

//TODO return community detail
const CommunityDetail = async (userinvite) => {
  const result = [];
  for (let index = 0; index < userinvite.length; index++) {
    const element = userinvite[index];
    var invites = await CommunityModel.find({
      pendingInvites: element._id,
    }).populate("pendingInvites");
    result.push(...invites);
  }
  return result;
};

module.exports = {
  getPendingCommunityInvite,
  cancelCommunityInvitation,
  checkCommunityInvite,
  sendInviteCommunity,
};
