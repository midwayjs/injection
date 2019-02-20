---
home: true
## heroImage: https://img.alicdn.com/tfs/TB1k4.laW6qK1RjSZFmXXX0PFXa-237-237.png
actionText: Quickly Start →
actionLink: /en/guide
footer: Copyright © 2019-present MidwayJs
---

```bash
$ npm install injection reflect-metadata --save
```

Injection requires TypeScript >= 2.0 and the experimentalDecorators, emitDecoratorMetadata, types and lib compilation options in your `tsconfig.json` file.

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

::: warning COMPATIBILITY NOTE
midway requires Node.js >= 8.
:::

<div class="feats">
  <h2>Features</h2>
  <div class="item">
    <div class="col img">
      <img src="https://img.alicdn.com/tfs/TB1PgkSGhTpK1RjSZR0XXbEwXXa-1250-910.png" />
    </div>
    <div class="col">
      <h3>Code decoupling</h3>
      <p>IOC is now a popular practice in the industry. It is used in node. js applications, which allows the application code to be decoupled and measurable. in the development process, there is no need to care about instantiation and destruction.</p>
    </div>
  </div>
  <div class="item">
    <div class="col">
      <h3>Easy to expand</h3>
      <p>Injection provides the basic container object, which can be encapsulated at multiple levels, such as requestcontainer, and we also provide convenient decoration extension capabilities, simplifies complex parameters when defining a decorator.</p>
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
      <h3>Framework Integration</h3>
      <p>As a basic IOC container, injection can be very convenient to access different framework systems. In addition to the midway we developed, it can be applied to different frameworks such as Koa, thinkjs.</p>
    </div>
  </div>
</div>
<div class="footer-container">
  <div class="col">
    <dl>
      <dt>Github</dt>
      <dd><a href="https://github.com/midwayjs" target="_blank">MidwayJs Team</a></dd>
    </dl>
  </div>
  <div class="col">
    <dl>
      <dt>Communitization</dt>
      <dd><a href="https://github.com/midwayjs/midway/releases" target="_blank">Change log</a></dd>
      <dd><a href="https://github.com/midwayjs/midway/issues" target="_blank">Issues</a></dd>
    </dl>
  </div>
  <div class="col">
    <dl>
      <dt>Common Links</dt>
      <dd><a href="http://opensource.alibaba.com/" target="_blank">Alibaba Open Source</a></dd>
      <dd><a href="http://taobaofed.org/" target="_blank">Taobao FED Blog</a></dd>
      <dd><a href="http://www.typescriptlang.org/" target="_blank">TypeScript office site</a></dd>
    </dl>
  </div>
  <div class="col right">
    <dl>
      <dt>Advertisement</dt>
      <dd><a href="https://github.com/midwayjs" target="_blank"><img src="https://img.alicdn.com/tfs/TB16bxlbAPoK1RjSZKbXXX1IXXa-60-60.png"></a></dd>
      <dd><a href="https://zhuanlan.zhihu.com/midwayjs" target="_blank"><img src="https://img.alicdn.com/tfs/TB1a.pvbpzqK1RjSZFvXXcB7VXa-60-60.png"></a></dd>
      <dd><a href="https://github.com/midwayjs/pandora" target="_blank"><img src="https://img.alicdn.com/tfs/TB1.v4hbrPpK1RjSZFFXXa5PpXa-60-60.png"></a></dd>
      <dd><a href="https://github.com/midwayjs/midway" target="_blank"><img src="https://img.alicdn.com/tfs/TB1IgdubpzqK1RjSZFCXXbbxVXa-60-60.png"></a></dd>
      <dd><a href="https://github.com/midwayjs/sandbox" target="_blank"><img src="https://img.alicdn.com/tfs/TB1kIXybAvoK1RjSZFwXXciCFXa-60-60.png"></a></dd>
    </dl>
    <iframe src="https://ghbtns.com/github-btn.html?user=midwayjs&repo=injection&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
  </div>
</div>
