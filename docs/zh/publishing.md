# 发布说明

本仓库已经准备好以静态站点方式发布。

## 本地构建

```bash
npm install
npm run docs:build
```

## GitHub Pages

仓库内包含 GitHub Pages 工作流：

`/.github/workflows/deploy-docs.yml`

## Base 路径

VitePress 会读取环境变量 `DOCS_BASE`；如果没有提供，则默认使用 `/`。

这意味着：

- 本地开发不需要额外配置；
- 如果部署到项目页，可以设置 `DOCS_BASE=/<repo-name>/`。
