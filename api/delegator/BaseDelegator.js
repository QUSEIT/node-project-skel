// db models
const User = require("../../db/models/user");

// utils
const UtilProvider = require("../provider/UtilProvider");

class BaseDelegator{
  constructor(props){

    this.db = {
      User
    }

    this.utils = UtilProvider;
  }

}

module.exports = BaseDelegator;