## 说明文档

### 概述：
 * 命名空间 rose
 
### 模块管理
 * 登记模块
  * 
 * 运行模块
  * 通用模块验证
  * 单独模块验证
  * 显示 show 加载界面
  * 主子模块区分
  * 关闭 close 老的场景（判断新模块是否为主模块“isSubModule”，判断是否现在关闭“isHideUnder”）
  * 加载资源（待定。。。需进度条功能）
  * 创建新模块
  * 设置新模块数据 moduleParam 
  * 执行新场景 init 方法
  * 执行新场景 show 方法
  * 关闭 close 老的场景（判断新模块是否为主模块“isSubModule”，判断是否现在关闭“isHideUnder”）
  * 关闭 close 加载界面
  * 加载模块完成，成功执行 resolve

### 网络处理 net 包
 * http 请求
  * get 请求，命名 request
  * post 请求格式有json、FormData，命名 post4Json post4FormData

### 数据管理
 * 动态数据
   * 数据管理单独拆分、添加 _initProp 、initData
 * 静态数据

### 资源管理
 * 

### 声音管理
 * 提供管理声音和声音组的功能。

### 本地化
 * 提供本地化功能，多语言等。

### 各个平台 SDK
 * 封装各个常用平台 SDK 接口
 * 微信
 * 

### 常用工具类 -- 尽量使用函数式
 * 行为树
 * 有限状态机，[参考](https://github.com/jakesgordon/javascript-state-machine)
 * 对象池
   * 提供基础对象池功能。
   * 需要对象池功能的对象自己维护一个对象池，根据基础对象池生成自己特定的池子。
 * 常用数据结构
 * 数学工具
 * 图像处理工具

### 动画特效系统
 * 使用 action 模式

### 注意事项：
 * 不使用反射机制。
 * 推荐使用 promise 处理异步。

### 待解决问题：
 * 资源管理
 * dialog 关闭自动移除
 * dialog 优化特效、关闭回调函数
 * 模块加入和移除舞台事件回调函数改成 protected
 * 添加微信小游戏 dts 云函数
 * 添加微信小游戏 dts udp 协议处理
 * 加入扩展功能 extend
 * 扩展 extend http 请求处理

![](./logo.jpg)

---- 
