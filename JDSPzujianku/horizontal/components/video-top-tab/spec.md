---
file: spec
component_name: VideoTopTab
slug: video-top-tab
version: "1.1.1"
last_updated: "2026-05-26"
relay_source:
  file_id: "1958051135088508929"
  page_id: "0:3770"
  scope_node: "518:2141"
  reference_nodes:
    standard_top_tab: "518:2141"
    immersive_top_tab: "2084:44"
    interaction_update: "2075:6916"
    quick_return_layout: "2125:33"
---

# VideoTopTab · 视觉规范

> Relay 源：`1958051135088508929 / page 0:3770 / 顶部tab`。非沉浸流对照 [`518:2141`](https://relay.jd.com/file/design?id=1958051135088508929&page_id=0%3A3770&node_id=518%3A2141)；沉浸流对照 [`2084:44`](https://relay.jd.com/file/design?id=1958051135088508929&page_id=0%3A3770&node_id=2084%3A44) / [`2084:10`](https://relay.jd.com/file/design?id=1958051135088508929&page_id=0%3A3770&node_id=2084%3A10)；交互更新对照 [`2075:6916`](https://relay.jd.com/file/design?id=1958051135088508929&page_id=0%3A3770&node_id=2075%3A6916)；快速返回布局对照 [`2125:33`](https://relay.jd.com/file/design?id=1958051135088508929&page_id=0%3A3770&node_id=2125%3A33)。`spec-page.html` Demo 与本文档均按 **流类型 × 样式** 二维矩阵组织。

## 0. Demo Matrix（与 spec-page.html 一致）

| 流类型 `vtt-flow` | 样式 `vtt-theme` | 布局（Relay） | 视觉 |
|:---|:---|:---|:---|
| `immersive` 沉浸流 | `default` 常规 | 无返回；menu 44 + TabList 默认 275 + search 44；滑动后 quick-return 44 + search 44，TabList 临时 247；频道含「关注」peek | 渐变视频底 + 透明导航 + 沉浸态白字 / shadow |
| `immersive` 沉浸流 | `dark` 暗黑 | 同上 | 更深视频底 + 透明导航 + 沉浸态白字 / shadow |
| `standard` 非沉浸流 | `default` 常规 | 返回 28 + menu 44 + TabList 246 + search 44 | 浅灰舞台 + 白底导航 + 深色文案 |
| `standard` 非沉浸流 | `dark` 暗黑 | 同上 | 深灰舞台 + 深底导航 + 浅色文案；可吸顶 |

- Demo 数据属性：`data-vtt-flow="immersive|standard"`、`data-vtt-theme="default|dark"`。
- **流类型**控制槽位、TabList 宽度、频道序列与是否吸顶；**样式**只控制背景 / 文本 / icon token 映射。
- 沉浸流 TabList track 在视口内 **右锚定**（`right: 0`），左侧 `overflow: hidden` 裁切露出「关注」；「视频」Tab 右缘与搜索 slot 左缘 **无缝隙**（Relay 测量约 0.5px）。

## 1. Container Spec

| Capability | Token Reference | Rule |
|:---|:---|:---|
| Safe area | `spacing.md` safe-area rule | 顶部容器必须承接系统状态栏安全区；实现层使用平台安全区变量，不以固定间距替代。 |
| Content width | TODO: missing token dependency | Relay measured：375 屏宽下导航内容区 362×44。 |
| Horizontal margin | TODO: missing token dependency | Relay measured：左右外边距各 6。 |
| Base height | TODO: missing token dependency | Relay 中顶部 Tab 容器存在固定高度协议，但当前 `tokens/spacing.md` 未提供 `size.video_top_tab_container_h`。 |
| Width adaptation | `spacing_xxs` / TODO size tokens | 正常态最多展示 5 个 Tab；TabList 超出时滚动或折叠，不压缩文字。 |
| Sticky | `color/background 5` / `color/mask 2` | 吸顶后容器从沉浸透明态过渡到可读背景层；**仅非沉浸流** Demo 启用（`vtt-flow=standard`）。 |
| Immersive | `color/title_immerse` / `color/text_immerse_help` / `shadow_interactive` | 沉浸流（`vtt-flow=immersive`）透明导航悬浮于视频；常规 / 暗黑样式均使用沉浸文本 token。 |
| Blur | TODO: missing token dependency | 活动配置区域出现弱模糊叠层；当前 token 层无 `blur.video_top_tab_overlay`。 |
| Theme default | `color/background 2` / `color/title_immerse` | 非沉浸流常规：浅底 + 深色 Tab 文案；沉浸流常规：渐变视频底 + 白字。 |
| Theme dark | `color/background 1` / `color/title_immerse` | 非沉浸流暗黑：深底导航 + 浅色文案；沉浸流暗黑：更深视频底 + 白字。 |
| Background transition | `color/background 5` / `color/mask 1` / `color/mask 2` | 透明、半透明、实底之间只切换语义色，不写裸色。 |

### Container Slots

| Slot | Private Asset | Rule |
|:---|:---|:---|
| leading.back | `assets/icons/icon-back-video.svg` | 固定 28×44；返回上一层或返回首页，出现规则由页面层决定。**沉浸流不展示**（Relay `2084:10`）。 |
| leading.menu | `assets/icons/icon-menu-video.svg` | 频道整合、更多入口或左侧功能区入口。 |
| trailing.search | `assets/icons/icon-search-video.svg` | 默认搜索入口。 |
| trailing.forward | `assets/icons/icon-forward-video.svg` | Tab 滑动离开默认锚点后显示的快捷返回入口，位于搜索左侧；默认不占位。 |

> ⚠️ 当前 icon 归属 VideoTopTab 私有资产层，未进入全局 Icon 系统。

### Functional Area Rules（Relay `2075:6916`）

| Area | Default | Swiped / Immersive Rule |
|:---|:---|:---|
| 左侧功能区 | 默认固定出现“我的”功能侧边浮层入口；非沉浸流可同时含返回按钮。 | 当进入沉浸式单列后，左侧出现返回首页按钮；返回按钮热区承接 28×44 / 44×44 槽位协议。 |
| 右侧功能区 | 默认只出现搜索，TabList 保持 275×44（沉浸流）。 | 当 Tab 发生横向滑动并离开默认锚点后，搜索左侧新增快速返回按钮；右侧功能区从 44×44 扩展为 72×44，TabList 临时收窄为 247×44。点击快速返回后回到默认锚点，并恢复默认宽度。 |
| 固定性 | 左右功能区固定在容器两侧。 | TabList 横向滚动时左右功能区不跟随滚动，不被渐隐遮罩覆盖。 |

## 2. TabItem Spec

| State | Token Reference | Rule |
|:---|:---|:---|
| default | `font_size_body_sm` + `font_weight_medium` / current mode text token / `shadow_interactive` | Relay `2075:6916` 标注一级 Tab 为 16dp、Medium。 |
| selected | same as default / current mode text token / `shadow_interactive` | 选中态同步 indicator 与路由语义；常规态继承当前文本色，沉浸态 selected 为白色。 |
| activity | same as default / activity asset anchor | 活动态可附加运营资产，但文案颜色不覆盖 selected / default 颜色。 |
| disabled | `color/text_disable` | 禁用态不响应点击，不展示 selected indicator。 |
| scrollable | `spacing_xxs` | 非沉浸流 TabList 246×44 右对齐（`518:2141`）；沉浸流 TabList 275×44、track 右锚定 + 左侧「关注」peek（`2084:44`）；默认选中「视频」；不压缩文案。 |
| folded | `radius.module.pill_action` / `spacing_xs` | 超出展示或进入降噪策略后折叠为 dropdown / more channel。 |
| badge | `radius.badge` / `color/primary` / `color/title_immerse` | badge 只表达提示，不改变 TabItem 基础尺寸协议。 |

## 2.1 Scroll / Edge Fade Spec（Relay `2075:6916`）

| Capability | Relay Evidence | Rule |
|:---|:---|:---|
| 全量可滑动 | `2075:6916` 文案“所有tab-可以左右滑动交互” | 所有一级 Tab 均进入同一横向滚动轨道；不得只允许部分频道滑动。 |
| 滑动态渐隐 | `2075:6916` 文案“滑动态-左右两侧有渐隐效果” | 当 TabList 可继续向任一方向滚动时，对应边缘显示线性渐隐遮罩；到达起点 / 终点时该侧渐隐消失。 |
| 渐隐范围 | `2075:6916` 渐隐示意：0% / 5% / 95% / 100% | 渐隐只覆盖 TabList 可视区边缘，不覆盖固定功能区；实现层可用 mask-image / overlay gradient，需待 motion / mask token 补齐。 |
| 切换 Tab | `2075:6916` 节点“5. 切换tab” | 点击或滑动后选中频道时，indicator 移动到目标 Tab 下方，并保证 selected Tab 处于可视区域。 |
| 文案样式 | `2075:6916` 标注：一级 tab 16dp，Medium | Tab 文案使用 16px / `font_weight_medium`；文档此前 14px 示例升级为本节点实测样式。 |
| 沉浸文字 | `2075:6916` 标注：选中 `#FFFFFF`、未选中 `#FFFFFF 80%` | 沉浸态 selected 使用 `color/tittle_immerse`，unselected 使用 `color/text_immerse` 或 80% 白色语义，待 token 文档确认。 |
| 投影 | `2075:6916` 标注：模糊 1、Y 1、`#000000 20%` | Tab 文案及 icon 在沉浸背景上使用低强度投影，优先映射 `shadow_interactive`；若 token 不匹配需同步 shadow token。 |

## 2.2 Quick Return Layout Spec（Relay `2125:33`）

| State | TabList viewport | Right function area | Rule |
|:---|:---|:---|:---|
| 默认锚点 | 275×44 | search 44×44（x=319.5） | 与原沉浸流保持一致，不预留 quick-return 空位。 |
| 离开默认锚点 | 247×44 | quick-return 44×44（x=291） + search 44×44（x=319.5），整体 72×44 | quick-return 作为新增 icon 出现在搜索左侧；搜索不隐藏、不被替代。 |
| 点击 quick-return | 275×44 | search 44×44 | 轨道滚回默认锚点；quick-return 隐藏，TabList 恢复默认宽度。 |

## 3. Indicator Spec

| Variant | Token Reference | Rule |
|:---|:---|:---|
| underline | current mode text token / `radius.module.nav_tag` | 基础游标跟随 selected TabItem；颜色与 Tab 文案保持一致，不做高亮。 |
| capsule | `radius.module.pill_action` / `color/background 5` | 用于强调或活动承载，不替代 TabItem 文案语义。 |
| animated | TODO: missing token dependency | 需要 motion token 定义 duration / easing；当前 tokens 层未提供 motion。 |
| hidden-on-scroll | `shadow_interactive` | 快速滚动或降噪时可暂隐 indicator，但 selected 语义仍保留在状态层。 |
| activity asset | private activity payload | 活动游标由服务端或运营资产下发时，必须声明三倍图 / Lottie / 降级关系。 |

## 4. Navigation Assets

| Asset | Usage | Ownership |
|:---|:---|:---|
| `icon-back-video.svg` | 返回按钮 | VideoTopTab private asset |
| `icon-menu-video.svg` | 菜单入口 | VideoTopTab private asset |
| `icon-search-video.svg` | 搜索入口 | VideoTopTab private asset |
| `icon-forward-video.svg` | 滑动后快速返回默认锚点 | VideoTopTab private asset |

### SVG Constraints

| Constraint | Rule |
|:---|:---|
| Color | 使用 `currentColor`，由组件状态映射 color token。 |
| Bounds | SVG 资产 frame 为 22×22；组件内 icon 热区 44×44，视觉 22×22 居中。 |
| Render size | 热区（容器）44×44；视觉尺寸 22×22；实现必须直接引用 `assets/icons/*.svg`，不得用 mask 伪造资产调用。 |
| Ownership | 私有资产只在 VideoTopTab bundle 内引用。 |
| Migration | 不迁移到 global `visual/Icon.md`。 |

## 5. Token Mapping

| Component Role | Token Dependency |
|:---|:---|
| container.background.default | `color/background 2` |
| container.background.sticky | `color/background 5` |
| container.background.dark | `color/background 1` |
| container.mask | `color/mask 1` / `color/mask 2` |
| label.default | current mode text token + `font_size_body_sm` + `font_weight_medium` |
| label.selected | same as `label.default`，不做颜色高亮 |
| label.activity | same as `label.default`，活动资产不得改写文案颜色 |
| label.disabled | `color/text_disable` |
| icon.default | `color/title_immerse` |
| icon.secondary | `color/text_immerse_help` |
| tab.max_visible | Relay measured：5；TODO: missing token dependency — `count.video_top_tab_visible_tabs` |
| tab.item.bounds | Relay measured：高 44，左右内边距 9；部分 Tab 固定宽 51；TODO: missing token dependency — `size.video_top_tab_item_h` / `spacing.video_top_tab_item_pad_x` |
| tab.list.viewport | Relay measured：非沉浸流 246×44（`518:2141`）；沉浸流默认 275×44（`2084:44`）；沉浸流 quick-return 出现时 247×44（`2125:33`）；TODO: missing token dependency — `size.video_top_tab_list_viewport_w` |
| tab.list.viewport.quick_return | Relay `2125:33` measured：247×44；TODO: missing token dependency — `size.video_top_tab_list_viewport_w_quick_return` |
| tab.list.edge_fade | Relay `2075:6916` measured：左右两侧线性渐隐；TODO: missing token dependency — `mask.video_top_tab_edge_fade` |
| tab.switch.behavior | Relay `2075:6916`：切换 tab 后 indicator 跟随目标 Tab，selected 保持可见 |
| tab.list.track_anchor_immersive | Relay measured：沉浸流 track 右锚定，左侧裁切 peek ≈ 68px；TODO: missing token dependency — `offset.video_top_tab_list_peek` |
| back.bounds | Relay measured：28×44；TODO: missing token dependency — `size.video_top_tab_back_w` |
| container.content | Relay measured：362×44；TODO: missing token dependency — `size.video_top_tab_content_w` |
| container.margin_x | Relay measured：6；TODO: missing token dependency — `spacing.video_top_tab_margin_x` |
| icon.hit | Relay measured：44×44；TODO: missing token dependency — `size.video_top_tab_icon_hit` |
| quick_return.area | Relay `2125:33` measured：右侧功能区 72×44，quick-return x=291，search x=319.5；TODO: missing token dependency — `size.video_top_tab_trailing_quick_return_w` |
| icon.visual | Relay measured：22×22；TODO: missing token dependency — `size.video_top_tab_icon` |
| slot.gap | `spacing_lg` / `spacing_md` |
| icon.label.gap | `spacing.icon_label` |
| indicator.radius | `radius.module.nav_tag` |
| capsule.radius | `radius.module.pill_action` |
| badge.radius | `radius.badge` |
| immersive.shadow | `shadow_interactive` |

## 6. Required Missing Tokens

| TODO | Reason |
|:---|:---|
| TODO: missing token dependency — `size.video_top_tab_content_w` | Relay `518:2141` 导航内容区宽 362。 |
| TODO: missing token dependency — `spacing.video_top_tab_margin_x` | Relay `518:2141` 左右外边距各 6。 |
| TODO: missing token dependency — `size.video_top_tab_back_w` | Relay `518:2141` 返回入口宽 28、高 44。 |
| TODO: missing token dependency — `size.video_top_tab_list_viewport_w` | Relay `518:2141` TabList 246；Relay `2084:44` 沉浸流默认 TabList 275。 |
| TODO: missing token dependency — `size.video_top_tab_list_viewport_w_quick_return` | Relay `2125:33`：滑动离开默认锚点后，quick-return 出现，沉浸流 TabList 收窄为 247。 |
| TODO: missing token dependency — `size.video_top_tab_trailing_quick_return_w` | Relay `2125:33`：右侧功能区 quick-return + search 整体 72×44。 |
| TODO: missing token dependency — `mask.video_top_tab_edge_fade` | Relay `2075:6916` 新增滑动态左右两侧线性渐隐。 |
| TODO: missing token dependency — `offset.video_top_tab_list_peek` | Relay `2084:44` 沉浸流 track 右锚定，左侧裁切露出「关注」边缘（约 68px peek）。 |
| TODO: missing token dependency — `size.video_top_tab_item_h` | Relay `518:2141` 中 TabItem 高度为 44。 |
| TODO: missing token dependency — `spacing.video_top_tab_item_pad_x` | Relay `518:2141` 中 TabItem 左右内边距为 9。 |
| TODO: missing token dependency — `count.video_top_tab_visible_tabs` | Relay 最新应用态最多同屏展示 5 个 Tab。 |
| TODO: missing token dependency — `size.video_top_tab_icon` | Relay `518:2141` 中私有 icon 视觉尺寸为 22×22。 |
| TODO: missing token dependency — `size.video_top_tab_icon_hit` | Relay `518:2141` 中 menu / search 热区为 44×44。 |
| TODO: missing token dependency — `size.video_top_tab_indicator_h` | 游标厚度不应以裸值写入规范。 |
| TODO: missing token dependency — `motion.video_top_tab_indicator` | indicator animated 需要 duration / easing。 |
| TODO: missing token dependency — `blur.video_top_tab_overlay` | sticky / activity overlay 需要 blur token。 |
| TODO: missing token dependency — `z_index.video_top_tab_sticky` | 吸顶层级需要页面级 z-index token。 |
