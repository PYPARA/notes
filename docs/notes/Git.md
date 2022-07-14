# Git

## book
https://git-scm.com/book/zh/v2

https://www.progit.cn/

https://github.com/k88hudson/git-flight-rules/blob/master/README_zh-CN.md

## commit 规范
```
feat: feature - 所有实现新功能、新行为的 commit 都属这个类型
fix: 修补bug
build: 和构建流程、持续集成等有关的改动
docs: documentation - 对文档的改进，包括对外文档和代码注释
style: 对代码风格的修正（仅限缩进、空行一类的简单改动，对结构有影响的用 refactor）
refactor: 重构（即不是新增功能，也不是修改bug的代码变动）
test: 与测试有关的改动，包括单元测试、集成测试等
chore: 构建过程或辅助工具的变动，比如改变构建流程、或者增加依赖库、工具等
revert: 回滚上一个修改
perf: 优化相关，比如提升性能、体验
ci: 开发类，持续集成和部署脚本、设置或工具相关
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



