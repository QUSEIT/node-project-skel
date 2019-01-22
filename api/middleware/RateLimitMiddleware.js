const RateLimit = require('express-rate-limit');
const RateLimiter = new RateLimit({
  windowMs: 1000,
  max: 100,
  delayMs: 0
});

module.exports = {
  RateLimiter
}