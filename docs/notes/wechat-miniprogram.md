# 微信小程序

## 使用 `vant-weapp` 时，需要绑定 `before-close` 时的特殊写法
在使用 `vant-dialog` 时，发现 Events 中并没有 `bind:beforeClose`，而 `Props` 中有 `before-close`, 所以写法应该如下

```vue
<template>
  <van-dialog use-slot title="Title" show="{{ show }}" show-cancel-button before-close="{{beforeClose}}">
    <view></view>
  </van-dialog>
</template>

<script>
Page({
  data: {
    beforeClose(action) {
      // (action) => boolean | Promise<boolean>
      console.log(action);
      // todo
    },
  },
  onLoad(options) {
    this.setData({
      beforeClose: this.data.beforeClose.bind(this),
    })
  },
})
</script>

```