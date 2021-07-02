# vue小技巧

## vue路由懒加载，更新有几率loading chunk failed
```
https://blog.francium.tech/vue-lazy-routes-loading-chunk-failed-9ee407bbd58
```

```js
router.onError((error) => {
  const pattern = /Loading chunk .* failed/g;
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    if (nativeApp) {
      closePage()
    } else {
      location.reload()
    }
  }
})
```
## nginx相关
```nginx
<!-- 用于控制html页面不使用缓存 -->
if ($request_filename ~* .*.(html|htm)$)
{
expires -1;
add_header Pragma "no-cache";
add_header Cache-Control "no-store, must-revalidate";
}
```
```nginx
# history模式，nginx需要配置
if (!-e $request_filename) {
rewrite ^/(.*) /xxxxx/index.html last;
break;
}

```
```nginx
<!-- 对应404等页面，设置重定向的时候需要去除可能的缓存 -->
<!-- nginx1.7.5后，要加 always 避免错误状态下添加header失效 -->
error_page  403 404 500 502 503 504  /404.html;
location = /404.html {
    root   /Users/panyong/Documents/Wonders;
    expires -1;
    add_header Pragma "no-cache" always;
    add_header Cache-Control "no-store, must-revalidate" always;
}
```

## ios vue项目请求地理位置权限异常
进入首页需要请求定位权限，否则后续页面默认权限是禁用状态

## ios http图片资源不显示问题
https的站点访问http的图片默认会被阻止

## 组件样式穿透到子组件
```scss
::v-deep {
  color: '#ffffff'
}
```

## vue 子组件值同步到父组件的绑定上
```html
<!-- 1.父组件绑定 v-model，子组件 emit input -->
<component v-model=”aaa“></component>

<script>
this.$emit('input', value)
</script>

<!-- 2.父组件绑定 :aaa.sync，子组件 emit prop:aaa -->
<component :aaa.sync=”bbb“></component>
<script>
this.$emit('prop:aaa', value)
</script>
```

## npm  
### 获取当前的镜像地址
npm get registry 
### 切换成淘宝镜像
npm config set registry http://registry.npm.taobao.org/
### 换回原源
npm config set registry https://registry.npmjs.org/

### 安装
npm install xxx 安装但不写入package.json；
npm install xxx –save 安装并写入package.json的”dependencies”中；
npm install xxx –save-dev 安装并写入package.json的”devDependencies”中。
npm uninstall xxx 删除xxx模块； 
npm uninstall -g xxx 删除全局模块xxx；
npm update xxx 升级模块xxx
npm update xxx -g 升级全局模块xxx
### 查看全局安装过的包
npm list -g --depth 0


终端使用ss代理
export ALL_PROXY=socks5://127.0.0.1:1086