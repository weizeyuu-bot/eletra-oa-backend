# Pull Request: 前后端联调与内网穿透支持

## 概要
- 提交前端默认 API 地址解析和联调配置，便于同事拉取后直接联调。
- 提交后端 CORS 与内网穿透辅助改动，方便在受限企业网络下进行开发联调。

## 相关提交
- 前端（eletra-oa）: b672ec4 — Fix default API URL to real WiFi IP 10.160.8.42
- 前端（eletra-oa）: 0295cf4 — Add flexible API base URL resolution for LAN collaboration
- 前端（eletra-oa）: 373ea5f — Use LAN backend URL as default API base
- 后端（eletra-oa-backend）: d12bf00 — chore: allow all CORS origins for dev tunnel

(以上为本地测试时生成的关键提交，详细提交记录请查看各仓库历史)

## 变更点详细描述
1. 前端
   - 实现 `API_BASE_URL` 的灵活解析：优先 `VITE_API_URL`，其次 `VITE_LAN_API_URL`，最后回退到 WiFi IP（开发时默认）或 `localhost`。位置：`src/services/api.ts`。
   - 更新 `.env.example`，加入 VITE_API_URL/VITE_LAN_API_URL 示例与说明，便于开发者覆盖与理解。

2. 后端
   - 为便捷联调临时开放 CORS：`app.enableCors({ origin: true, credentials: true })`。位置：`src/main.ts`。
   - 说明：该改动仅用于开发联调（配合 cloudflared 隧道），不建议合并到生产分支或长期保留。

3. 内网穿透（本地操作）
   - 在本机安装并启动了 `cloudflared` 快速隧道，生成临时公网地址用于同事访问开发后端（示例：`https://keeping-forward-russell-avenue.trycloudflare.com`）。
   - 注意：quick tunnel 为临时地址，重启会变更；生产环境请使用正式域名和认证隧道。

## 验证步骤（Reviewer 或 QA）
1. 后端
   - 启动依赖容器：`docker compose up -d`（会启动 Postgres/Redis）
   - 运行迁移（如需要）：`npx prisma migrate deploy`
   - 启动后端：`cd eletra-oa-backend && npm run start:dev`
   - 本机验证：`curl http://localhost:3002/api/users` 应返回 200

2. 前端
   - 拉取并安装依赖：
     ```bash
     cd eletra-oa
     npm install
     ```
   - 可选：在 `.env.local` 中设置（覆盖默认）：
     ```env
     VITE_API_URL=https://<your-tunnel>.trycloudflare.com/api
     ```
   - 启动前端：`npm run dev`，访问 `http://localhost:3000` 或 `http://<你的局域网IP>:3000`。

3. 联调（同事）
   - 如果通过 cloudflared：同事 `.env.local` 填写 `VITE_API_URL` 指向你提供的 trycloudflare 地址（示例见上）。
   - 验证接口：访问 `GET /api/users` 返回 200 并列出用户。

## 安全与回退措施
- 临时开放 CORS 与使用 quick tunnel 存在数据暴露风险，建议仅在短期联调使用。合并到主分支前需：
  1. 将 `app.enableCors` 恢复为严格白名单或基于环境变量控制。
  2. 在生产或长期联调场景使用认证的穿透方案或部署到受控环境。

## 建议的后续操作
1. 将 `src/main.ts` 中的宽松 CORS 改为基于 `NODE_ENV !== 'production'` 的临时开启，或仅允许特定来源列表。
2. 在文档中记录 cloudflared 使用说明（如何启动、关闭、如何把最新 URL 通知同事）。
3. 若同意，把此 PR 标记为 `WIP`（工作进行中）并在合并前移除临时安全放宽。

## 测试者/审阅者
- 推荐审阅人：后端负责人、前端负责人、安全负责人

---
_此文档由自动化助手生成，必要时请补充更详细的变更列表与测试截图。_
