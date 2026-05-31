---
file: design-outline
level: component-base
bg: horizontal
slug: "secondary-tab"
name_zh: "二级 tab"
name_en: "Secondary Tab"
last_synced: "2026-05-30"

auto_detected:
  level: component-base
  bg: horizontal
  slug: "secondary-tab"

relay_source:
  file_id: "1958051135088508929"
  page_id: "1758:1"
  node_id: "2131:27"
  node_name: "容器 6811711"
  node_type: FRAME
  bounds: { w: 576, h: 300 }
  url: "https://relay.jd.com/file/design?id=1958051135088508929&page_id=1758%3A1&node_id=2131%3A27"
---

# 二级 tab · Secondary Tab · Design Outline

> 自动同步 2026-05-30 · Phase 1 review outline · Relay [`2131:27`](https://relay.jd.com/file/design?id=1958051135088508929&page_id=1758%3A1&node_id=2131%3A27)

## 稿件预检

| 维度 | 结论 | 说明 |
|---|---|---|
| 节点规模 | 通过 | 根节点 `2131:27` 尺寸为 576 x 300，内容为一个组件说明面板，节点规模较小 |
| 命名可信度 | 待补充 | 根节点名为「容器 6811711」，真实组件名来自画板文字「二级tab 左右滑动」，slug `secondary-tab` 为自动推断 |
| 标注完整度 | 待补充 | 已识别左右滑动、全部 tab、选中态、非选中态和加号入口；未见点击后展开面板或更多分类管理流程 |
| 截图可得性 | 通过 | 已通过 Zero MCP 获取截图，视觉与 design context 一致 |
| 结构清晰度 | 通过 | 组件由横向 tab 列表、筛选项实例和右侧加号入口构成，状态清晰 |

整体结论：待补充。可进入正式 `--confirm-outline` 阶段，但正式文档需要保留加号入口行为、溢出滚动和展开全部分类的待确认项。

## 本次识别范围

当前节点覆盖「二级 tab」组件族，主要用于内容流或频道页中的二级分类筛选。组件支持：

- 横向左右滑动 tab 列表
- 全部 tab 展示
- 单个筛选项的选中态 / 非选中态
- 右侧加号入口

不属于本组件范围：

- 一级导航 tab
- 页面级频道切换容器
- 加号点击后的完整分类管理面板
- tab 内容列表刷新逻辑
- 多选筛选或复杂筛选器

## 结构大纲

```text
Secondary Tab
├── container
│   ├── scroll area
│   │   ├── tab item selected
│   │   ├── tab item default
│   │   └── overflow items
│   └── add entry
│       └── icon-add
├── all-tabs row
│   ├── selected item
│   └── default items
└── state samples
    ├── selected
    └── unselected
```

## Relay 结构与节点

| 区域 | 节点 ID | 尺寸 | 说明 | 建议 bundle 落点 |
|---|---|---:|---|---|
| 根面板 | `2131:27` | 576 x 300 | 组件说明面板 | `design.md` |
| 左右滑动容器 | `2131:7` | 375 x 44 | 8 px 上下 padding，承载滚动列表和加号入口 | `spec.md` / `behaviors.md` |
| 内容滚动区 | `2131:8` | 331 x 28 | 横向 tab item 列表，左右 8 px padding，gap 8 | `spec.md` |
| 加号入口 | `2131:17` | 28 x 28 | 固定在右侧，内含 24 x 24 icon-add | `behaviors.md` |
| 全部 tab 示例 | `2131:28` | 375 x 28 | 展示完整 tab 列表，无加号入口 | `variants.md` |
| 筛选项实例 | `2131:9` 等 | 52 x 28 | 单个 tab item，选中 / 非选中两态 | `variants.md` |
| 独立选中态 | `2131:23` | 52 x 28 | 状态样例 | `variants.md` |
| 独立非选中态 | `2131:24` | 52 x 28 | 状态样例 | `variants.md` |

## 状态 / 变体矩阵

| 维度 | 取值 | Relay 证据 | 说明 |
|---|---|---|---|
| 展示模式 | 左右滑动 | `2131:7` / `2131:39` | 375 宽容器，滚动区宽 331，右侧加号入口宽 28 |
| 展示模式 | 全部 tab | `2131:28` | 375 宽完整列表，全部 item 平铺 |
| item 状态 | 选中态 | `data-property-1="选中态"` | 浅红底 + 品牌红文字 + Medium |
| item 状态 | 非选中态 | `data-property-1="非选中态"` | 浅灰底 + 标题色文字 + Regular |
| 入口 | 加号 | `2131:17` / `2131:38` | 右侧固定入口，用于展开更多分类或管理 |

## 已识别 Token / 视觉值

### 颜色

| 用途 | Relay 变量 / Token | 值 | 状态 |
|---|---|---|---|
| 页面 / 容器背景 | token-miss / white | `#ffffff` | 已识别，需确认是否使用 background 2 |
| 选中项背景 | `品牌色 color/primary-light` | `#fff0f4` | 已识别 |
| 选中文字 | `品牌色 color/primary` | `#ff0f23` | 已识别 |
| 非选中项背景 | `背景 color/background 1` | `#f5f6fa` | 已识别 |
| 非选中文字 | `文字 color/tittle` | `#171a26` | 已识别 |
| 说明文字 | token-miss | `#000000` | 仅为设计说明标注，不进入组件正文 |

### 字体

| 用途 | 字体 | 字号 / 行高 | 字重 | 状态 |
|---|---|---:|---:|---|
| 选中 tab 文案 | PingFang SC | 14 / 14.02 | 500 | 已识别 |
| 非选中 tab 文案 | PingFang SC | 14 / 14.02 | 400 | 已识别 |
| 说明标注文案 | PingFang-SC | 14 / 14.02 | 400 | 仅为设计说明 |

### 尺寸 / 圆角 / 间距

| 项目 | 数值 | Token / 状态 |
|---|---:|---|
| 外层滑动容器 | 375 x 44 | 适配 375 机型宽度 |
| 滚动区 | 331 x 28 | 留出右侧加号区域 |
| 全部 tab 行 | 375 x 28 | 完整列表展示 |
| tab item 高度 | 28 | 固定 |
| tab item 横向 padding | 12 + 12 | `spacing_lg` |
| tab item 纵向 padding | 6 + 6 | 介于 `spacing_sm` / token-miss |
| tab item 圆角 | 4 | `radius_sm` / V16 `radius_s` |
| item 间距 | 8 | `spacing_md` |
| 滚动区左右 padding | 8 + 8 | `spacing_md` |
| 外层上下 padding | 8 + 8 | `spacing_md` |
| 加号入口 | 28 x 28 | 与 tab item 等高 |
| 加号 icon | 24 x 24 | 居中，外层 padding 2 |

## 切图清单

当前节点未检测到位图 IMAGE fill。右侧加号为 SVG / vector 图标，应优先复用全局 `icon-add`；如全局图标不可直接复用，正式阶段可登记为组件私有 SVG。

## 建议正式 bundle 结构

设计师确认 outline 后，正式阶段建议生成 6 文件 bundle：

```text
JDSPzujianku/horizontal/components/secondary-tab/
├── design.md
├── spec.md
├── variants.md
├── behaviors.md
├── ai-schema.yaml
└── CHANGELOG.md
```

各文件职责建议：

| 文件 | 内容 |
|---|---|
| `design.md` | 组件定义、边界、Relay 来源、bundle 导航 |
| `spec.md` | 尺寸、颜色、文字、圆角、间距、图标规范 |
| `variants.md` | 左右滑动 / 全部 tab / 选中态 / 非选中态 |
| `behaviors.md` | 横向滚动、点击切换、加号入口、溢出降级 |
| `ai-schema.yaml` | Secondary Tab 机器可读 schema |
| `CHANGELOG.md` | 后续同步与人工修改记录 |

## 待设计师确认

| 项目 | 原因 | 建议 |
|---|---|---|
| 组件正式中文名 | Relay 标注为「二级tab」 | 确认是否统一写作「二级 Tab」 |
| 正式 slug | 当前自动推断为 `secondary-tab` | 路径使用中文 `二级tab`，frontmatter 建议保留 kebab-case slug |
| 加号入口行为 | 设计稿只展示 icon-add | 确认是展开全部分类、进入分类管理，还是打开筛选面板 |
| 左右滑动规则 | 设计稿展示截断滚动区 | 确认是否需要渐隐遮罩、吸附、滚动到选中项 |
| 全部 tab 模式 | 设计稿展示完整一行 | 确认是否为加号展开后的状态，或仅为规范示例 |
| item 文案长度 | 示例含 2 字和 4 字文案 | 确认最大字数、过长截断或自适应宽度规则 |
| 6 px 纵向 padding | 当前 spacing 表未明确 6 是否正式语义 | 建议确认是否用 `spacing_sm` |
| 图标归属 | `icon-add` 来自实例 | 确认复用全局 icon-add，还是沉淀为本组件依赖 |

## 自动发现的风险

| 风险 | 等级 | 说明 |
|---|---|---|
| 命名兜底 | 中 | 根节点为「容器 6811711」，组件名依赖画板文本推断 |
| 交互缺口 | 中 | 加号入口和全部 tab 之间的状态关系未在稿件中明确 |
| token-miss | 低 | 白色背景、黑色说明文字、6 px padding 需确认 token 归属 |
| 滚动边界 | 中 | 横向 item 超出 331 px 区域时的滚动、截断、遮挡策略未标注 |
| 图标依赖 | 低 | `icon-add` 可见，但正式工程需确认全局资产路径 |

## 下一步

设计师确认本 outline 后，再执行正式阶段：

```text
/relay-to-design-md https://relay.jd.com/file/design?id=1958051135088508929&page_id=1758%3A1&node_id=2131%3A27 --confirm-outline
```

正式阶段应生成 6 文件 bundle，并维护 traceability。
