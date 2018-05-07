## Introduction

Preload is a picture preloading jQuery plug-in.

## Application.js

```
//= require jquery
...
//= require preload
```
## Configuration

| Name      | Type    | Default   | Description |
| --------  | ------  | --------- | ------------ |
| imgs      | Array   |   []      | 预加载的图片地址列表 |
| options   | Object  |   {}      | 配置参数对象 |

## Options

| Name      | Type    |  Default  | Description |
| --------  | ------  | --------- | ------------ |
| order     | Boolean  |   false   | 默认值false，代表无序加载 |
| minTimer     | Number  |   0   | 完成加载的最少时间，单位ms，默认为0，一般展示类型的loading动画会需要设置|
| each      | Function |   null    | 单张图片加载完执行的方法,一般会修改进度状态 |
| end     	| Function |   null    | 所有图片加载完执行的方法，一般会隐藏loading层 |

## Examples

```
<style>
    html,body {width: 100%;}
    .box {text-align: center;}
    a {display: inline-block;height: 30px;line-height: 30px;border: 1px solid #ccc;background-color: #fff;padding: 0 10px;margin-right: 50px;}
    a:hover {background-color: #aaaaaa;}
    .loading {position: fixed;top: 0;left: 0;width: 100%;height: 100%;text-align: center;font-size: 30px;background-color: #fff;}
    .xl-progress-wp{position: absolute;width: 300px;height: 100px;top: 50%;left: 50%;margin: -50px 0 0 -150px;}
    .xl-progress {position: relative;width: 100%;height: 16px;border-radius: 20px;background-color: #eeeeed;overflow: hidden;}
    .xl-progress__inner {position: absolute;top: 0;left: 0;height: 100%;border-radius: 20px;background-color: #f3d08c;}
    .xl-progress__txt {color: #959595;margin-top: 7px;text-align: center;}
</style>

<div class="box">
    <img src="img/brief_1.jpg" alt="pic" id="img" style="width: 720px;height:400px;">
    <p>
        <a href="javascript:;" class="btn" data-controller="prev">上一页</a>
        <a href="javascript:;" class="btn" data-controller="next">下一页</a>
    </p>
</div>
<div class="loading">
    <div class="xl-progress-wp">
        <div class="xl-progress">
            <i class="xl-progress__inner" style="width:0%;"></i>
        </div>
        <div class="xl-progress__txt">0%</div>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="js/preload.js"></script>

<script>
var imgs = [
    'img/brief_1.jpg',
    'img/brief_2.jpg',
    'img/brief_3.jpg',
    'img/brief_4.jpg',
    'img/brief_5.jpg',
    'img/brief_6.jpg',
    'img/brief_7.jpg',
    'img/brief_8.jpg',
    'img/brief_9.jpg',
    'img/brief_10.jpg',
    'img/brief_11.jpg'
];
var index = 0,
    len = imgs.length,
    progressInner = $(".xl-progress__inner"),
    progressTxt = $('.xl-progress__txt');

//图片预加载
$.preload(imgs, {
    minTimer: 3000,
    //每加载完一张执行的方法
    each: function (count) {
        var percent = Math.round((count) / len * 100) + '%';
        progressInner.css("width",percent);
        progressTxt.html(percent);
    },
    // 加载完所有的图片执行的方法
    end: function () {
        $('.loading').hide();
    }
});
</script>
```

## License

The MIT License(http://opensource.org/licenses/MIT)

Please feel free to use and contribute to the development.

## Contribution

If you have any ideas or suggestions to improve Preload, welcome to submit an issue/pull request.
