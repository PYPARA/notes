# Vue

## vue路由懒加载，更新有几率loading chunk failed 解决方案

### Reference 
https://blog.francium.tech/vue-lazy-routes-loading-chunk-failed-9ee407bbd58

```js
router.onError((error) => {
  const pattern = /Loading chunk .* failed/g;
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    location.reload()
  }
})
```
### nginx config
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

## ios vue 项目H5请求地理位置权限异常
进入首页第一个页面时需要请求定位权限并同意，否则后续页面可能定位权限可能会默认处于禁用状态

## ios https站点http图片资源不显示问题
https的站点访问http的图片可能默认会被阻止, 建议访问 https:// 开头的图片

## 组件样式穿透到子组件
```scss
.xxx {
  ::v-deep {
    .aaa {
      color: '#ffffff'
    }
  }
}

```

## vue 子组件值同步到父组件的绑定上

### 父组件绑定 `v-model`，子组件 `emit` `input`

```html
<component v-model=”aaa“></component>

<script>
  this.$emit('input', value)
</script>
```
### 父组件绑定 `:attr.sync`，子组件 `emit` `prop:attr`
```html
<component :aaa.sync=”bbb“></component>
<script>
this.$emit('prop:aaa', value)
</script>
```









