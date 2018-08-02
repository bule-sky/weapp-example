# 微信小程序实现新疆方言考试
### 项目说明：
微信小程序：实现一个新疆方言考试

[数据来源：在utils类下面default文件]

[数据存放：将计算后的评分等级存放在本地缓存中]

### 目录结构：

- html-template 源文件模板
- pages — 存放项目页面相关文件 
	> index 存放项目主界面，用于计算以及逻辑处理。题目是

- Screenshots — 存放项目效果图
- app.wxss — 存放项目公共样式，其他样式均存放在page目录里面
- utils — 存放utils文件，可require引入
- [临时图片](http://# "注：项目中所有图片均已转成base64")已删除

### 文件数据(default)结构分析：
1. QuestionList  — 存放该项目问题题库,字段如下：
	> title  	问题题目字段  

	> option 	问题选项数组  

	> Answer 	问题答案字段
2. scoreLevel  —  存放项目评分等级，字段如下：
	> title  	评分等级标题  

	> desc   	评分等级描述语 
3. scoreRank  —  存放该项目分数等级数组，分为七个等级

### 逻辑结构分析：

- 页面require引进default文件数据。
- 根据isTest布尔值默认显示测试界面，点击测试执行修改isTest并加装loadQuest函数



### 项目截图:

<img src="https://github.com/bule-sky/weapp-example/blob/master/weapp-localism/Screenshots/Home.png" width="320px" style="display:inline;">

<img src="https://github.com/bule-sky/weapp-example/blob/master/weapp-localism/Screenshots/First-page.png" width="320px" style="display:inline;">

<img src="https://github.com/bule-sky/weapp-example/blob/master/weapp-localism/Screenshots/Score-page.png" width="320px" style="display:inline;">

<img src="https://github.com/bule-sky/weapp-example/blob/master/weapp-localism/Screenshots/Third-page.png" width="320px" style="display:inline;">

### 开发环境：
微信web开发者工具

### 项目地址：
[https://github.com/bule-sky/weapp-example/tree/master/weapp-calc](https://github.com/bule-sky/weapp-example/tree/master/weapp-calc "微信小程序-计算器")