const Router = require("express").Router;

const { verifyPermissionApi } = require("../middleware/verifyPermisssionApi");

const {
  getPlaylists,
  likedPlayList,
  deletePlaylist,
  addPlaylist,
  updatePlaylist,
  deleteMusicPlaylist
} = require("../controllers/playLists-controller");

const playListRouter = Router();

playListRouter.post("/playlist", getPlaylists);
playListRouter.post("/addPlaylist", verifyPermissionApi, addPlaylist);
playListRouter.patch("/playlist/:id", verifyPermissionApi, updatePlaylist);
playListRouter.delete("/playlist/:id", verifyPermissionApi, deletePlaylist);
playListRouter.post("/playlistMusic/:id", deleteMusicPlaylist);
playListRouter.post("/playlist/:id/liked", verifyPermissionApi, likedPlayList);

module.exports = playListRouter;
