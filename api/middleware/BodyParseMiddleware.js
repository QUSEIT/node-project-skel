const bodyParser = require('body-parser');

const urlencoded = bodyParser.urlencoded({
  extended: false
});

const json = bodyParser.json();
const raw = bodyParser.raw();

module.exports = {
  urlencoded,
  json,
  raw
}