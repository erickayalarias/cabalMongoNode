const endpoint = "/api/v1";

const UserRouter = require("./user-route");
const PostRouter = require("./post-route");
const musicRouter = require("./music-route");
const mintRouter = require("./mint-route");
const FriendsRouter = require("./friend-route");
const EnviteFriendRouter = require("./envite-route");
const playListRouter = require("./playList-route");
const CommunityRouter = require("./communities-route");

const routes = (server) => {
  server.use(
    endpoint,
    UserRouter,
    PostRouter,
    musicRouter,
    FriendsRouter,
    EnviteFriendRouter,
    mintRouter,
    playListRouter,
    CommunityRouter
  );
};

module.exports = routes;
