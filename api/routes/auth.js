const express = require("express");
const Router = express.Router();
const UserController = require("../controller/UserController");
const Controller = new UserController();

const UserSchema = require("../schema/UserSchema");

const signupSchema = UserSchema.signup;
const signinSchema = UserSchema.signin;
const updateAccessTokenSchema = UserSchema.updateAccessToken;

Router.post("/signup", Controller.checkParams(signupSchema), Controller.singup, Controller.sendJson);
Router.post("/signin", Controller.checkParams(signinSchema), Controller.signin, Controller.sendJson);
Router.post("/accesstoken/update", Controller.checkParams(updateAccessTokenSchema), Controller.updateAccessToken, Controller.sendJson);

module.exports = Router;