## 我的歌词本

通过 github action 自动同步歌词本的 md 文档到本仓库

![image](<https://github.com/user-attachments/assets/caf6d8bb-710e-4f3f-a4fe-ed25c0b5b7a1>)


## 预览

[点击查看在线预览](https://lyrics.kazoottt.top/)

![歌词本预览图](https://github.com/user-attachments/assets/0f15d481-a937-41c7-b2be-741281b5a389)

## 歌词同步配置

为了实现自动同步歌词本的 MD 文档到本仓库，可以使用以下 GitHub Action 配置：



``` yaml
name: Move Lyrics Book

on:
  push:
    paths:
      - "content/04-资源/歌词本.md"
      - ".github/workflows/move-lyrics-book.yaml"
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout source repository
        uses: actions/checkout@v2
        with:
          token: ${{ secrets.PAT_TOKEN }}
          path: quartz

      - name: Checkout target repository
        uses: actions/checkout@v2
        with:
          repository: KazooTTT/lyrics-book
          path: lyrics-book
          token: ${{ secrets.PAT_TOKEN }}

      - name: Copy built docs to target repository
        run: |
          echo "Starting copy process..."
          echo "Removing existing content..."
          rm -rf lyrics-book/src/data/歌词本.md

          echo "Copying new content..."
          cp -rv quartz/content/04-资源/歌词本.md lyrics-book/src/data/
          echo "Content copy completed"

      - name: Check for changes and commit
        run: |
          cd lyrics-book
          if [[ -n $(git status -s) ]]; then
            # 配置 git 用户信息
            git config --global user.email "github-actions[bot]@users.noreply.github.com"
            git config --global user.name "github-actions[bot]"

            git add .
            git commit -m "update lyrics book"
            git push
          else
            echo "No changes to commit"
          fi
        env:
          GITHUB_TOKEN: ${{ secrets.PAT_TOKEN }}

```

PAT_TOKEN

[申请的教程](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#keeping-your-personal-access-tokens-secure)

需要勾选的权限：repo

![CleanShot2025-03-24at225046@2x](https://github.com/user-attachments/assets/ebde88b1-eae8-4a28-85af-613feec61b34)
