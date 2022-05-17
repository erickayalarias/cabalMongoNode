const firebase = require("firebase-admin");

const config = require("../config/config");

firebase.initializeApp({
  credential: firebase.credential.cert(config.firebase),
});

module.exports = {
  firebase: firebase,
};
