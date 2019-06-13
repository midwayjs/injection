import 'reflect-metadata';
import { Container } from './container';
import { IContainer, REQUEST_CTX_KEY } from '../interfaces';

export class RequestContainer extends Container {

  applicationContext: IContainer;

  constructor(ctx, applicationContext) {
    super();
    this.registerObject(REQUEST_CTX_KEY, ctx);
    this.parent = applicationContext;
    this.applicationContext = applicationContext;
  }

  get<T>(identifier: any, args?: any) {
    if (typeof identifier !== 'string') {
      identifier = this.getIdentifier(identifier);
    }
    if (this.registry.hasObject(identifier)) {
      return this.registry.getObject(identifier);
    }
    const definition = this.applicationContext.registry.getDefinition(identifier);
    if (definition && definition.isRequestScope()) {
      // create object from applicationContext definition for requestScope
      return this.resolverFactory.create(definition, args);
    }

    if (this.parent) {
      return this.parent.get(identifier, args);
    }
  }

  async getAsync<T>(identifier: any, args?: any) {
    if (typeof identifier !== 'string') {
      identifier = this.getIdentifier(identifier);
    }
    if (this.registry.hasObject(identifier)) {
      return this.registry.getObject(identifier);
    }

    const definition = this.applicationContext.registry.getDefinition(identifier);
    if (definition && definition.isRequestScope()) {
      // create object from applicationContext definition for requestScope
      return this.resolverFactory.createAsync(definition, args);
    }

    if (this.parent) {
      return this.parent.getAsync<T>(identifier, args);
    }
  }

}
