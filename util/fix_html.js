/**
 * html built with roadhog needs modifying secondly
 */

const fs = require('fs');
const path = require('path');
const { build_filename, build_path } = require('../config/config');

const dirPath = path.resolve(build_path);
const filePath = `${path.join(dirPath, build_filename)}.html`;

module.exports = () => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    const newData = data.replace(/\s+<link rel="stylesheet" href="\/index\.css" \/>/, '').replace(/\/index\./g, `/${build_filename}.`);
    fs.writeFile(filePath, newData, 'utf-8', (errr) => {
      if (errr) {
        throw errr;
      }
      console.log('modifying success');
    });
  });
};
