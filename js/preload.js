/**
 * 图片预加载插件Preload
 * 
 * @param array imgs  预加载的图片地址数组列表
 * @param Object options  配置参数
 */

(function ($) {
    function Preload(imgs, options) {
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        this.options = {
            order: false, //默认值false,代表无序加载
            minTimer: 0, //完成加载的最少时间，单位ms,默认为0，一般展示类型的loading动画会需要设置
            each: null, //单张图片加载完执行的方法,一般是修改进度状态
            end: null //所有图片加载完执行的方法，一般是隐藏loading页
        };
        this.timer = Date.now();
        this.init(options);
    };
    //插件初始化
    Preload.prototype.init = function (options) {
        //配置参数合并
        this.options = $.extend(this.options, options);
        if (this.options.order) {
            this.ordered(); //有序加载
        } else {
            this.unordered(); //无序加载
        }
    };
    // 有序加载
    Preload.prototype.ordered = function () {
        var that = this,
            imgs = this.imgs,
            len = imgs.length,
            count = 0,
            options = this.options;
        load();

        function load() {
            var img = new Image();
            $(img).on('load error', function () {
                options.each && options.each(count);
                if (count >= len-1) {
                    //所有图片加载完毕,检查是否满足最小loading时间
                    var timerCount = Date.now() - that.timer;
                    if (timerCount < options.minTimer) {
                        console.log("111")
                        var timeout = options.minTimer - timerCount;
                        setTimeout(function () {
                            options.end && options.end();
                        }, timeout);
                    }else{
                        options.end && options.end();
                    }
                } else {
                    load();
                }
                count++

            });
            // onload函数要写在改变src前,这样确保了onload函数一定会被调用

            img.src = imgs[count];
        }
    };
    // 无序加载
    Preload.prototype.unordered = function () {
        var that = this,
            imgs = this.imgs,
            len = imgs.length,
            count = 0,
            options = this.options;
        for (var i = 0; i < len; i++) {
            var img = new Image();
            $(img).on('load error', function () {
                options.each && options.each(count);
                if (count >= len-1) {
                    //所有图片加载完毕,检查是否满足最小loading时间
                    var timerCount = Date.now() - that.timer;
                    if (timerCount < options.minTimer) {
                        var timeout = options.minTimer - timerCount;
                        setTimeout(function () {
                            options.end && options.end();
                        }, timeout);
                    }else{
                        options.end && options.end();
                    }
                }
                count++;
            })
            img.src = imgs[i];
        }
    };
    //扩展到jQuery对象上
    $.extend($,{
        preload: function (imgs, options) {
            new Preload(imgs, options);
        }
    });
})(jQuery);