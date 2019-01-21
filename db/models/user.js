const mongoose = require("../connections/core");

module.exports = mongoose.model('user', mongoose.Schema({
  email: {
    type: Object,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
  },
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String
  }
}));
