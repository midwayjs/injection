import * as _ from 'lodash';
import { format } from 'util';
import { IConfiguration, ObjectIdentifier } from '../interfaces';

export class BaseConfiguration implements IConfiguration {
  get size(): number {
    return 0;
  }

  keys(): ObjectIdentifier[] {
    return null;
  }

  get(key: ObjectIdentifier, ...args: any[]): any {
    return null;
  }

  dup(key: ObjectIdentifier): any {
    return null;
  }

  has(key: ObjectIdentifier): boolean {
    return false;
  }

  set(key: ObjectIdentifier, value: any): any {
    return null;
  }

  putAll(props: IConfiguration): void {

  }

  stringPropertyNames(): ObjectIdentifier[] {
    return this.keys();
  }

  getProperty(key: ObjectIdentifier, defaultValue?: any): any {
    if (this.has(key)) {
      return this.get(key);
    }

    return defaultValue;
  }

  addProperty(key: ObjectIdentifier, value: any): void {
    this.set(key, value);
  }

  setProperty(key: ObjectIdentifier, value: any): any {
    return this.set(key, value);
  }

  clear(): void {
  }

  toJSON(): object {
    return null;
  }

  clone(): IConfiguration {
    return null;
  }
}

export class BasicConfiguration extends BaseConfiguration {
  private innerConfig = new Map();

  get size(): number {
    return this.innerConfig.size;
  }

  keys(): ObjectIdentifier[] {
    const keys = [];
    const iter = this.innerConfig.keys();
    for (const key of iter) {
      keys.push(key);
    }
    return keys;
  }

  get(key: ObjectIdentifier, ...args: any[]): any {
    if (args && args.length > 0) {
      args.unshift(this.innerConfig.get(key));
      return format.apply(null, args);
    }
    return this.innerConfig.get(key);
  }

  dup(key: ObjectIdentifier): any {
    if (!this.has(key)) {
      return null;
    }
    return JSON.parse(JSON.stringify(this.innerConfig.get(key)));
  }

  has(key: ObjectIdentifier): boolean {
    return this.innerConfig.has(key);
  }

  set(key: ObjectIdentifier, value: any): any {
    const origin = this.innerConfig.get(key);
    this.innerConfig.set(key, value);
    return origin;
  }

  putAll(props: IConfiguration): void {
    const keys = props.keys();
    for (const key of keys) {
      if (typeof this.innerConfig.get(key) === 'object') {
        this.innerConfig.set(key,
          _.defaultsDeep(props.get(key), this.innerConfig.get(key)));
      } else {
        this.innerConfig.set(key, props.get(key));
      }
    }
  }

  clear(): void {
    this.innerConfig.clear();
  }

  toJSON(): object {
    const oo = {};
    for (const key of this.innerConfig.keys()) {
      oo[key] = JSON.parse(JSON.stringify(this.innerConfig.get(key)));
    }
    return oo;
  }
}

export class ObjectConfiguration extends BaseConfiguration {
  private innerConfig = {};

  get size(): number {
    return this.keys().length;
  }

  keys(): ObjectIdentifier[] {
    return _.keys(this.innerConfig);
  }

  get(key: ObjectIdentifier, ...args: any[]): any {
    if (args && args.length > 0) {
      args.unshift(_.get(this.innerConfig, key));
      return format.apply(null, args);
    }
    return _.get(this.innerConfig, key);
  }

  dup(key: ObjectIdentifier): any {
    if (!this.has(key)) {
      return null;
    }
    return JSON.parse(JSON.stringify(_.get(this.innerConfig, key)));
  }

  has(key: ObjectIdentifier): boolean {
    return _.has(this.innerConfig, key);
  }

  set(key: ObjectIdentifier, value: any): any {
    const origin = this.get(key);
    _.set(this.innerConfig, key, value);
    return origin;
  }

  putAll(props: IConfiguration): void {
    const keys = props.keys();
    for (const key of keys) {
      if (typeof this.innerConfig[key] === 'object') {
        this.set(key,
          _.defaultsDeep(props.get(key), this.innerConfig[key]));
      } else {
        this.set(key, props.get(key));
      }
    }
  }

  putObject(props: object, needClone = false) {
    if (needClone) {
      const tmp = _.cloneDeep(props);
      _.defaultsDeep(tmp, this.innerConfig);
      this.innerConfig = tmp;
    } else {
      _.defaultsDeep(props, this.innerConfig);
      this.innerConfig = props;
    }
  }

  clear(): void {
    this.innerConfig = {};
  }

  toJSON(): object {
    return JSON.parse(JSON.stringify(this.innerConfig));
  }

  clone(): IConfiguration {
    const cfg = new ObjectConfiguration();
    cfg.putObject(this.toJSON());
    return cfg;
  }
}
