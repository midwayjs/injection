import { ObjectDependencyTree } from '../interfaces';

/**
 * 有向图，用于检查inject是否存在循环依赖
 */
export class Digraph {
  graph: Map<string, string[]>;
  constructor() {
    this.graph = new Map();
  }

  static fromMap(dependencyMap: Map<string, ObjectDependencyTree>): Digraph {
    const digraph = new Digraph();
    for (const [id, module] of dependencyMap.entries()) {
      const neighbors = [...module.constructorArgs, ...module.properties];
      if (neighbors.length) {
        neighbors.forEach(digraph.addEdge.bind(digraph, id));
      }
    }
    return digraph;
  }

  /**
   * 向图中增加一个顶点
   * @param vertice 顶点
   */
  addVertice(vertice: string): Digraph {
    if (!this.graph.has(vertice)) {
      this.graph.set(vertice, []);
    }
    return this;
  }

  /**
   * 向有向图中增加一条边
   * @param from 有向边的起点
   * @param to 有向边的终点
   */
  addEdge(from: string, to: string): Digraph {
    this.addVertice(from).addVertice(to).graph.get(from).push(to);
    return this;
  }

  /**
   * 获取与vertice顶点的所有出度顶点，exceptBefore的下一个顶点，没有则返回null
   * @param vertice 顶点
   * @param exceptBefore 顶点，vertice顶点的某个出度顶点
   */
  getNextNeighbor(vertice: string, exceptBefore: string): string | null {
    const neighbors = this.getNeighbors(vertice);
    if (!neighbors || neighbors.length === 0) {
      return null;
    }
    const index = neighbors.indexOf(exceptBefore);
    if (index === -1) {
      return neighbors[0] || null;
    }
    return neighbors[index + 1] || null;
  }

  /**
   * 获取 vertice 顶点的所有出度顶点
   * @param vertice 顶点
   */
  getNeighbors(vertice: string): string[] | null {
    return this.graph.get(vertice) || null;
  }

  /**
   * 获取图的所有顶点
   */
  getVertices(): string[] {
    return [...this.graph.keys()];
  }

  /**
   * 获取 vertices 中出度最大的顶点，或图中出度最大的顶点
   * @param vertices  顶点数组
   */
  getMaxNeighborVertice(vertices?: string[]): string | null {
    let max = 0;
    let maxVertice = null;
    if (vertices) {
      vertices.forEach(vertice => {
        if (this.graph.has(vertice)) {
          if (this.getNeighbors(vertice).length >= max) {
            max = this.getNeighbors(vertice).length;
            maxVertice = vertice;
          }
        }
      });
    } else {
      for (const [vertice, neighbors] of this.graph) {
        if (neighbors.length > max) {
          max = neighbors.length;
          maxVertice = vertice;
        }
      }
    }
    return maxVertice;
  }

  /**
   * 从vertice顶点开始进行深度优先遍历，查找是否存在一个环，若存在则返回
   * @param vertice 顶点
   */
  findCycle(vertice: string): string[] {
    const stack = [];
    if (this.getNeighbors(vertice).length === 0) {
      return stack;
    }
    let popVertice = null;
    stack.push(vertice);
    while (stack.length) {
      const lastVertice = stack[stack.length - 1];
      const newVertice = this.getNextNeighbor(lastVertice, popVertice);
      if (newVertice) {
        if (stack.includes(newVertice)) {
          stack.push(newVertice);
          break;
          /** 注释代码为找到所有环 */
          // stack.pop();
          // popVertice = newVertice;
        } else {
          stack.push(newVertice);
        }
      } else {
        popVertice = stack.pop();
      }
    }
    return stack;
  }
}
