const BaseController = require("./BaseController");
const UserDelegator = require("../delegator/UserDelegator");

class UserController extends BaseController{
  constructor(props){
    super(props);

    this.UserDelegator = new UserDelegator(props);

    this.singup = this.singup.bind(this);
    this.signin = this.signin.bind(this);
    this.getUserDetail = this.getUserDetail.bind(this);
    this.updateAccessToken = this.updateAccessToken.bind(this);
  }

  async singup(Request, Response, next){
    const email = Request.body.email;
    const password = Request.body.password;
    const username = Request.body.username;

    try {
      await this.UserDelegator.createUser(email, password, username);
      const response = {
        success: true
      }
      this.success(Request,Response,next,response);
    } catch (error) {
      this.error(Request, Response, error);
    }
  }

  async signin(Request, Response, next){
    const email = Request.body.email;
    const password = Request.body.password;

    try {

      const user = await this.UserDelegator.findUserByEmail(email);
      if (!user) {
        this.reject(Request, Response, "user not found");
      }
      if (!this.CryptUtil.compareHash(password, user.password)) {
        this.reject(Request, Response, "email and password not match");
      }
      
      const accessToken = this.UserDelegator.generateAccessToken(email);
      const refreshToken = this.UserDelegator.generateRefreshToken(email);

      const tokens = {
        refreshToken: refreshToken,
        accessToken: accessToken
      }

      await this.UserDelegator.updateUserByEmail(email,tokens)

      const response = {
        tokens
      }

      this.success(Request,Response, next, response);

    } catch (error) {
      this.error(Request, Response, error);
    }
  }

  async getUserDetail(Request, Response, next){
    const email = Request.user.email;
    try {
      const user = await this.UserDelegator.findUserByEmail(email);
      if (!user) {
        this.reject(Request, Response, "user not found");
      }

      const response = {
        user: this.response.UserResponse.respondSingle(user)
      };
      this.success(Request,Response, next, response);
    } catch (error) {
      this.error(Request, Response, error);      
    }
  }

  async updateAccessToken(Request, Response, next){
    const refreshToken = Request.body.refreshToken;

    const verifyResult = this.UserDelegator.verifyRefreshToken(refreshToken);
    if (!verifyResult.success) {
      this.reject(Request,Response,verifyResult.message);
    }

    try {
      const email = verifyResult.email;
      const user = await this.UserDelegator.updateAccessToken(email);
      
      const tokens = {
        accessToken:user.accessToken,
        refreshToken: user.refreshToken
      }
      const response = {
        tokens
      }
      this.success(Request,Response,next,response);
    } catch (error) {
      this.error(Request,Response, error);
    }
  }

}

module.exports = UserController;