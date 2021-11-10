# react后台管理系统
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