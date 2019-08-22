import 'reflect-metadata';

import {
  Container,
  inject,
  injectable
} from 'inversify';

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

@injectable()
class Katana implements Katana {
  public hit() {
      return 'cut!';
  }
}

@injectable()
class Shuriken implements Shuriken {
  public throw() {
      return 'hit!';
  }
}

@injectable()
class Ninja implements Ninja {

  private _katana: Katana;
  private _shuriken: Shuriken;
  private _tt: string;

  public constructor(
      @inject('Katana') katana: Katana,
      @inject('Shuriken') shuriken: Shuriken
  ) {
      // this._tt = Date.now().toString() + Math.random().toString();
      this._katana = katana;
      this._shuriken = shuriken;
  }

  public fight() {return this._katana.hit(); }
  public sneak() { return this._shuriken.throw(); }

  get tt(): string {
    return this._tt;
  }

}

const container = new Container();
container.bind<Ninja>('Ninja').to(Ninja).inRequestScope();
container.bind<Katana>('Katana').to(Katana);
container.bind<Shuriken>('Shuriken').to(Shuriken);

export default () => {
  container.get<Ninja>('Ninja');
};
// console.log('-asd-fassdf');
// const t1 = container.get<Ninja>('Ninja');
// const t2 = container.get<Ninja>('Ninja');
// console.log(t1.tt, t2.tt, t1.tt === t2.tt);
