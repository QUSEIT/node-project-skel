require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const RateLimit = require('express-rate-limit');
const AuthMiddleware = require("./api/middleware/AuthMiddleware");
const Logger = require('./utils/Logger');

// CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// request rate limit
const RateLimiter = new RateLimit({
  windowMs: 1000,
  max: 100,
  delayMs: 0
});
app.use(RateLimiter);

// parse request body
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// use session
app.use(session({
  name: "base-api",
  secret: '123456',
  cookie: {
      maxAge: 60000
  }
}));

// config request logging
Logger.initRequestLogger(app);

// routes
app.use("/v1",require('./api/routes/auth'));

app.use("/v1", AuthMiddleware.authenticate);
app.use("/v1/user",require('./api/routes/user'));

// listen given port
app.listen(process.env.API_PORT, function() {
  Logger.info(`server listening on port ${process.env.API_PORT}`);
});
