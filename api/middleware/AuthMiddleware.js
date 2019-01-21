const BaseController = require('../controller/BaseController');

const authorizationType = "Bearer";

class AuthMiddleware extends BaseController {
  constructor(props) {
    super(props);
    this.authenticate = this.authenticate.bind(this);
  }

  async authenticate(Request, Response, next) {

    try {
      
      const authorization = req.headers.authorization;
      if (!authorization || authorization.split(" ")[0] !== authorizationType) {
        this.reject(Request,Response,"Authorization token is required",401);
      }
      const token = authorization.split(" ")[1];
      const user = this.CryptUtil.verifyJWT(token);

      if (user.permission !== this.constant.ACCESS_TYPE) {
        this.reject(Request,Response,"Authorization token has not permision to access",401);
      }

      Request.user = user;
      next();
    } catch (error) {
      this.reject(Request,Response,"Verify token error",401);
    }
  }
}

module.exports = new AuthMiddleware();