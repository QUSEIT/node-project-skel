const Session = require('express-session');

const session = Session({
  name: "base-api",
  secret: '123456',
  cookie: {
      maxAge: 60000
  }
})

module.exports = {
  session
}