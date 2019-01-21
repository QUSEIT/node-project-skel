const express = require("express");
const Router = express.Router();
const UserController = require("../controller/UserController");
const Controller = new UserController();

Router.get("/detail", Controller.getUserDetail, Controller.sendJson);

module.exports = Router;