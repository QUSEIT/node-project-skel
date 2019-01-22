
/**
 * 
 * @param {*} user mongo model
 */
function respondSingle(user) {
  return {
    email: user.email,
    username: user.username
  }
}

function respondList(userList){
  if (!Array.isArray(userList)) {
    throw new Error('Argument must be an array.')
  }
  return userList.map(respondSingle)
}

module.exports = {
  respondList,
  respondSingle
}