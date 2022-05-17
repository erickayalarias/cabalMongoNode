const Router = require("express").Router;
const { verifyPermissionApi } = require("../middleware/verifyPermisssionApi");

const {
    addPost,
    getUserPosts,
    updateUserPost,
    deletePost,
    likedPost,
    countLikes,
    findPost,
    wallPosts,
    addComments,
    getPostComments,
    checkLike
} = require("../controllers/post-controller");

const PostRouter = Router();

PostRouter.post("/createpost", verifyPermissionApi, addPost);
PostRouter.post("/addcoment", verifyPermissionApi, addPost);
PostRouter.post("/getuserposts", verifyPermissionApi, getUserPosts);
PostRouter.patch("/updatepost", verifyPermissionApi, updateUserPost);
PostRouter.patch("/likepost", verifyPermissionApi, likedPost);
PostRouter.post("/checklikepost", verifyPermissionApi, checkLike);
PostRouter.post("/countlikes", verifyPermissionApi, countLikes);
PostRouter.delete("/deletepost", verifyPermissionApi, deletePost);
PostRouter.post("/wallposts", verifyPermissionApi, wallPosts);
PostRouter.post("/addcomments", verifyPermissionApi, addComments);
PostRouter.post("/getpostcomments", verifyPermissionApi, getPostComments);
PostRouter.post("/findPost", verifyPermissionApi, findPost);


module.exports = PostRouter;