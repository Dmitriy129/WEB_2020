const pug = require('pug');

console.log(pug.renderFile('demo.pug', {
  counter: '2'
}));