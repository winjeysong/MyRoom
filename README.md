## 开发调试
1. 使用roadhog开启前端devServer
```
npm start
```
2. 如需用到数据库，可以开启后端devServer。前端通过roadhog的proxy功能向后端devServer请求数据
```
npm run devserver
```

## 生产
build页面，开启服务端并连接数据库
```
npm run build
npm run modify
npm run server
```