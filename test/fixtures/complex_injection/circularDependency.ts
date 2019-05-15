import { provide, inject } from '../../../src/';

@provide('aA')
export class AA {
  @inject('bB')
  b;
  @inject('cC')
  c;
  constructor(@inject('Dd') d){
    void d;
  }
}


@provide('bB')
export class BB {
  @inject('eE')
  e;
}

@provide('cC')
export class CC {
  @inject('eE')
  e;
  @inject('fF')
  f;
}

@provide('dD')
export class DD {
  @inject('fF')
  f;
}

@provide('eE')
export class EE {
  @inject('aA')
  a;
}

@provide('fF')
export class FF {
  @inject('aA')
  a;
}
