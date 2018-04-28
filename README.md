## Introduction

Preload is a picture preloading jQuery plug-in.

##application.js
```
//= require jquery
...
//= require preload
```
##Configuration
| Name      | Type    |  Default  |   Description|
| --------  | ------  | --------- | ------------ |
| imgs      | Array   |   []      | 预加载的图片地址列表 |
| options   | Object  |   {}      | 配置参数对象 |

##options
| Name      | Type    |  Default  |   Description|
| --------  | ------  | --------- | ------------ |
| order     | Boolean |   false   | 默认值false,代表无序加载 |
| each      | Function|   null    | 单张图片加载完执行的方法,一般会修改进度状态 |
| end     	| Function|   null    | 所有图片加载完执行的方法，一般会隐藏loading层 |

##Examples

```
<style>
	html,
	body {
	    width: 100%;
	}
	.loading {
	    position: fixed;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    text-align: center;
	    font-size: 30px;
	    background-color: #000;
	}
</style>

<div class="box">
	<img src="img/brief_1.jpg" alt="picture" id="img" style="width: 720px;height:400px;">
</div>
<div class="loading">
    <p class="progress"></p>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
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
    progress = $('.progress');

//图片预加载
$.preload(imgs, {
    order: true,
    each: function (count) {
        progress.html(Math.round((count) / len * 100) + '%');
    },
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
