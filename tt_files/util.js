(function(window,undefined){

    var _ = {};

    var ERR_OK = 0;

    _.isFn = function (obj) {
        return typeEqual(obj, 'Function');
    };

    function typeEqual(obj, type) {
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    }

    _.isObj = function (obj) {
        return typeEqual(obj, 'Object');
    };

    _.initWeixinJSSDK = function (cbFn, context) {

        var cbs = [cbFn];

        $.ajax({
            url: 'http://common.diditaxi.com.cn/general/webEntry/weixinJSSDK',
            type: 'POST',
            dataType: 'json',
            data: {
                url: location.href.replace(/#.*/, '')
            },
            success: function (response) {
                if (response.errno === ERR_OK) {
                    _.getScript('http://res.wx.qq.com/open/js/jweixin-1.0.0.js', function () {

                        wx.config({
                            debug: false,
                            appId: response.appId,
                            timestamp: response.timestamp,
                            nonceStr: response.nonceStr,
                            signature: response.signature,
                            jsApiList: ['getLocation','onMenuShareTimeline', 'onMenuShareAppMessage']
                        });

                        wx.ready(function () {
                            //alert('hehe');
                            _.each(cbs, function (fn) {
                                fn && fn.call(context, true);
                            });

                        });

                    });
                } else {
                    _.each(cbs, function (fn) {
                        fn && fn.call(context, false);
                    });
                }
            }
        });

        _.initWeixinJSSDK = function (cbFn, context) {

           /* if (!_.isUndefined(window.wx)) {
                cbFn && cbFn.call(context, true);
            } else {
                cbs.push(cbFn);
            }*/
            cbFn(true);
        };

    };

    _.each = function (obj, fn, context) {

        if (!obj || !_.isFn(fn))
            return;

        context = context || obj;

        if (obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (false === fn.call(context, obj[i], i, obj))
                    return;
            }
        } else if (_.isObj(obj)) {
            for (var n in obj) {
                if (false === fn.call(context, obj[n], n, obj))
                    return;
            }
        }
    };
    _.getScript = function (url, cbFn) {
        var sc = document.createElement("script");
        sc.type = "text/javascript";

        var timeOut = false;
        var timer = 0;

        sc.onload = sc.onreadystatechange = function () {
            if (!this.readyState || /^(loaded|complete)$/.test(this.readyState)) {
                if (!timeOut) {
                    clearTimeout(timer);
                    cbFn();
                }
                sc.onload = sc.onreadystatechange = null;
            }

        };

        sc.onerror = function () {
            if (!timeOut) {
                clearTimeout(timer);
                cbFn();
            }
            sc.onerror = null;
        };

        sc.src = url;

        timer = setTimeout(function () {
            timeOut = true;
            cbFn();
        }, 3000);

        document.getElementsByTagName("head")[0].appendChild(sc);
    };

    _.isWeixin = /MicroMessenger/i.test(navigator.userAgent);
    window._ = _;


})(window);