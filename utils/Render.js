const renderFile = require("ejs").renderFile;

/**
 * render given file
 * @param {*} filePath html template file
 * @param {*} args pass to html template
 * @returns Promise -> html
 */
function render(filePath, args) {
  return new Promise((resole, reject)=>{
    renderFile(filePath, args, (err, html)=>{
      if (err) {
        reject(err);
      }else{
        resole(html);
      }
    });
  })
}

module.exports = {
  render
}