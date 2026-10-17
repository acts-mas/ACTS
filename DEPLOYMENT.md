# 发布 ACTS 网站

目标是由 `acts-mas` 组织管理独立的 `ACTS` 项目，部署成功后网址为 `https://acts-mas.github.io/ACTS/`。GitHub Pages 提供公开的网址，无需购买域名。

## 当前项目迁移

网页文件已上传到 `lihaibineric/ACTS`。现有项目可整体迁移，保留文件和提交记录：

1. 用现有 GitHub 账号创建免费组织 `acts-mas`；填写组织联系邮箱，确认组织归属并接受 GitHub 服务条款。
2. 在 `lihaibineric/ACTS` 的 **Settings → General → Transfer ownership** 将仓库迁移给 `acts-mas`，保留名称 `ACTS`。
3. 在新位置的 **Settings → Pages** 确认 Source 为 **GitHub Actions**。
4. 在 **Settings → Environments → github-pages** 确认 Deployment branches and tags 只允许当前的 `main` 分支。
5. 运行 **Actions → Deploy ACTS website → Run workflow**。发布成功且实际网址能打开后，再将网址写入论文。

组织名是否可注册以 GitHub 创建表单为准；组织和个人账号使用同一个名称空间。

## 首次部署

1. 如果从头部署，在 `acts-mas` 组织下创建 `ACTS` 仓库。
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
