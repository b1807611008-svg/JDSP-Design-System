---
component_name: VideoTopTab
slug: video-top-tab
layer: Component Composition Layer
version: "1.1.1"
status: draft
last_updated: "2026-05-26"
relay_source:
  file_id: "1958051135088508929"
  page_id: "0:3770"
  page_name: "顶部tab"
  scope_node: "518:2141"
  reference_nodes:
    latest_top_tab: "518:2141"
    interaction_update: "2075:6916"
    quick_return_layout: "2125:33"
    immersive_top_tab: "2084:44"
    immersive_application: "2084:10"
    previous_top_tab: "2084:1"
    base_spec: "771:3506 / 771:4072 / 771:4537"
    layout_spec: "771:4768 / 771:6409 / 771:6450 / 771:6493"
    template_zone: "771:11029"
    activity_spec: "771:12105 / 771:12645 / 771:12323"
    noise_reduction: "771:37613 / 771:37948 / 771:38263 / 771:38666"
dependencies:
  tokens:
    - tokens/color.md
    - tokens/typography.md
    - tokens/spacing.md
    - tokens/radius.md
    - tokens/shadow.md
  visual:
    - visual/Icon.md
  private_assets:
    - assets/icons/icon-back-video.svg
    - assets/icons/icon-search-video.svg
    - assets/icons/icon-menu-video.svg
    - assets/icons/icon-forward-video.svg
---

# VideoTopTab — 顶部视频 Tab

## 1. Definition

**VideoTopTab** 是视频场景顶部导航与频道切换的复合组件，负责承载频道 Tab、选中游标、返回/搜索/菜单/二级跳转等导航槽位。对外展示与 `spec-page.html` Demo 一致，按 **流类型**（沉浸流 / 非沉浸流）× **样式**（常规 / 暗黑）两个正交维度组合，并在吸顶、活动运营等场景下保持同一组合协议。

本组件属于 **Component Composition Layer**。组件只组合既有 Tokens、Visual Atoms 与组件私有资产，不定义新的基础视觉属性。

## 2. Composition

```text
VideoTopTab
├── Container
│   ├── Safe Area Layer
│   ├── Background Layer
│   └── Sticky / Immersive State Layer
├── Navigation Slot
│   ├── leading: back (non-immersive) / menu
│   └── trailing: search / forward / menu
├── TabList
│   ├── TabItem
│   ├── Badge
│   └── Activity Decoration
├── Indicator
│   ├── underline
│   └── capsule / activity asset anchor
└── Dropdown / Folded Channel Layer
```

## 3. Design Principles

| Principle | Rule |
|:---|:---|
| 内容优先 | Tab 不应压过视频内容，沉浸流默认使用可读但低噪声的前景与阴影。 |
| 状态分层 | selected、activity、sticky、immersive、dropdown、noise-reduction 分别由独立状态驱动，不互相覆盖语义。 |
| 槽位稳定 | leading / trailing slot 的热区由容器协议控制，图标资产只表达图形，不承担布局。 |
| 首屏容量 | 正常态最多同时展示 5 个 Tab；超过 5 个频道进入 scrollable / folded / dropdown，不压缩文案。完整频道序列（共 9 个）：京言 → JoyAI → AI穿搭 → 关注 → 直播 → 推荐 → 小说 → 短剧 → 视频（Relay `2075:6947`）。 |
| 固定节奏 | 非沉浸流 Relay `518:2141`：内容区 362×44、左右外边距 6；返回 28×44；菜单 / 搜索热区 44×44；TabList 可视区 246×44。沉浸流 Relay `2084:44` / `2084:10`：无返回；菜单 44×44；默认 TabList 可视区 275×44；track 右锚定 + 左侧裁切露出「关注」；视频 Tab 与搜索 slot 无缝隙。 |
| 滑动可感知 | Relay `2075:6916` 明确所有一级 Tab 可左右滑动交互；进入滑动态时 TabList 两侧必须出现线性渐隐，提示左右还有内容。 |
| 功能区稳定 | 左侧功能区负责返回 / 侧边栏 / 首页回退；右侧功能区负责搜索 / 快速返回。默认只展示搜索；TabList 离开默认锚点后，搜索左侧新增快速返回 icon，右侧功能区变为 72×44，TabList 临时收窄到 247×44。功能区不参与 TabList 滑动，也不被渐隐遮罩覆盖。 |
| 样式正交 | **流类型**决定槽位与 TabList 协议；**样式**（常规 / 暗黑）只改变背景、文本与 icon 映射，不改变布局骨架。 |
| 选中不染色 | selected 文案与 indicator 继承当前模式文本色，不使用品牌色或额外高亮色。 |
| 活动可降级 | 运营活动态必须可回退为常规 TabItem + Indicator，不影响基础频道切换。 |
| 降噪优先 | 长频道、多入口、可配置频道必须在触发条件后折叠或收敛，避免顶部信息过载。 |

## 4. Source Analysis

| Area | Relay Evidence | Interpretation |
|:---|:---|:---|
| 非沉浸流（常规 / 暗黑） | `518:2141` | TabList 右对齐锚定；默认选中「视频」，从右往左依次露出视频 / 短剧 / 小说 / 推荐 / 直播；375 屏宽下内容区 362×44、左右外边距 6；leading 含返回 28 + 菜单 44；滚动后可吸顶。 |
| 沉浸流（常规 / 暗黑） | `2084:44` / `2084:10` | 无返回入口；leading 仅菜单 44×44；TabList 可视区 275×44；track 右锚定，左侧裁切露出「关注」；默认选中「视频」；导航透明悬浮于视频，样式仅切换深浅背景与文本 token。 |
| 交互更新 | `2075:6916` / `2075:6947` | 新增"所有 tab 可左右滑动交互"、"滑动态左右两侧线性渐隐"、"切换 tab"、"左右功能区规则"。完整 9 Tab 序列（`2075:6947`）：京言 / JoyAI / AI穿搭 / 关注 / 直播 / 推荐 / 小说 / 短剧 / 视频。 |
| 快速返回布局 | `2125:33` | 明确沉浸流默认 TabList 仍为 275×44；仅当横向滑动离开默认锚点后，右侧在搜索旁新增快速返回 icon，TabList 临时变为 247×44，右侧功能区为快速返回 44×44 + 搜索 44×44（整体 72×44，从 x=291 开始）。 |
| 历史顶部 Tab | `2084:1` | 旧版 5 Tab 同屏参考；已被 `518:2141` 取代。 |
| 展示规则 | `771:1164` section | 定义基础展示、返回态、略微偏移态与沉浸流对比。 |
| 顶导基础规范 | `771:3500` / `771:3502` / `771:3504` | 覆盖不同屏宽下顶部 Tab 的容器、导航槽位与 Tab 区域。 |
| Tab 切换示意 | `771:11264` section | 展示横向切换、模板区与沉浸/常规/暗黑场景。 |
| 活动配置 | `771:12101` section | 活动 Tab、xtab、游标、Lottie 与运营切图规则。 |
| 降噪 | `771:37609` section | 定义常驻 Tab、可配置 Tab、更多频道、拖动与 toast 提醒。 |

## 5. Dependency Contract

| Dependency | Source | Usage |
|:---|:---|:---|
| color | `tokens/color.md` | 文本、沉浸态文本、背景、蒙层、品牌强调、分割线。 |
| typography | `tokens/typography.md` | Tab 文案、导航辅助文案、活动标签文案。 |
| spacing | `tokens/spacing.md` | slot 间距、TabItem 内外间距、图标文字间距、安全区补偿。 |
| radius | `tokens/radius.md` | indicator、dropdown、badge、活动胶囊与浮层圆角。 |
| shadow | `tokens/shadow.md` | 沉浸背景上的文字和图标防穿透。 |
| visual | `visual/Icon.md` | 全局图标规范原则，仅用于约束图标绘制策略。 |
| private assets | `assets/icons/*` | VideoTopTab 私有导航图标，不进入全局 Icon 系统。 |

## 6. Non Goals

- 不在组件内新建 color / typography / spacing / radius / shadow 基础 token。
- 不把 `assets/icons/*` 私有图标迁移到 `visual/Icon.md` 的全局资产池。
- 不把活动运营切图、Lottie 或服务端下发素材固化为组件基础样式。
- 不在组件规范中书写裸 CSS 值；需要但不存在的 token 统一记录为 TODO。

## 7. Demo & spec-page.html

`spec-page.html` 与本文档 bundle 同步，使用二维 Demo 切换：

| `data-vtt-flow` | `data-vtt-theme` | 说明 |
|:---|:---|:---|
| `immersive` | `default` | 沉浸流 · 常规 |
| `immersive` | `dark` | 沉浸流 · 暗黑 |
| `standard` | `default` | 非沉浸流 · 常规 |
| `standard` | `dark` | 非沉浸流 · 暗黑 |

详见 `spec.md` §0 Demo Matrix。

## 8. Traceability

| ID | Type | Description |
|:---|:---|:---|
| VTT-TRACE-01 | Relay | 已读取 page `0:3770` 与 scope node `771:1106`，并使用截图核对整体规范页结构。 |
| VTT-TRACE-05 | Relay | 已追加读取 `518:2141`，校正非沉浸流布局：362×44 内容区、6px 外边距、返回 28×44、TabList 246×44 可视区。 |
| VTT-TRACE-06 | Relay | 已追加读取 `2084:44` / `2084:10`，校正沉浸流布局：无返回、TabList 275×44、track 右锚定 + 左侧「关注」peek、与搜索 slot 无缝隙。 |
| VTT-TRACE-07 | Demo | `spec-page.html` Demo 切换为流类型（immersive / standard）× 样式（default / dark）二维矩阵，与 MD 文档一致。 |
| VTT-TRACE-08 | Relay | 已读取 `2075:6916`，补充所有 Tab 可横向滑动、滑动态两侧渐隐、切换 Tab、左 / 右功能区状态规则。 |
| VTT-TRACE-09 | Relay | 已读取 `2125:33`，校正 quick-return：默认不占位且 TabList 保持 275×44；滑动离开默认锚点后返回 icon 与搜索并列，TabList 收窄为 247×44。 |
| VTT-TRACE-04 | Relay | 已读取 `2084:1` 历史应用态；部分尺寸已被 `518:2141` 取代。 |
| VTT-TRACE-02 | Asset | 私有资产目录已存在：`assets/icons/`。 |
| VTT-TRACE-03 | Architecture | 组件输出路径按后续约定写入 `JDSPzujianku/horizontal/components/video-top-tab/`。 |
