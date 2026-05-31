---
component_name: InteractiveArea
component_name_zh: 互动区
category: Organism
version: "1.0.0"
last_updated: "2026-05-24"
relay_source:
  page_url: "https://relay.jd.com/file/design?id=1958051135088508929&page_id=0%3A13090&node_id=1600%3A588"
  core_node: "1600:588"
  mcp_verified_nodes:
    - node: "1600:588"
      desc: "互动区总组件：无种草 / 有种草两种组合（MCP get_design_context + get_design_metadata + get_variables + get_screenshot 校验）"
    - node: "633:4487"
      desc: "属性1=无种草"
    - node: "1600:1053"
      desc: "属性1=有种草"
mcp_access_note: >
  已通过 zero-design MCP 读取 Relay 节点 1600:588。该节点为互动区组合组件，
  由 InteractiveAvatar、InteractiveActionItem 与 InteractiveVolumeControl 自上而下垂直堆叠。
  本文档只认领 JDSPzujianku/horizontal/components 现有组件文档中已经声明的变量；
  对未沉淀为变量的画布示例偏移，不输出为工程变量。
component_dependencies:
  - InteractiveAvatar (components/InteractiveAvatar.md)
  - InteractiveActionItem (components/InteractiveActionItem.md)
  - InteractiveVolumeControl (defined in components/InteractiveActionItem.md)
token_files_referenced:
  - components/InteractiveAvatar.md
  - components/InteractiveActionItem.md
  - ../../foundations/visual/Avatar.md
  - ../../foundations/visual/Icon.md
  - ../../foundations/tokens/color.md
  - ../../foundations/tokens/spacing.md
  - ../../foundations/tokens/typography.md
  - ../../foundations/tokens/shadow.md
  - ../../foundations/tokens/radius.md
---

# InteractiveArea — 互动区

## 1. 组件概述 (Overview)

**InteractiveArea** 是短视频沉浸式播放页右侧互动栏的完整组合组件（Organism）。组件顶部承载作者头像入口（InteractiveAvatar），下方依次承载点赞、评论、可选种草、转发以及底部音量控制。

**适用场景**：
- 短视频沉浸流右侧 Action Rail；
- 视频背景上需要同时展示作者身份、关注关系、直播状态、互动动作与音量控制的场景；
- 根据业务是否开放「种草」能力，在 `无种草` 与 `有种草` 两种组合形态之间切换。

> **层级说明（Atomic Design）**：  
> InteractiveArea = InteractiveAvatar（Molecule）+ N × InteractiveActionItem（Molecule）+ InteractiveVolumeControl（Molecule） → Organism

---

## 2. 设计稿结构 (Relay Structure)

Relay 节点 `1600:588` 名称为「互动区」，内部包含两个组合变体：

| 组合变体 | Relay 节点 | 子项顺序 | 高度计算 |
|:---|:---|:---|:---|
| `without_grass` / 无种草 | `633:4487` | InteractiveAvatar → like → comment → share → volume | `size.interactive_avatar_h + 3 × size.action_item + size.interactive_volume_hotzone + 4 × space.action_item_stack_gap` |
| `with_grass` / 有种草 | `1600:1053` | InteractiveAvatar → like → comment → grass → share → volume | `size.interactive_avatar_h + 4 × size.action_item + size.interactive_volume_hotzone + 5 × space.action_item_stack_gap` |

> 说明：设计稿中两列 x/y 位置仅用于画布展示，不作为工程布局 token 输出。工程实现只消费子组件尺寸与堆叠间距变量。

---

## 3. 解剖结构 (Anatomy)

```text
InteractiveArea
├── InteractiveAvatar
├── InteractiveActionItem(type="like")
├── InteractiveActionItem(type="comment")
├── InteractiveActionItem(type="grass")  ← 仅 with_grass 渲染
├── InteractiveActionItem(type="share")
└── InteractiveVolumeControl
```

### 3.1 无种草结构

```text
┌──────────────────────────┐
│ InteractiveAvatar         │  size.interactive_avatar_h
├──────────────────────────┤
│ Like ActionItem           │  size.action_item
├──────────────────────────┤
│ Comment ActionItem        │  size.action_item
├──────────────────────────┤
│ Share ActionItem          │  size.action_item
├──────────────────────────┤
│ InteractiveVolumeControl  │  size.interactive_volume_hotzone
└──────────────────────────┘
```

### 3.2 有种草结构

```text
┌──────────────────────────┐
│ InteractiveAvatar         │  size.interactive_avatar_h
├──────────────────────────┤
│ Like ActionItem           │  size.action_item
├──────────────────────────┤
│ Comment ActionItem        │  size.action_item
├──────────────────────────┤
│ Grass ActionItem          │  size.action_item
├──────────────────────────┤
│ Share ActionItem          │  size.action_item
├──────────────────────────┤
│ InteractiveVolumeControl  │  size.interactive_volume_hotzone
└──────────────────────────┘
```

---

## 4. Token 认领规则 (Token Mapping)

> 本文档不新增变量名。所有尺寸、间距、颜色、字体、圆角、阴影均从 `components/InteractiveAvatar.md` 与 `components/InteractiveActionItem.md` 认领；若实现层需要总容器宽高，应使用下表公式由子组件变量计算，不得新建临时 CSS 数值。

### 4.1 容器与堆叠

| 属性 | Token / 变量认领 | 来源文档 | 规则 |
|:---|:---|:---|:---|
| 互动区宽度 | `size.interactive_avatar_w` / `size.interactive_icon` | `InteractiveAvatar.md` / `InteractiveActionItem.md` | 子组件宽度均为同一互动区宽度；总容器宽取子组件宽度，不另设新变量。 |
| 头像区高度 | `size.interactive_avatar_h` | `InteractiveAvatar.md` | 顶部作者头像入口高度。 |
| 操作项高度 | `size.action_item` | `InteractiveActionItem.md` | 点赞 / 评论 / 种草 / 转发统一高度。 |
| 音量热区高度 | `size.interactive_volume_hotzone` | `InteractiveActionItem.md` | 底部音量控制热区高度。 |
| 子项垂直间距 | `space.action_item_stack_gap` | `InteractiveActionItem.md` | Relay 节点中组合容器为 column 且无额外 gap；组合层沿用该变量。 |
| 无种草总高度 | 公式认领 | components 现有变量 | `size.interactive_avatar_h + 3 × size.action_item + size.interactive_volume_hotzone + 4 × space.action_item_stack_gap` |
| 有种草总高度 | 公式认领 | components 现有变量 | `size.interactive_avatar_h + 4 × size.action_item + size.interactive_volume_hotzone + 5 × space.action_item_stack_gap` |

### 4.2 顶部头像区

| 元素 | Token / 变量认领 | 来源文档 |
|:---|:---|:---|
| 头像组件容器 | `size.interactive_avatar_w` / `size.interactive_avatar_h` | `InteractiveAvatar.md` |
| 头像本体尺寸 | `avatar.size-42` | `visual/Avatar.md`，由 `InteractiveAvatar.md` 认领 |
| 头像描边 | `stroke.interactive_avatar_image_border` | `InteractiveAvatar.md` |
| 直播环 | `size.interactive_avatar_live_ring_outer` / `size.interactive_avatar_live_ring_inner` / `stroke.interactive_avatar_live_ring_outer` / `stroke.interactive_avatar_live_ring_inner` / `opacity.interactive_avatar_live_ring_outer` | `InteractiveAvatar.md` |
| 直播标签 | `size.interactive_avatar_live_badge_w` / `size.interactive_avatar_live_badge_h` / `space.interactive_avatar_live_badge_y` | `InteractiveAvatar.md` |
| 关注按钮 | `size.interactive_avatar_follow_badge` / `space.interactive_avatar_follow_x` / `space.interactive_avatar_follow_y` | `InteractiveAvatar.md` |
| 未关注加号图标 | `icon-add` 局部描边变体 | `InteractiveAvatar.md` | 仅 `relationship=unfollowed` 的 Follow Badge 内使用；白色 1px 居中描边，不修改全局 `icon-add.svg`。 |

### 4.3 互动操作项

| 元素 | Token / 变量认领 | 来源文档 |
|:---|:---|:---|
| 图标容器 | `size.interactive_icon` | `InteractiveActionItem.md` / `visual/Icon.md` |
| 操作项容器 | `size.action_item` | `InteractiveActionItem.md` |
| 图标视觉内容 | `size.action_item_content` | `InteractiveActionItem.md` |
| 计数文字顶部定位 | `space.action_item_label_top` | `InteractiveActionItem.md` |
| 计数文字底部留白 | `space.action_item_bottom_inset` | `InteractiveActionItem.md` |
| 计数文字颜色 | `color/text_immerse` | `InteractiveActionItem.md` / `tokens/color.md` |
| 默认图标颜色 | `color/title_immerse` | `InteractiveActionItem.md` / `tokens/color.md` |
| 点赞激活色 | `color/primary` | `InteractiveActionItem.md` / `tokens/color.md` |
| 种草激活色 | `color/Recommend_btntext` | `InteractiveActionItem.md` / `tokens/color.md` |
| 禁用色 | `color/text_disable` | `InteractiveActionItem.md` / `tokens/color.md` |
| 计数文字阴影 | `shadow_interactive` | `InteractiveActionItem.md` / `tokens/shadow.md` |

### 4.4 音量控制

| 元素 | Token / 变量认领 | 来源文档 |
|:---|:---|:---|
| 音量按钮热区 | `size.interactive_volume_hotzone` | `InteractiveActionItem.md` |
| 静音圆形视觉底 | `size.interactive_volume_circle` | `InteractiveActionItem.md` |
| 静音图标尺寸 | `size.interactive_volume_icon_compact` | `InteractiveActionItem.md` |
| 热区内圆形偏移 | `space.interactive_volume_circle_inset` | `InteractiveActionItem.md` |
| 热区内图标偏移 | `space.interactive_volume_icon_compact_inset` | `InteractiveActionItem.md` |
| 胶囊态尺寸 | `size.interactive_volume_control_w` / `size.interactive_volume_control_h` | `InteractiveActionItem.md` |
| 胶囊态文案定位 | `space.interactive_volume_label_x` / `space.interactive_volume_label_y` | `InteractiveActionItem.md` |
| 胶囊态图标定位 | `space.interactive_volume_inline_icon_x` / `space.interactive_volume_inline_icon_y` | `InteractiveActionItem.md` |
| 背景色 | `color.interactive_volume_bg` | `InteractiveActionItem.md` |
| 前景色 | `color.interactive_volume_fg` | `InteractiveActionItem.md` |
| 内容透明度 | `opacity.interactive_volume_content` | `InteractiveActionItem.md` |
| 圆角 | `radius.interactive_volume_circle` / `radius.interactive_volume_pill` | `InteractiveActionItem.md` |

---

## 5. 变体与配置 (Variants & Props)

### 5.1 组件 Props 定义

```typescript
type InteractiveAreaVariant = 'without_grass' | 'with_grass';

interface InteractiveAreaProps {
  /** 是否展示种草操作项；对应 Relay 变体：属性1=无种草 / 属性1=有种草 */
  variant: InteractiveAreaVariant;

  /** 顶部头像入口配置，透传给 InteractiveAvatar */
  avatar: InteractiveAvatarProps;

  /** 点赞操作项配置，透传给 InteractiveActionItem(type="like") */
  like: Omit<InteractiveActionItemProps, 'type'>;

  /** 评论操作项配置，透传给 InteractiveActionItem(type="comment") */
  comment: Omit<InteractiveActionItemProps, 'type'>;

  /** 种草操作项配置；variant="with_grass" 时必填 */
  grass?: Omit<InteractiveActionItemProps, 'type'>;

  /** 转发操作项配置，透传给 InteractiveActionItem(type="share") */
  share: Omit<InteractiveActionItemProps, 'type'>;

  /** 音量控制配置，透传给 InteractiveVolumeControl */
  volume: InteractiveVolumeControlProps;
}
```

### 5.2 组合变体

| `variant` | Relay 节点 | 必渲染子组件 | 条件渲染子组件 | 规则 |
|:---|:---|:---|:---|:---|
| `without_grass` | `633:4487` | `InteractiveAvatar`、`like`、`comment`、`share`、`InteractiveVolumeControl` | — | 不保留种草占位，不输出空容器。 |
| `with_grass` | `1600:1053` | `InteractiveAvatar`、`like`、`comment`、`grass`、`share`、`InteractiveVolumeControl` | `grass` | 种草位插入在评论与转发之间。 |

### 5.3 子组件状态透传

| 子组件 | 状态来源 | 说明 |
|:---|:---|:---|
| `InteractiveAvatar` | `avatar.liveState` / `avatar.relationship` | 直播标签、直播环、关注按钮全部由头像子组件内部规则控制。 |
| `InteractiveActionItem(type="like")` | `like.isActive` / `like.disabled` / `like.count` | 点赞支持激活态。 |
| `InteractiveActionItem(type="comment")` | `comment.disabled` / `comment.count` | 评论无激活态。 |
| `InteractiveActionItem(type="grass")` | `grass.isActive` / `grass.disabled` / `grass.count` | 仅 `with_grass` 渲染，支持激活态。 |
| `InteractiveActionItem(type="share")` | `share.disabled` / `share.count` | 转发无激活态。 |
| `InteractiveVolumeControl` | `volume.state` | 支持 `muted` 与 `unmute_prompt`。 |

---

## 6. 布局与显示规则 (Layout Rules)

1. InteractiveArea 必须使用纵向堆叠，子项顺序严格遵循 Relay：头像在最上方，互动 icon 在下方，音量控制在底部。
2. 子项之间不新增外部间距；垂直间距只允许引用 `space.action_item_stack_gap`。
3. 总容器宽度由 `size.interactive_avatar_w` 与 `size.interactive_icon` 共同约束；若两者未来不一致，必须回到子组件文档修正，不在 InteractiveArea 内新增覆盖变量。
4. `without_grass` 变体不得渲染种草占位，否则会破坏总高度公式和视觉节奏。
5. `with_grass` 变体中，种草操作项必须位于评论与转发之间，不允许放到点赞前或音量控制前。
6. 音量控制不复用 `size.action_item`，必须使用 `size.interactive_volume_hotzone` 或 `InteractiveVolumeControl` 自身状态变量。

---

## 7. 工程实现约束 (Implementation Constraints)

- 严禁在 InteractiveArea 中写死任何 CSS 数值；所有样式必须透传到子组件或引用本文 Token 认领表中的已有变量。
- InteractiveArea 不负责重绘头像、图标、直播标签、关注按钮或音量按钮；这些视觉细节由 `InteractiveAvatar.md` 与 `InteractiveActionItem.md` 维护。
- InteractiveArea 只负责组合顺序、变体开关、事件透传和可访问语义聚合。
- 若业务需要调整右侧栏整体定位，应在页面布局层处理；`1600:588` 中两列示例的画布 x/y 不属于本组件 token。
- 若后续新增收藏、购物车等操作位，需先在 `InteractiveActionItem.md` 中补齐 type、资产、状态与 token 映射，再由 InteractiveArea 引入。
- 未关注态 Follow Badge 内的 `icon-add` 是头像子组件的局部描边特例，组合层不得复用全局无描边加号替换，也不得让其它加号入口继承该描边。

---

## 8. 异常记录与待办 (Traceability & TODOs)

| ID | 类型 | 说明 |
|:---|:---|:---|
| IA-AREA-01 | token-check | 本文档未新增变量名；总高度使用 `InteractiveAvatar.md` 与 `InteractiveActionItem.md` 中现有变量公式表达。 |
| IA-AREA-02 | design-note | Relay 外层 frame `1600:588` 的 188×428 与两列 x/y 位置是设计稿展示画布，不作为组件工程尺寸。 |
| IA-AREA-03 | dependency | `InteractiveAvatar.md` 中若干变量仍标记为待沉淀；InteractiveArea 仅引用这些已存在于组件文档的命名，不额外扩展。 |
| IA-AREA-04 | icon-special | `relationship=unfollowed` 的 `icon-add` 具有 1px 居中描边，仅限 Follow Badge 内部。 |
