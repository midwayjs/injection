import { IResource } from '../../interfaces';
import { BaseApplicationContext } from '../applicationContext';
import { XmlObjectDefinitionParser } from './xmlObjectDefinitionParser';
import { Resource } from '../../base/resource';

export class XmlApplicationContext extends BaseApplicationContext {
  inner_parser: XmlObjectDefinitionParser;

  get parser() {
    if (!this.inner_parser) {
      this.inner_parser = new XmlObjectDefinitionParser(this.baseDir, this.registry);
    }
    return this.inner_parser;
  }

  loadDefinitions(configLocations: string[]): void {
    if (!Array.isArray(configLocations)) {
      throw new Error('loadDefinitions fail configLocations is not array!');
    }

    if (configLocations.length > 0) {
      for (const loc of configLocations) {
        this.loadResource(new Resource(this.baseDir, loc));
      }

      this.props.putAll(this.parser.configuration);
    }
  }

  loadResource(res: IResource): void {
    if (res.isDir()) {
      const resources = res.getSubResources();
      for (const r of resources) {
        this.loadResource(r);
      }
    }
    if (res.isFile()) {
      this.parser.load(res);
    }
    // TODO: if url
  }
}
