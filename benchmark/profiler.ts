import * as injection from '../dist';
import { Container } from 'inversify';

const MyContainer = injection.Container;

console.time('injection');
for (let i = 0; i < 100000; i++) {
  // tslint:disable-next-line
  const a = new MyContainer();
}
console.timeEnd('injection');

console.time('inversify');
for (let i = 0; i < 100000; i++) {
  // tslint:disable-next-line
  const a = new Container();
}
console.timeEnd('inversify');
