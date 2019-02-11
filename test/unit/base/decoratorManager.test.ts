import {
  clearAllModule,
  getClassMetaData,
  getMethodDataFromClass,
  getMethodMetaData,
  getParamNames,
  listMethodDataFromClass,
  listModule,
  listPreloadModule
} from '../../../src/base/decoratorManager';
import * as assert from 'assert';
import { ManagerTest as module } from '../../fixtures/decorator/customClass';

describe.only('/test/unit/base/decoratorManager.test.ts', () => {

  it('should save data on class and get it', () => {
    assert(getClassMetaData('custom', module) === 'test');
  });

  it('should save data to class and list it', () => {
    const dataRes = listMethodDataFromClass('custom', module);
    assert(dataRes.length === 1);

    const { method, data } = getMethodDataFromClass('custom', module, 'testSomething');
    assert(dataRes[ 0 ].method === method);
    assert(dataRes[ 0 ].data === data);
  });


  it('should get method meta data from method', () => {
    const m = new module();
    // 挂载到方法上的元信息必须有实例
    assert(getMethodMetaData('custom', m, 'testSomething') === 'methodData');
  });

  it('should list preload module', () => {
    const modules = listPreloadModule();
    assert(modules.length === 1);
  });

  it('should list module', () => {
    const modules = listModule('custom');
    assert(modules.length === 1);
  });

  it('should clear all module', () => {
    clearAllModule();
    let modules = listPreloadModule();
    assert(modules.length === 0);

    modules = listModule('custom');
    assert(modules.length === 0);
  });

  it('should get function args', () => {
    const args = getParamNames((a, b, c) => {
    });
    assert(args.length === 3)
  });
});
