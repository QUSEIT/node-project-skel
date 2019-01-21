const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
// 2 hours
const timeout = 2*60*60;

class CryptUtil {
  constructor(secret) {
    this.secret = secret;
  }

  /**
   * 
   * @param {*} payload 
   * @param {*} exp time unit -> second
   * @returns token
   */
  generateJWT(payload, exp=timeout) {
    const token = jwt.sign(payload, this.secret, {expiresIn:exp});
    return token
  }

  /**
   * 
   * @param {*} token jwt
   * @returns decoded token
   */
  verifyJWT(token) {
    const decoded = jwt.verify(token, this.secret);
    return decoded
  }


  /**
   * 
   * @param {*} str 
   * @returns hash string
   */
  hashString(str) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(str, salt);
  }

  /**
   * 
   * @param {*} str Clear text
   * @param {*} hash Ciphertext
   * @returns boolean
   */
  compareHash(str, hash) {
    return bcrypt.compareSync(str, hash);
  }

}

module.exports = CryptUtil;