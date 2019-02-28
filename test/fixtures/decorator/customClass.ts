import { attachClass, attachMethod, customCls, customMethod, preload } from './custom';
import { provide } from '../../../src/annotation';

@provide()
@preload()
@customCls()
@attachClass('/')
@attachClass('/api')
@attachClass('/router')
@attachClass('/test')
export class ManagerTest {

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
