const UtilProvider = require("../provider/UtilProvider");
const Logger = UtilProvider.Logger;
const Validator = UtilProvider.Validator;

/**
 * all route controller extends BaseController
 */
class BaseController {

  constructor(props) {
    this.error = this.error.bind(this);
    this.success = this.success.bind(this);
    this.reject = this.reject.bind(this);
    this.limit = this.limit.bind(this);
    this.skip = this.skip.bind(this);
    this.checkParams = this.checkParams.bind(this);
    this.sendJson = this.sendJson.bind(this);
    this.sendStream = this.sendStream.bind(this);
  }

  /**
   * request error
   * @param {*} Response 
   * @param {*} error 
   */
  error(Request, Response, error) {
    const url = Request.originalUrl;
    let msg;
    if (error instanceof Error) {
      msg = error.message;
    } else {
      msg = error;
    }
    Logger.error(url, error);
    Response.status(500).json({
      error: msg
    })
  }

  /**
   * handle success
   * @param {*} Response 
   * @param {*} data 
   */
  success(Request, Response, next, data) {
    if(Request.response){
      Request.response = {
        ...Request.response,
        data
      }
    }else{
      Request.response = data;
    }
    next();
  }

  /**
   * response json data to api caller
   * @param {*} Request 
   * @param {*} Response 
   */
  sendJson(Request, Response) {
    const data = Request.response;
    Response.status(200).json(data)
  }

  /**
   * response stream data to api caller
   * @param {*} Request 
   * @param {*} Response 
   */
  sendStream(Request, Response) {
    const data = Request.response;
    Response.sendSeekable(data.stream,data.options);
  }

  /**
   * request rejest
   * @param {*} Response 
   * @param {*} error 
   */
  reject(Request, Response, message, code=400) {
    const url = Request.originalUrl;
    Logger.warn(url, message);
    Response.status(code).json({
      error: message
    })
  }

  /**
   * used to parse limit number
   * @param {*} num 
   */
  limit(num) {
    if (num) {
      const parseNum = Number(num);
      return parseNum > 0 ? (parseNum > 20 ? 20 : parseNum) : 10
    }
    return 10
  }

  /**
   * used to parse skip number
   * @param {*} num 
   */
  skip(num){
    if (num) {
      const parseNum = Number(num);
      return parseNum > 0 ? parseNum : 0
    }
    return 0
  }

  /**
   * check the request params
   * @param {*} schema 
   */
  checkParams(schema){
    return (Request, Response, next) => {
      let params;
      if(Request.method === 'POST'){
        params = Request.body;
      }else{
        params = Request.query;
      }
      const validateResult = Validator.validate(params, schema);
      if (validateResult.success) {
        next();
      }else{
        this.reject(Request,Response,validateResult.message);
      }
    }
  }
}

module.exports = BaseController;