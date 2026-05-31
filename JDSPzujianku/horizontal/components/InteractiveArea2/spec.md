---
file: spec
component_name: InteractiveArea
slug: interactive-area
version: "1.0.0"
last_updated: "2026-05-25"
relay_source:
  file_id: "1958051135088508929"
  page_id: "0:13090"
  scope_node: "1600:588"
  reference_nodes:
    without_grass: "633:4487"
    with_grass: "1600:1053"
    avatar_stage: "633:3418"
    action_item: "823:3046"
    volume_control: "633:3616 / 1791:107"
---

# InteractiveArea · 视觉规范

> Relay 源：`1958051135088508929 / page 0:13090 / node 1600:588`。本文档只重组互动区组合层规范；头像、互动操作项与音量控制的精确尺寸和视觉层由原子/子组件文档提供。

## 0. Reusable Contract Index

| Contract | Canonical Source | Spec Usage |
|:---|:---|:---|
| `composition_order` | `InteractiveArea.md` + Relay `633:4487` / `1600:1053` | 定义 Slot 顺序、总高度公式和 `with_grass` 插入点。 |
| `avatar_state_matrix` | `InteractiveAvatar.md` | 复用 2×3 状态矩阵，不在组合层改写头像视觉。 |
| `action_item_contract` | `InteractiveActionItem.md` | 复用 50×62 ActionItem、50×50 interactive icon、计数文字和状态色。 |
| `volume_control_contract` | `InteractiveActionItem.md` volume section | 复用 muted / unmute_prompt 两种音量形态。 |

## 1. Demo Matrix（建议 spec-page.html 对齐）

| 维度 | 值 | 控制内容 |
|:---|:---|:---|
| 组合变体 `variant` | `without_grass` / `with_grass` | 是否渲染种草操作项；决定 Action Rail 项数与总高度公式。 |
| 头像直播 `avatar.liveState` | `not_live` / `live` | 是否展示直播标签、直播外圈、直播内环。 |
| 关注关系 `avatar.relationship` | `unfollowed` / `intermediate` / `followed` | 是否展示关注按钮、按钮底色与图标状态。 |
| 操作状态 `action.state` | `default` / `active` / `disabled` | 点赞、种草支持激活态；评论、转发仅 default / disabled。 |
| 音量状态 `volume.state` | `muted` / `unmute_prompt` | 底部音量圆形按钮或胶囊按钮。 |

### 1.1 Required State Gallery

`spec-page.html` 的可视展示必须补齐以下状态，不允许只给出单个默认样例：

| Gallery | Required Items | Visual Rule |
|:---|:---|:---|
| Avatar Matrix | `not_live × unfollowed / intermediate / followed`；`live × unfollowed / intermediate / followed` | 深色沉浸背景；直播行展示「直播中」标签和红色直播外圈，`live + followed` 额外展示内层红环。 |
| Rail Variant Matrix | `without_grass` / `with_grass` | `without_grass` 不保留种草占位；`with_grass` 在 comment 与 share 之间插入 grass。 |
| Action State Matrix | `like.default` / `like.active`；`grass.default` / `grass.active` | 点赞激活使用 `color/primary`；种草激活使用 `color/Recommend_btntext`；评论、转发只展示 default/disabled，不展示 active。 |
| Volume Matrix | `muted` / `unmute_prompt` | `muted` 使用 50×50 hotzone + 30 圆形按钮；`unmute_prompt` 使用 69×30 胶囊。 |

## 2. Container Spec

| Capability | Token Reference | Rule |
|:---|:---|:---|
| Width | `size.interactive_avatar_w` / `size.interactive_icon` | 组合宽度取子组件宽度，不在组合层新增宽度变量。 |
| Height: without_grass | Formula | `size.interactive_avatar_h + 3 × size.action_item + size.interactive_volume_hotzone + 4 × space.action_item_stack_gap`。 |
| Height: with_grass | Formula | `size.interactive_avatar_h + 4 × size.action_item + size.interactive_volume_hotzone + 5 × space.action_item_stack_gap`。 |
| Stack direction | Component contract | 必须为纵向堆叠；不得使用横向布局或自动换行。 |
| Stack gap | `space.action_item_stack_gap` | 子项间距只引用子组件已声明变量；当前设计为 0。 |
| Background | page-owned | 组合本身不定义背景；默认悬浮在视频内容上。 |
| Alignment | page-owned | 右侧栏整体定位由页面布局层控制，不消费 Relay 展示画布 x/y。 |

## 3. Slot Spec

| Slot | Required | Source | Rule |
|:---|:---|:---|:---|
| avatar | yes | `InteractiveAvatar.md` | 始终位于最上方；内部状态由头像子组件处理。 |
| like | yes | `InteractiveActionItem.md` | 位于头像下方第一个互动动作；支持 active / disabled。 |
| comment | yes | `InteractiveActionItem.md` | 位于 like 之后；无激活态。 |
| grass | conditional | `InteractiveActionItem.md` | 仅 `with_grass` 渲染；固定插入 comment 与 share 之间。 |
| share | yes | `InteractiveActionItem.md` | 位于互动动作区末尾。 |
| volume | yes | `InteractiveActionItem.md` | 独立音量控制；不复用普通 ActionItem 高度。 |

## 4. Avatar Dependency Spec

| Role | Token / Variable | Source |
|:---|:---|:---|
| avatar.bounds | `size.interactive_avatar_w` / `size.interactive_avatar_h` | `InteractiveAvatar.md` |
| avatar.image | `avatar.size-42` | `visual/Avatar.md` |
| avatar.border | `stroke.interactive_avatar_image_border` | `InteractiveAvatar.md` |
| live.badge | `size.interactive_avatar_live_badge_w` / `size.interactive_avatar_live_badge_h` / `space.interactive_avatar_live_badge_y` | `InteractiveAvatar.md` |
| live.icon | `icon-cart-fill` / `size.interactive_avatar_live_icon` | `InteractiveAvatar.md` / `visual/Icon.md` |
| live.ring | `size.interactive_avatar_live_ring_outer` / `stroke.interactive_avatar_live_ring_outer` / `opacity.interactive_avatar_live_ring_outer` | `InteractiveAvatar.md` |
| follow.badge | `size.interactive_avatar_follow_badge` / `space.interactive_avatar_follow_x` / `space.interactive_avatar_follow_y` | `InteractiveAvatar.md` |

### 4.1 Avatar State Matrix Contract

| liveState | relationship | Must Render | Must Not Render |
|:---|:---|:---|:---|
| `not_live` | `unfollowed` | Avatar + white border + red 20×20 plus badge | Live badge / live ring |
| `not_live` | `intermediate` | Avatar + white border + white 20×20 badge + brand-color check icon | Live badge / live ring |
| `not_live` | `followed` | Avatar + white border | Follow badge / live badge / live ring |
| `live` | `unfollowed` | Live badge + outer live ring + avatar + red plus badge | Inner live ring |
| `live` | `intermediate` | Live badge + outer live ring + avatar + white badge + brand-color check icon | Inner live ring |
| `live` | `followed` | Live badge + outer live ring + inner live ring + avatar | Follow badge |

## 5. ActionItem Dependency Spec

| Role | Token / Variable | Source |
|:---|:---|:---|
| action.bounds | `size.interactive_icon` / `size.action_item` | `InteractiveActionItem.md` / `visual/Icon.md` |
| action.icon.content | `size.action_item_content` | `InteractiveActionItem.md` |
| action.label.position | `space.action_item_label_top` / `space.action_item_bottom_inset` | `InteractiveActionItem.md` |
| action.label.type | `font_size_11_500` proposal / `font_weight_medium` | `InteractiveActionItem.md` / `typography.md` |
| action.label.color | `color/text_immerse` | `InteractiveActionItem.md` / `color.md` |
| action.icon.default | `color/title_immerse` | `InteractiveActionItem.md` / `color.md` |
| action.like.active | `color/primary` | `InteractiveActionItem.md` / `color.md` |
| action.grass.active | `color/Recommend_btntext` | `InteractiveActionItem.md` / `color.md` |
| action.shadow | `shadow_interactive` | `InteractiveActionItem.md` / `shadow.md` |

### 5.1 Click State Contract

| Action | Default | Active | Active Allowed |
|:---|:---|:---|:---|
| `like` | White icon + immerse count | Brand red icon + brand red count | yes |
| `comment` | White icon + immerse count | — | no |
| `grass` | White icon + immerse count | Recommend green icon + recommend green count | yes |
| `share` | White icon + immerse label/count | — | no |

点赞和种草的点击高亮态必须在发布页与工程 demo 中同时出现；评论和转发不得伪造 active 态。

## 6. Volume Dependency Spec

| Role | Token / Variable | Source |
|:---|:---|:---|
| volume.hotzone | `size.interactive_volume_hotzone` | `InteractiveActionItem.md` |
| volume.circle | `size.interactive_volume_circle` / `space.interactive_volume_circle_inset` | `InteractiveActionItem.md` |
| volume.icon.compact | `size.interactive_volume_icon_compact` / `space.interactive_volume_icon_compact_inset` | `InteractiveActionItem.md` |
| volume.pill | `size.interactive_volume_control_w` / `size.interactive_volume_control_h` | `InteractiveActionItem.md` |
| volume.label | `font.interactive_volume_label` / `line_height.interactive_volume_label` | `InteractiveActionItem.md` |
| volume.inline_icon | `size.interactive_volume_icon_inline` / `space.interactive_volume_inline_icon_x` / `space.interactive_volume_inline_icon_y` | `InteractiveActionItem.md` |
| volume.color | `color.interactive_volume_bg` / `color.interactive_volume_fg` / `opacity.interactive_volume_content` | `InteractiveActionItem.md` |
| volume.radius | `radius.interactive_volume_circle` / `radius.interactive_volume_pill` | `InteractiveActionItem.md` |

## 7. Token Mapping

| Component Role | Token Dependency |
|:---|:---|
| container.width | `size.interactive_avatar_w` / `size.interactive_icon` |
| container.height.without_grass | formula from child component tokens |
| container.height.with_grass | formula from child component tokens |
| stack.gap | `space.action_item_stack_gap` |
| avatar | `InteractiveAvatar.md` + `visual/Avatar.md` |
| action_item | `InteractiveActionItem.md` + `visual/Icon.md` |
| volume_control | `InteractiveActionItem.md` volume section |
| immersive.text | `color/text_immerse` / `color/title_immerse` |
| active.like | `color/primary` |
| active.grass | `color/Recommend_btntext` |
| shadow | `shadow_interactive` |

## 8. Required Missing Tokens

| TODO | Reason |
|:---|:---|
| TODO: missing token dependency — `font_size_11_500` | 互动计数文字实测 11px / 500，typography 层需补齐组合 token。 |
| TODO: missing token dependency — `size.interactive_area_without_grass_h` | 可选：若工程需要固定总高 token，可由公式沉淀。 |
| TODO: missing token dependency — `size.interactive_area_with_grass_h` | 可选：若工程需要固定总高 token，可由公式沉淀。 |
| TODO: missing token dependency — `z_index.interactive_area` | 右侧栏悬浮层级属于页面布局层，当前组件不声明。 |
