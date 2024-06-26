# visualization
大学生就业数据可视化和推荐前端部分
----------------------------------
# 基于Flask和Echarts的大学生就业可视化和推荐系统
本系统为我毕业设计系统的前端部分，后端部分在[back-end_and_referral](https://github.com/zsdadisscy/back-end_and_referral)
本人水平有限，望各位大佬指正！

# 项目结构
```
dist 打包好的文件
public 公共文件（例如图片）
src 核心代码
    assets 图片
    components 组件
    router 路由
    store vuex
    user_function 一些用户操作
    views 视图
    App.vue 主视图
    main.js 配置js
babel.config.js 插件配置
vue.config.js vue配置
```
由于服务器已到期，请不要访问项目中的服务器，如需部署请改为自己服务器ip，目前项目中所有ip都已经改为本地ip：127.0.0.1

# 项目运行
项目依赖 
```
Node v18.16.0 
vue v5.0.8
```
安装依赖

```npm i ```

运行项目

```npm run serve```

打包项目

```npm run build```

# bug
1. 更换头像后不会立即刷新
2. 点击个人信息可能得点两次
3. 进行路由跳转时，浏览器url有时改变有时不变，未查明问题所在，可能是vue的一种机制
4. jwt的refresh刷新失败（可能存在，不确定，未验证）


# 可优化
1. 判断登录状态时，应将判断函数放在路由跳转前，防止页面会一白才跳转（已优化）
2. 对于mapview，应该放在component里面感觉更好，并且如果把应该左面菜单的值传进去更好，现在默认是3，有待优化，且有代码冗余，可以优化，写的比较匆忙且水平有限
3. 提示窗口太丑了，可以更换为antdesignvue的样式

--------------------------
**声明：本项目仅供学习交流使用，不得用于商业用途，如有侵权请联系删除**