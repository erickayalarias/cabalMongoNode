const { connect, connection } = require("mongoose");
const CONFIG = require("../config/config");

const connectDatabase = async () => {
  //Connect to choose one of the two databases depending on the environment
  CONFIG.nodeEnv == "test"
    ? await connect(CONFIG.mongoDB.db_url_test)
    : await connect(CONFIG.mongoDB.db_url);
};

module.exports = {
  connectDatabase,
  connection,
};
