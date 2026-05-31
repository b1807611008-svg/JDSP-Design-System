---
file: design
bundle: page-doc
level: component-base
bg: horizontal
slug: "secondary-tab"
name_zh: "二级 Tab"
name_en: "Secondary Tab"

owner: "TODO"
contributors: []
status: draft
version: "0.1"
last_synced: "2026-05-30"

auto_detected:
  level: component-base
  bg: horizontal
  slug: "secondary-tab"
  page_doc: true

relay_source:
  file_id: "1958051135088508929"
  page_id: "1758:1"
  node_id: "2131:27"
  node_name: "容器 6811711"
  node_type: FRAME
  bounds: { w: 576, h: 300 }
  url: "https://relay.jd.com/file/design?id=1958051135088508929&page_id=1758%3A1&node_id=2131%3A27"

bundle_files:
  - design.md
  - spec.md
  - variants.md
  - behaviors.md
  - ai-schema.yaml
  - CHANGELOG.md

references:
  uses_components:
    - "icon-add"
  uses_tokens:
    colors:
      - "color/primary-light"
      - "color/primary"
      - "color/background 1"
      - "color/tittle"
    typography:
      - "PingFang SC 14/14.02 500"
      - "PingFang SC 14/14.02 400"
    radius:
      - "radius_s"
    spacing:
      - "spacing_xs"
      - "spacing_md"
      - "spacing_lg"

used_by: []
---

# 二级 Tab · Secondary Tab

> 自动同步 2026-05-30 · skill relay-to-design-md v0.5.3 · Relay [`2131:27`](https://relay.jd.com/file/design?id=1958051135088508929&page_id=1758%3A1&node_id=2131%3A27)

## 一句话定义

二级 Tab 是用于内容流或频道页的横向分类筛选组件，支持左右滑动分类列表、全部分类展示、选中 / 非选中状态，以及右侧加号入口。

## 组件边界

二级 Tab 只承载同一页面或内容流内的二级分类切换，不承担一级频道导航、复杂筛选、多选筛选或分类管理面板本身。右侧加号入口只作为展开更多分类或进入管理能力的触发点，后续面板由业务容器承接。

| 模块 | 是否属于二级 Tab | 说明 |
|---|---:|---|
| 横向滚动分类列表 | 是 | 主体内容，支持溢出横滑 |
| 单个筛选项 | 是 | 包含选中态 / 非选中态 |
| 全部 tab 展示态 | 是 | 可作为展开后的全量分类呈现 |
| 右侧加号入口 | 是 | 固定入口，触发更多分类能力 |
| 分类管理面板 | 否 | 不在当前 Relay 节点内 |
| 一级导航 | 否 | 不承担页面主导航 |
| 内容列表刷新 | 否 | 由业务页面响应 tab change |

## Bundle 导航

| 文件 | 内容 | 说明 |
|---|---|---|
| [design-outline.md](./design-outline.md) | Review outline | Phase 1 确认稿 |
| [spec.md](./spec.md) | 视觉规范 | 尺寸、颜色、文字、圆角、间距、图标 |
| [variants.md](./variants.md) | 变体规范 | 左右滑动、全部 tab、选中态、非选中态 |
| [behaviors.md](./behaviors.md) | 行为规范 | 横向滚动、点击切换、加号入口、溢出降级 |
| [ai-schema.yaml](./ai-schema.yaml) | 机器协议 | 面向实现和 AI 生成的结构化 schema |
| [CHANGELOG.md](./CHANGELOG.md) | 变更记录 | 后续同步和人工调整记录 |

## Relay 原稿章节大纲

| # | 标题 | 节点 ID | 内容要点 | bundle 落点 | 对应 spec-page 章节 |
|---|---|---|---|---|---|
| 1 | 组件定义 | `2131:27` | 二级分类筛选组件、左右滑动和全部 tab 示例 | design.md | `sec-1` |
| 2 | 视觉规范 | `2131:7` / `2131:28` | 375 宽容器、28 高 item、颜色、文字、圆角、间距 | spec.md | `sec-4` |
| 3 | 变体矩阵 | `2131:9` 等 | 选中态、非选中态、滑动展示、全部展示、加号入口 | variants.md | `sec-3` |
| 4 | 行为规范 | `2131:17` | 横向滚动、点击切换、加号展开更多分类 | behaviors.md | `sec-2` |

## Relay 结构清单

| 区域 | 节点 ID | 尺寸 | 说明 |
|---|---|---:|---|
| 根面板 | `2131:27` | 576 x 300 | 组件说明面板 |
| 左右滑动容器 | `2131:7` | 375 x 44 | 上下 8 px padding，包含列表和加号入口 |
| 滚动列表 | `2131:8` | 331 x 28 | 横向 item，左右 8 px padding，gap 8 |
| 加号入口 | `2131:17` | 28 x 28 | 右侧入口，内含 24 x 24 icon-add |
| 全部 tab 示例 | `2131:28` | 375 x 28 | 完整分类列表 |
| 状态样例 | `2131:23` / `2131:24` | 52 x 28 | 选中态 / 非选中态 |

## 本次同步说明

- 已通过 Zero MCP 读取 Relay 节点 `2131:27` 的 metadata、design context、variables 和截图。
- 本次按用户确认进入 Phase 2，输出正式 6 文件 bundle。
- 当前节点未检测到位图 IMAGE fill，因此未生成 `_assets-cdn.md`。
