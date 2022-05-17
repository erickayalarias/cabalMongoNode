const { PlayListsModel } = require("../src/models");
// put in user controller maybe is deleted by mistake
const createMyLikesPlayList = async (userId) => {
  const foundPlayList = await PlayListsModel.findOne({
    author: userId,
    title: "likes",
  });
    if (foundPlayList) return;
    await PlayListsModel.create({
      title: "likes",
      author: userId,
      image:"https://picsum.photos/200"
    });
  return;
};

module.exports = { createMyLikesPlayList };

