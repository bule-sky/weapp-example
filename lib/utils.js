;var CMS = {
    templateCache:{}
};

(function(CMS){
    /*
    var tpl = '<a>{{this.key1}} <p>-</p> {{this.value1.c}}</a>';
    var data = {"key1":1,"value1":{"c":"cccccc"}};
    var html = render(tpl,data);
    详见 http://blog.jobbole.com/56689/
    */
    function render(template, data) {
        template = template || "";
        data = data || [""];
        var re = /{%((?:(?!%}).)+)%}/g, reExp = /(^( )?(var|if|for|else|switch|case|default|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0;
        var add = function(line, js) {
            js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
            return add;
        }
        var match;
        while(match = re.exec(template)) {
            add(template.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }
        add(template.substr(cursor, template.length - cursor));
        code += 'return r.join("");';
        data = isNaN(data.length) ? [data] : data;
        var html = "";
        for(var i = 0, length = data.length; i < length; i++) {
            html += new Function(code.replace(/[\r\t\n]/g, '')).apply(data[i]);
        }
        return html;    
    }


    var utils = {
        $ : function(selector){
            return document.querySelectorAll(selector);
        },
        show : function(node){
            node.style.display = "block";
        },
        hide : function(node){
            node.style.display = "none";
        },
        removeNode : function(selector){
            var thisNode = utils.$(selector)[0];
            if (thisNode) {
                thisNode.parentNode.removeChild(thisNode);
            }
        },
        getStyle : function (node, prop) {
            if(node.currentStyle) {
                return node.currentStyle[prop] || '';
            }
            else if(window.getComputedStyle) {
                return window.getComputedStyle(node , null)[prop];
            }
        },
        indexOf : function (array, item) {
            if (array.indexOf){
                return array.indexOf(item);
            }   
            for (var i = 0, len = array.length; i < len; i++){
                if (array[i] === item){
                    return i;
                }
            }   
            return -1;
        },
        copy : function(json1, json2, flag, fn){
            fn = fn || function(e){return e;}
            for (var key in json2){
                if (flag || typeof json1[key] === 'undefined' || json1[key] === null){
                    json1[key] = fn(json2[key]);
                }
            }
            return json1;
        },
        isChild : function(node,nodeParent){
            while (node && node.tagName && node.tagName.toLowerCase() != "body"){
                if (node == nodeParent){
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        },
        getTime : function(time){
            var nowDate = new Date();
            var sendDate = new Date(time);
            var dateStr = '';
            if (nowDate.getFullYear() == sendDate.getFullYear() && nowDate.getMonth() == sendDate.getMonth() && nowDate.getDate() == sendDate.getDate()) {
                dateStr = (sendDate.getHours()>9 ? sendDate.getHours():'0'+sendDate.getHours())+':'+(sendDate.getMinutes()>9 ? sendDate.getMinutes():'0'+sendDate.getMinutes());
            } else {
                dateStr = sendDate.getFullYear()+'-'+(sendDate.getMonth()>8 ? (sendDate.getMonth()+1):'0'+(sendDate.getMonth()+1))+'-'+(sendDate.getDate()>9 ? sendDate.getDate():'0'+sendDate.getDate())+' '+(sendDate.getHours()>9 ? sendDate.getHours():'0'+sendDate.getHours())+':'+(sendDate.getMinutes()>9 ? sendDate.getMinutes():'0'+sendDate.getMinutes());
            }
            return dateStr;
        },
        getFileSize : function(size){
            var g = Math.pow(1024, 3);
            var m = Math.pow(1024, 2);
            var k = Math.pow(1024, 1);
            if (size > g) {
                size = (size / g).toFixed(2) + 'G';
            } else if (size > m) {
                size = (size / m).toFixed(2) + 'M';
            } else if (size > k) {
                size = (size / k).toFixed(2) + 'K';
            } else {
                size = size + 'B';
            }
            return size;
        },
        getFormValue : function(formArray){
            var formData = {};
            for (var i = 0; i < formArray.length; i++) {
                formData[formArray[i]] = document.getElementsByName(formArray[i])[0].value;
            }
            return formData;
        },
        fadein : function(ele) {
            ele.style.opacity = 0;
            ele.style.display = "block";
            if (ele) {
                var v = 0;
                var timer = null;
                timer = setInterval(function() {
                    v += 1;
                    setOpacity(ele, v);
                    if (v == 100) {
                        clearInterval(timer);
                    }
                }, 1);
            }
        },
        fadeout: function(ele) {
            if (ele) {
                var v = 100;
                var timer = null;
                timer = setInterval(function() {
                    v -= 1;
                    setOpacity(ele, v);
                    if (v == 0) {
                        ele.style.display = "none";
                        clearInterval(timer);
                    }
                }, 1);
            }
        },
        downloadHistoryMsgFile: function(url,name){
            var a = document.createElement('a');
            a.href = url;
            a.setAttribute('download', name || '');
            a.click();
        },
        encodeHtmlStr: function(str) {
            var replaceRule = [
                {
                    symbol: '&',
                    html: '&amp;'
                },
                //下述方法有问题,字符串中如有空格,会多加空格
                //white-space: pre-wrap; 能实现同样效果,并支持ie9, 故注释掉
                // {
                //     symbol: '[\\u0020]',
                //     html: '&nbsp;\u0020'
                // },
                {
                    symbol: '[\\u0009]',
                    html: '&nbsp;&nbsp;&nbsp;&nbsp;\u0020'
                },
                {
                    symbol: '<',
                    html: '&lt;'
                },
                {
                    symbol: '>',
                    html: '&gt;'
                },
                {
                    symbol: '"',
                    html: '&quot;'
                },
                {
                    symbol: '\'',
                    html: '&#39;'
                },
                {
                    symbol: '\\n\\r',
                    html: '<br/>'
                },
                {
                    symbol: '\\r\\n',
                    html: '<br/>'
                },
                {
                    symbol: '\\n',
                    html: '<br/>'
                }
            ];

            for (var i = 0, len = replaceRule.length; i < len; i++) {
                var rule = replaceRule[i];
                var regExp = new RegExp(rule.symbol, 'g');
                str = str.replace(regExp, rule.html);
            }

            return str;
        },
        replaceUri: function(str, callback) {
            var result = '';
            var protocol = '((?:http|https|ftp)\\:\\/\\/)?';
            var ip = '(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])';
            var host = '(?!@)(?:[a-z0-9-]{1,36}\\.)+[a-z]{2,6}';
            var port = '(?:\\:[0-9]{1,5})?';
            var path = '(?:[a-zA-Z0-9.,;?\\\'+&%$#=~_\\-!()*\\/]*)';
            var uriReg = new RegExp(protocol + '(?:(?:' + ip + ')|(?:' + host +'))' + port + path, 'ig');

            result = str.replace(uriReg, function(uriStr, prot) {
                var lastIndex = arguments[arguments.length - 2];
                var prevChar = str.substr(lastIndex - 1, 1);
                var isEmail = prevChar === '@';
                var notDomain = !chkDomain(uriStr, prot);
                if (isEmail || notDomain) {
                    return uriStr;
                }
                return callback.apply(null, arguments);
            });
            return result;
        },
        replaceEmail: function(str, callback) {
            var result = '';
            var emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/gi;

            result = str.replace(emailReg, callback);

            return result;
        },
        cloneObj: function(obj){
            var str, newobj = obj.constructor === Array ? [] : {};
            if(typeof obj !== 'object'){
                return;
            } else if(window.JSON){
                str = JSON.stringify(obj), //系列化对象
                newobj = JSON.parse(str); //还原
            } else {
                for(var i in obj){
                    newobj[i] = typeof obj[i] === 'object' ? 
                    cloneObj(obj[i]) : obj[i]; 
                }
            }
            return newobj;
        },
        //判断当前是否是移动端
        browserRedirect: function(callback) {
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                callback("phone");
            } else {
                callback("pc");
            }
        }
    };

    var User = {
      _Cache: {}
    };
    /*
    此处只为演示，实际应用需请求应用服务器获取用户信息
    */
    User.get = function(user) {
        var id = user.id;

        //保证不刷新页面情况下，同一个 userId 的信息是一致的
        user = User._Cache[id];
        if (user) {
          return user;
        }

        var nameList = "梦琪忆柳之桃慕青问兰尔岚元香初夏沛菡傲珊曼文乐菱痴珊恨玉惜文香寒新柔语蓉海安夜蓉涵柏水桃醉蓝春儿语琴从彤傲晴语兰又菱碧彤元霜怜梦紫寒妙彤曼易南莲紫翠雨寒易烟如萱若南寻真晓亦向珊慕灵以蕊寻雁映易雪柳孤岚笑霜海云";
        var nameLen = nameList.length;

        var xingList = "赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张于";
        var xingLen = xingList.length;

        var portraits = [
          'https://rongcloud-image.cn.ronghub.com/fa33294a358e7f2abf.gif?e=2147483647&token=CddrKW5AbOMQaDRwc3ReDNvo3-sL_SO1fSUBKV3H:z2QkbpEqUEMrOPrJtV3tBP4gQYo=',
          'http://7xogjk.com1.z0.glb.clouddn.com/01fac54313ad977d6e.gif',
          'https://rongcloud-image.cn.ronghub.com/2fcdba4205860a63fb.gif?e=2147483647&token=livk5rb3__JZjCtEiMxXpQ8QscLxbNLehwhHySnX:m7S0ADf1E-d2bIG3E0vuiZJSH_w=',
          'http://oqekw07cj.bkt.clouddn.com/9da99c4255a24baba1.gif',
          'http://2f.zol-img.com.cn/product/172_100x75/267/cepP02EKJTV6.gif',
          'https://fsprodrcx.cn.ronghub.com/lVMs15VSLeR47CzXlVMs15VbxLGVULo2/timg.gif',
          'https://fsprodrcx.cn.ronghub.com/FmUv4RZmLtL72i_hFmUv4RYqrWMWbCI7/timg+%284%29.gif',
          'https://fsprodrcx.cn.ronghub.com/vJiff7ybnkxRJ59_vJiff7zADyO8gW0a/timg+%285%29.gif',
          'https://fsprodrcx.cn.ronghub.com/5FJuo-RTb5AJ7W6j5FJuo-Rf_-_kU162/timg+%283%29.gif',
          'https://fsprodrcx.cn.ronghub.com/Jx-MkScejaLKoIyRJx-MkScT89YnHp6U/timg+%282%29.gif',
          'https://fsprodrcx.cn.ronghub.com/pQjyn6UJ86xIt_KfpQjyn6UGM_6lDaO-/timg+%281%29.gif',
          'https://fsprodrcx.cn.ronghub.com/1T1xVdU_cGY4gnFV1T1xVdUFyRPVM_4N/test.gif',
          'https://fsprodrcx.cn.ronghub.com/yn2CV8p8g2QnwoJXyn2CV8ppkNXKdrNS/1512691986120.gif',
          'https://fsprodrcx.cn.ronghub.com/B0qmIAdLpxPq9aYgB0qmIAdV5acHSrhp/timg.jpeg'
        ];

        var portraitLen = portraits.length;

        var getIndex = (max) => {
          return Math.floor(Math.random() * max) || 1;
        };

        var getName = (len) => {
          var names = [];
          for (var i = 0; i < len; i++) {
            var index = getIndex(nameLen);
            names.push(nameList[index]);
          }
          return names.join('');
        };

        var getXing = (index) => {
          return xingList.split('')[index];
        };

        var getPortrait = (index) => {
          return portraits[index];
        };

        var nameIndex = getIndex(3);
        var xingIndex = getIndex(xingLen);
        var name = getXing(xingIndex) + getName(nameIndex);

        var portraitIndex = getIndex(portraitLen);

        var portrait = getPortrait(portraitIndex);

        user = {
          name: name,
          portrait: portrait
        };
        User._Cache[id] = user;
        return user;
    };

    var formatSentTime = function(time) {
      var date = new Date(time);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      return hours + ':' + minutes;
    }

    var getMessageContent = function(message) {
      var content = '[暂未解析此类型消息]';
      var messageMap = {
        TextMessage: message.content.content,
        FileMessage: '[文件]',
        ImageMessage: '[图片]'
      };
      var messageType = message.messageType;
      return messageMap[messageType] || content;
    };

    var formartMessage = function(message) {
      var sender = User.get({
        id: message.senderUserId
      });
      var sentTime = message.sentTime;
      sentTime = formatSentTime(sentTime);

      var direction = (message.messageDirection == 1) ? 'sender' : 'receiver';

      var content = getMessageContent(message);
      console.log(content)

      utils.copy(message, {
        _sender: sender,
        _sentTime: sentTime,
        _direction: direction,
        _content: content
      });
    }

    var setOpacity = function(ele, opacity) {
        if (ele.style.opacity != undefined) {
            ///兼容FF和GG和新版本IE
            ele.style.opacity = opacity / 100;
        } else {
            ///兼容老版本ie
            ele.style.filter = "alpha(opacity=" + opacity + ")";
        }
    }

    var domainArray = [
    '.com', '.net', '.org', '.biz', '.coop', '.info', '.museum', '.name',
    '.pro', '.edu', '.gov', '.int', '.mil', '.ac', '.ad', '.ae', '.af', '.ag',
    '.ai', '.al', '.am', '.an', '.ao', '.aq', '.ar', '.as', '.at', '.au', '.aw',
    '.az', '.ba', '.bb', '.bd', '.be', '.bf', '.bg', '.bh', '.bi', '.bj', '.bm',
    '.bn', '.bo', '.br', '.bs', '.bt', '.bv', '.bw', '.by', '.bz', '.ca', '.cc',
    '.cd', '.cf', '.cg', '.ch', '.ci', '.ck', '.cl', '.cm', '.cn', '.co', '.cr',
    '.cu', '.cv', '.cx', '.cy', '.cz', '.de', '.dj', '.dk', '.dm', '.do', '.dz',
    '.ec', '.ee', '.eg', '.eh', '.er', '.es', '.et', '.fi', '.fj', '.fk', '.fm',
    '.fo', '.fr', '.ga', '.gd', '.ge', '.gf', '.gg', '.gh', '.gi', '.gl', '.gm',
    '.gn', '.gp', '.gq', '.gr', '.gs', '.gt', '.gu', '.gv', '.gy', '.hk', '.hm',
    '.hn', '.hr', '.ht', '.hu', '.id', '.ie', '.il', '.im', '.in', '.io', '.iq',
    '.ir', '.is', '.it', '.je', '.jm', '.jo', '.jp', '.ke', '.kg', '.kh', '.ki',
    '.km', '.kn', '.kp', '.kr', '.kw', '.ky', '.kz', '.la', '.lb', '.lc', '.li',
    '.lk', '.lr', '.ls', '.lt', '.lu', '.lv', '.ly', '.ma', '.mc', '.md', '.me',
    '.mh', '.mk', '.ml', '.mm', '.mn', '.mo', '.mp', '.mq', '.mr', '.ms', '.mt',
    '.mu', '.mv', '.mw', '.mx', '.my', '.mz', '.na', '.nc', '.ne', '.nf', '.ng',
    '.ni', '.nl', '.no', '.np', '.nr', '.nu', '.nz', '.om', '.pa', '.pe', '.pf',
    '.pg', '.ph', '.pk', '.pl', '.pm', '.pn', '.pr', '.ps', '.pt', '.pw', '.py',
    '.qa', '.re', '.ro', '.rw', '.ru', '.sa', '.sb', '.sc', '.sd', '.se', '.sg',
    '.sh', '.si', '.sj', '.sk', '.sl', '.sm', '.sn', '.so', '.sr', '.st', '.sv',
    '.sy', '.sz', '.tc', '.td', '.tf', '.tg', '.th', '.tj', '.tk', '.tm', '.tn',
    '.to', '.tp', '.tr', '.tt', '.tv', '.tw', '.tz', '.ua', '.ug', '.uk', '.um',
    '.us', '.uy', '.uz', '.va', '.vc', '.ve', '.vg', '.vi', '.vn', '.vu', '.ws',
    '.wf', '.ye', '.yt', '.yu', '.za', '.zm', '.zw', '.mg'];
    
    var getLocation = function(href) {
        var location = document.createElement('a');
        location.href = href;
        return location;
    };

    function ValidateIPaddress(ipaddress) {
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
            return true;
        }
        return false;
    }

    var chkDomain = function(str, protocol) {
        var link = str;
        if(!protocol){
            link = 'http://' + link;
        }
        var location = getLocation(link);
        if(ValidateIPaddress(location.hostname)){
            return true;
        }
        var domain = location.hostname.replace(/^.+\./, '');
        if(domainArray.indexOf('.' + domain) < 0){
            return false;
        }
        return true;
    };

    

    utils.render = render;

    CMS.utils = utils;   
})(CMS);