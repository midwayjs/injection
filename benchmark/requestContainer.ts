import 'reflect-metadata';
import {Container, IContainer} from '../dist';

export class RequestContainer extends Container {

  applicationContext: IContainer;
  ctx;

  constructor(ctx, applicationContext) {
    super();
    this.registerObject('ctx', ctx);
    this.parent = applicationContext;
    this.applicationContext = applicationContext;
  }

  updateContext(ctx) {
    this.registry.clearAll();
    this.ctx = ctx;
    // register ctx
    this.registerObject('ctx', ctx);
    // register contextLogger
    // this.registerObject('logger', ctx.logger);
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
      return this.getManagedResolverFactory().create(definition, args);
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
      return this.getManagedResolverFactory().createAsync(definition, args);
    }

    if (this.parent) {
      return this.parent.getAsync<T>(identifier, args);
    }
  }

}
