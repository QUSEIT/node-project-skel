const Logger = require("../../utils/Logger");
const CryptUtil = require("../../utils/CryptUtil");
const Validator = require("../../utils/Velidator");
const Render = require("../../utils/Render");
const Mailer = require("../../utils/Mailer");
Mailer.config(process.env.SENDGRID_API_KEY);

const LOG_DIR = process.env.LOG_DIR || null;
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const logger = new Logger(LOG_DIR);
const cryptUtil = new CryptUtil(TOKEN_SECRET);

module.exports = {
  Logger: logger,
  CryptUtil: cryptUtil,
  Validator,
  Render,
  Mailer
}