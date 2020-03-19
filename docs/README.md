---
home: true
## heroImage: https://img.alicdn.com/tfs/TB1k4.laW6qK1RjSZFmXXX0PFXa-237-237.png
actionText: 快速上手 →
actionLink: /guide
footer: Copyright © 2019-present MidwayJs
---

```bash
$ npm install injection reflect-metadata --save
```


Injection 依赖了 TypeScript >= 2.0 的一些实验性特性，需要手动在 `tsconfig.json` 开启.

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["es2017", "dom"],
    "types": ["reflect-metadata"],
    "module": "commonjs",
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

::: warning 注意
Node.js >= 8.0.0 required.
:::


<div class="feats">
  <h2>特色功能</h2>
  <div class="item">
    <div class="col img">
      <img src="https://img.alicdn.com/tfs/TB1PgkSGhTpK1RjSZR0XXbEwXXa-1250-910.png" />
    </div>
    <div class="col">
      <h3>代码解耦</h3>
      <p>IoC 是现在业界比较流行的实践，在 Node.js 应用中使用，可以让应用的代码进行解耦以及可测，在开发过程中也无需关心实例化以及销毁的问题。</p>
    </div>
  </div>
  <div class="item">
    <div class="col">
      <h3>易于扩展</h3>
      <p>Injection 提供了基础的 Container 对象，在其之上可以进行多层次的封装，比如 RequestContainer，同时我们还提供了方便的装饰器扩展能力，简化了定义装饰器时的复杂参数。</p>
    </div>
    <div class="col img">
      <img src="https://img.alicdn.com/tfs/TB1wpVjGxnaK1RjSZFtXXbC2VXa-1190-864.png" />
    </div>
  </div>
  <div class="item">
    <div class="col img">
      <img src="https://img.alicdn.com/tfs/TB1WwZVGmzqK1RjSZFpXXakSXXa-1344-868.png" />
    </div>
    <div class="col">
      <h3>框架集成</h3>
      <p>Injection 作为一个基础的 IoC 容器，可以非常方便的接入到不同的框架体系，除了我们开发的 midway 之外，可以应用到例如 koa，thinkjs 等不同的框架。</p>
    </div>
  </div>
</div>
<div class="footer-container">
  <div class="col">
    <dl>
      <dt>Github</dt>
      <dd><a href="https://github.com/midwayjs" target="_blank">MidwayJs 团队</a></dd>
    </dl>
  </div>
  <div class="col">
    <dl>
      <dt>社区化</dt>
      <dd><a href="https://github.com/midwayjs/midway/releases" target="_blank">Change log</a></dd>
      <dd><a href="https://github.com/midwayjs/midway/issues" target="_blank">Issues</a></dd>
    </dl>
  </div>
  <div class="col">
    <dl>
      <dt>常用链接</dt>
      <dd><a href="http://opensource.alibaba.com/" target="_blank">Alibaba 开源平台</a></dd>
      <dd><a href="http://taobaofed.org/" target="_blank">Taobao FED 团队博客</a></dd>
      <dd><a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a></dd>
    </dl>
  </div>
  <div class="col right">
    <dl>
      <dt>品牌宣传</dt>
      <dd><a href="https://github.com/midwayjs" target="_blank"><img src="https://img.alicdn.com/tfs/TB16bxlbAPoK1RjSZKbXXX1IXXa-60-60.png"></a></dd>
      <dd><a href="https://zhuanlan.zhihu.com/midwayjs" target="_blank"><img src="https://img.alicdn.com/tfs/TB1a.pvbpzqK1RjSZFvXXcB7VXa-60-60.png"></a></dd>
      <dd><a href="https://github.com/midwayjs/pandora" target="_blank"><img src="https://img.alicdn.com/tfs/TB1.v4hbrPpK1RjSZFFXXa5PpXa-60-60.png"></a></dd>
      <dd><a href="https://github.com/midwayjs/midway" target="_blank"><img src="https://img.alicdn.com/tfs/TB1IgdubpzqK1RjSZFCXXbbxVXa-60-60.png"></a></dd>
      <dd><a href="https://github.com/midwayjs/sandbox" target="_blank"><img src="https://img.alicdn.com/tfs/TB1kIXybAvoK1RjSZFwXXciCFXa-60-60.png"></a></dd>
    </dl>
    <iframe src="https://ghbtns.com/github-btn.html?user=midwayjs&repo=injection&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
  </div>
</div>
