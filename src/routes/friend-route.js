const Router = require("express").Router;
const { verifyPermissionApi } = require("../middleware/verifyPermisssionApi");

const {
    addFriend,
    searchFriend,
    removeFriend,
    getAllFriends,
} = require("../controllers/friends-controller");

const FriendsRouter = Router();

FriendsRouter.post("/addfriend", verifyPermissionApi, addFriend);
FriendsRouter.delete("/removefriend", verifyPermissionApi, removeFriend);
FriendsRouter.post("/searchfriend", verifyPermissionApi, searchFriend);
FriendsRouter.post("/getallfriends", verifyPermissionApi, getAllFriends);


module.exports = FriendsRouter;
