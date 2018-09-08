const path = require('path');
const fs = require('fs');

exports.walk = modelPath => {
  fs
    .readdirSync(modelPath)
    .forEach(file => {
      const filePath = path.join(modelPath, `/${file}`);
      const stat = fs.statSync(filePath);

      if (stat.isFile()) {
        if (/(.*)\.(js)/.test(file)) {
          require(filePath);
        }
      } else if (stat.isDirectory()) {
        walk(filePath);
      }
    });
};