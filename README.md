# Injection

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/midwayjs/injection/blob/master/LICENSE)
[![GitHub tag](https://img.shields.io/github/tag/midwayjs/injection.svg)]()
[![Build Status](https://travis-ci.org/midwayjs/injection.svg?branch=master)](https://travis-ci.org/midwayjs/injection)
[![Test Coverage](https://img.shields.io/codecov/c/github/midwayjs/injection/master.svg)](https://codecov.io/gh/midwayjs/injection/branch/master)
[![Package Quality](http://npm.packagequality.com/shield/injection.svg)](http://packagequality.com/#?package=injection)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/midwayjs/midway/pulls)

Injection is a powerful inversion of control container that is widely used in the midway framework and brings good user experience. 

## Installation

```bash
$ npm install injection reflect-metadata --save
```

Node.js >= 10.0.0 required.

> Injection requires TypeScript >= 2.0 and the experimentalDecorators, emitDecoratorMetadata, types and lib compilation options in your tsconfig.json file.

```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "commonjs",
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "inlineSourceMap":true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "stripInternal": true,
    "pretty": true,
    "declaration": true,
    "outDir": "dist",
    "lib": ["ES2018", "dom"]
  }
}
```

## Getting Started

```ts
import {Container, provide, inject} from 'injection';

@provide('userModel')
class UserModel {

}

@provide('userService')
class UserService {
  
  @inject()
  private userModel;
  
  async getUser(uid) {
    // TODO
    return 'Alex';
  }
}


const container = new Container();
container.bind(UserService);
container.bind(UserModel);

async function getData() {
  const userService = await container.getAsync<UserService>('userService'); 
  const data = await userService.getUser(123);
  return data;
}

getData().then(console.log);
// Alex
```

Document: [https://midwayjs.org/injection/guide.html](https://midwayjs.org/injection/guide.html)

## License

[MIT]((http://github.com/midwayjs/midway/blob/master/LICENSE))
