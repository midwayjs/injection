import {provide, scope, init} from '../../src/annotation';
import {ScopeEnum} from '../../src';

@scope(ScopeEnum.Singleton)
@provide()
export class HelloSingleton {
  ts: number;
  end: number;

  @init()
  async doinit(): Promise<true> {
    this.ts = Date.now();
    return new Promise(resolve => {
      setTimeout(() => {
        this.end = Date.now();
        resolve();
      }, 1000);
    });
  }
}

@scope(ScopeEnum.Singleton)
@provide()
export class HelloErrorSingleton {
  constructor() {
    throw new Error('hello singleton error');
  }

  @init()
  async doinit(): Promise<true> {
    return new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
  }
}

@scope(ScopeEnum.Singleton)
@provide()
export class HelloErrorInitSingleton {
  @init()
  async doinit(): Promise<true> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('this is error');
      }, 1000);
    });
  }
}
