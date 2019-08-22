### 性能测试

* ``` npm run build ```
* ``` npm run build_benchmark ```
* ``` node benchmark/index.js ```

### 调整内存

* ``` node --min-semi-space-size=256 --max-semi-space-size=1024 --max-old-space-size=2048 --initial-old-space-size=1024 benchmark/index.js ```
  * 大概能提升 3 倍性能
