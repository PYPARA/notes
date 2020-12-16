# vue小技巧

### vue路由懒加载，更新有几率loading chunk failed

https://blog.francium.tech/vue-lazy-routes-loading-chunk-failed-9ee407bbd58

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

```nginx
if ($request_filename ~* .*.(html|htm)$)
{
expires -1;
add_header Pragma "no-cache";
add_header Cache-Control "no-store, must-revalidate";
}
```
