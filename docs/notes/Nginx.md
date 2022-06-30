# Nginx

## 异常页面被缓存，导致页面恢复正常后仍无法访问，解决方案
```nginx
<!-- 对应404等页面，设置重定向的时候需要去除可能的缓存 -->
<!-- nginx1.7.5后，要加 always 避免错误状态下添加header失效 -->
error_page  403 404 500 502 503 504  /404.html;
location = /404.html {
    root   /xxx/xxx/xxx/;
    expires -1;
    add_header Pragma "no-cache" always;
    add_header Cache-Control "no-store, must-revalidate" always;
}
```