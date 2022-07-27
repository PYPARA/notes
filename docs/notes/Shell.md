# Shell

## 终端使用代理

### shadowsockes
```bash
export ALL_PROXY=socks5://127.0.0.1:1086
```
### clash
```bash
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
```

## brew

https://brew.sh/

### brew update 报错 "fatal: Could not resolve HEAD to a revision"

https://www.jianshu.com/p/b2de788c3c6d

## SSH

### 使用
```bash
# 查看本地是否存在SSH密钥
ls -al ~/.ssh
# 查看SSH公钥
cat ~/.ssh/id_rsa.pub
# 使用 ssh-keygen 创建 ssh 密钥
ssh-keygen -t rsa -C "自己的Email地址"
```


## Command Line 学习
https://github.com/jlevy/the-art-of-command-line