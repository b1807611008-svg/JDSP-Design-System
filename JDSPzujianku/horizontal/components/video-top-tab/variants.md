---
file: variants
component_name: VideoTopTab
slug: video-top-tab
version: "1.1.1"
last_updated: "2026-05-26"
---

# VideoTopTab · Variants

## Presentation Matrix（spec-page.html Demo）

与 HTML Demo 一致，对外预览使用两个正交维度：

| 维度 | 值 | 控制内容 |
|:---|:---|:---|
| 流类型 `vtt-flow` | `immersive` / `standard` | 槽位组合、TabList 宽度、频道序列、是否吸顶 |
| 样式 `vtt-theme` | `default` / `dark` | 背景、文本、icon token；不改变布局骨架 |

## Variant Matrix

| Variant | Trigger | Required Layers | Degrade To |
|:---|:---|:---|:---|
| `default` | 常规顶部频道导航 | Container + TabList + Indicator | — |
| `selected` | 当前频道命中 | TabItem selected + Indicator active | `default` |
| `activity` | 运营活动配置命中 | Activity TabItem + Activity Indicator / Asset | `selected` |
| `sticky` | 页面滚动至吸顶阈值 | Sticky Container + readable background | `default` |
| `immersive` | 视频沉浸流 | Transparent / mask background + shadow token | `default` |
| `dropdown` | 点击更多 / 折叠入口 | Dropdown Channel Layer + selected sync | `folded` |
| `folded` | 屏宽不足或频道过多 | More Channel Entry + preserved selected | `scrollable` |
| `noise-reduction` | 长频道 / 复杂运营 / 高频滑动 | 常驻 Tab + 可配置 Tab + 更多频道收敛 | `scrollable` |
| `scrollable` | Tab 总宽超过可视区 | Horizontal TabList + edge affordance | `folded` |
| `edge-fade` | TabList 处于可横向滑动态 | Left / Right linear fade mask | `scrollable` |
| `quick-return` | Tab 横向滑动后离开默认锚点 | 右侧快速返回按钮 | `scrollable` |

## 1. default（非沉浸流 · standard flow）

- applies when: `vtt-flow=standard`
- container:
  - color: `color/background 2`（常规）或 `color/background 1`（暗黑）
  - spacing: safe-area rule from `spacing.md`
  - sticky: 滚动后可进入 `sticky`
- leading:
  - back 28×44 + menu 44×44
- tab item:
  - typography: `font_size_14_500`
  - color: 常规 `#171A26` plain text；暗黑沉浸态 text token
  - bounds: Relay measured 高 44、左右内边距 9; TODO: missing token dependency
  - viewport: Relay measured 246×44; TODO: missing token dependency
- tab list:
  - channels: 直播 / 推荐 / 小说 / 短剧 / 视频（默认选中）
  - max visible tabs: 5
  - gap: `spacing_xxs`
- indicator:
  - hidden until selected state is resolved

## 2. selected

- tab item:
  - typography: same as default
  - color: same as default; selected must not introduce highlight color
  - shadow: `shadow_interactive`
- indicator:
  - color: inherit from current tab text color
  - radius: `radius.module.nav_tag`
- rule:
  - selected state must be driven by route / page index, not by hover-like visual state.
  - switching tab moves the underline to the target TabItem and scrolls the TabList only as needed to keep the target visible.

## 3. activity

- tab item:
  - typography: same as default
  - fallback color: same as default; activity must not recolor selected text
- activity asset:
  - source: service payload or private activity payload
  - export: must preserve activity name width and reserve area described by Relay activity section
- degrade:
  - if activity asset / Lottie fails, render selected TabItem + underline indicator.

## 4. sticky

- container:
  - background: `color/background 5`
  - mask: `color/mask 2`
  - z-index: TODO: missing token dependency
- behavior:
  - sticky state must not reset selected tab.
  - sticky background transition must not mutate TabItem typography.

## 5. immersive（沉浸流 · immersive flow）

- applies when: `vtt-flow=immersive`
- leading:
  - menu only; **no back slot** (Relay `2084:44`)
- text:
  - color: `color/title_immerse` / `color/text_immerse_help`（常规 / 暗黑均用沉浸文本 token）
  - shadow: `shadow_interactive`
- icon:
  - color inherits text token
  - shadow follows `shadow_icon_subtle` only when video content reduces contrast.
- background:
  - transparent nav over video; 常规 = 渐变视频底；暗黑 = 更深渐变视频底
- tab list:
  - viewport: 默认 Relay measured 275×44; quick-return 出现后临时 247×44（Relay `2125:33`）；TODO: missing token dependency
  - track: 右锚定（`right: 0`），左侧 overflow 裁切 peek「关注」≈ 68px; TODO: missing token dependency
  - channels: 关注 / 直播 / 推荐 / 小说 / 短剧 / 视频（默认选中）
  - rule: 「视频」Tab 右缘与 search slot 无缝隙；nav inner `gap: 0`
- sticky:
  - 沉浸流 Demo 不启用吸顶（`data-sticky=false`）

## 6. dropdown

- trigger:
  - more channel / folded tab / menu slot
- container:
  - radius: `radius.module.dialog` or `radius.module.card_large`
  - background: `color/background 2` / `color/background 1`
- item:
  - selected channel must sync with TabList.

## 7. folded

- trigger:
  - channel count exceeds visible capacity
  - user enters configured channel management
- rule:
  - keep core tab identity discoverable.
  - keep no more than 5 visible TabItems in the top bar.
  - expose dropdown entry instead of shrinking label typography.

## 8. noise-reduction

- persistent tabs:
  - video
  - live
  - follow
- configurable tabs:
  - at least a minimum configurable set plus user-defined channels
- more channel:
  - operational configuration is grouped after persistent tabs.
- feedback:
  - moving protected tabs must show toast.

## 9. scrollable

- list:
  - horizontal scroll
  - no label compression
  - normal visible capacity is 5 TabItems
  - keep selected TabItem visible after route sync
- edge:
  - leading / trailing navigation slots remain stable while TabList scrolls.
  - when scrollable content remains beyond the left or right edge, show the corresponding linear fade.
  - hide the left fade at the left boundary and hide the right fade at the right boundary.
  - edge fade belongs to the TabList mask layer, not to the fixed left / right function slots.

## 10. edge-fade（滑动态两侧渐隐）

- source: Relay `2075:6916` section “滑动态-左右两侧有渐隐效果”.
- applies when: TabList track is horizontally scrollable and the current scroll offset is not at one or both boundaries.
- left edge:
  - visible after user scrolls away from the left boundary.
  - hidden when the track is fully aligned to the left boundary.
- right edge:
  - visible when more tabs exist to the right.
  - hidden when the track reaches the right boundary.
- implementation:
  - use mask / overlay gradient scoped to the TabList viewport.
  - do not fade fixed slots: back, menu, search, quick-return.

## 11. quick-return（滑动后快捷返回）

- source: Relay `2075:6916` section “右侧功能区（搜索、快速返回）” + Relay `2125:33` 快速返回布局.
- trigger:
  - TabList has been horizontally scrolled away from its default anchor.
- default state:
  - quick-return is hidden and does not reserve space.
  - immersive TabList keeps the original 275×44 viewport.
  - search remains at the right-side 44×44 slot.
- visible state:
  - quick-return appears to the left of search, not as a replacement.
  - right function area becomes quick-return 44×44 + search 44×44, measured as 72×44 in Relay.
  - TabList viewport shrinks from 275×44 to 247×44 while quick-return is visible.
- behavior:
  - right function area may show a quick-return affordance beside search.
  - tapping quick-return scrolls TabList back to the default selected / default anchor without changing route unless business explicitly couples it with channel reset.
  - after returning to the default anchor, quick-return hides and TabList restores to 275×44.
- degrade:
  - if quick-return asset is unavailable, keep search as the stable right-side affordance.
