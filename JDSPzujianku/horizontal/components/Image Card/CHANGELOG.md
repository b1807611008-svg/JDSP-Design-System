---
file: CHANGELOG
bundle_part_of: design.md
slug: "image-card"
---

# 基础内容卡 · CHANGELOG

| 日期 | 操作 | 来源 | 备注 |
|---|---|---|---|
| 2026-05-30 | 创建 outline | skill relay-to-design-md Phase 1 | 生成 `design-outline.md`，供设计师 review |
| 2026-05-30 | 创建正式 bundle | skill relay-to-design-md Phase 2 | 生成 `design.md` / `spec.md` / `variants.md` / `behaviors.md` / `ai-schema.yaml` / `CHANGELOG.md`，并登记 `_assets-cdn.md` |
| 2026-05-30 | 同步指标槽规则 | HTML review feedback | 右下角指标槽补齐点赞 / 浏览量 / 种草三类型；Icon 映射改为复用 `foundations/visual/Icon.md` 与 `src/assets/icons/*.svg`；种草指标统一为 icon + 数字 |
| 2026-05-30 | 修正浏览量 icon 与尺寸 | Browser review feedback | 浏览量 icon 使用 `icon-browse`；点赞 / 浏览量 / 种草三类指标 icon 显示尺寸统一为 12 x 12 pt |
| 2026-05-30 | 补齐点赞和种草双态 | Browser review feedback | 点赞支持未点赞 / 已点赞切换，种草支持未种草 / 已种草切换；状态通过常规线性 icon 的颜色变化表达 |
| 2026-05-30 | 替换为常规线性图标 | Browser review feedback | 点赞改用 `icon-heart.svg`，种草改用 `icon-like.svg`；明确 Image Card 不使用右侧互动区专属 `interactive/` icon |
| 2026-05-30 | 修正指标激活态染色 | Browser review feedback | 点赞 / 种草激活态仅 icon 变色，数字始终保持辅助灰；未选中时 icon 与数字均为灰色 |
| 2026-05-30 | 修正演示初始态 | Browser review feedback | spec-page 演示默认从未点赞 / 未种草开始，icon 与数字均为灰态 |
| 2026-05-30 | 删除结构示例话题条 | Browser review feedback | 删除结构章节第三张种草卡封面上的「种草清单」话题条，避免把话题条误认为必选结构 |
| 2026-05-30 | 删除结构示例视频标签 | Browser review feedback | 删除结构章节第二张视频卡封面上的「视频」标签，避免把视频标签误认为基础结构必选项 |
| 2026-05-30 | 补充子结构状态 | Relay source nodes | 根据 `1042:4786` 补充底部用户信息区 7 状态，根据 `1042:3680` 补充文本 4 状态，根据 `1058:742` 补充图片下方商卡 4 类型；补充左上角标签 8px 规则 |
| 2026-05-30 | 修正底部内容区高度规则 | Browser review feedback | 内容区高度改为随正文行数 / 商卡 / 底部信息区自适应，文案到底部距离固定 8px |
| 2026-05-30 | 修正双行文字间距 | Browser review feedback | 双行文案和双行营销标的两行文字间距统一为 6pt |
| 2026-05-30 | 改写左上角卡片标签 | Relay source node | 根据 `1042:3616` 将角标从简化播放 / 图文 / 直播改为完整图文、视频、直播中、刚刚看过、观看量、飙升值、回放、live 八类图案 |
| 2026-05-31 | 修正示例卡片拉伸 | Browser review feedback | `.card-grid` 改为顶部对齐，避免同一行卡片被 grid stretch 拉成等高；短内容卡底部恢复 8px 内边距 |
| 2026-05-31 | 统一 HTML 规范页外壳 | Browser review feedback | `spec-page.html` 的页面外壳、导航、标题、section、table、stage、blockquote 迁移为 `video-top-tab/spec-page.html` 模板风格，保持横向组件 HTML 视觉一致 |
| 2026-05-31 | 导出左上角卡片标签 icon | Browser review feedback + Relay `1042:3616` | 多图 / 图文改为全局 `icon-copy-fill`；视频、直播中、飙升、live 导出为组件私有 SVG，并同步 HTML 与 md / yaml 规则 |
| 2026-05-31 | 修正观看提示胶囊左内边距 | Browser annotation | `刚刚看过` / `110万观看` 这类直播图标 + 文案胶囊的外层左 padding 从 4px 改为 0px，避免图标左侧重复留白 |
| 2026-05-31 | 修正动图角标纯图标态 | Browser review feedback | 动图 / live 角标显示为 16 x 16 pt 纯 SVG 图标，移除外层半透明底色 |

## 待办

- Relay asset 导出受 `use_design_script` 自动权限审核超时影响，需后续补跑资产导出。
- 确认 `Image Card` 英文名与 `image-card` slug 是否为最终命名。
- 确认 10 px 间距、13 px 标题字阶、9 px 商品原价字阶是否沉淀为正式 token。
