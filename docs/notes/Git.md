
## 删除所有提交历史记录
```
删除.git文件夹可能会导致git存储库中的问题。如果要删除所有提交历史记录，但将代码保持在当前状态，可以按照以下方式安全地执行此操作：

尝试  运行  git checkout --orphan latest_branch
添加所有文件git add -A
提交更改git commit -am "commit message"
删除分支git branch -D main
将当前分支重命名git branch -m main
最后，强制更新存储库。git push -f origin main
```

## git hotfix常见步骤
```
//找到对应版本的SHA值 例如2b1c225dcbbc4e1da11164af945344d88bc8f559
git checkout -b 新分支名 2b1c225dcbbc4e1da11164af945344d88bc8f559
git branch //查看分支是否创建成功
git push origin 本地新分支名:远程新分支名
```