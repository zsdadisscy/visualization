# visualization

-------------------------
大学生就业可视化和推荐
--------------------------

# bug
1. 更换头像后不会立即刷新
2. 点击个人信息可能得点两次
3. 进行路由跳转时，浏览器url有时改变有时不变，未查明问题所在，可能是vue的一种机制


# 可优化
1. 判断登录状态时，应将判断函数放在路由跳转前，防止页面会一白才跳转（已优化）
2. 对于mapview，应该放在component里面感觉更好，并且如果把应该左面菜单的值传进去更好，现在默认是3，有待优化，且有代码冗余，可以优化，写的比较匆忙且水平有限