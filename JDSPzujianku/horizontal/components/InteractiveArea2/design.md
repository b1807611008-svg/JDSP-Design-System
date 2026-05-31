---
component_name: InteractiveArea
slug: interactive-area
layer: Component Composition Layer
version: "1.0.0"
status: draft
last_updated: "2026-05-25"
relay_source:
  file_id: "1958051135088508929"
  page_id: "0:13090"
  page_name: "互动区"
  scope_node: "1600:588"
  reference_nodes:
    area_component: "1600:588"
    without_grass: "633:4487"
    with_grass: "1600:1053"
    avatar_stage: "633:3418"
    action_item: "823:3046"
    volume_control: "633:3616 / 1791:107"
dependencies:
  component_docs:
    - references/InteractiveArea/InteractiveAvatar.md
    - references/InteractiveArea/InteractiveActionItem.md
  tokens:
    - ../../foundations/tokens/color.md
    - ../../foundations/tokens/typography.md
    - ../../foundations/tokens/spacing.md
    - ../../foundations/tokens/radius.md
    - ../../foundations/tokens/shadow.md
  visual:
    - ../../foundations/visual/Avatar.md
    - ../../foundations/visual/Icon.md
source_frontmatter_audit:
  standard_reference:
    path: ../video-top-tab/
    files:
      - design.md
      - spec.md
      - variants.md
      - behaviors.md
      - ai-schema.yaml
      - CHANGELOG.md
  legacy_source:
    path: references/InteractiveArea/
    markdown_docs:
      - InteractiveArea.md
      - InteractiveAvatar.md
      - InteractiveActionItem.md
    html_outputs_ignored:
      - InteractiveArea.html
      - InteractiveAvatar.html
      - interactive-action-item-spec.html
extracted_reusable_contracts:
  - composition_order
  - avatar_state_matrix
  - action_item_contract
  - volume_control_contract
  - event_payload_contract
  - presentation_state_matrix
---

# InteractiveArea — 互动区

## 1. Definition

**InteractiveArea** 是短视频沉浸流右侧互动栏的完整组合组件，负责把作者头像入口、点赞、评论、可选种草、转发与音量控制组织成一条稳定的垂直 Action Rail。

本组件属于 **Component Composition Layer**。它只组合 `InteractiveAvatar`、`InteractiveActionItem` 与 `InteractiveVolumeControl`，不在组合层重新定义头像、图标、字体、颜色、间距、圆角或阴影基础样式。

## 2. Composition

```text
InteractiveArea
├── InteractiveAvatar
├── InteractiveActionItem(type="like")
├── InteractiveActionItem(type="comment")
├── InteractiveActionItem(type="grass")  # with_grass only
├── InteractiveActionItem(type="share")
└── InteractiveVolumeControl
    ├── muted
    └── unmute_prompt
```

## 3. Design Principles

| Principle | Rule |
|:---|:---|
| 组合优先 | InteractiveArea 只声明子组件顺序、变体开关与事件透传；具体视觉由子组件文档维护。 |
| 子组件单源 | 头像状态以 `InteractiveAvatar.md` 为准；互动图标、计数文字、音量控制以 `InteractiveActionItem.md` 为准。 |
| 垂直节奏稳定 | 子项自上而下固定为头像、互动动作、音量控制；不得在组合层插入额外 padding 或 gap。 |
| 变体不占位 | `without_grass` 不渲染种草占位；`with_grass` 只在评论与转发之间插入种草项。 |
| 沉浸可读 | 默认工作在视频背景上；图标、文字、头像描边与直播状态必须继承沉浸态 token 与 shadow。 |
| 音量独立 | 音量控制不是普通 ActionItem，不复用 `size.action_item`，必须使用自身 hotzone 与状态变量。 |

## 4. Source Analysis

| Area | Relay Evidence | Interpretation |
|:---|:---|:---|
| 互动区总组件 | `1600:588` | 外层包含 `without_grass` 与 `with_grass` 两种组合形态；画布 x/y 仅作展示，不进入工程 token。 |
| 无种草 | `633:4487` | 顺序：头像 → 点赞 → 评论 → 转发 → 音量。 |
| 有种草 | `1600:1053` | 顺序：头像 → 点赞 → 评论 → 种草 → 转发 → 音量。 |
| 头像状态 | `633:3418` | 2×3 状态矩阵：非直播 / 直播中 × 未关注 / 中间态 / 已关注。 |
| 操作项 | `823:3046` | 图标 50×50 互动区热区 + 计数文字；点赞 / 评论 / 种草 / 转发共享结构。 |
| 音量控制 | `633:3616` / `1791:107` | 支持静音圆形按钮与「取消静音」胶囊按钮，两者使用独立尺寸与偏移变量。 |

## 4.1 Required Presentation States

InteractiveArea2 的发布展示必须覆盖组合层、头像层与互动操作层的关键状态，避免只展示单一默认栏。

| State Group | Required Coverage | Source |
|:---|:---|:---|
| 头像关注关系 | `unfollowed` / `intermediate` / `followed` | `InteractiveAvatar.md` 2×3 状态矩阵。 |
| 头像直播状态 | `not_live` / `live` | `InteractiveAvatar.md` 的非直播 / 直播中两行状态。 |
| 组合种草能力 | `without_grass` / `with_grass` | Relay `633:4487` / `1600:1053`。 |
| 点赞状态 | `like.default` / `like.active` | `InteractiveActionItem` 点赞默认与品牌红激活态。 |
| 种草状态 | `grass.default` / `grass.active` | `InteractiveActionItem` 种草默认与推荐绿激活态。 |

发布页 `spec-page.html` 应至少展示：

1. 头像 2×3 矩阵：非直播 / 直播中 × 未关注 / 中间态 / 已关注。
2. 无种草组合：默认点赞、默认互动操作、静音圆形按钮。
3. 有种草组合：种草 slot 位于评论与转发之间。
4. 操作状态矩阵：点赞 default / active、种草 default / active，并明确评论、转发无 active 态。

## 5. Dependency Contract

| Dependency | Source | Usage |
|:---|:---|:---|
| InteractiveAvatar | `references/InteractiveArea/InteractiveAvatar.md` | 作者头像、直播标签、直播环、关注关系状态。 |
| InteractiveActionItem | `references/InteractiveArea/InteractiveActionItem.md` | 点赞、评论、种草、转发的图标、计数文字与状态色。 |
| InteractiveVolumeControl | `references/InteractiveArea/InteractiveActionItem.md` | 底部静音 / 取消静音控制。 |
| color | `tokens/color.md` | 沉浸文字、图标默认色、激活色、音量前景与背景。 |
| typography | `tokens/typography.md` | 计数文字、直播标签、音量文案。 |
| spacing | `tokens/spacing.md` | 子组件内部定位与组合节奏的 token 来源。 |
| radius | `tokens/radius.md` | 头像、关注按钮、直播标签、音量胶囊/圆形按钮。 |
| shadow | `tokens/shadow.md` | 沉浸视频背景上的图标与文字防穿透。 |
| visual | `visual/Avatar.md` / `visual/Icon.md` | 头像原子与互动区专属 icon 规范。 |

## 6. Reusable Contracts

| Contract | Reused By | Stable Rule |
|:---|:---|:---|
| `composition_order` | `spec.md` / `variants.md` / `behaviors.md` / `ai-schema.yaml` | `avatar → like → comment → optional grass → share → volume` 是组合层唯一顺序来源。 |
| `avatar_state_matrix` | `spec.md` / `variants.md` / `behaviors.md` | 头像视觉仍由 `InteractiveAvatar.md` 的 `liveState × relationship` 2×3 矩阵维护。 |
| `action_item_contract` | `spec.md` / `variants.md` / `behaviors.md` | like / comment / grass / share 共享 `InteractiveActionItem` 尺寸、计数、阴影和图标着色协议。 |
| `volume_control_contract` | `spec.md` / `variants.md` / `behaviors.md` | volume 只复用音量控制二级组件，不复用普通 ActionItem 高度与计数逻辑。 |
| `event_payload_contract` | `behaviors.md` / `ai-schema.yaml` | 组合层只输出事件 payload，不托管业务 truth。 |
| `presentation_state_matrix` | `spec-page.html` / `variants.md` | 发布页必须显式展示头像、直播、种草、点赞和种草激活态组合。 |

这些契约是 InteractiveArea2 的“逻辑样式”：它们整理组合、状态与事件边界，不改变原互动区视觉 token、尺寸、颜色、字体、圆角、阴影或资产归属。

## 7. Non Goals

- 不在 InteractiveArea2 中重绘 `InteractiveAvatar` 或 `InteractiveActionItem`。
- 不把互动区 icon 从 `visual/Icon.md` 的 interactive 规则中拆出另建系统。
- 不在组合层新增裸 CSS 数值；需要总高度时只能由子组件变量公式推导。
- 不把 Relay 外层画布展示坐标当作工程布局 token。

## 8. Traceability

| ID | Type | Description |
|:---|:---|:---|
| IA2-TRACE-01 | Structure | 新 bundle 参考 `video-top-tab` 的 page-doc 形式重写：design/spec/variants/behaviors/ai-schema/CHANGELOG。 |
| IA2-TRACE-02 | Source | 内容从原 `InteractiveArea.md`、`InteractiveAvatar.md`、`InteractiveActionItem.md` 归并，但不修改原目录。 |
| IA2-TRACE-03 | Relay | 组合范围以 `1600:588` 为主，子组件分别追溯到头像、操作项与音量控制节点。 |
| IA2-TRACE-04 | Frontmatter | 已对照 `video-top-tab` bundle 与旧 `InteractiveArea` 三份 Markdown frontmatter；旧目录 HTML 产物不迁入新 bundle。 |
| IA2-TRACE-05 | Reuse | 已抽出组合顺序、头像状态矩阵、操作项契约、音量契约和事件 payload 契约，供 spec / variants / behaviors / schema 复用。 |
