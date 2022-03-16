const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', '2.0', 'recipes');
const files = []

const fls = fs.readdirSync(dir)
fls.forEach(file => {
  files.push(file)
});

module.exports = files

