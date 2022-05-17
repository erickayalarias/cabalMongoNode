const Router = require("express").Router;
const { verifyPermissionApi } = require("../middleware/verifyPermisssionApi");
const { addNFT } = require("../controllers/mint-controller");
const multer = require('multer')

storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
})

var upload = multer({ storage: storage })

const mintRouter = Router();

mintRouter.post("/createnft", upload.array('file'),
  addNFT);

module.exports = mintRouter;