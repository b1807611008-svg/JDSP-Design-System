---
file: behaviors
component_name: VideoTopTab
slug: video-top-tab
version: "1.1.1"
last_updated: "2026-05-26"
---

# VideoTopTab · Behaviors

## 0. Demo 切换（与 spec-page.html 一致）

| 控件 | 属性 | 取值 | 行为 |
|:---|:---|:---|:---|
| 流类型 | `data-vtt-flow` | `immersive` / `standard` | 切换布局协议与频道序列 |
| 样式 | `data-vtt-theme` | `default` / `dark` | 切换背景 / 文本 / icon 视觉 |

- 沉浸流 + 常规 / 暗黑：无返回，默认 TabList 275；滑动离开默认锚点后 quick-return 出现，TabList 临时 247；透明导航，不吸顶。
- 非沉浸流 + 常规 / 暗黑：有返回，TabList 246，实底导航，Demo 启用吸顶预览。

## 1. 点击切换

| Trigger | Behavior |
|:---|:---|
| Tap TabItem | 更新 selected state，移动 indicator，同步页面路由 / feed channel。 |
| Tap selected TabItem | 保持当前频道；是否刷新由业务页声明，不由组件默认执行。 |
| Tap activity TabItem | 先执行频道切换，再上报活动曝光 / 点击。 |
| Tap disabled TabItem | 不切换，不移动 indicator，不触发业务事件。 |

### Tab 切换反馈（Relay `2075:6916`）

- 点击任意一级 Tab 后，selected state 立即切换到目标频道。
- Indicator 移动到目标 Tab 下方；移动过程中不得出现双 indicator。
- 若目标 Tab 当前不完全可见，TabList 需要滚动到目标可见范围内。
- 页面路由 / feed channel 与 selected Tab 保持单源同步；业务加载失败时可回滚 selected，但必须同步 indicator。

## 2. 横向滚动

- Relay `2075:6916` 明确“所有tab-可以左右滑动交互”，因此一级 TabList 全量进入同一横向滚动轨道。
- TabList 采用右对齐锚定（Relay `518:1828`：`justify-content: flex-end`）。
- 非沉浸流（Relay `518:2141`，`vtt-flow=standard`）：默认选中「视频」，从右往左依次露出视频 / 短剧 / 小说 / 推荐 / 直播，可视区 246×44。
- 沉浸流（Relay `2084:44`，`vtt-flow=immersive`）：无返回；默认 TabList 可视区 275×44；track 右锚定，左侧裁切露出「关注」；频道序列为关注 / 直播 / 推荐 / 小说 / 短剧 / 视频；「视频」与 search slot 无缝隙。
- 沉浸流 quick-return 状态（Relay `2125:33`）：当 TabList 离开默认锚点后，右侧搜索左边新增 quick-return icon，TabList 可视区临时收窄为 247×44。
- selected TabItem 必须保持在可视区右端。
- navigation slots 不参与 TabList 横向滚动。
- 滚动过程中可触发 `hidden-on-scroll` indicator，但 selected 语义不得丢失；selected 文案和 indicator 不做颜色高亮。

### 滑动态左右渐隐

- 当左侧还有未展示 Tab 时，TabList 左边缘展示线性渐隐；当滚动到最左边界时隐藏左侧渐隐。
- 当右侧还有未展示 Tab 时，TabList 右边缘展示线性渐隐；当滚动到最右边界时隐藏右侧渐隐。
- 渐隐只作用在 TabList viewport 内，不覆盖返回、侧边栏、搜索、快速返回等固定功能区。
- 渐隐表现来自 Relay `2075:6916`：0% / 5% / 95% / 100% 线性渐变示意；实现层可用 CSS mask 或 overlay gradient，但需等待 `mask.video_top_tab_edge_fade` token 化。

### 快速返回

- 默认状态不展示快速返回按钮，也不预留其宽度；TabList 保持原沉浸流 275×44。
- 当 TabList 横向滑动离开默认锚点后，右侧功能区在搜索左侧新增快速返回按钮。
- 快速返回与搜索并列展示：quick-return 44×44 + search 44×44，右侧功能区整体 72×44；搜索不得隐藏或被替代。
- quick-return 展示期间，TabList 可视区从 275×44 临时收窄为 247×44。
- 点击快速返回只负责滚动轨道回到默认锚点；是否重置频道由业务层明确，不由组件默认执行。
- 回到默认锚点后隐藏 quick-return，TabList 恢复 275×44。

## 3. 吸顶规则

- 页面滚动超过业务阈值后进入 `sticky`。
- **仅非沉浸流**（`vtt-flow=standard`）在 Demo 与业务页中启用吸顶；沉浸流保持透明导航，不切换为实底吸顶态。
- `sticky` 只改变 Container 背景、层级与可读性，不改变 TabItem 文案、顺序与 selected state。
- 吸顶背景使用 `color/background 5`、`color/mask 2` 等语义 token。
- z-index 依赖页面层补齐：TODO: missing token dependency — `z_index.video_top_tab_sticky`。

## 4. 沉浸态切换

- 视频沉浸流对应 `vtt-flow=immersive`（Relay [`2084:44`](https://relay.jd.com/file/design?id=1958051135088508929&page_id=0%3A3770&node_id=2084%3A44)）。
- **沉浸流不展示返回入口**；leading 仅保留菜单 44×44 热区。
- TabList 默认可视区 275×44；track 右锚定，左侧裁切露出「关注」；默认选中「视频」；与 search slot 无缝隙。quick-return 出现时按 `2125:33` 临时收窄为 247×44。
- 样式维度 `vtt-theme=default|dark` 只切换视频舞台深浅与文本对比，不改变沉浸流布局。
- `immersive` 使用 `color/title_immerse`、`color/text_immerse_help` 与 `shadow_interactive`。
- 当背景复杂导致可读性下降时，可叠加语义 mask；不得直接写裸色。
- selected 文案与 underline indicator 继承当前沉浸文本色，不切换到品牌色。
- Relay `2075:6916` 标注沉浸态选中文字为 `#FFFFFF`，未选中为 `#FFFFFF 80%`；Tab 及 icon 投影为 blur 1、Y 1、`#000000 20%`。
- 从沉浸流切到非沉浸流时，TabItem 状态与页面路由不重置；非沉浸流恢复返回 28×44 + TabList 246×44 布局（Relay `518:2141`）。

## 5. 样式切换（常规 / 暗黑）

- `vtt-theme=default`：非沉浸流使用浅底可读背景；沉浸流使用常规渐变视频底。
- `vtt-theme=dark`：非沉浸流使用深底导航 + 浅色文案；沉浸流使用更深视频底，布局不变。
- 样式切换不得改变 Tab 顺序、selected 频道或槽位尺寸协议。

## 6. dropdown 行为

- `dropdown` 由 folded entry、menu slot 或更多频道入口触发。
- Dropdown 打开后，当前 selected channel 必须被标识；该标识不回写顶部 Tab 文案颜色。
- 点击频道后关闭 dropdown，并同步 TabList selected state。
- Dropdown 内频道排序遵循降噪策略，不允许把保护频道拖出常驻区。

## 7. 降噪策略

| Rule | Behavior |
|:---|:---|
| 常驻 Tab | 视频、直播、关注为常驻 Tab，不被运营配置挤出首屏。 |
| 可配置 Tab | 至少保留基础配置集合，再承接用户自定义频道。 |
| 更多频道 | 运营配置过多时进入更多频道，不横向铺满顶部。 |
| 拖动排序 | 支持长按拖动频道顺序，但保护频道不可移动。 |
| Toast | 用户尝试移动保护频道时，使用 toast 提醒。 |

## 8. 活动态降级

- 活动 Tab 素材失败时降级到 selected 文案态。
- 活动态降级后仍保持 selected 不染色规则。
- Lottie 不可用时降级到静态 activity asset。
- activity indicator 不可用时降级到 underline indicator。
- 服务端下发宽度或素材比例异常时，不拉伸 TabItem；直接使用普通 TabItem。

## 9. 页面联动

- `onTabChange` 输出下一频道 id、上一个频道 id、触发方式。
- `onStickyChange` 输出 sticky 状态，但不修改频道。
- `onDropdownOpen` / `onDropdownClose` 由页面决定是否锁定滚动。
- `onNoiseReductionApply` 输出被折叠频道列表，便于埋点和问题回溯。

## Donts

| Dont | Reason |
|:---|:---|
| 不在组件内写裸 CSS 数值 | 组件只能引用 tokens 与 visual atoms。 |
| 不把私有 icon 放入全局 Icon 系统 | 当前图标归属 VideoTopTab 私有资产层。 |
| 不用缩小字号解决频道过多 | 应进入 scrollable / folded / dropdown。 |
| 不让顶部同时铺开超过 5 个 Tab | 最新 Relay 应用态首屏容量为 5，超出进入滚动或折叠。 |
| 不给 selected 文案和 underline 改品牌色 | 最新 Relay 应用态中选中态与其他 Tab 保持同色。 |
| 不让活动态覆盖 selected 语义 | 活动态是装饰与运营层，selected 是导航状态。 |
| 不在吸顶时重排 Tab 顺序 | sticky 只改变容器表现。 |
| 不让 dropdown 与 TabList 出现两个 selected | 状态必须单源同步。 |
