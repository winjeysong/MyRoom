# 😄My Room
<span id="preview"></span>
![my room](http://p5h83rark.bkt.clouddn.com/preview.png-myroom)
>A demo of winjeysong.
## 概述
本demo是从前端到后端的一个SPA，贯彻了前后端分离的思想。

## 资源
除了基本的HTML、CSS、JavaScript及Node之外，主要用到了：
* 主框架：React
* UI组件：AntD
* 数据流处理：Dva
* 服务端框架：Koa
* 数据库驱动：Mongoose

## 版本
* Node: v8.9.0
* MongoDB: v3.4.9

## 主要功能特性
### 1.响应式
主要通过**栅格**和**媒体查询**来适配多终端（PC/移动端），适应不同屏幕大小。
### 2.实现功能
* 用户注册及登陆
* 使用 *JWT(JSON Web Token)* 进行用户登陆验证
* 用户资料修改
* 用户对文章的CURD操作
### 3.不兼容IE8及以下

## 本地调试
### 开发模式
1. 使用roadhog开启前端devServer
```
npm start
```
2. 如需用到数据库，先用`mongod`命令开启本地数据库，再开启后端devServer。前端通过roadhog的proxy功能向后端devServer请求数据
```
mongod --dbpath yourlocalpath
npm run devserver
```

### 生产模式
先开启数据库，build页面，再开启服务端并连接数据库
```
mongod --dbpath yourlocalpath
npm run build
npm run modify
npm run server
```

## 爬坑过程
### 1.页面布局设计
刚开始想着是demo，界面粗糙一些把功能实现就好。但初步实现之后，感觉效果总不是最好，既然做了就做到让自己满意，把基本的界面以及布局都做得大方得体，美观但不能花哨。

#### 大致设想
* 主页面，登陆、注册页自主设计布局及写样式
* 后续操作功能页使用AntD的layout组件做整体布局
* 整体响应式布局（考虑常用尺寸）

#### 主要技术及资源
* CSS：定位，浮动，媒体查询，阴影等其他

    主要使用的是CSS模块化工具：[CSS Modules](https://github.com/css-modules/css-modules)，主要解决了样式名称污染的问题，全局或局部样式轻松掌控。它也可以搭配Less使用，用法十分方便，具体用法直接看它的官方文档（在AntD和Dva体系下默认使用该工具）。
* React JSX
* React router的使用，主要是前端路由之间的跳转
* AntD

#### 实施
这一部分样式占大头，无逻辑代码。
##### 主页面
1. 灵感主要来源于某天我看到的新QQ注册页面（也可能更新很久了我才注意到😂 ），大概是下面这个样子：
![qq-register-page](http://p5h83rark.bkt.clouddn.com/qq-register.png)
简洁清新重点突出，就是我想要的样子。所以我根据自己的想法，也做了一个左右布局（预览图可以看[这里](#preview)）。背景图是以前自己拍的，看起来比较清新自然。主色调选用一个醒目但不刺眼的绿色。

2. 登陆按钮直接使用AntD的按钮组件，进行样式自定义，使风格能够融入整体。

3. 单独把footer部分拿出来作为一个组件：`FooterMsg`，之后还会用到。**footer部分在整体屏幕较小或宽高比过大时自动隐藏，避免对主体信息不必要的遮挡。** 具体如下面的图：

    * 小屏幕： 
      
      ![sm-size-screen](http://p5h83rark.bkt.clouddn.com/sm-screen.png-myroomzoom)
    * 宽高比过大

    ![width>>height](http://p5h83rark.bkt.clouddn.com/width%3E%3Eheight.png-myroom)
4. 响应式布局（上一条也提到了），主要是媒体查询。

##### 登陆注册页
这一部分的最终效果预览可以看[这个条目](#结果预览)下的相应内容
1. 这部分的布局另外写了一个组件`BlurLayout`，用到AntD的Layout组件方便整体布局。有别于主页，这里的想法是做一个毛玻璃的背景，一个内凹陷的登陆/注册框，以及一个返回主页的header。
2. 登陆使用AntD的表单组件，该组件封装了一些比较好用的方法和属性，可以很方便地请求、响应数据，与后端的交互十分便捷。
3. 同样的响应式布局。

##### 操作功能页
这一部分的最终效果预览可以看[这个条目](#结果预览)下的相应内容
1. 这部分页面的布局是通过`MainLayout`实现的，它包含一个由`Menu`组件构成的nav bar，一个由`FooterMsg`组件构成的footer。
2. layout的content部分主要是卡片式的内容堆砌，用到最多的是`Card`组件。
3. content部分根据每个功能和展示内容的不同，细分成其他组件。（不做展开）
4. AntD对nav bar没有响应式的支持，进行相应改写，大致样式如下：
5. 把卡片放入栅格容器，同样也是为了响应式布局

相对花比较多时间的是对nav bar的改写，写样式是一个不断调整的过程，直到能让自己满意为止。大致思路如下：
* 媒体查询，当页面宽度小于700px（根据自己nav bar宽度来定）的时候触发；
* 触发媒体查询前后最主要的样式改变是**浮动**变为正常文档流（即，由水平列表变为垂直列表）
* 查找到Antd原始类名，使用`:global`改写全局样式
* 其他：如hover效果，右侧箭头旋转效果，定位等

最终样式如下：
```less
@media screen and (max-width: 700px){
  /* 取消浮动 */
  .logo {
    float: unset;
    display: block;
    text-align: center;
  }

  /* 初始状态 */
  .header {
    height: 64px;
    padding: 0;
    transition: height .3s ease-out;
  }
  /* 初始状态 不显示导航列表 */
  :global(.ant-menu-horizontal) > :global(.ant-menu-item),
  :global(.ant-menu-horizontal) > :global(.ant-menu-submenu) {
      display: none;
  }
  /* 重新定位submenu */
  :global(.ant-menu-submenu-horizontal) > :global(.ant-menu) {
    background-color: #606060;
    min-width: unset;
    position: absolute;
    top: 2px;
    left: 92px;
  }
  :global(.ant-menu-vertical.ant-menu-sub) > :global(.ant-menu-item) {
    box-shadow: unset;
  }

  /* iconfont箭头定位 */
  .logo::after {
    font-family: 'anticon';
    font-size: 20px;
    content: '\e693';
    color: #ffffff;
    position: absolute;
    right: 24px;
    transition: transform .3s ease-out;
  }

  /* hover状态 高度扩展呈现出所有导航项 */
  .header:hover {
    height: 256px;
    /* 取消浮动重新定位menuitem及submenu */
    & :global(.ant-menu-horizontal) > :global(.ant-menu-item),
    & :global(.ant-menu-horizontal) > :global(.ant-menu-submenu) {
      float: unset;
      display: block;
      margin-top: 0;
      top: 0;
    }
    /* 旋转箭头 */
    & .logo::after {
      transform: rotate(180deg);
    }
  }
}
```

#### 总结
整体布局与内容呈现没有特别大的难度，主要是CSS操作。CSS部分资料很多，也有很多前人实践的经验，不会就检索学习；记不清相关用法了就查文档。一边写一边摸索，后续再做相关记录总结，总的来说对自己帮助提升比较大。

### 待继续补充...

## 结果预览
### 响应式
1. [主页响应式预览](http://p5h83rark.bkt.clouddn.com/responsive-homepage.gif)(gif图太大，无法加载，点击链接查看)
  
2. AntD导航组件无响应式功能，为其增加了响应式功能
  ![用户中心响应式预览](http://p5h83rark.bkt.clouddn.com/responsive-usercenter.gif-myroom)

### 用户注册
1. 注册成功
  ![注册成功](http://p5h83rark.bkt.clouddn.com/register-success.gif)

2. 用户已存在
  ![用户已存在](http://p5h83rark.bkt.clouddn.com/register-user-exsited.gif)

### 用户登陆
1. 登陆成功
  ![登陆成功](http://p5h83rark.bkt.clouddn.com/login-success.gif)

2. 密码错误
  ![密码错误](http://p5h83rark.bkt.clouddn.com/login-passwd-wrong.gif)

3. 用户不存在
  ![用户不存在](http://p5h83rark.bkt.clouddn.com/login-user-not-existed.gif)

### 文章操作
1. 新建
  ![新建](http://p5h83rark.bkt.clouddn.com/add-new-post.gif)

    ![新建](http://p5h83rark.bkt.clouddn.com/add-new-post-2.gif)

2. 修改
  ![修改](http://p5h83rark.bkt.clouddn.com/modify-post.gif)

3. 删除
  ![删除](http://p5h83rark.bkt.clouddn.com/delete-post.gif)

4. 查看
  ![查看](http://p5h83rark.bkt.clouddn.com/show-post.gif)

### 资料修改
  1. 修改成功
  ![修改成功](http://p5h83rark.bkt.clouddn.com/user-info-modify.gif)

  2. 修改失败
  ![修改成功](http://p5h83rark.bkt.clouddn.com/user-info-modify-failed.gif)
