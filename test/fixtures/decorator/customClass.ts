import { customCls, customMethod, preload } from './custom';

@preload()
@customCls()
export class ManagerTest {

  @customMethod()
  testSomething() {
    console.log('hello world');
  }

}
