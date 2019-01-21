const express = require("express");
const Router = express.Router();
const UserController = require("../controller/UserController");
const Controller = new UserController();

const signupSchema = Controller.schema.UserSchema.signup;
const signinSchema = Controller.schema.UserSchema.signin;
const updateAccessTokenSchema = Controller.schema.UserSchema.updateAccessToken;

Router.post("/signup", Controller.checkParams(signupSchema), Controller.singup, Controller.sendJson);
Router.post("/signin", Controller.checkParams(signinSchema), Controller.signin, Controller.sendJson);
Router.post("/accesstoken/update", Controller.checkParams(updateAccessTokenSchema), Controller.updateAccessToken, Controller.sendJson);

module.exports = Router;