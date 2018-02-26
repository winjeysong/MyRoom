/**
 * modify filename
 */

const fs = require('fs');
const path = require('path');
const { build_path, build_filename } = require('../config/config');

const dirPath = path.resolve(build_path);

module.exports = new Promise((resolve, reject) => {
  fs.readdir(dirPath, (err, files) => {
    if (!err) {
      resolve(files.forEach((name) => {
        const oldPath = path.join(dirPath, name);
        const newPath = path.join(dirPath, name.replace(/index/, build_filename));
        if (err) {
          console.error(err);
        }

        fs.rename(oldPath, newPath, (errr) => {
          if (errr) {
            throw errr;
          }
        });
      }));
    } else {
      reject(err);
    }
  });
});

