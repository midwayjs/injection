import {
  saveClassMetaData,
  saveMethodDataToClass,
  saveMethodMetaData,
  saveModule,
  savePreloadModule
} from '../../../src/base/decoratorManager';

export function customCls(): ClassDecorator {
  return (target) => {
    saveClassMetaData('custom', 'test', target);
    saveModule('custom', target);
  }
}

export function preload(): ClassDecorator {
  return (target) => {
    savePreloadModule(target);
  }
}

export function customMethod(): MethodDecorator {
  return (target: object, propertykey: string, descriptor: PropertyDescriptor) => {
    saveMethodDataToClass('custom', {
      method: propertykey,
      data: 'customData',
    }, target, propertykey);

    saveMethodMetaData('custom', 'methodData', target, propertykey);
  };
}
