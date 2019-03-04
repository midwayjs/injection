import { attachClass, attachMethod, customCls, customMethod, preload, propertyKeyA, propertyKeyB } from './custom';
import { provide, scope, ScopeEnum } from '../../../src';

@provide()
@scope(ScopeEnum.Singleton)
@preload()
@customCls()
@attachClass('/')
@attachClass('/api')
@attachClass('/router')
@attachClass('/test')
export class ManagerTest {

  @propertyKeyA('property_a')
  @propertyKeyB('test_a')
  @propertyKeyB('test_b')
  @propertyKeyB('test_c')
  testProperty;

  @customMethod()
  testSomething() {
    console.log('hello world');
  }

  @attachMethod('/aaa')
  @attachMethod('/bbb')
  @attachMethod('/ccc')
  index() {
    console.log('hello world index');
  }

}
