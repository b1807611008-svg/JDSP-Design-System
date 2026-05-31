---
file: variants
component_name: InteractiveArea
slug: interactive-area
version: "1.0.0"
last_updated: "2026-05-25"
---

# InteractiveArea · Variants

## Presentation Matrix（建议 spec-page.html Demo）

| 维度 | 值 | 控制内容 |
|:---|:---|:---|
| 组合 `variant` | `without_grass` / `with_grass` | 是否展示种草操作项。 |
| 头像 `liveState` | `not_live` / `live` | 直播标签、直播环与头像 y 协议。 |
| 关系 `relationship` | `unfollowed` / `intermediate` / `followed` | 关注按钮展示与状态。 |
| 操作项 `state` | `default` / `active` / `disabled` | 图标颜色、计数文字、点击能力。 |
| 音量 `state` | `muted` / `unmute_prompt` | 圆形静音按钮 / 胶囊取消静音按钮。 |

## Reusable Variant Dimensions

| Dimension | Owns Logic | Owns Visual |
|:---|:---|:---|
| `variant` | InteractiveArea2 | 子组件视觉不变，只决定是否插入 grass。 |
| `liveState` | InteractiveAvatar | InteractiveAvatar.md |
| `relationship` | InteractiveAvatar | InteractiveAvatar.md |
| `action.type` | InteractiveActionItem | InteractiveActionItem.md / visual/Icon.md |
| `action.state` | InteractiveActionItem | InteractiveActionItem.md |
| `volume.state` | InteractiveVolumeControl | InteractiveActionItem.md volume section |

InteractiveArea2 只组合这些维度，不把子组件状态合并成新的视觉变体。

## Variant Matrix

| Variant | Trigger | Required Layers | Degrade To |
|:---|:---|:---|:---|
| `without_grass` | 默认互动区或业务无种草能力 | Avatar + like + comment + share + volume | — |
| `with_grass` | 业务开启种草能力 | Avatar + like + comment + grass + share + volume | `without_grass` |
| `avatar_not_live` | 作者未直播 | Avatar image + relationship badge | — |
| `avatar_live` | 作者直播中 | Live badge + live ring + Avatar image + relationship badge | `avatar_not_live` |
| `relationship_unfollowed` | 未关注 | Red follow badge + plus icon | — |
| `relationship_intermediate` | 关注处理中 / 中间态 | White badge + brand-color check icon | `relationship_unfollowed` |
| `relationship_followed` | 已关注 | Hide follow badge | — |
| `action_default` | 操作未激活 | Interactive icon + label | — |
| `action_active` | like / grass 激活 | Active color + label sync | `action_default` |
| `action_disabled` | 操作不可用 | Disabled token + no event | `action_default` |
| `volume_muted` | 默认静音 | 50×50 hotzone + 30 circle + compact icon | — |
| `volume_unmute_prompt` | 需要提示恢复声音 | 69×30 pill + label + inline icon | `volume_muted` |

## 1. without_grass

- relay: `633:4487`
- order:
  - `InteractiveAvatar`
  - `InteractiveActionItem(type="like")`
  - `InteractiveActionItem(type="comment")`
  - `InteractiveActionItem(type="share")`
  - `InteractiveVolumeControl`
- rule:
  - must not render grass placeholder.
  - height is formula-derived from child tokens.

## 2. with_grass

- relay: `1600:1053`
- order:
  - `InteractiveAvatar`
  - `InteractiveActionItem(type="like")`
  - `InteractiveActionItem(type="comment")`
  - `InteractiveActionItem(type="grass")`
  - `InteractiveActionItem(type="share")`
  - `InteractiveVolumeControl`
- rule:
  - grass is inserted only between comment and share.
  - if grass payload is missing, degrade to `without_grass`.

## 3. avatar_live / avatar_not_live

- source: `InteractiveAvatar.md`
- live:
  - show live badge with `icon-cart-fill`.
  - show outer breathing ring.
  - show inner ring only when `relationship=followed`.
- not_live:
  - hide live badge and live ring.
  - keep avatar border and relationship badge rules.

## 4. relationship states

| Relationship | Rule |
|:---|:---|
| `unfollowed` | Show red 20×20 follow badge with plus icon. |
| `intermediate` | Show white 20×20 badge with brand-color check icon. |
| `followed` | Hide follow badge; avatar remains clickable. |

## 5. action states

| Action | Default | Active | Disabled |
|:---|:---|:---|:---|
| like | `icon-like-default` + count | `icon-like-active` + primary color | disabled token + no click |
| comment | `icon-comment-default` + count | not applicable | disabled token + no click |
| grass | `icon-grass-default` + count | `icon-grass-active` + recommend green | disabled token + no click |
| share | `icon-share-default` + count / label | not applicable | disabled token + no click |

## 5.1 Required Presentation Matrix

发布页与评审稿必须把状态拆开展示，不能只用一个有种草激活样例代表所有状态。

| Matrix | Rows | Columns | Notes |
|:---|:---|:---|:---|
| Avatar state | `not_live` / `live` | `unfollowed` / `intermediate` / `followed` | 来自 `InteractiveAvatar.md`。直播行展示 live badge + outer ring；只有 `live + followed` 展示 inner ring。 |
| Rail composition | `without_grass` / `with_grass` | default actions / highlighted actions | `without_grass` 无 grass slot；`with_grass` 必须有 grass slot。 |
| Action click state | `like` / `grass` | `default` / `active` | 点赞激活为 primary red；种草激活为 recommend green。 |
| Unsupported active | `comment` / `share` | default only | 不提供 active 态；点击只输出事件或打开面板。 |

## 6. volume states

- `muted`:
  - 50×50 hotzone.
  - 30×30 circular visual base.
  - compact mute icon centered by volume tokens.
- `unmute_prompt`:
  - 69×30 pill.
  - label fixed as `取消静音`.
  - inline mute icon follows volume token offsets.
