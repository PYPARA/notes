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

### Vue nginx config
```bash
# 用于控制html页面不使用缓存
if ($request_filename ~* .*.(html|htm)$)
{
  expires -1;
  add_header Pragma "no-cache";
  add_header Cache-Control "no-store, must-revalidate";
}
```
```bash
# history模式，nginx需要配置
if (!-e $request_filename) {
  rewrite ^/(.*) /xxxxx/index.html last;
  break;
}
```

## vite vue3 history nginx 配置
只上 dist 目录，配置类似如下
```bash
location /project {
  alias  Jenkins/project;
  index  index.html index.htm;

  if (!-e $request_filename) {
    rewrite ^/(.*) /project/index.html last;
    break;
  }

  if ($request_filename ~* .*.(html|htm)$)
  {
    expires -1;
    add_header Pragma "no-cache";
    add_header Cache-Control "no-store, must-revalidate";
  }
}
```