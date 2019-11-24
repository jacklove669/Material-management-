# manage
项目:物料管理后台系统

要求:
一、实现页面
1.发布物料
2.物料管理

二、发布物料
1.Element实现form验证
2.三级联动显示不同字段
3.任何一项必填项没有添加发布失败
4.发布成功之后跳转管理页面

三、物料管理
1.顶部状态切换
2.列表页点击物料名称出现详情弹窗
3.点击上架出现弹窗提示  是否上架该物料  点击确定状态修改
4.删除功能 弹窗提示是否删除
5.编辑功能点击出现form表单  修改当前行字段信息

项目操作简介:

1.配置好路由跳转页面，让页面连动起来。
2.通过import 引入一些用到的模块和文件。
3.自定义一个js文件，存放用到的function方法，但要在main.js中引用,文件用到了（import $http from './config.js'）。
4.数据请求用到了$http,使用axios发送请求,Vue.phototype.$http = http;
5.页面进行post请求，需要用过请求拦截器处理优化。
6.https://www.cnblogs.com/jiangxifanzhouyudu/p/9102908.html（axios第三方插件的使用，请求数据之类的）。
7.模拟编写假的死数据。
8.promise 熟悉: https://www.jianshu.com/p/1b63a13c2701
9...... 哎 看多了就晕..
10. 还是要好好学 啊，连找带蒙的.....


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
