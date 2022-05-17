const Router = require("express").Router;
const { verifyPermissionApi } = require("../middleware/verifyPermisssionApi");

const {
  addCommunity,
  communitiesByUser,
  communityByPosts,
  updateCommunity,
  acceptCommunity,
  addPostCommunity,
  updatePostCommunity,
  getCommunity,
  leaveCommunity,
} = require("../controllers/communities-controller");

const {
  getPendingCommunityInvite,
  cancelCommunityInvitation,
  checkCommunityInvite,
  sendInviteCommunity,
} = require("../controllers/community-envitation-controller");

const CommunitiesRouter = Router();

//TODO community User
CommunitiesRouter.post("/communities", verifyPermissionApi, addCommunity);
CommunitiesRouter.post("/communities/:id", verifyPermissionApi, getCommunity);
CommunitiesRouter.post("/getCommunitiesUsers", verifyPermissionApi, communitiesByUser);

//TODO community Post
CommunitiesRouter.patch("/updateCommunity", verifyPermissionApi, updateCommunity);
CommunitiesRouter.post("/communities/:id/posts", verifyPermissionApi, communityByPosts);
CommunitiesRouter.post("/communities/:id/addPosts", verifyPermissionApi, addPostCommunity);
CommunitiesRouter.patch("/communities/:communityId/posts/:postId", verifyPermissionApi, updatePostCommunity);

//TODO Community Invite
CommunitiesRouter.post("/acceptcommunity", verifyPermissionApi, acceptCommunity);
CommunitiesRouter.post("/leavecommunity", verifyPermissionApi, leaveCommunity);
CommunitiesRouter.post("/checkinvite", verifyPermissionApi,checkCommunityInvite);
CommunitiesRouter.post("/getcommunitiesinvite", verifyPermissionApi,getPendingCommunityInvite);
CommunitiesRouter.post("/cancelcommunityinvite", verifyPermissionApi, cancelCommunityInvitation);
CommunitiesRouter.post("/communitysendinvite", verifyPermissionApi, sendInviteCommunity )

module.exports = CommunitiesRouter;
