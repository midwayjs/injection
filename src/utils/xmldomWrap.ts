let DOMParser = null;

class EmptyDOMParser {
  public parseFromString(src: string): any {
    throw new Error('xmldom is not in dependencies, you need to npm i --save xmldom first!');
  }
}

try {
  DOMParser = require('xmldom').DOMParser;
} catch (e) {
  // ignore
  DOMParser = EmptyDOMParser;
}

export { DOMParser };
