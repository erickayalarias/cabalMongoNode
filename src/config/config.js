require("dotenv").config();

const CONFIG = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoDB: {
    db_url: process.env.MONGODB_URL,
    db_url_test: process.env.MONGODB_URL_TEST,
  },
};

module.exports = CONFIG;
