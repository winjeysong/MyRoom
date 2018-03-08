## 开发调试
1. 使用roadhog开启前端devServer
```
npm start
```
2. 如需用到数据库，先用`mongod`命令开启本地数据库，再开启后端devServer。前端通过roadhog的proxy功能向后端devServer请求数据
```
mongod --dbpath yourlocalpath
npm run devserver
```

## 生产
先开启数据库，build页面，再开启服务端并连接数据库
```
mongod --dbpath yourlocalpath
npm run build
npm run modify
npm run server
```