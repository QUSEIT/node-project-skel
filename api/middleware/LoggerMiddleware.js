const morgan = require('morgan');
const Logger = require("../provider/UtilProvider").Logger.info_logger;

function outputParse(tokens, req, res) {
  const method = req.method;
  const url = req.originalUrl;
  const request_params = {...req.body};
  if (request_params.password) {
    request_params.password = "******"
  }
  return [
      method,
      url,
      "params:",
      JSON.stringify(request_params),
      tokens.status(req, res),
      tokens['response-time'](req, res), 'ms'
  ].join(' ')
}

const outputStream = {
  write: (message) =>{
    Logger.info(message.trim())
  }
}

const requestLogging = morgan(outputParse, {
  stream: outputStream
})

module.exports = {
  requestLogging
}
