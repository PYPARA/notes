# Git

## book
https://git-scm.com/book/zh/v2

https://www.progit.cn/

## commit 规范
```
feat: 新功能
fix: 修复bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
revert：回滚上一个修改
perf：性能相关的变动
```

## 删除所有提交历史记录
删除.git文件夹可能会导致git存储库中的问题。如果要删除所有提交历史记录，但将代码保持在当前状态，可以按照以下方式安全地执行此操作：

```bash
# 建立临时分支
git checkout --orphan latest_branch
# 添加所有文件
git add -A
# 提交更改
git commit -am "commit message"
# 删除分支
git branch -D main
# 将当前分支重命名
git branch -m main
# 最后，强制更新存储库
git push -f origin main
```



