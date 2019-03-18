import { expect } from 'chai';
import { Digraph } from '../../../../src/utils/digraph';

describe('test/unit/factory/utils/circule.test.ts', () => {
  describe('digraph API test', () => {
    it('should add new vertice', () => {
      const graph = new Digraph();
      graph.addVertice('A');
      graph.addVertice('B');
      expect(graph.getVertices()).to.deep.equal(['A', 'B']);
      const verticeA1 = graph.getNeighbors('A');
      graph.addVertice('A');
      const verticeA2 = graph.getNeighbors('A');
      expect(verticeA1).to.equal(verticeA2);
    });
    it('should get the same vertices', () => {
      const graph = new Digraph();
      graph.addEdge('A', 'B');
      graph.addEdge('A', 'C');
      expect(graph.getVertices()).to.deep.equal(['A', 'B', 'C']);
      expect(graph.getNeighbors('A')).to.deep.equal(['B', 'C']);
      expect(graph.getNeighbors('B')).to.deep.equal([]);
      expect(graph.getNeighbors('C')).to.deep.equal([]);
    });
    it('should get the next neighbor', () => {
      const graph = new Digraph();
      graph.addVertice('A');
      expect(graph.getNextNeighbor('A', 'D')).to.equal(null);
      graph.addEdge('A', 'B');
      graph.addEdge('A', 'C');
      graph.addEdge('A', 'D');
      expect(graph.getNextNeighbor('A', 'B')).to.equal('C');
      expect(graph.getNextNeighbor('A', 'C')).to.equal('D');
      expect(graph.getNextNeighbor('A', 'D')).to.equal(null);
      expect(graph.getNextNeighbor('A', 'E')).to.equal('B');
    });
    it('should get the vertices', () => {
      const graph = new Digraph();
      graph.addVertice('A');
      graph.addEdge('A', 'B');
      graph.addEdge('A', 'C');
      graph.addVertice('D');
      expect(graph.getVertices()).to.not.equal(['A', 'B', 'C', 'D']);
      expect(graph.getVertices()).to.deep.equal(['A', 'B', 'C', 'D']);
    });
    it('should get the max neighbors vertice', () => {
      const graph = new Digraph();
      graph.addVertice('A');
      graph.addEdge('A', 'B');
      graph.addEdge('A', 'C');
      graph.addEdge('D', 'E');
      graph.addEdge('D', 'F');
      graph.addEdge('D', 'G');
      graph.addEdge('D', 'H');
      graph.addVertice('I');
      graph.addVertice('G');
      expect(graph.getMaxNeighborVertice()).to.equal('D');
      expect(graph.getMaxNeighborVertice(['A', 'I', 'G'])).to.equal('A');
      expect(graph.getMaxNeighborVertice(['I', 'G'])).to.equal('G');
    });
    it('should return the digraph from dependencyMap', () => {
      const dependencyMap = new Map();
      dependencyMap.set('A', {
        scope: 'Request',
        name: 'A',
        constructorArgs: ['B', 'C'],
        properties: ['D', 'E']
      });
      dependencyMap.set('B', {
        scope: 'Request',
        name: 'B',
        constructorArgs: ['F', 'G'],
        properties: []
      });
      dependencyMap.set('C', {
        scope: 'Request',
        name: 'C',
        constructorArgs: [],
        properties: ['H', 'I']
      });
      const graph = Digraph.fromMap(dependencyMap);
      expect(graph.getVertices()).to.deep.equal([
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I'
      ]);
      expect(graph.getMaxNeighborVertice()).to.deep.equal('A');
      expect(graph.getNeighbors('A')).to.deep.equal(['B', 'C', 'D', 'E']);
      expect(graph.getNeighbors('B')).to.deep.equal(['F', 'G']);
      expect(graph.getNeighbors('C')).to.deep.equal(['H', 'I']);
      expect(graph.getNeighbors('D')).to.deep.equal([]);
      expect(graph.getNeighbors('E')).to.deep.equal([]);
      expect(graph.getNeighbors('F')).to.deep.equal([]);
      expect(graph.getNeighbors('G')).to.deep.equal([]);
      expect(graph.getNeighbors('H')).to.deep.equal([]);
      expect(graph.getNeighbors('I')).to.deep.equal([]);
    });
    it('should find the cyle in limit time', () => {
      const graph = new Digraph();
      graph.addEdge('A', 'B');
      graph.addEdge('A', 'C');
      graph.addEdge('A', 'D');

      graph.addEdge('B', 'E');

      graph.addEdge('C', 'E');
      graph.addEdge('C', 'F');

      graph.addEdge('D', 'F');

      graph.addEdge('E', 'A');

      graph.addEdge('F', 'A');

  //            +----^----+
  //            |    |    |
  //            |    v    |
  //        +------+ A +------+
  //        |   |    +    |   |
  //        |   |    |    |   |
  //        |   |    |    |   |
  //        v   |    v    |   v
  //        B   |    C    |   D
  //        +   |    +    |   +
  //        |   |    |    |   |
  //        |   +    |    +   |
  //        +-> E <--+--> F <-+

      expect(graph.findCycle('A')).to.deep.equal(['A', 'B', 'E', 'A']);
      expect(graph.findCycle('B')).to.deep.equal(['B', 'E', 'A', 'B']);
      expect(graph.findCycle('C')).to.deep.equal(['C', 'E', 'A', 'B', 'E']);
    });
  });
});
