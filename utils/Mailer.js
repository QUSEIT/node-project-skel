const sgMail = require('@sendgrid/mail');

/**
 * 
 * @param {*} email 
 * example:
 {
   from: {
     email: "sender@gmail.com",
     name: "sender"
   },
   to: "example@gmail.com",
   subject: "Greeting",
   html: "<p>Hello!</p>"
 }
 */
function sendSingle(email){
  return new Promise((resolve) => {
    sgMail.send(email,(error, result)=>{
      if (error) {
        resolve({
          success: false,
          message: error.message,
          receipient: email.to
        })
      }else{
        resolve({
          success: true,
          message: 'success',
          receipient: email.to
        })
      }
    })
  })
}

/**
 * 
 * @param {*} emails must be email array
 */
function sendMulti(emails) {
  if(!Array.isArray(emails)) throw new Error('Argument must be an array.');
  return Promise.all(emails.map(email => {
    return send(email)
  }))
}

function config(ApiKey){
  sgMail.setApiKey(ApiKey);
}

module.exports = {
  sendSingle,
  sendMulti,
  config
};