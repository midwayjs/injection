import {provide, inject, scope} from '../../src/annotation';
import { ScopeEnum } from '../../src';
@provide()
export class TestOne {
  name = 'one';

  @inject('testTwo')
  two: any;
}
@provide()
export class TestTwo {
  name = 'two';

  @inject('testOne')
  testOne: any;
}
@provide()
export class TestThree {
  name = 'three';


  @inject('testTwo')
  two: any;
}

@provide()
@scope(ScopeEnum.Request)
export class CircularTwo {
  public ooo;
  constructor(@inject() circularOne: any) {
    this.ts = Date.now();
    this.ooo = circularOne;
  }
  @inject()
  public circularOne: any;
  public ts: number;

  public test2: string = 'this is two';

  public async ctest2(a: any): Promise<any> {
    return a + (await this.circularOne.ctest1('two'));
  }

  public ttest2(b: any) {
    return b + this.circularOne.test2('two');
  }
}

@provide()
@scope(ScopeEnum.Request)
export class CircularOne {
  constructor() {
    this.ts = Date.now();
  }
  @inject()
  public circularTwo: any;
  public ts: number;

  public test1: string = 'this is one';

  public async ctest1(a: any): Promise<any> {
    return a + 'one';
  }

  public test2(b: any) {
    return b + 'one';
  }
}

@provide()
@scope(ScopeEnum.Request)
export class CircularThree {
  constructor() {
    this.ts = Date.now();
  }
  @inject()
  public circularTwo: any;
  public ts: number;
}

@provide()
export class FunService {

}
@provide()
export class AppService {

}
@provide()
export class TenService {

}
@provide()
export class GroupService {
  ts = 'group';
  @inject()
  gatewayService: any;
  @inject()
  tenService: TenService;
  @inject()
  appService: AppService;
}
@provide()
export class GatewayManager {
  ts = 'gtmanager';
  @inject()
  groupService: GroupService;
  @inject()
  funService: FunService;
  @inject()
  appService: AppService;
}

@provide()
export class GatewayService {
  ts = 'gateway';
  @inject()
  appService: AppService;
  @inject()
  funService: FunService;
  @inject()
  gatewayManager: GatewayManager;
  @inject()
  groupService: GroupService;
}
@provide()
export class ScaleManager {
  ts = 'scale';
  @inject()
  tenService: TenService;
  @inject()
  appService: AppService;
  @inject()
  funService: FunService;
  @inject()
  gatewayManager: GatewayManager;
  @inject()
  gatewayService: GatewayService;
  @inject()
  groupService: GroupService;

  @inject()
  autoScaleService: any;
}

@provide()
export class AutoScaleService {
  ts = 'ascale';
  @inject()
  gatewayManager: GatewayManager;
  @inject()
  gatewayService: GatewayService;
  @inject()
  groupService: GroupService;
  @inject()
  scaleManager: ScaleManager;
}

@provide()
export class CCController {
  ts = 'controller';
  @inject()
  autoScaleService: AutoScaleService;
}