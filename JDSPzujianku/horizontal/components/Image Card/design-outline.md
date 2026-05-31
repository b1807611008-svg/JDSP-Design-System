---
file: design-outline
level: component-base
bg: horizontal
slug: "image-card"
name_zh: "基础内容卡"
name_en: "Image Card"
last_synced: "2026-05-30"

auto_detected:
  level: component-base
  bg: horizontal
  slug: "image-card"

relay_source:
  file_id: "1958051135088508929"
  page_id: "968:6937"
  node_id: "1042:4844"
  node_name: "基础内容卡"
  node_type: FRAME
  bounds: { w: 498, h: 1612 }
  url: "https://relay.jd.com/file/design?id=1958051135088508929&page_id=968%3A6937&node_id=1042%3A4844"
---

# 基础内容卡 · Image Card · Design Outline

> 自动同步 2026-05-30 · Phase 1 review outline · Relay [`1042:4844`](https://relay.jd.com/file/design?id=1958051135088508929&page_id=968%3A6937&node_id=1042%3A4844)

## 稿件预检

| 维度 | 结论 | 说明 |
|---|---|---|
| 节点规模 | 通过 | 根节点 `1042:4844` 尺寸为 498 x 1612，包含 8 个一级 symbol 变体，规模适合单组件转换 |
| 命名可信度 | 待补充 | 根节点名为「基础内容卡」，语义明确；英文 slug `image-card` 为自动推断，需要设计师确认是否采用 Image Card / Content Card / Basic Content Card |
| 标注完整度 | 待补充 | Relay 中包含尺寸、颜色、圆角、文字、变体和局部交互信息；未见完整交互热区优先级、CDN 资产说明 |
| 截图可得性 | 通过 | 已通过 Zero MCP 获取截图，可见 8 个变体的整体布局 |
| 结构清晰度 | 通过 | 8 个 symbol 分别对应图文、视频、种草、挂商卡、弹幕、沉浸式图文 / 视频等形态 |

整体结论：待补充。可进入正式 `--confirm-outline` 阶段，但需在正式文档中保留 TODO / token-miss / 交互待确认项。

## 本次识别范围

当前节点覆盖「基础内容卡」组件族，主要用于横版视频 / 种草场景的瀑布流内容卡。组件承载封面、标题、作者、右下角指标槽（点赞 / 浏览量 / 种草数），以及可选的视频标识、图文标识、话题条、弹幕标签、商品挂载条和沉浸式标题。

不属于本组件范围：

- 页面级瀑布流容器与双列排布规则
- 视频详情页播放器
- 商品详情页 / 商详半屏
- 评论输入、点赞、分享等页面级操作区
- CDN 资产托管流程

## 结构大纲

```text
Image Card
├── card container
│   ├── media area
│   │   ├── image / video cover
│   │   ├── optional media badge
│   │   ├── optional topic gradient bar
│   │   └── optional barrage tags
│   └── content area
│       ├── optional commerce strip
│       ├── title
│       └── meta row
│           ├── avatar
│           ├── author name
│           └── metric / action
└── immersive mode
    ├── full-card cover
    ├── top media badge
    └── bottom gradient title
```

## Relay 变体矩阵

| 节点 ID | Relay 命名 | 尺寸 | 内容结构 | 建议 bundle 落点 |
|---|---|---:|---|---|
| `1042:4782` | `属性1=图文` | 176 x 289 | 封面 + 标题 + 作者 + 浏览量 | `variants.md` |
| `1042:4846` | `属性1=视频` | 176 x 289 | 图文卡 + 视频标签 | `variants.md` |
| `1042:4860` | `属性1=种草个人页专用` | 176 x 289 | 视频标签 + 话题渐变条 + 种草反馈 | `variants.md` / `behaviors.md` |
| `1042:4895` | `属性1=种草个人页-挂商卡` | 176 x 340 | 话题条 + B2C 商品挂载条 + 双行标题 | `variants.md` / `spec.md` |
| `1058:727` | `属性1=种草个人页-挂商卡 B2C` | 176 x 321 | B2C 商品挂载条 + 单行标题 | `variants.md` |
| `1099:11008` | `属性1=视频卡带弹幕` | 176 x 289 | 视频标签 + 顶部弹幕标签组 | `variants.md` / `behaviors.md` |
| `1042:4970` | `属性1=沉浸式图文` | 176 x 234 | 全卡封面 + 图文角标 | `variants.md` |
| `1648:8686` | `属性1=沉浸式视频` | 176 x 234 | 全卡视频封面 + 底部渐变标题 | `variants.md` / `spec.md` |

## 已识别 Token / 视觉值

### 颜色

| 用途 | Relay 变量 / Token | 值 | 状态 |
|---|---|---|---|
| 卡片背景 | `背景 color/background 2` | `#ffffff` | 已识别 |
| 商品条背景 | `背景 color/background 1` | `#f5f6fa` | 已识别 |
| 主标题 | `文字 color/tittle` | `#171a26` | 已识别，命名疑似 title 拼写需确认 |
| 沉浸态文字 | `文字 color/tittle_immerse` | `#ffffff` | 已识别，命名疑似 title 拼写需确认 |
| 辅助文本 | `文字 color/text_help` | `#828794` | 已识别 |
| 视频标签背景 | `蒙层 color/mask 2` | `#00000066` / rgba 40% | 已识别 |
| 种草指标色 | `种草 color/Recommend_btnbg` | `#15ba64` | 已识别 |
| 品牌主色 | `Color/主色 Primary/color_primary` | `#ff0f23` | 已识别 |
| 视频标签描边 | token-miss | `rgba(255,255,255,0.06)` | 待确认 |
| 渐变蒙层 | token-miss | `rgba(0,0,0,0.70) -> rgba(0,0,0,0)` | 待确认 |

### 字体

| 用途 | 字体 | 字号 / 行高 | 字重 | 状态 |
|---|---|---:|---:|---|
| 内容标题 | PingFang-SC | 13 / 13 | 500 | token-miss，需确认 13px 字阶 |
| 作者名 | PingFang-SC | 11 / 11 | 400 | 已识别 |
| 点赞 / 浏览量 / 种草数值 | PingFang SC | 11 / 12 | 400 | 已识别 |
| 话题标签 | PingFang SC | 12 / 12 | 500 | 已识别 |
| 沉浸式标题 | PingFang-SC | 12 / 12 | 500 | 已识别 |
| 弹幕标签 | PingFang SC | 10 / 11 | 400 | 已识别 |
| 商品现价 | JDZhengHei V2.0 | 11 / 11 | 700 | 待确认 |
| 商品原价 | JDZhengHei V2.0 | 9 / 10 | 300 | token-miss，需确认 9px 字阶 |

### 尺寸 / 圆角 / 间距

| 项目 | 数值 | Token / 状态 |
|---|---:|---|
| 卡片宽度 | 176 px | 固定规格 |
| 默认卡片高度 | 289 px | 内容自适应 |
| 挂商卡高度 | 321-340 px | 内容自适应 |
| 沉浸卡高度 | 234 px | 固定规格 |
| 卡片圆角 | 8 px | `radius_lg` / V16 `radius_l` |
| 商品条圆角 | 2 px | `radius_xs` |
| 视频标签圆角 | 4 px | `radius_sm` |
| 弹幕标签圆角 | 8 px | `radius_lg` / 胶囊形 |
| 内容区水平内边距 | 8 px | `spacing_md` |
| 标题与元信息间距 | 8 px | `spacing_md` |
| 头像与作者名间距 | 4 px | `spacing_xs` |
| 媒体区与内容区间距 | 10 px | token-miss，需确认是否归一到 8 / 12 |
| 弹幕标签横向间距 | 16 px | `spacing_xl` |

## 切图清单

当前 Relay context 中检测到多处 IMAGE fill，正式阶段应生成 `_assets-cdn.md` 辅助清单，并由设计师导出 / 上传 CDN 后回填。

| 用途 | Relay 节点 | 说明 | 状态 |
|---|---|---|---|
| 内容封面图 | `1640:271` / `1641:1` / `1641:6` / `1641:13` / `1641:19` / `1641:2` / `1641:25` / `1648:8687` | 多个变体复用同一示例封面 | 待上传 CDN |
| 作者头像 | `1640:206` 等 | meta row 左侧头像 | 待上传 CDN |
| 商品缩略图 | `1640:186` | B2C 商品挂载条缩略图 | 待上传 CDN |
| 图标 SVG | 全局 Icon + 局部 `svg_*` 资源 | 点赞、浏览量、种草已复用 Icon.md；视频、图文、箭头等待确认 | 部分已确认复用全局 Icon |

## 建议正式 bundle 结构

设计师确认 outline 后，正式阶段应拆成 6 文件 bundle：

```text
JDSPzujianku/horizontal/components/Image Card/
├── design.md
├── spec.md
├── variants.md
├── behaviors.md
├── ai-schema.yaml
└── CHANGELOG.md
```

如果正式阶段检测到 IMAGE fill，则额外生成辅助资产清单：

```text
JDSPzujianku/horizontal/components/Image Card/_assets-cdn.md
```

各文件职责建议：

| 文件 | 内容 |
|---|---|
| `design.md` | 组件定义、边界、Relay 来源、bundle 导航 |
| `spec.md` | 尺寸、颜色、文字、圆角、间距、图标、资产规范 |
| `variants.md` | 8 个 Relay 变体、组合维度、内容结构差异 |
| `behaviors.md` | 点击热区、跳转、右下角指标槽、商品条优先级、降级规则 |
| `ai-schema.yaml` | ImageCard 机器可读 schema |
| `CHANGELOG.md` | 后续同步与人工修改记录 |
| `_assets-cdn.md` | 位图资产 CDN 清单，不计入正文 bundle |

## 待设计师确认

| 项目 | 原因 | 建议 |
|---|---|---|
| 组件英文名 | 当前自动推断为 `Image Card` | 确认是否改为 `Content Card` / `Basic Content Card` |
| 正式 slug | 当前自动推断为 `image-card` | 路径中目录名为 `Image Card`，正式 frontmatter 建议仍使用 kebab-case `image-card` |
| 10 px 间距 | 不在当前 spacing 梯度中 | 确认保留裸值，还是归一到 8 / 12 |
| 13 px 标题字阶 | 当前 typography token 未明确覆盖 | 确认是否允许组件私有字阶 |
| 9 px 原价字阶 | 当前 typography token 未明确覆盖 | 确认是否允许商品信息极小字阶 |
| 视频标签描边 | `rgba(255,255,255,0.06)` 未命中 token | 建议沉淀为 media badge outline token |
| 渐变蒙层 | 多个变体依赖黑色透明渐变 | 建议沉淀为 media readability overlay |
| 点击热区优先级 | 整卡、话题条、商品条、种草按钮可能重叠 | 正式 `behaviors.md` 需要明确优先级 |
| SVG 图标归属 | context 中出现多个局部 SVG | 确认复用全局 Icon 还是作为私有资产 |
| CDN 切图 | 封面、头像、商品图均为 IMAGE fill | 正式阶段生成 `_assets-cdn.md` 并回填 URL |

## 自动发现的风险

| 风险 | 等级 | 说明 |
|---|---|---|
| token-miss | 中 | 10 px 间距、13 px 标题字阶、9 px 商品原价、视频描边、渐变蒙层未命中现有 token |
| 命名不一致 | 低 | Relay 变量中出现 `tittle`，疑似 `title` 拼写历史问题，正式文档需保留原变量名并备注 |
| 热区冲突 | 中 | 商品挂载条、话题条、右下角指标槽与整卡点击可能产生冲突 |
| 资产未托管 | 中 | IMAGE fill 目前为本地 MCP asset URL，正式落地需 CDN |
| 文件阶段错误风险 | 高 | 当前应停留在 outline 阶段，未确认前不得生成正式 6 文件 bundle |

## 下一步

设计师确认本 outline 后，再执行正式阶段：

```text
/relay-to-design-md https://relay.jd.com/file/design?id=1958051135088508929&page_id=968%3A6937&node_id=1042%3A4844 --confirm-outline
```

正式阶段应生成 6 文件 bundle，并维护 traceability。
