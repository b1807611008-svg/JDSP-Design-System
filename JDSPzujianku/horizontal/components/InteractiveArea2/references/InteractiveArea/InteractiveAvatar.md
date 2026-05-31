---
component_name: InteractiveAvatar
component_name_zh: 互动区-头像
category: Molecule
version: "1.0.0"
last_updated: "2026-05-24"
relay_source:
  page_url: "https://relay.jd.com/file/design?id=1958051135088508929&page_id=0%3A13090&node_id=633%3A3418"
  core_node: "633:3418"
  mcp_verified_nodes:
    - node: "633:3418"
      desc: "互动区-头像状态矩阵（MCP get_design_context + get_design_metadata + get_variables + get_screenshot 校验）"
    - node: "633:3416"
      desc: "状态=非直播,关系=未关注"
    - node: "633:3509"
      desc: "状态=非直播,关系=中间态"
    - node: "633:3448"
      desc: "状态=非直播,关系=已关注"
    - node: "633:3420"
      desc: "状态=直播中,关系=未关注"
    - node: "633:3526"
      desc: "状态=直播中,关系=中间态"
    - node: "633:3480"
      desc: "状态=直播中,关系=已关注"
mcp_access_note: >
  已通过 zero-design MCP 读取 Relay 节点 633:3418。设计稿为 2×3 状态矩阵：
  非直播 / 直播中 × 未关注 / 中间态 / 已关注。本文档中的尺寸、偏移、颜色和值均以 MCP 返回为准。
atom_dependencies:
  - Avatar (visual/Avatar.md, size 42)
  - Icon (follow plus / follow check / icon-cart-fill)
  - Text (live badge label)
token_files_referenced:
  - tokens/color.md
  - tokens/radius.md
  - tokens/shadow.md
  - visual/Avatar.md
  - visual/Icon.md
---

# InteractiveAvatar — 互动区-头像

## 1. 组件概述 (Overview)

**InteractiveAvatar** 是短视频沉浸式互动区中用于展示作者身份、关注关系与直播状态的复合组件（Molecule）。它以 `Avatar` 原子为核心，叠加关注关系按钮、直播状态标签、直播红色环形描边等状态层。

**适用场景**：
- 短视频流右侧互动列作者头像入口；
- 作者头像需要同时表达「是否直播中」与「关注关系」的沉浸式场景；
- 默认工作在深色 / 视频背景上，组件边界必须通过白色头像描边、品牌红状态层和必要阴影保持可读。

> **层级说明（Atomic Design）**：  
> InteractiveAvatar = Avatar（Atom）+ Icon（Atom）+ Text（Atom）+ 状态装饰层 → Molecule

---

## 2. 解剖结构 (Anatomy)

```text
┌────────────────────────────┐
│ InteractiveAvatar 50×83    │
│ ┌────────────────────────┐ │
│ │ Live Badge 50×21       │ │ ← 仅直播中状态展示，顶部 y=4
│ └────────────────────────┘ │
│ ┌────────────────────────┐ │
│ │ Avatar Area 50×62      │ │ ← 非直播 top=20/21；直播 top=25
│ │  ┌──────────────────┐  │ │
│ │  │ Avatar 42×42     │  │ │ ← x=4；圆形白色 2px 描边
│ │  └──────────────────┘  │ │
│ │       Badge 20×20       │ ← 未关注 / 中间态展示，x=15，y=62（相对外层）
│ └────────────────────────┘ │
└────────────────────────────┘
```

### 2.1 组成原子

| 层 | 原子 / 子层 | 说明 |
|:---|:---|:---|
| A1 | **Avatar** | 头像本体固定 `42×42px`，继承 `visual/Avatar.md` 中 `avatar.size-42`；必须正圆裁切。 |
| A2 | **Avatar Border** | 图片头像固定白色描边 `2px`，用于视频背景上分离头像边界。 |
| A3 | **Follow Badge** | 关注关系状态按钮，固定 `20×20px`，覆盖在头像下方中心。
- unfollowed：使用 `icon-add`，图标视觉尺寸 `16×16px`，白色 `1px` 居中描边加号；**仅该位置的 `icon-add` 带描边**，不得同步修改全局 `icon-add.svg` 或其它加号入口。
- intermediate：使用 `icon-check-fill`，图标视觉尺寸 `20×20px`，品牌色 `0.5px` 居中描边加粗对勾（填满整个关注按钮）。
两者图标均从 `visual/Icon.md` 消费；未关注态如需工程落地，应使用 follow badge 局部 SVG / 局部 symbol 覆盖，不在组件外复用描边版路径。 |
| A4 | **Live Breathing Ring** | 直播中状态的红色外圈呼吸圈，固定 `46×46px`，以头像 `42×42px` 中心为圆心居中对齐；仅 `live + followed` 保留内层 `42×42px` 红环。 |
| A5 | **Live Badge** | 顶部「直播中」胶囊标签，固定 `50×21px`，内部矩形 `48×17px` 含 icon-cart-fill 9px 图标与 9px/500 文案（白色）；矩形正下方中心耦合 10×5.5px 三角形（圆角1、品牌色）。 |

---

## 3. Token 映射规则 (Token Mapping)

> 严禁在实现层裸写样式值。下表中的数值为 MCP 实测值，工程侧需沉淀为组件级 token 或引用已有基础 token。

### 3.1 尺寸与定位

| 属性 | Token 引用 | MCP 实测值 | 来源节点 / 说明 |
|:---|:---|---:|:---|
| 外层容器宽 | `size.interactive_avatar_w` | 50px | `633:3416` / `633:3420` 等 symbol |
| 外层容器高 | `size.interactive_avatar_h` | 83px | `633:3416` / `633:3420` 等 symbol |
| 头像区域宽 | `size.interactive_avatar_area_w` | 50px | 状态主体区域 |
| 头像区域高 | `size.interactive_avatar_area_h` | 62px | `633:3390` / `633:3421` |
| 头像本体 | `avatar.size-42` | 42px | 来自 `visual/Avatar.md` |
| 头像 x 偏移 | `space.interactive_avatar_x` | 4px | 非直播未关注 `633:3394` |
| 非直播头像 y 偏移 | `space.interactive_avatar_y_default` | 30px | 外层 top 21 + 内层头像 top 9；已关注为 top 20 + 10，同为 30 |
| 直播头像 y 偏移 | `space.interactive_avatar_y_live` | 29px | 外层 top 25 + 内层头像 top 4 |
| 关注按钮尺寸 | `size.interactive_avatar_follow_badge` | 20px | `633:3400` / `633:3521` / `633:3550` |
| 关注按钮 x 偏移 | `space.interactive_avatar_follow_x` | 15px | 覆盖头像水平中心 |
| 关注按钮 y 偏移 | `space.interactive_avatar_follow_y` | 62px | 非直播与直播均落在外层 y=62 |
| 未关注加号图标 | `icon-add` 局部描边变体 | 16×16px / stroke 1px center | 仅 `relationship=unfollowed` 的关注按钮内使用；不改全局 icon asset。 |
| 直播标签宽 | `size.interactive_avatar_live_badge_w` | 50px | `633:3436` / `1791:92` / `1791:100` |
| 直播标签高 | `size.interactive_avatar_live_badge_h` | 21px | `633:3436` / `1791:93` |
|| 直播标签内部矩形 | `size.interactive_avatar_live_badge_rect` | 48×17px | 内部承载 icon+text 的矩形区域 |
|| 直播标签三角形 | `size.interactive_avatar_live_badge_triangle` | 10×5.5px (r=1) | 矩形正下方中心耦合的品牌色指针三角形 |
| 直播标签 y 偏移 | `space.interactive_avatar_live_badge_y` | 4px | 外层顶部偏移 |
| 直播标签图标尺寸 | `size.interactive_avatar_live_icon` | 9px | `2075:15` / `2075:14` / `2075:13`，资产名 `icon-cart-fill` |
| 直播标签内容 x 偏移 | `space.interactive_avatar_live_content_x` | 6px | `1791:91` / `1791:97` / `1791:104` |
| 直播标签内容 y 偏移 | `space.interactive_avatar_live_content_y` | 3px | `1791:91` / `1791:97` / `1791:104` |
| 直播标签图标-文案间距 | `space.interactive_avatar_live_gap` | 2px | `gap: 2` |

### 3.2 直播红色环形描边

| 层 | Token 引用 | MCP 实测值 | 说明 |
|:---|:---|---:|:---|
| 外层直播呼吸圈尺寸 | `size.interactive_avatar_live_ring_outer` | 46px | `633:3430` / `633:3490` / `633:3536` |
| 外层直播环描边 | `stroke.interactive_avatar_live_ring_outer` | 0.5px | `#FF0F23`，opacity `0.50` |
| 外层直播环透明度 | `opacity.interactive_avatar_live_ring_outer` | 0.50 | 外层柔化描边 |
| 内层直播环尺寸 | `size.interactive_avatar_live_ring_inner` | 42px | 仅 `live + followed` 保留，位于外层呼吸圈内 `x=2, y=2` |
| 内层直播环描边 | `stroke.interactive_avatar_live_ring_inner` | 1.5px | 仅 `live + followed` 使用；其它直播态已在新稿删除该层 |
| 直播环颜色 | `color.interactive_avatar_live_ring` | `color/primary` = `#ff0f23` | MCP variables 返回品牌色 |

### 3.3 色彩

| 元素 | Token 引用 | MCP 返回值 | 使用说明 |
|:---|:---|:---:|:---|
| 品牌红 / 直播环 / 未关注按钮底 | `color/primary` | `#ff0f23` | MCP variables 返回；用于关注主行动与直播强调。 |
| 头像描边 | `Color/主色 Primary/color_primary_text` / `color/title_immerse` | `#ffffff` | 头像白色描边，保证视频背景上边界清晰。 |
| 中间态按钮底 | `Color/主色 Primary/color_primary_text` | `#ffffff` | 中间态为白底圆形按钮，内部图标由资产表达。 |
| 直播标签文字 | `color/title_immerse` | `#ffffff` | 「直播中」文案。 |
| 直播标签底 / 直播标签图形 | `color/primary` | `#ff0f23` | 设计稿以红色胶囊承载直播状态；直播 icon 必须消费 `visual/Icon.md` 中的 `icon-cart-fill`。 |

### 3.4 圆角与描边

| 元素 | Token 引用 | MCP 实测值 | 规则 |
|:---|:---|---:|:---|
| 头像裁切 | `avatar.radius = circle` / `radius.full` | 100 / 9999 等效 | 继承 Avatar 圆形裁切规则。 |
| 头像图片描边 | `stroke.interactive_avatar_image_border` | 2px | 白色内描边，不增加组件外部占位。 |
| 关注按钮圆角 | `radius.interactive_avatar_follow_badge` | 30px | 20×20 容器上等效圆形。 |
| 直播环圆角 | `radius.interactive_avatar_live_ring` | 9999px | 环形描边必须保持正圆。 |

### 3.4.1 未关注 `icon-add` 特殊描边

未关注态关注按钮中的 `icon-add` 是 InteractiveAvatar 的局部特例：加号图形需保留 `1px` 居中描边，以增强红底圆形按钮上的边缘清晰度。该描边只作用于 `relationship=unfollowed` 的 Follow Badge，不得推广到：

1. 全局 `icon-add.svg` 资产；
2. 普通加号按钮；
3. 中间态 / 已关注态；
4. InteractiveActionItem 的任意互动图标。

工程实现优先使用局部 inline SVG 或局部 symbol 覆盖，确保描边随 `currentColor` / `color/title_immerse` 着色，同时不污染其它使用 `icon-add` 的场景。

### 3.5 直播标签文字

| 属性 | Token 引用 | MCP 实测值 | 说明 |
|:---|:---|:---|:---|
| 文案 | 固定文案 | 直播中 | 仅 `live` 状态展示。 |
| 字族 | `font_family_pf_medium` | PingFang SC | MCP 返回。 |
| 字号 | `font.interactive_avatar_live_label` | 9px | `633:3446` / `1791:99` / `1791:106` |
| 字重 | `font_weight_medium` | 500 | MCP 返回。 |
| 行高 | `line_height.interactive_avatar_live_label` | 11px | MCP 返回。 |

---

## 4. 变体与配置 (Variants & Props)

### 4.1 状态矩阵

| `liveState` | `relationship` | Relay 节点 | UI 表现 |
|:---|:---|:---|:---|
| `not_live` | `unfollowed` | `633:3416` | 42px 头像 + 白色 2px 描边 + 红色 20px 加号关注按钮；按钮内 `icon-add` 为白色 1px 居中描边局部特例。 |
| `not_live` | `intermediate` | `633:3509` | 42px 头像 + 白色 2px 描边 + 白色 20px 中间态按钮。 |
| `not_live` | `followed` | `633:3448` | 42px 头像 + 白色 2px 描边；不展示关注按钮。 |
| `live` | `unfollowed` | `633:3420` | 顶部「直播中」标签（`icon-cart-fill`）+ 红色外圈呼吸圈 + 42px 头像 + 红色 20px 加号关注按钮；按钮内 `icon-add` 为白色 1px 居中描边局部特例；不展示内层红环。 |
| `live` | `intermediate` | `633:3526` | 顶部「直播中」标签（`icon-cart-fill`）+ 红色外圈呼吸圈 + 42px 头像 + 白色 20px 中间态按钮；不展示内层红环。 |
| `live` | `followed` | `633:3480` | 顶部「直播中」标签（`icon-cart-fill`）+ 红色外圈呼吸圈 + 内层红环 + 42px 头像；不展示关注按钮。 |

### 4.2 实体预览 / Stage

> Stage 来源：Relay 节点 `633:3418`，画板名「互动区-头像」，尺寸 `213×264`。MCP 截图核对结果为 2 行 × 3 列状态矩阵：第一行为非直播，第二行为直播中；三列依次为未关注 / 中间态 / 已关注。

#### 4.2.1 Stage 排布

```text
InteractiveAvatar Stage (213×264)

┌─────────────────────────────────────────────┐
│ 非直播 not_live                              │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ │
│ │ unfollowed │ │intermediate│ │  followed  │ │
│ │ 633:3416   │ │ 633:3509   │ │ 633:3448   │ │
│ └────────────┘ └────────────┘ └────────────┘ │
│                                             │
│ 直播中 live                                  │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ │
│ │ unfollowed │ │intermediate│ │  followed  │ │
│ │ 633:3420   │ │ 633:3526   │ │ 633:3480   │ │
│ └────────────┘ └────────────┘ └────────────┘ │
└─────────────────────────────────────────────┘
```

Stage 渲染时应使用深色沉浸背景，以验证白色头像描边、白色中间态按钮、直播标签与品牌红状态层在视频背景上的可读性。若发布页无法直接使用 Relay 切图，应按下表用静态 HTML/CSS mockup 还原 6 个状态；若已导出 Relay PNG，则优先展示原稿切图，并在图下保留本表作为状态索引。

| Stage 位置 | `liveState` | `relationship` | Relay 节点 | 必须展示的视觉层 | 不展示 |
|:---|:---|:---|:---|:---|:---|
| 第 1 行第 1 列 | `not_live` | `unfollowed` | `633:3416` | 42px 头像、白色 2px 头像描边、红色 20px 加号关注按钮、白色 1px 居中描边 `icon-add` | 直播标签、直播环 |
| 第 1 行第 2 列 | `not_live` | `intermediate` | `633:3509` | 42px 头像、白色 2px 头像描边、白色 20px 中间态按钮 | 直播标签、直播环 |
| 第 1 行第 3 列 | `not_live` | `followed` | `633:3448` | 42px 头像、白色 2px 头像描边 | 关注按钮、直播标签、直播环 |
| 第 2 行第 1 列 | `live` | `unfollowed` | `633:3420` | 顶部「直播中」标签（`icon-cart-fill`）、红色外圈呼吸圈、42px 头像、白色 2px 头像描边、红色 20px 加号关注按钮、白色 1px 居中描边 `icon-add` | 内层红环 |
| 第 2 行第 2 列 | `live` | `intermediate` | `633:3526` | 顶部「直播中」标签（`icon-cart-fill`）、红色外圈呼吸圈、42px 头像、白色 2px 头像描边、白色 20px 中间态按钮 | 内层红环 |
| 第 2 行第 3 列 | `live` | `followed` | `633:3480` | 顶部「直播中」标签（`icon-cart-fill`）、红色外圈呼吸圈、内层红环、42px 头像、白色 2px 头像描边 | 关注按钮 |

#### 4.2.2 Stage 尺寸与定位约束

| 元素 | Stage 还原规则 |
|:---|:---|
| 单个状态容器 | 固定 `50×83px`；不得裁剪顶部直播标签或底部关注按钮。 |
| Stage 网格 | 3 列 × 2 行；列顺序固定为 `unfollowed` / `intermediate` / `followed`；行顺序固定为 `not_live` / `live`。 |
| 非直播头像 | 头像最终视觉 y 坐标为 `30px`，即头像区 top `20/21px` + 头像区内 top `9/10px`。 |
| 直播头像 | 头像最终视觉 y 坐标为 `29px`，即头像区 top `25px` + 头像区内 top `4px`。 |
| 关注按钮 | 相对外层容器固定 `x=15px, y=62px`，尺寸 `20×20px`；`followed` 不渲染。 |
| 直播标签 | 相对外层容器固定 `x=0, y=4px`，尺寸 `50×21px`；仅 `live` 渲染。 |
| 直播呼吸圈 | 外圈 `46×46px`、0.5px 品牌红描边、50% 透明度；以头像中心为圆心居中对齐；仅 `live` 渲染。 |
| 直播内环 | 内环 `42×42px`、1.5px 品牌红描边；仅 `live + followed` 渲染，其它直播态不渲染。 |

#### 4.2.3 发布页 HTML 建议

生成 `spec-page.html` 时，建议把本段渲染为一个可视 stage，而不是只渲染表格。DOM 语义建议如下：

```html
<div class="stage stage--interactive-avatar" data-source-node="633:3418">
  <div class="interactive-avatar-demo" data-live-state="not_live" data-relationship="unfollowed"></div>
  <div class="interactive-avatar-demo" data-live-state="not_live" data-relationship="intermediate"></div>
  <div class="interactive-avatar-demo" data-live-state="not_live" data-relationship="followed"></div>
  <div class="interactive-avatar-demo" data-live-state="live" data-relationship="unfollowed"></div>
  <div class="interactive-avatar-demo" data-live-state="live" data-relationship="intermediate"></div>
  <div class="interactive-avatar-demo" data-live-state="live" data-relationship="followed"></div>
</div>
```

可视还原必须满足：

1. `.stage--interactive-avatar` 使用深色背景，不使用纯白背景验证沉浸式组件。
2. `.interactive-avatar-demo` 固定 `width: 50px; height: 83px; position: relative;`。
3. `[data-live-state="live"]` 渲染直播标签和外圈呼吸圈；`not_live` 不渲染。
4. `[data-relationship="unfollowed"]` 渲染红底加号按钮，且按钮内 `icon-add` 使用白色 1px 居中描边局部变体；`intermediate` 渲染白底中间态按钮；`followed` 不渲染关注按钮。
5. `[data-live-state="live"][data-relationship="followed"]` 额外渲染内层红环；其它直播态不渲染内层红环。
6. 头像图片可用真实头像资产或明确标注的占位图，但尺寸、描边、定位必须与本表一致。

### 4.3 Props 定义

```typescript
type InteractiveAvatarLiveState = 'not_live' | 'live';
type InteractiveAvatarRelationship = 'unfollowed' | 'intermediate' | 'followed';

interface InteractiveAvatarProps {
  /** 头像图片地址；为空或加载失败时回退到 Avatar fallback */
  src?: string;

  /** 用户昵称，用于图片 alt 与无障碍标签 */
  alt: string;

  /** 是否直播中：决定是否展示直播标签与直播环 */
  liveState: InteractiveAvatarLiveState;

  /** 关注关系：决定底部关注按钮状态 */
  relationship: InteractiveAvatarRelationship;

  /** 点击头像入口 */
  onAvatarPress?: () => void;

  /** 点击关注关系按钮；relationship=followed 时不渲染按钮 */
  onFollowPress?: () => void;
}
```

### 4.4 状态层渲染规则

| 条件 | 渲染规则 |
|:---|:---|
| `liveState === 'live'` | 展示顶部 `50×21px`「直播中」标签（`icon-cart-fill`）与红色外圈呼吸圈；仅 `relationship === 'followed'` 时额外展示内层红环。 |
| `liveState === 'not_live'` | 不展示直播标签；不展示红色直播环。 |
| `relationship === 'unfollowed'` | 展示红底 20×20 关注按钮，图标为加号语义；该 `icon-add` 必须使用白色 1px 居中描边局部变体。 |
| `relationship === 'intermediate'` | 展示白底 20×20 中间态按钮，图标由设计资产表达。 |
| `relationship === 'followed'` | 不展示关注按钮，保留头像入口。 |

---

## 5. 交互与显示规则 (Interaction & Display Rules)

1. 点击头像区域进入作者主页或作者浮层；点击关注按钮只触发关注关系操作，不应冒泡为头像跳转。
2. `followed` 状态不展示 20×20 关注按钮，避免用户误认为可重复关注。
3. `intermediate` 状态用于关注操作过程中的过渡反馈或业务中间关系态；样式必须使用白底圆形按钮，不得复用红底加号。
4. 直播状态只由 `liveState` 控制；不能因为 `relationship` 变化移除直播标签或直播环。
5. 图片加载失败时头像本体使用 `visual/Avatar.md` 的兜底规则，但外层直播标签、直播环、关注按钮仍按当前状态展示。
6. 组件在视频背景上渲染时，不得裁剪 50×83 外层容器；尤其不能裁掉顶部直播标签和底部关注按钮。

---

## 6. 工程实现约束 (Implementation Constraints)

- 外层点击热区固定 `50×83px`；不要只以 `42×42px` 头像作为组件容器，否则会裁掉状态层。
- 头像图片固定消费 `avatar.size-42`，禁止替换为 40px、44px、48px 等近似值。
- 头像描边为白色 `2px`，必须以内描边或 outline 方式实现，不改变头像占位尺寸。
- 直播红环尺寸固定外层 `46×46px`；仅 `live + followed` 额外保留内层 `42×42px` 红环。外层呼吸圈必须与头像中心对齐，不得用偏移的 box-shadow 简化。
- 直播标签文案固定为「直播中」；字重为 500，字号为 9px，行高 11px。
- 图标资产应从 `visual/Icon.md` 约束的规范图标入口维护；本组件只消费加号、中间态、直播图标语义，不在组件内重绘路径。
- 未关注态 `icon-add` 的 1px 居中描边是 Follow Badge 局部特例；不得修改全局 `icon-add.svg`，不得让其它加号入口继承该描边。

---

## 7. 追溯与待办 (Traceability & TODOs)

| ID | 类型 | 说明 |
|:---|:---|:---|
| IA-AVATAR-01 | tokenize | 将 `size.interactive_avatar_*`、`space.interactive_avatar_*`、`stroke.interactive_avatar_*` 写入工程可消费 token。 |
| IA-AVATAR-02 | asset | 关注加号使用 `icon-add-plus`，中间态使用 `icon-follow-added-fill`，直播标签使用 `icon-cart-fill`；均需从 `visual/Icon.md` 消费，不在组件内重绘路径。 |
| IA-AVATAR-03 | semantics | `relationship=intermediate` 的业务语义需由产品侧确认：本文档仅按 Relay 状态名与视觉样式记录。 |
| IA-AVATAR-04 | a11y | 直播中状态建议输出可访问描述，如「正在直播，点击进入直播间」。 |
