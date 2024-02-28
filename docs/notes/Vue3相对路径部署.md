# 相对路径部署

## 1. 更改 `.env` 文件

```env
BASE=./
```

## 2. createWebHistory 去除入参 base
```js
const router = createRouter({
  routes,
  history: createWebHistory(),
});
```

## 3. `index.html` 的 `head` 中添加 `base`
```html
<base href="project-base" />
```

## 打包 & 部署

打包后部署到对于的位置后。

根据位置修改 `index.html` 中的 `base` 标签的 `href` 属性。