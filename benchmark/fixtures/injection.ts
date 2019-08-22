import {
  Container,
  inject,
  provide,
  scope,
  ScopeEnum
} from '../../dist';
import { RequestContainer } from '../requestContainer';

interface Ninja {
  fight(): string;
  sneak(): string;
}

interface Katana {
  hit(): string;
}

interface Shuriken {
  throw(): string;
}

@provide()
class Katana implements Katana {
  public hit() {
      return 'cut!';
  }
}

@provide()
class Shuriken implements Shuriken {
  public throw() {
      return 'hit!';
  }
}

@provide()
@scope(ScopeEnum.Request)
class Ninja implements Ninja {

  @inject('katana')
  private _katana: Katana;
  @inject('shuriken')
  private _shuriken: Shuriken;
  private _tt: string;

  // constructor() {
  //   console.log('-as-dfa-sd-a----');
  //   this._tt = Date.now().toString() + Math.random().toString();
  // }

  public fight() {return this._katana.hit(); }
  public sneak() { return this._shuriken.throw(); }

  get tt(): string {
    return this._tt;
  }

}

const container = new Container();
container.bind(Ninja);
container.bind(Katana);
container.bind(Shuriken);

const reqContainer = new RequestContainer({}, container);

export default async () => {
  reqContainer.updateContext({});
  await reqContainer.getAsync<Ninja>('ninja');
};

// async function test() {
// console.log('-asd-fassdf');
// const t1 = reqContainer.get<Ninja>('ninja');
// reqContainer.updateContext({});
// const t2 = reqContainer.get<Ninja>('ninja');
// reqContainer.updateContext({});
// console.log(t1.tt, t2.tt, t1.tt === t2.tt);
// }

// test().catch(e => console.log(e));
