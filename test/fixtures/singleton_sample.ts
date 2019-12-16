import {provide, scope, init, inject} from '../../src/annotation';
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
      }, 500);
    });
  }
}

@scope(ScopeEnum.Singleton)
@provide()
export class HelloErrorSingleton {
  public ts: number;
  public end: number;
  @inject()
  public helloErrorInitSingleton;

  @init()
  async doinit(): Promise<true> {
    this.ts = Date.now();
    return new Promise(resolve => {
      this.end = Date.now();
      setTimeout(resolve, 600);
    });
  }
}

@scope(ScopeEnum.Singleton)
@provide()
export class HelloErrorInitSingleton {
  public ts: number;
  public end: number;
  @inject()
  public helloErrorSingleton;

  @init()
  async doinit(): Promise<true> {
    this.ts = Date.now();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.end = Date.now();
        resolve();
      }, 800);
    });
  }
}
