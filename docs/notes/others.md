# 原生小技巧

## 使用fastclick后，label>input[type=radio]+span结构，点击文字不能够选中这个radio
```css
  /* 解决方法: 加上样式 */
  label > * { pointer-events: none; }
```


## fastclick.js导致input和textarea聚焦难的问题
```javascript
/**
  * @param {EventTarget|Element} targetElement
  */
FastClick.prototype.focus = function(targetElement) {
  var length;

  // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
  if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};
```

## jquery-weui主动触发左滑bug
```javascript
Swipeout.prototype.open = function() {
  // 修复第一次不能主动滑动的bug
  if(!this.limit) {
    this.limit = $($('.weui-cell__ft')[0]).width()
  }
  this.container.removeClass(TOUCHING);
  this._closeOthers()
  this.mover.css("transform", "translate3d(" + (-this.limit) + "px, 0, 0)");
  this.container.trigger('swipeout-open');
}
```

## Android点击事件有背景颜色的问题
```css
* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
```

## 移动端滑动不顺畅bug
```css
  -webkit-overflow-scrolling: touch;
```

## 兼容Promise
```javascript
// 类似这种
if(!window.Promise) {
  document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
}
```
## 移动端300ms延迟
```html
<meta name="viewport" content="width=device-width">
```
```css
html {
  touch-action: manipulation;
}
```
```javascript
// fastclick
```

## ios微信键盘收起可能导致input错位的问题
```javascript
$("input").on('blur', function() {
  window.scrollTo(0, 0);

  var odiv = document.createElement('div')
  odiv.style.height = "999px"
  document.body.appendChild(odiv)
  setTimeout(function () {
    odiv.parentNode.removeChild(odiv)
  }, 0)

  // setTimeout(function () {
  //   var scrollT = document.documentElement.scrollTop || document.body.scrollTop || 0;
  //   window.scrollTo(0, Math.max(scrollT -1, 0))
  // }, 10);
});
```

## 去除input search自带的清除标志
```css
input[type=search]::-webkit-search-cancel-button{
  -webkit-appearance: none;
}
```

## 移动端给键盘右下角显示’搜索‘
```html
<form onsubmit="return false;" action="javascript:return true">
  <input type="search" autocomplete="off" placeholder="搜索关键词" />
</form>
```

## 移动端touchmove的时候使输入失去焦点
```js
$(document).on('touchmove', function() {
  $('input').blur()
})
```

## bodyScrollLock的使用
```js
// 锁死body
bodyScrollLock.disableBodyScroll(document.querySelector('.poi-history-content'));
// 解放body
bodyScrollLock.enableBodyScroll(document.querySelector('.poi-history-content'));
// 清除锁死
bodyScrollLock.clearAllBodyScrollLocks()
```

## 解决H5页面在iOS网页中的数字被识别为电话号码
```html
<meta name = "format-detection" content = "telephone=no">
```

## 使用css3 animation keyframe时，在ios上使用了rem产生的位置bug
```js
// 使用setTimeout(fn,0),利用js单线程的特性，将加载动画class放在线程最后执行，从而使动画表现正常。

setTimeout(() => {
  $("#id").addClass("animation")
}, 0)
```

## 回退刷新页面
```js
window.addEventListener('pageshow', function (event) {
  if (event.persisted || window.performance && window.performance.navigation.type == 2) {
    location.reload()
  }
})
```

## 解决ios textarea无法输入的问题
```js
$('textarea').attr('contenteditable', true)
$('textarea').css('-webkit-user-select', 'auto')
```

## 让事件穿透 遮罩层，可以对遮罩层设置css属性
```css
  pointer-events: none;
```

## 解决 uiwebview 中scroll事件在滚动后才触发的问题（sticky）
```js
// 无法解决惯性滚动时的问题

// 1.touchmove
document.addEventListener('touchmove', function () {
  // 已废弃，过时的方法
  // var event = document.createEvent("HTMLEvents");
  // event.initEvent("scroll", true, true);
  // document.dispatchEvent(event);
  // new
  var event = new Event('scroll');
  document.dispatchEvent(event);
})

// 2.引入hammer.js
var hammerTest = new Hammer(document);
hammerTest.on('pan panmove', function (ev) {
  console.log(ev.type);
  var event = document.createEvent("HTMLEvents");
  event.initEvent("scroll", true, true);
  document.dispatchEvent(event);
});

```

## 超过多行 展开收起
```css
.gMaxhei {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
```
```js
// 处理 展开  收起
setTimeout(function () {
  vueThis.answerList.forEach(function (item, index) {
    var clientHeight = $('#answer' + index)[0].clientHeight
    var scrollHeight = $('#answer' + index)[0].scrollHeight
    if (scrollHeight > clientHeight) {
      item.over = true
    } else {
      item.over = false
    }
  })
}, 1);
```

## videojs的使用
```css
.video-js .vjs-big-play-button {
  top: 60%;
  left: 50%;
  height: 1.3rem;
  margin-top: -0.65rem;
  width: 2rem;
  margin-left: -1rem;
}

.vjs-poster {
  height: 100%;
  width: 100%;
  background-size: contain;
}
.video-js .vjs-play-control{
  order: 1;
}
.video-js .vjs-current-time {
  display: block;
  order: 2;
}
.video-js .vjs-progress-control{
  order: 3;
}
.video-js .vjs-duration {
  display: block;
  order: 4;
}
.video-js .vjs-fullscreen-control{
  order: 5;
}
.video-js .vjs-volume-panel {
  display: none;
}

.video-js .vjs-remaining-time {
  display: none;
}

.video-js .vjs-picture-in-picture-control {
  display: none;
}
```
```js
// 初始化
vueThis.videoPlayer = videojs('my-player', {
  controls: true,
  autoplay: false,
  preload: true
});
// 设置视频预览图
vueThis.videoPlayer.src({
  type: 'application/x-mpegURL',
  src: 'https://xxx.m3u8',
  // preload: "auto",
  // autoplay: false, //自动播放
  // controls: true, //用户可以与之交互的控件
  // muted: false, //默认情况下将使所有音频静音
  // aspectRatio: "16:9", //显示比率
  // controlBar: {
  //   children: [
  //     "playToggle", // 播放按钮
  //     "currentTimeDisplay", // 当前已播放时间
  //     "progressControl", // 播放进度条
  //     "durationDisplay", // 总时间
  //     "fullscreenToggle", // 全屏
  //   ],
  // }
})
vueThis.videoPlayer.poster('xxx.png')
// 全屏事件
vueThis.videoPlayer.on('fullscreenchange', function (e) {
  console.log(e);

  console.log('change');
  console.log(document.fullscreenElement);
  if (!document.fullscreenElement) {
    // 退出全屏
    // location.reload()
  }
});
// 播放事件
vueThis.videoPlayer.on('play', function (e) {
  console.log('play');
  var params = {
    uid: pageData.userInfo.uid,
    accountId: pageData.userInfo.accountId,
    audioId: vueThis.audioId
  }
  custom.ajaxRequest({
    type: 'POST',
    url: ajaxUrl.audioRecord,
    data: params,
    error: function () {

    }
  }, function (data) {
    if (data.code == '0') {

    }
  });
});

```

## transition transform
```js
$('button').on('click', function() {
  $('.mydiv').toggleClass('added-class');
});
```
```css
.mydiv {
  display: inline-block;
  width: 100px;
  height: 50px;
  background-color: red;

  -webkit-transform: translateY(0);
  -moz-transform: translateY(0);
  -ms-transform: translateY(0);
  -o-transform: translateY(0);
  transform: translateY(0);

  -webkit-transition: -webkit-transform 0.6s ease-out;
  -moz-transition: transform 0.6s ease-out;
  -o-transition: transform 0.6s ease-out;
  transition: transform 0.6s ease-out;
}

.added-class {
  -webkit-transform: translateY(100%);
  -moz-transform: translateY(100%);
  -ms-transform: translateY(100%);
  -o-transform: translateY(100%);
  transform: translateY(100%);
}
```
## 下载文件
```js
// jquery下载
// 引入lib中的jquery.blob.js
$.ajax({
  url: ajaxUrl.ncovDownloadCertification,
  type: 'GET',
  data: {
    accountId: pageData.userInfo.accountId
  },
  dataType: 'blob',
  beforeSend: function (request) {
    request.setRequestHeader("token", pageData.userInfo.token);
    request.setRequestHeader("channelCode", pageData.channelCode);
    request.setRequestHeader("lightAppCode", pageData.lightAppCode);
    request.setRequestHeader('timestamp', new Date().getTime());
    request.setRequestHeader('request-id', new Date().getTime() + custom.random(true));
  },
  success: function (data, status, xhr) {
    console.log(data);
    var reader = new window.FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = function (e) {
      var a = document.createElement('a');
      a.download = 'data.pdf';
      a.href = e.target.result;
      $("body").append(a);
      a.click();
      $(a).remove();
    };
  }
})
```

```js
// axios blob下载文件
export function exportOrderList(data) {
  return request({
    url: '/inquiry-reception-order-export',
    method: 'get',
    params: data,
    responseType: 'blob'
  })
}

service.interceptors.response.use(
	response => {
		// console.log(response);
		if (response.config.responseType == 'blob' && response.data.type == 'application/octet-stream') {
			return response
		}
		if (response.config.responseType == 'blob' && response.data.type == 'application/json') {
			let reader = new FileReader();
			reader.readAsText(response.data, 'utf-8');
			reader.onload = (e) => {
				// console.log("----", JSON.parse(reader.result));
				// console.log("----", JSON.parse(e.target.result));
				var json = JSON.parse(reader.result) || JSON.parse(e.target.result)
				if (json.code === 13) {
					message.error('登录失效', 3, () => {
						store.dispatch('FedLogOut').then(() => {
							location.reload() // 为了重新实例化vue-router对象 避免bug
						})
					})
				}
			}
			return Promise.reject('error')
		}
		
	}
)

handleExport() {
  let params = {
    
  };
  exportOrderList(params).then(res => {
    this.download(res.data);
  });
},
download(data) {
  if (!data) {
    return;
  }
  let blob = new Blob([data]);
  let fileName = "xxxx.xls";
  if ("download" in document.createElement("a")) {
    // 不是IE浏览器
    let url = window.URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // 下载完成移除元素
    window.URL.revokeObjectURL(url); // 释放掉blob对象
  } else {
    // IE 10+
    window.navigator.msSaveBlob(blob, fileName);
  }
}
```

```js
// iframe 下载文件
var url = 'xxxx';
var iframe = document.createElement("iframe");
iframe.src = url;
iframe.style.display = "none";
document.body.appendChild(iframe);
```

```js
handleFullScreen(){
  let element = document.documentElement;
  // 判断是否已经是全屏
  // 如果是全屏，退出
  if (this.fullscreen) {
      if (document.exitFullscreen) {
          document.exitFullscreen();
      } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
      }
      console.log('已还原！');
  } else {    // 否则，进入全屏
      if (element.requestFullscreen) {
          element.requestFullscreen();
      } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
      } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
      }
      console.log('已全屏！');
  }
  // 改变当前全屏状态
  this.fullscreen = !this.fullscreen;
}
```

## 关闭微信公众号窗口
```js
WeixinJSBridge.call('closeWindow');
```

## 拨打电话
```js
if (condition) {
  NativeDial('xxxx')
}
else {
  window.location.href = "tel:xxxxxxx"
}
```