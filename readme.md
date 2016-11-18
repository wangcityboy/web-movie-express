欢迎配置
1.启动mongo 数据库:mongod --dbpath /root/tools/mongodb/data
mongod --fork --dbpath /root/tools/mongodb/data --logpath /root/tools/mongodb/datalog
在后台运行，如果想要关闭它的话，需要给他发送shutdownServer()
2.在项目目录下运行node app.js
3.在浏览器中访问:localhost:3000


最简单的办法：

$ nohup node app.js &
但是，forever能做更多的事情，比如分别记录输出和错误日志，比如可以在js中作为api使用。

$ sudo npm install forever -g   #安装
$ forever start app.js          #启动
$ forever stop app.js           #关闭
$ forever start -l forever.log -o out.log -e err.log app.js   #输出日志和错误
