import { Container as InversifyContainer } from 'inversify';
import { Container, RequestContainer } from '../dist';
import { UserService } from './singleton-scope/userService';
import { UserController } from './singleton-scope/userController';
import injectionFn from './fixtures/injection';
import inversifyFn from './fixtures/inversify';

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

const applicationContext = new Container();
applicationContext.bind(UserService);
applicationContext.bind(UserController);

// add tests
suite
  .add('RequestContext#get', async () => {
    const requestContext = new RequestContainer({}, applicationContext);
    await requestContext.getAsync(UserController);
  })
  .add('Container#get', async () => {
    await applicationContext.getAsync(UserController);
  })
  .add('Container#new', () => {
    // @ts-ignore
    const a = new Container();
  })
  .add('RequestContainer#new', () => {
    // @ts-ignore
    const a = new RequestContainer({}, applicationContext);
  })
  .add('InversifyContainer#new', () => {
    // @ts-ignore
    const a = new InversifyContainer();
  })
  .add('injection instance create', async () => {
    await injectionFn();
  }).
  add('inversify instance create', () => {
    inversifyFn();
  })
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    // @ts-ignore
    console.log('Fastest is ' + (<any> this).filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });
