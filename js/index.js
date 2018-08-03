;(function(CMS){
	var utils = CMS.utils;
	var render = utils.render;
	var templates = {};
	var $ = utils.$;

	//加载模板
	var getTemplates = function(callback,list){
		templates = CMS.getTemplates(callback,list);
		callback && callback();
	}


	var loadTpl = function(config) {
		var datas = [{ name: 'tom', age: 12 }, { name: 'lily', age: 24 }, { name: 'lucy', age: 55 }];
		var obj = {}
		obj.datas = datas;
		$("#cms-main")[0].innerHTML = render(templates.tpl,obj);
	}

	//im组件初始化
	var init = function(config){
		CMS.config = config;
		var callback = function(){
			if (CMS.config.templates) {
				for (var index in CMS.config.templates) {
					templates[index] = CMS.config.templates[index];
				}
			}
		}

		getTemplates(callback,config.list);
		loadTpl(config)
	}

	//对外暴露
	CMS.init = init;

})(CMS);