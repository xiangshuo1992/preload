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
            each: null, //单张图片加载完执行的方法,一般是修改进度状态
            end: null //所有图片加载完执行的方法，一般是隐藏loading页
        };
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
        var imgs = this.imgs,
            len = imgs.length,
            count = 0,
            options = this.options;
        load();

        function load() {
            var img = new Image();
            $(img).on('load error', function () {
                options.each && options.each(count);
                if (count >= len) {
                    //所有图片加载完毕
                    options.end && options.end();
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
        var imgs = this.imgs,
            len = imgs.length,
            count = 0,
            options = this.options;
        imgs.forEach(function (elem) {
            var img = new Image();
            $(img).on('load error', function () {
                options.each && options.each(count);
                if (count >= len - 1) {
                    options.end && options.end();
                }
                count++;
            })
            // onload函数要写在改变src前,这样确保了onload函数一定会被调用
            img.src = elem;
        });
    };
    //扩展到jQuery对象上
    $.extend({
        preload: function(imgs, options){
            new Preload(imgs, options);
        }
    });
})(jQuery);