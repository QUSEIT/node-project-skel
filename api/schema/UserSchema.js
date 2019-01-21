const signup = {
  username: {
    type: "string",
    min: 3
  },
  password: {
    type: "string",
    min: 6
  },
  email: {
    type: 'email'
  }
};

const signin = {
  password: {
    type: "string",
    min: 6
  },
  email: {
    type: 'email'
  } 
}

const updateAccessToken = {
  refreshToken: {
    type: "string"
  }
}

module.exports = {
  signin,
  signup,
  updateAccessToken
}