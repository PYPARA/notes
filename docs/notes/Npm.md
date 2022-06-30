# Npm  

## Npm 镜像
### 获取当前的镜像地址
```bash
npm get registry 
```
### 切换成淘宝镜像
```bash
npm config set registry http://registry.npm.taobao.org/
```
### 换回原源
```bash
npm config set registry https://registry.npmjs.org/
```

## Npm 查看全局安装过的包
```bash
npm list -g --depth 0
```
