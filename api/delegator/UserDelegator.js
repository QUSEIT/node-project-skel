const BaseDelegator = require("./BaseDelegator");

class UserDelegator extends BaseDelegator {
  constructor(props) {
    super(props);

    this.createUser = this.createUser.bind(this);
    this.findUserByEmail = this.findUserByEmail.bind(this);
    this.generateAccessToken = this.generateAccessToken.bind(this);
    this.updateAccessToken = this.updateAccessToken.bind(this);
    this.generateRefreshToken = this.generateRefreshToken.bind(this);
    this.updateRefreshToken = this.updateRefreshToken.bind(this);
    this.updateUserByEmail = this.updateUserByEmail.bind(this);
  }

  createUser(email, password, username) {

    return this.db.User.create({
      email,
      password: this.CryptUtil.hashString(password),
      username,
    })
  }

  findUserByEmail(email) {
    return this.db.User.findOne({
      email
    }).exec()
  }

  generateAccessToken(email) {
    const payload = {
      email,
      permission: this.constant.ACCESS_TYPE
    }
    const timeout = this.constant.ACCESS_TOKEN_TIMEOUT;
    const token = this.CryptUtil.generateJWT(payload, timeout);
    return token;
  }

  generateRefreshToken(email) {
    const payload = {
      email,
      permission: this.constant.REFRESH_TOKEN_TIMEOUT
    }
    const timeout = this.constant.REFRESH_TYPE;
    const token = this.CryptUtil.generateJWT(payload, timeout);
    return token;
  }

  updateAccessToken(email) {
    const accessToken = this.generateAccessToken(email);
    return this.updateUserByEmail(email, {
      accessToken: accessToken
    });
  }

  updateRefreshToken(email) {
    const refreshToken = this.generateRefreshToken(email);
    return this.updateUserByEmail(email, {
      refreshToken: refreshToken
    });
  }

  updateUserByEmail(email, updateParams){
    return this.db.User.findOneAndUpdate({email}, {$set:updateParams}).exec();
  }

  verifyRefreshToken(token){
    try {
      const decodedUser = this.CryptUtil.verifyJWT(token);
      if (decodedUser.permission !== this.constant.REFRESH_TYPE) {
        throw new Error("refresh token is invalid.")
      }
      return {
        success: true,
        email: decodedUser.email,
        message: "success"
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}

module.exports = UserDelegator;