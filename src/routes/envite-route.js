const Router = require("express").Router;
const { verifyPermissionApi } = require("../middleware/verifyPermisssionApi");

const {
    sendInvitaion,
    getPendingInvite,
    cancelInvitaion
} = require("../controllers/envitation-controller");

const EnviteFriendRouter = Router();

EnviteFriendRouter.post("/invitefriend", verifyPermissionApi, sendInvitaion)
EnviteFriendRouter.post("/cancelinvitefriend", verifyPermissionApi, cancelInvitaion)
EnviteFriendRouter.post("/getpendingfriend", verifyPermissionApi, getPendingInvite)

module.exports = EnviteFriendRouter