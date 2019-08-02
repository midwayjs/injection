const MyContainer = require('../dist/index').ApplicationContext;
const { Container } = require('inversify');

console.time('injection');
for(let i = 0; i < 100000; i++) {
  new MyContainer();
}
console.timeEnd('injection');


console.time('inversify');
for(let i = 0; i < 100000; i++) {
  new Container();
}
console.timeEnd('inversify');