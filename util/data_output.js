const co = require('co');
const mongoose = require('mongoose');
const fs = require('fs');
const User = require('../models/user');

const outputPath = './dist/data_output.json';

mongoose.connect('mongodb://localhost:27017/logindemo');
co(function* () {
  // let user = yield User.findOne({ username: '1111' });
  const user = yield User.find({ username: /.+/ }, 'username email', (err, doc) => {
    console.log(doc);
  });
  // user = user.toJSON();
  console.log(JSON.stringify(user));
  fs.writeFileSync(outputPath, JSON.stringify(user));
}).catch(onerror);

function onerror(err) {
  console.error(err.stack);
}

