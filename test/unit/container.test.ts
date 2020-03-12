import { Container } from '../../src/index';
import { expect } from 'chai';
import {
  Grandson,
  Child,
  Parent,
  BaseService,
  BaseServiceAsync,
  BaseServiceGenerator,
  Katana,
  Ninja,
  Samurai,
  Warrior,
  SubParent,
  SubChild
} from '../fixtures/class_sample';
import { recursiveGetMetadata } from '../../src/utils/reflectTool';
import { TAGGED_PROP } from '../../src/index';
import 'reflect-metadata';

import { BMWX1, Car, Electricity, Gas, Tesla, Turbo } from '../fixtures/class_sample_car';
import { childAsyncFunction, childFunction, testInjectAsyncFunction, testInjectFunction, singletonFactory2 } from '../fixtures/fun_sample';
import { DieselCar, DieselEngine, engineFactory, PetrolEngine } from '../fixtures/mix_sample';
import { HelloSingleton, HelloErrorInitSingleton, HelloErrorSingleton } from '../fixtures/singleton_sample';
import { CircularOne, CircularTwo, CircularThree, TestOne, TestTwo, TestThree } from '../fixtures/circular_dependency';
import { AliSingleton, singletonFactory } from '../fixtures/fun_sample';
import path = require('path');

describe('/test/unit/container.test.ts', () => {

  it('Should be able to store bindings', () => {
    const ninjaId = 'Ninja';
    const container = new Container();
    container.bind<Ninja>(ninjaId, <any>Ninja);
    const ninja = container.get(ninjaId);
    expect(ninja instanceof Ninja).to.be.true;
  });

  it('Should have an unique identifier', () => {
    const container1 = new Container();
    container1.id = Math.random().toString(36).substr(2).slice(0, 10);
    if (container1.id.length < 10) {
      container1.id += '1';
    }
    const container2 = new Container();
    container2.id = Math.random().toString(36).substr(2).slice(0, 10);
    if (container2.id.length < 10) {
      container2.id += '1';
    }
    expect(container1.id.length).eql(10);
    expect(container2.id.length).eql(10);
    expect(container1.id).not.eql(container2.id);
  });

  it('should inject property', () => {
    const container = new Container();
    container.bind<Warrior>('warrior', <any>Samurai);
    container.bind<Warrior>('katana1', <any>Katana);
    container.bind<Warrior>('katana2', <any>Katana);
    const warrior = container.get<Warrior>('warrior');
    expect(warrior instanceof Samurai).to.be.true;
    expect(warrior.katana1).not.to.be.undefined;
    expect(warrior.katana2).not.to.be.undefined;
  });

  it('should inject attributes that on the prototype chain and property', () => {
    const container = new Container();
    container.bind<Grandson>('grandson', <any>Grandson);
    container.bind<Grandson>('katana1', <any>Katana);
    container.bind<Grandson>('katana2', <any>Katana);
    container.bind<Grandson>('katana3', <any>Katana);
    const grandson = container.get<Grandson>('grandson');
    expect(grandson instanceof Child).to.be.true;
    expect(grandson instanceof Parent).to.be.true;
    expect(grandson.katana1).not.to.be.undefined;
    expect(grandson.katana2).not.to.be.undefined;
    expect(grandson.katana3).not.to.be.undefined;
  });

  it('should get all metaDatas that on the prototype chain and property', () => {
    const container = new Container();
    container.bind<Grandson>('grandson', <any>Grandson);
    container.bind<Grandson>('child', <any>Child);
    container.bind<Grandson>('parent', <any>Parent);
    container.bind<Grandson>('katana1', <any>Katana);
    container.bind<Grandson>('katana2', <any>Katana);
    container.bind<Grandson>('katana3', <any>Katana);
    const metadatas = ['grandson', 'child', 'parent'].map(function (identifier) {
      const defition = container.registry.getDefinition(identifier);
      const tareget = defition.path;
      return {
        recursiveMetadata: recursiveGetMetadata(TAGGED_PROP, tareget),
        ownMetadata: Reflect.getOwnMetadata(TAGGED_PROP, tareget),
      };
    });
    const grandsonMetadata = metadatas[0];
    const childMetadata = metadatas[1];
    const parentMetadata = metadatas[2];

    expect(grandsonMetadata.recursiveMetadata)
      .to.have.lengthOf(3)
      .include(grandsonMetadata.ownMetadata);
    expect(childMetadata.recursiveMetadata)
      .to.have.lengthOf(2)
      .include(childMetadata.ownMetadata);
    expect(parentMetadata.recursiveMetadata)
      .to.have.lengthOf(1)
      .include(parentMetadata.ownMetadata);

    expect(grandsonMetadata.recursiveMetadata).to.deep.equal([
      grandsonMetadata.ownMetadata,
      childMetadata.ownMetadata,
      parentMetadata.ownMetadata
    ]);
    expect(grandsonMetadata.recursiveMetadata).to.deep.equal([
      grandsonMetadata.ownMetadata,
      ...childMetadata.recursiveMetadata,
    ]);
    expect(grandsonMetadata.recursiveMetadata).to.deep.equal([
      grandsonMetadata.ownMetadata,
      childMetadata.ownMetadata,
      ...parentMetadata.recursiveMetadata
    ]);
  });

  it('should throw error with class name when injected property error', async () => {
    const container = new Container();
    container.bind<Grandson>('grandson', <any>Grandson);

    expect(function () { container.get('grandson'); }).to.throw(Error, /Grandson/);
    expect(function () { container.get('nograndson'); }).to.throw(Error, /nograndson/);

    try {
      await container.getAsync('grandson');
    } catch (error) {
      expect(function () { throw error; }).to.throw(Error, /Grandson/);
    }
    try {
      await container.getAsync('nograndson');
    } catch (error) {
      expect(function () { throw error; }).to.throw(Error, /nograndson/);
    }
  });


  it('should load js dir and inject with $', () => {
    const container = new Container();
    container.bind('app', require(path.join(__dirname, '../fixtures/js-app-inject', 'app.js')));
    container.bind('loader', require(path.join(__dirname, '../fixtures/js-app-inject', 'loader.js')).Loader);
    const app: any = container.get('app');
    expect(app.getConfig().a).to.equal(1);
  });

  it('should bind class directly', () => {
    const container = new Container();
    container.bind(Katana);
    const ins1 = container.get(Katana);
    const ins2 = container.get('katana');
    expect(ins1).to.equal(ins2);
  });

  it('should resolve instance', async() => {
    const container = new Container();
    const ins1 = container.resolve(Katana);
    expect(ins1 instanceof Katana).to.be.true;
    expect(() => {
      container.get(Katana);
    }).to.throw(/is not valid in current context/);

    container.bind<SubChild>('subChild', <any>SubChild);
    container.bind<SubParent>('subParent', <any>SubParent);
    try {
      await container.getAsync('subParent');
    } catch (error) {
      expect(function () { throw error; }).to.throw(/is not valid in current context/);
    }
  });

  it('should use get async method replace get', async () => {
    const container = new Container();
    container.bind(BaseService);
    const ins = await container.getAsync(BaseService);
    expect(ins instanceof BaseService).to.be.true;
  });

  it('should execute async init method when object created', async () => {
    const container = new Container();
    container.bind(BaseServiceAsync);
    const ins = <BaseServiceAsync>await container.getAsync(BaseServiceAsync);
    expect(ins.foodNumber).to.equal(20);
  });

  it('should execute generator init method when object created', async () => {
    const container = new Container();
    container.bind(BaseServiceGenerator);
    const ins = <BaseServiceGenerator>await container.getAsync(BaseServiceGenerator);
    expect(ins.foodNumber).to.equal(20);
  });

  it('should support constructor inject', async () => {
    const container = new Container();
    container.bind('engine', Turbo);
    container.bind('fuel', Gas);
    container.bind(Car);

    const car = <Car>await container.getAsync(Car);
    car.run();
    expect(car.getFuelCapacity()).to.equal(35);
  });

  it('should support constructor inject from parent', async () => {
    const container = new Container();
    container.bind('engine', Turbo);
    container.bind('fuel', Gas);
    container.bind(BMWX1);

    const car = <Car>await container.getAsync(BMWX1);
    car.run();
    expect(car.getFuelCapacity()).to.equal(35);
    expect(car.getBrand()).to.equal('bmw');
  });

  it('should inject constructor parameter in order', async () => {
    const container = new Container();
    container.bind(Tesla);
    container.bind('engine', Turbo);
    container.bind('fuel', Electricity);

    const car = <Car>await container.getAsync(Tesla);
    car.run();
    expect(car.getFuelCapacity()).to.equal(130);
  });

  describe('inject function', () => {

    it('should get function module', () => {
      const container = new Container();
      container.bind('parent', testInjectFunction);
      container.bind('child', childFunction);
      const result = container.get('parent');
      expect(result).to.equal(3);
    });

    it('should get async function module', async () => {
      const container = new Container();
      container.bind('parentAsync', testInjectAsyncFunction);
      container.bind('childAsync', childAsyncFunction);
      const result = await container.get('parentAsync');
      expect(result).to.equal(7);
    });
  });

  describe('mix suit', () => {

   const container = new Container();

    it('should use factory dynamic create object', () => {
      container.bind('engineFactory', engineFactory);
      container.bind(DieselCar);
      container.bind(PetrolEngine);
      container.bind(DieselEngine);
      const result = <DieselCar>container.get(DieselCar);
      result.run();
      expect(result.dieselEngine.capacity).to.equal(15);
      expect(result.backUpDieselEngine.capacity).to.equal(20);
    });

  });

  describe('singleton case', () => {
    const container = new Container();

    it('singleton lock should be ok', async () => {
      container.bind(HelloSingleton);
      container.bind(HelloErrorSingleton);
      container.bind(HelloErrorInitSingleton);
      
      await container.ready();

      /*
      const later = async () => {
        return new Promise(resolve => {
          setTimeout(async () => {
            resolve(await Promise.all([
              container.getAsync(HelloSingleton), container.getAsync(HelloSingleton)
            ]));
          }, 90);
        });
      };

      const arr = await Promise.all([container.getAsync(HelloSingleton),
        container.getAsync(HelloSingleton), container.getAsync(HelloSingleton), later()]);
      const inst0 = <HelloSingleton>arr[0];
      const inst1 = <HelloSingleton>arr[3][0];
      expect(inst0.ts).eq(inst1.ts);
      expect(inst0.end).eq(inst1.end); 
      */


      const arr1 = await Promise.all([
        container.getAsync(HelloErrorSingleton),
        container.getAsync(HelloErrorInitSingleton)
      ]);
      const inst: HelloErrorSingleton = <HelloErrorSingleton>arr1[0];
      const inst2: HelloErrorInitSingleton = <HelloErrorInitSingleton>arr1[1];

      expect(inst).is.a('object');
      expect(inst2).is.a('object');
      expect(inst.ts).eq(inst2.helloErrorSingleton.ts);
      expect(inst.end).eq(inst2.helloErrorSingleton.end);
      expect(inst2.ts).eq(inst.helloErrorInitSingleton.ts);
      expect(inst2.end).eq(inst.helloErrorInitSingleton.end);
    });
  });

  describe('circular dependency', () => {
    
    it('circular should be ok', async () => {
      const container = new Container();
      container.registerObject('ctx', {});

      container.bind(CircularOne);
      container.bind(CircularTwo);
      container.bind(CircularThree);

      const circularTwo: CircularTwo = await container.getAsync(CircularTwo);
      const circularThree: CircularThree = await container.getAsync(CircularThree);

      expect(circularTwo.test2).eq('this is two');
      expect((<CircularOne>circularTwo.circularOne).test1).eq('this is one');
      expect((<CircularTwo>(<CircularOne>circularTwo.circularOne).circularTwo).test2).eq('this is two');
      expect(circularThree.circularTwo.test2).eq('this is two');
      expect(circularTwo.ts).eq((<CircularTwo>(<CircularOne>circularTwo.circularOne).circularTwo).ts);
      expect(circularTwo.ttest2('try ttest2')).eq('try ttest2twoone');
      expect(await circularTwo.ctest2('try ttest2')).eq('try ttest2twoone');
      expect(await (<CircularTwo>(<CircularOne>circularTwo.circularOne).circularTwo).ctest2('try ttest2')).eq('try ttest2twoone');

      const circularTwoSync: CircularTwo = container.get(CircularTwo);
      const circularOneSync: CircularOne = container.get(CircularOne);

      expect(circularTwoSync.test2).eq('this is two');
      expect(circularOneSync.test1).eq('this is one');
      expect(circularTwoSync.ttest2('try ttest2')).eq('try ttest2twoone');
      expect(await circularTwoSync.ctest2('try ttest2')).eq('try ttest2twoone');
    });

    it('alias name circular should be ok', async () => {
      const container = new Container();
      container.registerObject('ctx', {});

      container.bind(TestOne);
      container.bind(TestTwo);
      container.bind(TestThree);
      container.bind(CircularOne);
      container.bind(CircularTwo);
      container.bind(CircularThree);

      const circularTwo: CircularTwo = await container.getAsync(CircularTwo);
      expect(circularTwo.test2).eq('this is two');
      expect((<CircularOne>circularTwo.circularOne).test1).eq('this is one');
      expect((<CircularTwo>(<CircularOne>circularTwo.circularOne).circularTwo).test2).eq('this is two');

      const one = await container.getAsync<TestOne>(TestOne);
      expect(one).not.null;
      expect(one).not.undefined;
      expect(one.name).eq('one');
      expect((<TestTwo>one.two).name).eq('two');
    });
  });

  describe('function definition', () => {
    const container = new Container();

    it('factory function should be ok', async () => {
      container.bind(AliSingleton);
      container.bind('singletonFactory', singletonFactory);
      container.bind('singletonFactory2', singletonFactory2);

      const arr = await Promise.all([
        container.getAsync('aliSingleton'),
        container.getAsync('singletonFactory'),
        container.getAsync('singletonFactory2'),
      ]);

      const s = arr[0] as AliSingleton;
      const fn = arr[2] as any;
      expect(s.getInstance()).eq('alisingleton');
      expect(await fn()).eq('alisingleton');
    });
  });
});
