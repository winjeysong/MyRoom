# My Room
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
待补充...

## 结果预览
### 响应式
1. 首页响应式效果
  ![主页响应式预览](http://p5h83rark.bkt.clouddn.com/responsive-homepage.gif-myroom)
  
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
