// const { authFirebase } = require("../firebase/firebase");
const { UserModel } = require("../models");

async function verifyPermissionApi(req, res, next) {
  try {
    const publicKeyDB = await UserModel.findOne({ uid: req.body.uid });
    if (!publicKeyDB) {
      return res.status(401).send({
        success: false,
        msg: "Unauthorized",
      });
    }
    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      msg: "Unauthorized",
    });
  }
}

module.exports = {
  verifyPermissionApi,
};
