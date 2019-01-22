require("./api/config/envconfig").config();
const express = require('express');
const app = express();

const BodyParseMiddleware = require("./api/middleware/BodyParseMiddleware");
const SessionMiddleware = require("./api/middleware/SessionMiddleware");
const AuthMiddleware = require("./api/middleware/AuthMiddleware");
const CORSMiddleware = require("./api/middleware/CORSMiddleware");
const RateLimitMiddleware = require("./api/middleware/RateLimitMiddleware");
const LoggerMiddleware = require("./api/middleware/LoggerMiddleware");

const Logger = require("./api/provider/UtilProvider").Logger;

// apply middleware
app.use(CORSMiddleware.cors);
app.use(RateLimitMiddleware.RateLimiter);
app.use(BodyParseMiddleware.urlencoded);
app.use(BodyParseMiddleware.json);
app.use(BodyParseMiddleware.raw);
app.use(SessionMiddleware.session);
app.use(LoggerMiddleware.requestLogging);

// routes
app.use("/v1",require('./api/routes/auth'));

app.use("/v1", AuthMiddleware.authenticate);
app.use("/v1/user",require('./api/routes/user'));

// listen given port
app.listen(process.env.API_PORT, function() {
  Logger.info(`server listening on port ${process.env.API_PORT}`);
});
