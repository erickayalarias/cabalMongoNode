const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser= require('body-parser')
const routes = require("./routes");
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

routes(app);

module.exports = app;
