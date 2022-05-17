const { sendResponse, sendError } = require("../utils/response");
const UserModel = require("../models/User-model");
const FriendEnvitationModel = require("../models/FriendEnvitation-model");

//! Comments index
//TODO [ 1 ] => for manage error we verify if all parameters to search do exist,
//TODO [ 2 ] => if one parameter do not exists, trow a error,
//TODO [ 3 ] => if all parameters are corrects pass to next step, create, find, delete, update.
//TODO [ 4 ] => after execute return a status and result
//TODO [ R ] => requiments

async function sendInvitaion(req, res) {
    try {
        //TODO [ R ]
        const { senderPublicKey, recipientPublicKey, mensage, password } = req.body
        //TODO [ 1 ]
        const userSender = await UserModel.findOne({ publicKey: senderPublicKey });

        //TODO [ 2 ]
        if (!userSender) {
            return res
                .status(404)
                .json(sendError("this User do not exist, verify your data"));
        }
        //TODO [ 1 ]
        const userRecipient = await UserModel.findOne({ publicKey: recipientPublicKey });

        //TODO [ 2 ]
        if (!userRecipient) {
            return res
                .status(404)
                .json(sendError("this User Friend do not exist, verify your data"));
        }

        const userfriends = userSender.friends

        const friendExists = checkFriend(userSender, userfriends)

        //TODO [ 3 ]
        if (friendExists >= 1) {
            //TODO if exists in a friends array
            return res.json(sendError("this User already is your Friend"));
        } else {
            //TODO if not exists in a friends array add this friend
            var newInvite = await FriendEnvitationModel.create({
                userSender: userSender._id,
                userRecipient: userRecipient._id,
                mensage,
                password,
                envitationDate: Date.now(),
            });

            //TODO add the invite into user array
            const userAddFriend = await UserModel.updateOne({ _id: userSender._id },
                {
                    $push: { pendingfriends: newInvite._id },
                });

            //TODO add the invite into your friend array
            const friendAddUser = await UserModel.updateOne({ _id: userRecipient._id }, {
                $push: { pendingfriends: newInvite._id }
            });
        }

        //TODO find and return the invite populated
        const userInvite = await FriendEnvitationModel.find({ userSender: userSender._id }).populate("userSender").populate("userRecipient");

        //TODO [ 4 ]
        return res.json(sendResponse(userInvite));
    } catch (error) {
        res.status(500).json(sendError());
    }
}

async function cancelInvitaion(req, res) {
    try {

        //TODO [ R ]
        const { inviteId } = req.body

        //TODO [ 1 ]
        const invite = await FriendEnvitationModel.findOne({ _id: inviteId }).populate("userSender").populate("userRecipient");

        //TODO [ 2 ]
        if (!invite) {
            return res
                .status(404)
                .json(sendError("this Invite do not exist, verify your data"));
        } else {
            //TODO if not exists in a friends array Remove this friend
            const userRemoveFriend = await UserModel.updateOne({ _id: invite.userSender._id },
                {
                    $pull: { pendingfriends: invite._id },
                });

            //TODO and Remove in your friend your id
            const friendRemoveUser = await UserModel.updateOne({ _id: invite.userRecipient._id }, {
                $pull: { pendingfriends: invite._id }
            });
        }

        //TODO delete invite
        const deleted = await FriendEnvitationModel.deleteOne({ _id: invite._id })

        //TODO check if exists and return
        const checkInvitation = await FriendEnvitationModel.find({ _id: invite._id })

        //TODO [ 4 ]
        return res.json(sendResponse(checkInvitation));
    } catch (error) {
        console.log(error)
        res.status(500).json(sendError());
    }
}

async function getPendingInvite(req, res) {

    try {
        //TODO [ R ]
        const { publicKey } = req.body

        //TODO [ 1 ]
        const userSender = await UserModel.findOne({ publicKey: publicKey });

        //TODO [ 2 ]
        if (!userSender) {
            return res
                .status(404)
                .json(sendError("this User do not exist, verify your data"));
        }

        //TODO find pending invites for user sender or user recipient
        const userInvite = await FriendEnvitationModel.find({ $or: [{ userSender: userSender._id }, { userRecipient: userSender._id }] }).populate("userSender").populate("userRecipient");
        const result = {
            userInvite,
            PendingInvite: userInvite.length
        }
        //TODO [ 4 ]
        return res.json(sendResponse(result));
    } catch (error) {
        res.status(500).json(sendError());
    }
}

//TODO this function is for check if friend exists in your friends array
const checkFriend = (user, friend) => {
    const userfriends = user.friends
    const result = []

    userfriends.map((value) => {
        const user = JSON.stringify(value.user)
        const friendXX = JSON.stringify(friend._id)
        if (user === friendXX) {
            result.push(user)
        }
    })

    return result;
}

module.exports = {
    sendInvitaion,
    getPendingInvite,
    cancelInvitaion,
}