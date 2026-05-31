---
file: design
bundle: page-doc
level: component-base
bg: horizontal
slug: "info-layer"
name_zh: "信息区"
name_en: "Info Layer"

owner: "TODO"
contributors: []
status: draft
version: "0.4"
last_synced: "2026-05-28"

auto_detected:
  level: component-base
  bg: horizontal
  slug: "info-layer"
  page_doc: true

relay_source:
  file_id: "1958051135088508929"
  page_id: "291:5329"
  node_id: "2075:2390"
  node_name: "文案"
  node_type: FRAME
  bounds: { w: 320, h: 938 }
  url: "https://relay.jd.com/file/design?id=1958051135088508929&page_id=291%3A5329&node_id=2075%3A2390"

bundle_files:
  - design.md
  - spec.md
  - variants.md
  - behaviors.md

references:
  uses_components: []

used_by:
  - "../../../pages/video-feed/index.html"
---

# 信息区 · Info Layer

> 自动同步 2026-05-28 · skill relay-to-design-md v0.5.3 · Relay [`2075:2390`](https://relay.jd.com/file/design?id=1958051135088508929&page_id=291%3A5329&node_id=2075%3A2390)

## 一句话定义

信息区是沉浸式视频页面左下角的轻量文案承载层，用于展示发布者昵称、视频文案、原创标签和达人标签，并通过「展开 / 收起」承接被省略的长文案。

## 组件边界

信息区只承载内容说明和轻交互入口，不承载点赞、评论、分享、音量等强操作。右侧互动区、底部评论栏、播放进度线都应与信息区保持独立层级，避免点击区域重叠。

| 模块 | 是否属于信息区 | 说明 |
|---|---:|---|
| 昵称 | 是 | 发布者或账号名称，固定在信息区首行 |
| 视频文案 | 是 | 默认单行截断，支持展开 / 收起 |
| 展开 / 收起入口 | 是 | 文案超过默认展示行数时出现 |
| 原创标签 | 可选 | 与文案同排，位于文案前置位置 |
| 达人标签 | 可选 | 与昵称同排，位于昵称右侧；当前 Relay 样例为「数码达人」 |
| 互动按钮 | 否 | 归属 `InteractiveArea2` |
| 底部评论输入 / 通条 | 否 | 归属 `BottomTab` |

## Bundle 导航

| 文件 | 内容 | 说明 |
|---|---|---|
| [spec.md](./spec.md) | 视觉规范 | 尺寸、位置、颜色、字体、阴影、层级 |
| [variants.md](./variants.md) | 变体规范 | 省略、行数、原创标签、达人标签组合 |
| [behaviors.md](./behaviors.md) | 行为规范 | 展开 / 收起、切换视频、点击区域、禁用规则 |
| design.md | 索引 | Relay 来源、定义、边界、章节映射 |

## Relay 原稿章节大纲

| # | 标题 | 节点 ID | 内容要点 | bundle 落点 | 对应 spec-page 章节 |
|---|---|---|---|---|---|
| 1 | 组件定义 | `2075:2390` | 信息区定位、内容范围、与互动区 / 底部栏边界 | design.md | `sec-1` |
| 2 | 视觉规范 | `2075:2390` | 274 DP 组件宽度、46 / 64 DP 两种高度、昵称与文案文字层级、标签样式、阴影 | spec.md | `sec-4` |
| 3 | 组合变体 | `2075:2390` | 9 个 Relay symbol：省略 / 单双行 / 原创标签 / 达人标签组合 | variants.md | `sec-3` |
| 4 | 行为规范 | `2075:2390` | 文案展开 / 收起、切换视频复位、内容溢出降级 | behaviors.md | `sec-2` |

## Relay 变体清单

| 节点 ID | 变体名 | 尺寸 |
|---|---|---|
| `2075:2410` | 省略=有，行数=单行，标签=无，达人标签=无 | 274×46 |
| `2075:2416` | 省略=有，行数=单行，标签=无，达人标签=有 | 274×46 |
| `2075:2423` | 省略=无，行数=单行，标签=无，达人标签=无 | 274×46 |
| `2075:2429` | 省略=无，行数=单行，标签=无，达人标签=有 | 274×46 |
| `2075:2436` | 省略=无，行数=双行，标签=无，达人标签=无 | 274×64 |
| `2075:2444` | 省略=无，行数=双行，标签=无，达人标签=有 | 274×64 |
| `2075:2453` | 省略=无，行数=单行，标签=有，达人标签=无 | 274×46 |
| `2075:2471` | 省略=有，行数=单行，标签=有，达人标签=无 | 274×46 |
| `2075:2478` | 省略=无，行数=双行，标签=有，达人标签=无 | 274×64 |

## 当前实现快照

当前页面实现位于 `JDSPzujianku/pages/video-feed/index.html`，已覆盖基础「省略=有，行数=单行，标签=无，达人标签=无」形态：

- 容器：`left: 11px; top: 672px; width: 274px; height: 46px`
- 昵称：16px / 20px，Medium 500，白色，文字阴影
- 文案：14px / 18px，Regular 400，默认单行省略
- 展开入口：固定 28×18，Relay 展示文案为「展开」；工程展开后切换为「收起」

## 关联

- 页面示例：`JDSPzujianku/pages/video-feed/index.html`
- 视觉规范：见 [spec.md](./spec.md)
- 变体矩阵：见 [variants.md](./variants.md)
- 交互规则：见 [behaviors.md](./behaviors.md)

---

## 本次同步说明

- 已通过 Zero MCP 读取 Relay 节点 `2075:2390` 的 metadata、design context 和截图，并据此校准四文件 bundle。
- Relay 原稿提供「展开」入口和多行展示样例，未提供「收起」视觉节点；`behaviors.md` 中的收起态为工程交互补齐规则。