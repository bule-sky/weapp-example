;(function(CMS){
	var getTemplates = function(callback,list){
	    var templates = {};
	    for (var key in list) {
	    	var url = list[key];
	    	var html = CMS.templateCache[url];
	    	if (html) {
	    		templates[key] = html;
	    	} else {
		    	var xhr = new XMLHttpRequest();
		    	xhr.open('get', url, false);
		    	xhr.onreadystatechange = function(){
		    		if (xhr.readyState == 4 && xhr.status == 200) {
		    			templates[key] = xhr.responseText;
		    		}
		    	}
		    	xhr.send(null);
	    	}

	    }
	    return templates;
	}
	CMS.getTemplates = getTemplates;
})(CMS);