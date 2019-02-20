import { ManagedValue } from '..';
import {
  IApplicationContext,
  IConfiguration,
  IManagedInstance,
  IObjectCreator,
  IObjectDefinition,
  ObjectIdentifier,
  Scope,
  ScopeEnum
} from '../interfaces';
import { ObjectCreator } from './objectCreator';

class FunctionWrapperCreator extends ObjectCreator {

  context;

  constructor(definition: IObjectDefinition, context: IApplicationContext) {
    super(definition);
    this.context = context;
  }

  doConstruct(Clzz: any, args: IManagedInstance[] = []): any {
    if (!Clzz) {
      return null;
    }

    if (args.length) {
      return Clzz((args[0] as ManagedValue).value);
    } else {
      return Clzz(this.context);
    }
  }

  async doConstructAsync(Clzz: any, args: IApplicationContext[] = []): Promise<any> {
    if (!Clzz) {
      return null;
    }
    if (args.length) {
      return Clzz(args[0]);
    } else {
      return Clzz(this.context);
    }
  }
}

export class FunctionDefinition implements IObjectDefinition {

  context;

  constructor(context: IApplicationContext) {
    this.context = context;
    this.creator = new FunctionWrapperCreator(this, context);
  }

  constructMethod: string;
  constructorArgs: IManagedInstance[] = [];
  creator: IObjectCreator;
  dependsOn: ObjectIdentifier[];
  destroyMethod: string;
  export: string;
  id: string;
  name: string;
  initMethod: string;
  path: any;
  properties: IConfiguration;
  // 函数工厂创建的对象默认不需要自动装配
  protected innerAutowire = false;
  protected innerScope: Scope = ScopeEnum.Singleton;

  set autowire(autowire: boolean) {
    this.innerAutowire = autowire;
  }

  getAttr(key: ObjectIdentifier): any {
  }

  hasAttr(key: ObjectIdentifier): boolean {
    return false;
  }

  hasConstructorArgs(): boolean {
    return false;
  }

  hasDependsOn(): boolean {
    return false;
  }

  isAsync(): boolean {
    return true;
  }

  isAutowire(): boolean {
    return this.innerAutowire;
  }

  isDirect(): boolean {
    return false;
  }

  isExternal(): boolean {
    return false;
  }

  set scope(scope: Scope) {
    this.innerScope = scope;
  }

  isSingletonScope(): boolean {
    return this.innerScope === ScopeEnum.Singleton;
  }

  isRequestScope(): boolean {
    return this.innerScope === ScopeEnum.Request;
  }

  setAttr(key: ObjectIdentifier, value: any): void {
  }
}
