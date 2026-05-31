---
file: design
bundle: page-doc
level: component-base
bg: horizontal
slug: "image-card"
name_zh: "基础内容卡"
name_en: "Image Card"

owner: "TODO"
contributors: []
status: draft
version: "0.1"
last_synced: "2026-05-30"

auto_detected:
  level: component-base
  bg: horizontal
  slug: "image-card"
  page_doc: true

relay_source:
  file_id: "1958051135088508929"
  page_id: "968:6937"
  node_id: "1042:4844"
  node_name: "基础内容卡"
  node_type: FRAME
  bounds: { w: 498, h: 1612 }
  url: "https://relay.jd.com/file/design?id=1958051135088508929&page_id=968%3A6937&node_id=1042%3A4844"

bundle_files:
  - design.md
  - spec.md
  - variants.md
  - behaviors.md
  - ai-schema.yaml
  - CHANGELOG.md

references:
  uses_components: []
  uses_tokens:
    colors:
      - "color/background 2"
      - "color/background 1"
      - "color/title"
      - "color/title_immerse"
      - "color/text_help"
      - "color/mask 2"
      - "color/Recommend_btnbg"
      - "color/primary"
    typography:
      - "font_size_13_500"
      - "font_size_12_500"
      - "font_size_11_400"
      - "font_size_10_400"
      - "font_size_9_300"
      - "font_size_11_700"
    radius:
      - "radius_xs"
      - "radius_sm"
      - "radius_lg"
      - "radius_max"
    spacing:
      - "spacing_xxs"
      - "spacing_xs"
      - "spacing_md"
      - "spacing_lg"
      - "spacing_xl"

used_by: []
---

# 基础内容卡 · Image Card

> 自动同步 2026-05-30 · skill relay-to-design-md v0.5.3 · Relay [`1042:4844`](https://relay.jd.com/file/design?id=1958051135088508929&page_id=968%3A6937&node_id=1042%3A4844)

## 一句话定义

基础内容卡是横版视频 / 种草场景中的瀑布流内容卡片，用于承载图片或视频封面、内容标题、作者信息、右下角轻量指标（点赞 / 浏览量 / 种草数），以及可选的话题、弹幕、商品挂载和沉浸式标题信息。

## 组件边界

基础内容卡只负责内容预览和轻量反馈，不承载页面级瀑布流布局、播放器、评论输入、完整商品购买链路或右侧互动工具。商品信息在本组件内仅作为内容卡的轻量挂载信息出现。

| 模块 | 是否属于 Image Card | 说明 |
|---|---:|---|
| 封面图 / 视频封面 | 是 | 媒体主体，普通态在顶部，沉浸态覆盖整卡 |
| 视频 / 图文标识 | 是 | 表达媒体类型，不作为主操作 |
| 标题 | 是 | 内容主信息，支持单行 / 双行 |
| 作者头像和昵称 | 是 | 内容来源信息 |
| 右下角指标槽 | 是 | 单一槽位，支持点赞、浏览量、种草数三种类型，图标来自全局 Icon 规范 |
| 话题渐变条 | 可选 | 种草个人页形态使用 |
| 弹幕标签 | 可选 | 视频卡带弹幕形态使用 |
| 商品挂载条 | 可选 | B2C / 商品内容关联信息 |
| 页面瀑布流容器 | 否 | 由页面布局组件承接 |
| 商详半屏 / 购买流程 | 否 | 由业务链路承接 |

## Bundle 导航

| 文件 | 内容 | 说明 |
|---|---|---|
| [spec.md](./spec.md) | 视觉规范 | 尺寸、颜色、文字、圆角、间距、图标映射、资产 |
| [variants.md](./variants.md) | 变体规范 | 8 个 Relay 变体和组合维度 |
| [behaviors.md](./behaviors.md) | 行为规范 | 点击热区、跳转、种草、商品条优先级、降级 |
| [ai-schema.yaml](./ai-schema.yaml) | 机器协议 | 面向实现和 AI 生成的结构化 schema |
| [CHANGELOG.md](./CHANGELOG.md) | 变更记录 | 本 bundle 后续同步和人工调整记录 |
| [_assets-cdn.md](./_assets-cdn.md) | 辅助资产清单 | IMAGE fill 和局部 SVG 资产登记，不计入正文 bundle |

## Relay 原稿章节大纲

| # | 标题 | 节点 ID | 内容要点 | bundle 落点 | 对应 spec-page 章节 |
|---|---|---|---|---|---|
| 1 | 组件定义 | `1042:4844` | 基础内容卡边界、使用场景、与页面容器 / 商品链路边界 | design.md | `sec-1` |
| 2 | 视觉规范 | `1042:4844` | 176 px 宽度、289 / 321 / 340 / 234 高度档、颜色、字体、圆角、间距 | spec.md | `sec-4` |
| 3 | 变体矩阵 | `1042:4782` 等 | 图文、视频、种草个人页、挂商卡、弹幕、沉浸式图文 / 视频 | variants.md | `sec-3` |
| 4 | 行为规范 | `1042:4844` | 整卡点击、话题条、右下角指标槽、商品条优先级、资产降级 | behaviors.md | `sec-2` |
| 5 | 资产清单 | IMAGE fill / SVG | 封面、头像、商品图、视频 / 点赞 / 浏览量 / 种草 / 图文 / 箭头图标 | _assets-cdn.md | `sec-6` |

## Relay 变体清单

| 节点 ID | Relay 命名 | 尺寸 | 说明 |
|---|---|---:|---|
| `1042:4782` | `属性1=图文` | 176 x 289 | 默认图文卡，封面 + 标题 + 作者 + 浏览量 |
| `1042:4846` | `属性1=视频` | 176 x 289 | 在图文卡基础上增加视频标签 |
| `1042:4860` | `属性1=种草个人页专用` | 176 x 289 | 增加话题渐变条，反馈项为种草数 |
| `1042:4895` | `属性1=种草个人页-挂商卡` | 176 x 340 | 增加 B2C 商品挂载条，标题可展示两行 |
| `1058:727` | `属性1=种草个人页-挂商卡 B2C` | 176 x 321 | 商品挂载条 + 单行标题 |
| `1099:11008` | `属性1=视频卡带弹幕` | 176 x 289 | 视频卡顶部叠加弹幕标签组 |
| `1042:4970` | `属性1=沉浸式图文` | 176 x 234 | 全卡封面图，仅保留图文角标 |
| `1648:8686` | `属性1=沉浸式视频` | 176 x 234 | 全卡视频封面，底部渐变标题 + 视频角标 |

## 子结构状态来源

| 子结构 | Relay 节点 | 覆盖内容 |
|---|---|---|
| 底部用户信息区 | `1042:4786` | 点赞前、浏览量、点赞后、种草、多人参与、默认、变体7 |
| 文本 | `1042:3680` | 一行文案、双行文案、单行营销标、双行营销标 |
| 图片下方商卡 | `1058:742` | B2C、O2O、景点、评分四类商卡 |
| 左上角卡片标签 | `1042:3616` | 多图 / 图文使用全局 `icon-copy-fill`；视频、直播中、刚刚看过、110万观看、飙升值2万+、live 使用卡片专属 SVG 资产；回放为文字胶囊。标签距离封面左 / 上 8 px |

## 右下角指标槽 Icon 映射

右下角指标槽只展示一个指标类型，不允许在同一张卡中混排多个 icon。图标来源以 [JDSPzujianku/foundations/visual/Icon.md](../../../foundations/visual/Icon.md) 为准，HTML 展示页和工程实现应复用 `src/assets/icons/` 下的 SVG 资产。

| 指标类型 | Icon.md 语义 | SVG 资产 | 数值规则 |
|---|---|---|---|
| 点赞 | `icon-heart` | `src/assets/icons/icon-heart.svg` | 数字，如 `313`；支持未点赞 / 已点赞切换，激活态仅 icon 变红，数字保持辅助灰 |
| 浏览量 | `icon-browse` | `src/assets/icons/icon-browse.svg` | 数字或缩写，如 `1.2w` |
| 种草 | `icon-like` | `src/assets/icons/icon-like.svg` | 数字，如 `256`；支持未种草 / 已种草切换，激活态仅 icon 变绿，数字保持辅助灰 |

三个指标 icon 均来自常规 `Icon.md` 线性图标库，不使用右侧互动区专属 `interactive/` icon；显示尺寸统一为 12 x 12 pt。

## 左上角卡片标签 Icon 映射

| 标签类型 | Relay 节点 | SVG 资产 | 说明 |
|---|---|---|---|
| 多图 / 图文 | `1042:3634` | `src/assets/icons/icon-copy-fill.svg` | 使用全局 Icon.md 填充图标，不在组件私有目录重复维护 |
| 视频 | `1042:2742` | `assets/tag-video.svg` | 半透明胶囊内播放图标 |
| 直播中 / 刚刚看过 / 110万观看 | `1042:2749` / `1042:2754` / `1042:3593` | `assets/tag-live-on.svg` | 直播条形图标，可单独出现或与文字胶囊组合；组合胶囊左 padding 为 0 |
| 飙升值 | `1042:3628` | `assets/tag-rise.svg` | 红色强调胶囊内的趋势条图标 |
| 动图 / live | `1572:11` | `assets/tag-live.svg` | 16 x 16 px 纯图标，无底色 |

## 关联

- Phase 1 review outline: [design-outline.md](./design-outline.md)
- 视觉规范: [spec.md](./spec.md)
- 变体矩阵: [variants.md](./variants.md)
- 行为规范: [behaviors.md](./behaviors.md)
- 机器协议: [ai-schema.yaml](./ai-schema.yaml)
- 资产清单: [_assets-cdn.md](./_assets-cdn.md)

## 本次同步说明

- 已通过 Zero MCP 读取 Relay 节点 `1042:4844` 的 metadata、design context、variables 和截图。
- 已按 outline 确认阶段进入正式 bundle，生成 6 个正文文件。
- Relay IMAGE fill / SVG 资产已登记到 `_assets-cdn.md`；本地导出受 Zero `use_design_script` 自动权限审核超时影响，当前资产状态标记为 `待导出`。
