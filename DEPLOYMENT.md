# 发布 ACTS 网站

这个文件夹可以直接作为 GitHub 仓库根目录，推荐仓库名 `ACTS`。GitHub Pages 提供公开的网址，无需购买域名。

## 首次部署

1. 在自己的 GitHub 账号或指定研究组账号下创建网站仓库。
2. 把当前目录的文件上传到仓库根目录，包括隐藏的 `.github` 文件夹和 `.nojekyll`。`index.html` 应在根目录，不要再多包一层文件夹。
3. 在仓库的 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
4. 打开 **Actions → Deploy ACTS website → Run workflow**，选择 `main` 分支并运行。
5. 部署完成后，在 Pages 设置页或 Actions 部署记录中打开真实网站地址。

后续推送到 `main` 会自动更新网站。工作流只把网页、样式、脚本和 `assets/` 打包进站点，仓库说明及本地文件不会成为网页内容。

## 与 arXiv 关联

网站由 GitHub Pages 托管，论文由 arXiv 托管。拿到实际项目网址后，可以将它写入论文，以及 arXiv 的摘要或 Comments 栏。拿到 arXiv 编号后，把论文网址填入 `site-config.js` 的 `arxivUrl`。

## 公开信息

在 `site-config.js` 填写真正的作者、单位、代码仓库和引用。缺少的字段会自动隐藏。请在发布前确认 `assets/acts-paper.pdf` 是希望公开的稿件版本。

本网站不需要任何 API 密钥。GitHub Pages 工作流仅使用 GitHub 自动提供的短期部署凭证。
