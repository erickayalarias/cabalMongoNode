const Router = require("express").Router;

const { verifyPermissionApi } = require("../middleware/verifyPermisssionApi");

const {
  addMusic,
  getMusics,
  getSearchByName,
  likedMusic,
} = require("../controllers/music-controller");

const musicRouter = Router();

musicRouter.post("/music", verifyPermissionApi, addMusic);
musicRouter.post("/allMusics", getMusics);
musicRouter.post("/music/search", getSearchByName);
musicRouter.post("/music/:id/liked", verifyPermissionApi, likedMusic);

module.exports = musicRouter;
