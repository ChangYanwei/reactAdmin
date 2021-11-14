# react后台管理系统

## 项目描述

### 项目简介

- 此项目为一个前后台分离的后台管理系统的SPA，包括前端PC应用和后端应用
- 包括不同用户登陆/商品分类管理/商品管理/用户管理/角色管理等功能模块
- 前端：使用React全家桶＋Antd + Axios +ES6 + Webpack 等技术
- 后端：使用Node + Express + Mongodb等技术
- 采用模块化、组件化、工程化的模式开发



### 技术选型

- 使用 **react-router-dom** 开发单页应用 
- 使用 **redux+react-redux+redux-thunk** 管理应用组件状态 
- 使用 **axios/jsonp** 与后端进行数据交互 
- 使用 **antd** 组件库构建界面

![image-20211113102458072](F:\图片\typora图片\image-20211113102458072.png)

### 前端路由

<img src="F:\图片\typora图片\image-20211113103230833.png" alt="image-20211113103230833" style="zoom:80%;" />

## 登陆

### 维持登陆与自动登陆

1. 登陆后，刷新后依然是已登陆状态（维持登陆)

2. 登陆后，关闭浏览器后打开浏览器访问依然是已登陆状态（自动登陆)

3. 登陆后，访问登陆路径自动跳转到管理界面

   

## redux
### 标题数据
涉及到的组件

1. LeftNav组件
2. Header组件

具体实现：

1. 首先在reducer中初始化标题数据
2. 在LeftNav组件中，当点击菜单的时候更新redux中保存的标题数据
3. 在Header组件中获取redux中的标题数据

### 用户user数据
使用到user的组件
- Login登录组件：需要编写登录的异步action
  1. 在异步action中
- Header组件：在退出登录的时候，需要将redux中的用户数据清空