# seawayProject 实现前端静态页面自动化，页面自动刷新，所见即所得编辑、、、、
==========
网站初始化公共库

提高静态页面开发效率、快速生成模板、开发的的工具

####前提
已经安装了NODEJS

git是否安装不影响，但是不能直接克隆，只能下载资源

####克隆本仓库
````
git clone https://github.com/csw1221/seawayProject.git
````

####安装Npm依赖包

详细的依赖包清单请参考`package.json`文件，Grunt相关配置请看`Gruntfile.js`

````
npm install
````

安装完毕之后，你将得到如下的文件结构

####文件结构

静态页面不需要太过复杂的文件结构，最终的发布版本代码和相关文件全部在`build`文件夹中。为了后续维护方便，请适当做好相应的注释和文档。
````
seawayProject/
|
|-----src //dev模式下css、js、images、HTML文件等集合（即使开放源码）
|           |-style
|              |- iconfont 开放中雪碧字体
|           |-js
|              |- lib 开放中所依赖的第三方插件，可以自行添加删除
|           |-images
|           |-html文件
|----- .node_modules / // npm安装依赖包所在文件夹
|
|-----.git // 默认使用git，配置好gitignore文件
|-----Gruntfiles.js // grunt配置文件 建议先阅读配置
|-----package.json //g runt依赖包配置文件

````
####发布后文件结构

执行
````
grunt build

````
生成
````
seawayProject/
|
|-----src //dev模式下css、js、images、HTML文件等集合（即使开放源码）
|           |-style
|              |- iconfont 开放中雪碧字体
|           |-js
|              |- lib 开放中所依赖的第三方插件，可以自行添加删除
|           |-images
|           |-html文件
|-----dist //最终生成的纯净文件夹 （此文件夹，开放完成后运行BUILD的时候产生）
|           |-style
|              |- iconfont 开放中雪碧字体
|           |-js
|              |- lib 开放中所依赖的第三方插件，可以自行添加删除
|           |-images
|           |-html文件
|----- .node_modules / // npm安装依赖包所在文件夹
|
|-----.git // 默认使用git，配置好gitignore文件
|-----Gruntfiles.js // grunt配置文件 建议先阅读配置
|-----package.json //g runt依赖包配置文件
|-----seawayProject-YYYY-MM-DD.ZIP //压缩上线文件
````
####初始化

git clone下来后，可以将`StaticPage`文件夹修改成项目的文件名:
修改package.json中的参数：
````
"name": "seawayProject", 修改成自己的项目名称
"version": "0.0.1",修改版本号
"author": "chenshw",修改作者
  ....
````
devDependencies 参数是NPM 依赖包，如在不清楚理解情况下不要修改



####Grunt配置

######开发中
可使用命令

````
grunt live

````
会建立一个静态资源服务器，页面自动刷新，所见即所得编辑，在编辑过程中会用htmlhint、jshint对HTML 和对JS进行格式验证
访问'http://localhost:8000/src/'访问开发版

######查看准上线版
````
grunt default
或者
grunt
````
会发布把SRC的目录的文件js/css/图片压缩 以及HTML的文件资源引用替换压缩文件，放在dist目录下面

提示：

````
	<!-- build:css style/seawayProject.min.css -->
	<link rel="stylesheet"  href="style/base.css">
    <link rel="stylesheet"  href="style/style.css">
	<!-- endbuild -->
	<script src="/js/lib/zepto.js"></script>
	<!-- build:js js/seawayProject.min.js -->
    <script src="/js/base.js"></script>
    <script src="/js/main.js"></script>
    <!-- endbuild -->
````
上面的'seawayProject'路径名称要替换成'package.json'中'name'的值，第三方包引用文件就是'src/js/lib'的文件不会中压缩处理，所以在页面上，不用标识替换，直接用原有的路径

再用'grunt live'命令 访问'http://localhost:8000/dist/'访问压缩版净化版

######发布打包是使用

````
grunt build

````
会生成一个压缩包'项目名称'+'YYYY-MM-DD'.ZIP压缩包，然后根据个人需要，发送给程序，或者上线、、、、


#### License

Released under [MIT] LICENSE