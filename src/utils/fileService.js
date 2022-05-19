const fs = require('fs');

function writeDataToFile(file, content) {
  fs.writeFileSync(file, JSON.stringify(content), (err) => {
    if (err) throw err;
});
}

  module.exports = {
    writeDataToFile,
  };
  