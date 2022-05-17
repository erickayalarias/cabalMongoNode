const Router = require("express").Router;
const { verifyPermissionApi } = require("../middleware/verifyPermisssionApi");

const {
    signup,
    login,
    checkPublicKey,
    getUser,
    updateUser,
} = require("../controllers/user-controler");

const UserRouter = Router();

UserRouter.post("/checkPublicKey", checkPublicKey);
UserRouter.post("/login", login);
UserRouter.post("/finduser", getUser);
UserRouter.patch("/users", verifyPermissionApi, updateUser);
UserRouter.route("/signup").post(signup);

module.exports = UserRouter;
