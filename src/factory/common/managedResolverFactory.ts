/**
 * 管理对象解析构建
 */

import * as _ from 'lodash';
import { KEYS, VALUE_TYPE } from './constants';
import {
  ManagedJSON,
  ManagedList,
  ManagedMap,
  ManagedObject,
  ManagedProperties,
  ManagedProperty,
  ManagedReference,
  ManagedSet,
  ManagedValue
} from './managed';
import {
  IApplicationContext,
  IManagedInstance,
  IManagedResolver,
  IObjectDefinition,
  ObjectIdentifier
} from '../../interfaces';
import { ObjectConfiguration } from '../../base/configuration';
import { Autowire } from './autowire';
import { NotFoundError } from '../../utils/errorFactory';

/**
 * 所有解析器基类
 */
export class BaseManagedResolver implements IManagedResolver {
  protected _factory: ManagedResolverFactory;

  constructor(factory: ManagedResolverFactory) {
    this._factory = factory;
  }

  get type(): string {
    throw new Error('not implement');
  }

  resolve(managed: IManagedInstance): any {
    throw new Error('not implement');
  }

  async resolveAsync(managed: IManagedInstance): Promise<any> {
    throw new Error('not implement');
  }
}

/**
 * 解析json
 */
class JSONResolver extends BaseManagedResolver {
  get type(): string {
    return KEYS.JSON_ELEMENT;
  }

  resolve(managed: IManagedInstance): any {
    const mjson = managed as ManagedJSON;
    return JSON.parse(this._factory.tpl(mjson.value));
  }

  async resolveAsync(managed: IManagedInstance): Promise<any> {
    return this.resolve(managed);
  }
}

/**
 * 解析值
 */
class ValueResolver extends BaseManagedResolver {
  get type(): string {
    return KEYS.VALUE_ELEMENT;
  }

  /**
   * 解析不通类型的值
   * @param managed 类型接口
   * @param props 注入的属性值
   */
  _resolveCommon(managed: IManagedInstance): any {
    const mv = managed as ManagedValue;
    switch (mv.valueType) {
      case VALUE_TYPE.STRING:
      case VALUE_TYPE.TEMPLATE:
        return this._factory.tpl(mv.value);
      case VALUE_TYPE.NUMBER:
        return Number(this._factory.tpl(mv.value));
      case VALUE_TYPE.INTEGER:
        return parseInt(this._factory.tpl(mv.value), 10);
      case VALUE_TYPE.DATE:
        return new Date(this._factory.tpl(mv.value));
      case VALUE_TYPE.BOOLEAN:
        return mv.value === 'true';
    }

    return mv.value;
  }

  resolve(managed: IManagedInstance): any {
    const mv = managed as ManagedValue;
    if (mv.valueType === VALUE_TYPE.MANAGED) {
      return this._factory.resolveManaged(mv.value);
    } else {
      return this._resolveCommon(managed);
    }
  }

  async resolveAsync(managed: IManagedInstance): Promise<any> {
    const mv = managed as ManagedValue;
    if (mv.valueType === VALUE_TYPE.MANAGED) {
      return this._factory.resolveManagedAsync(mv.value);
    } else {
      return this._resolveCommon(managed);
    }
  }
}

/**
 * 解析ref
 */
class RefResolver extends BaseManagedResolver {
  get type(): string {
    return KEYS.REF_ELEMENT;
  }

  resolve(managed: IManagedInstance): any {
    const mr = managed as ManagedReference;
    return this._factory.context.get(mr.name);
  }

  async resolveAsync(managed: IManagedInstance): Promise<any> {
    const mr = managed as ManagedReference;
    return this._factory.context.getAsync(mr.name);
  }
}

/**
 * 解析 list
 */
class ListResolver extends BaseManagedResolver {
  get type(): string {
    return KEYS.LIST_ELEMENT;
  }

  resolve(managed: IManagedInstance): any {
    const ml = managed as ManagedList;
    const arr = [];
    for (const item of ml) {
      arr.push(this._factory.resolveManaged(item));
    }
    return arr;
  }

  async resolveAsync(managed: IManagedInstance): Promise<any> {
    const ml = managed as ManagedList;
    const arr = [];
    for (const item of ml) {
      arr.push(await this._factory.resolveManagedAsync(item));
    }
    return arr;
  }
}

/**
 * 解析set
 */
class SetResolver extends BaseManagedResolver {
  get type(): string {
    return KEYS.SET_ELEMENT;
  }

  resolve(managed: IManagedInstance): any {
    const ms = managed as ManagedSet;
    const s = new Set();
    for (const item of ms) {
      s.add(this._factory.resolveManaged(item));
    }
    return s;
  }

  async resolveAsync(managed: IManagedInstance): Promise<any> {
    const ms = managed as ManagedSet;
    const s = new Set();
    for (const item of ms) {
      s.add(await this._factory.resolveManagedAsync(item));
    }
    return s;
  }
}

/**
 * 解析map
 */
class MapResolver extends BaseManagedResolver {
  get type(): string {
    return KEYS.MAP_ELEMENT;
  }

  resolve(managed: IManagedInstance): any {
    const mm = managed as ManagedMap;
    const m = new Map();
    for (const key of mm.keys()) {
      m.set(key, this._factory.resolveManaged(mm.get(key)));
    }
    return m;
  }

  async resolveAsync(managed: IManagedInstance): Promise<any> {
    const mm = managed as ManagedMap;
    const m = new Map();
    for (const key of mm.keys()) {
      m.set(key, await this._factory.resolveManagedAsync(mm.get(key)));
    }
    return m;
  }
}

/**
 * 解析properties
 */
class PropertiesResolver extends BaseManagedResolver {
  get type(): string {
    return KEYS.PROPS_ELEMENT;
  }

  resolve(managed: IManagedInstance): any {
    const m = managed as ManagedProperties;
    const cfg = new ObjectConfiguration();
    const keys = m.keys();
    for (const key of keys) {
      cfg.setProperty(key, this._factory.resolveManaged(m.getProperty(key)));
    }
    return cfg;
  }

  async resolveAsync(managed: IManagedInstance): Promise<any> {
    const m = managed as ManagedProperties;
    const cfg = new ObjectConfiguration();
    const keys = m.keys();
    for (const key of keys) {
      cfg.setProperty(key, await this._factory.resolveManagedAsync(m.getProperty(key)));
    }
    return cfg;
  }
}

/**
 * 解析property
 */
class PropertyResolver extends BaseManagedResolver {
  get type(): string {
    return KEYS.PROPERTY_ELEMENT;
  }

  resolve(managed: IManagedInstance): any {
    const mp = managed as ManagedProperty;
    return this._factory.resolveManaged(mp.value);
  }

  async resolveAsync(managed: IManagedInstance): Promise<any> {
    const mp = managed as ManagedProperty;
    return this._factory.resolveManagedAsync(mp.value);
  }
}

/**
 * 解析 object
 */
class ObjectResolver extends BaseManagedResolver {
  get type(): string {
    return KEYS.OBJECT_ELEMENT;
  }

  resolve(managed: IManagedInstance): any {
    const mo = managed as ManagedObject;
    return this._factory.create(mo.definition, null);
  }

  async resolveAsync(managed: IManagedInstance): Promise<any> {
    const mo = managed as ManagedObject;
    return this._factory.createAsync(mo.definition, null);
  }
}

/**
 * 解析工厂
 */
export class ManagedResolverFactory {
  private resolvers = new Map<string, IManagedResolver>();
  private _props = null;
  singletonCache = new Map<ObjectIdentifier, any>();
  context: IApplicationContext;
  afterCreateHandler = [];
  beforeCreateHandler = [];

  constructor(context: IApplicationContext) {
    this.context = context;

    // 初始化解析器
    this.registerResolver(new JSONResolver(this));
    this.registerResolver(new ValueResolver(this));
    this.registerResolver(new ListResolver(this));
    this.registerResolver(new SetResolver(this));
    this.registerResolver(new MapResolver(this));
    this.registerResolver(new PropertiesResolver(this));
    this.registerResolver(new PropertyResolver(this));
    this.registerResolver(new ObjectResolver(this));
    this.registerResolver(new RefResolver(this));
  }

  get props() {
    if (!this._props) {
      this._props = this.context.props.toJSON();
    }
    return this._props;
  }

  /**
   * 用于解析模版化的值
   * example: {{aaa.bbb.ccc}}
   * @param value 配置的模版值
   */
  tpl(value) {
    if (value && value.indexOf('{{') > -1) {
      return _.template(value, {
        // use `{{` and `}}` as delimiters
        interpolate: /{{([\s\S]+?)}}/g
      })(this.props);
    }
    return value;
  }

  registerResolver(resolver: IManagedResolver) {
    this.resolvers.set(resolver.type, resolver);
  }

  resolveManaged(managed: IManagedInstance): any {
    if (!this.resolvers.has(managed.type)) {
      throw new Error(`${managed.type} resolver is not exists!`);
    }
    return this.resolvers.get(managed.type).resolve(managed);
  }

  async resolveManagedAsync(managed: IManagedInstance): Promise<any> {
    if (!this.resolvers.has(managed.type)) {
      throw new Error(`${managed.type} resolver is not exists!`);
    }
    return this.resolvers.get(managed.type).resolveAsync(managed);
  }

  /**
   * 同步创建对象
   * @param definition 对象定义
   * @param args 参数
   */
  create(definition: IObjectDefinition, args: any): any {
    if (definition.isSingletonScope() &&
      this.singletonCache.has(definition.id)) {
      return this.singletonCache.get(definition.id);
    }

    // 预先初始化依赖
    if (definition.hasDependsOn()) {
      for (const dep of definition.dependsOn) {
        this.context.get(dep, args);
      }
    }

    const Clzz = definition.creator.load();

    let constructorArgs = [];
    if (args && _.isArray(args) && args.length > 0) {
      constructorArgs = args;
    } else {
      if (definition.constructorArgs) {
        for (const arg of definition.constructorArgs) {
          constructorArgs.push(this.resolveManaged(arg));
        }
      }
    }

    for (const handler of this.beforeCreateHandler) {
      handler.call(this, Clzz, constructorArgs, this.context);
    }

    const inst = definition.creator.doConstruct(Clzz, constructorArgs);

    if (definition.properties) {
      const keys = definition.properties.keys();
      for (const key of keys) {
        const identifier = definition.properties.getProperty(key);
        try {
          inst[ key ] = this.resolveManaged(identifier);
        } catch (error) {
          if (NotFoundError.isClosePrototypeOf(error)) {
            const className = definition.path.name;
            error.updateErrorMsg(className);
          }
          throw error;
        }
      }
    }

    if (definition.isAutowire()) {
      Autowire.patchInject(inst, this.context);
      Autowire.patchNoDollar(inst, this.context);
    }

    for (const handler of this.afterCreateHandler) {
      handler.call(this, inst, this.context, definition);
    }

    // after properties set then do init
    definition.creator.doInit(inst);

    if (definition.isSingletonScope() && definition.id) {
      this.singletonCache.set(definition.id, inst);
    }

    // for request scope
    if (definition.isRequestScope() && definition.id) {
      this.context.registry.registerObject(definition.id, inst);
    }

    return inst;
  }

  /**
   * 异步创建对象
   * @param definition 对象定义
   * @param args 参数
   */
  async createAsync(definition: IObjectDefinition, args: any): Promise<any> {
    if (definition.isSingletonScope() &&
      this.singletonCache.has(definition.id)) {
      return this.singletonCache.get(definition.id);
    }

    // 预先初始化依赖
    if (definition.hasDependsOn()) {
      for (const dep of definition.dependsOn) {
        await this.context.getAsync(dep, args);
      }
    }

    const Clzz = definition.creator.load();
    let constructorArgs;
    if (args && _.isArray(args) && args.length > 0) {
      constructorArgs = args;
    } else {
      constructorArgs = [];
      if (definition.constructorArgs) {
        for (const arg of definition.constructorArgs) {
          constructorArgs.push(await this.resolveManagedAsync(arg));
        }
      }
    }

    for (const handler of this.beforeCreateHandler) {
      handler.call(this, Clzz, constructorArgs, this.context);
    }

    const inst = await definition.creator.doConstructAsync(Clzz, constructorArgs);
    if (!inst) {
      throw new Error(`${definition.id} config no valid path`);
    }

    if (definition.properties) {
      const keys = definition.properties.keys();
      for (const key of keys) {
        const identifier = definition.properties.getProperty(key);
        try {
          inst[ key ] = await this.resolveManagedAsync(identifier);
        } catch (error) {
          if (NotFoundError.isClosePrototypeOf(error)) {
            const className = definition.path.name;
            error.updateErrorMsg(className);
          }
          throw error;
        }
      }
    }

    if (definition.isAutowire()) {
      Autowire.patchInject(inst, this.context);
      Autowire.patchNoDollar(inst, this.context);
    }

    for (const handler of this.afterCreateHandler) {
      handler.call(this, inst, this.context, definition);
    }

    // after properties set then do init
    await definition.creator.doInitAsync(inst);

    if (definition.isSingletonScope() && definition.id) {
      this.singletonCache.set(definition.id, inst);
    }

    // for request scope
    if (definition.isRequestScope() && definition.id) {
      this.context.registry.registerObject(definition.id, inst);
    }

    return inst;
  }

  async destroyCache(): Promise<void> {
    for (const key of this.singletonCache.keys()) {
      const definition = this.context.registry.getDefinition(key);
      if (definition.creator) {
        await definition.creator.doDestroyAsync(this.singletonCache.get(key));
      }
    }
    this.singletonCache.clear();
  }

  beforeEachCreated(fn: (Clzz: any, constructorArgs: [], context: IApplicationContext) => void) {
    this.beforeCreateHandler.push(fn);
  }

  afterEachCreated(fn: (ins: any, context: IApplicationContext, definition?: IObjectDefinition) => void) {
    this.afterCreateHandler.push(fn);
  }

}
