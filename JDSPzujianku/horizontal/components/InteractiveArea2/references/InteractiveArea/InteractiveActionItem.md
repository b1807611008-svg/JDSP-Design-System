---
component_name: InteractiveActionItem
component_name_zh: 沉浸式互动操作项
category: Molecule
version: "1.2.0"
last_updated: "2026-05-23"
relay_source:
  page_url: "https://relay.jd.com/file/design?id=1958051135088508929&page_id=0%3A13090&node_id=0%3A13091"
  core_node: "823:3046"
  mcp_verified_nodes:
    - node: "823:3046"
      desc: "基础组件/图标＋字体 — 评论（代表性实例，MCP get_design_context 校验）"
    - node: "823:3017"
      desc: "基础组件/图标＋字体 — 点赞 Default（MCP get_variables 校验）"
    - node: "823:3047"
      desc: "基础组件/图标＋字体 — 收藏"
    - node: "823:3048"
      desc: "基础组件/图标＋字体 — 分享"
    - node: "633:3616"
      desc: "互动区-音量 — 取消静音 / 静音状态组件（MCP get_design_context + get_variables + get_screenshot 校验）"
    - node: "1791:107"
      desc: "底部静音图标落位 — 50×50 热区内圆形按钮（MCP get_design_context + get_variables + get_screenshot 校验）"
mcp_access_note: >
  v1.2.0 追加读取 `633:3616` / `1791:107`，补齐底部静音与取消静音样式切换。
  v1.1.0 已通过 zero-design MCP 成功调用 get_design_metadata / get_design_context /
  get_screenshot / get_variables，直接从设计稿节点提取真实参数。
  v1.0.0 中基于推断的两处错误已修正（见 TODOs IA-01 / 正文标注）。
atom_dependencies:
  - Icon (interactive variant, size="interactive")
  - Text (caption)
token_files_referenced:
  - ../../foundations/tokens/color.md
  - ../../foundations/tokens/typography.md
  - ../../foundations/tokens/spacing.md
  - ../../foundations/tokens/shadow.md
  - components/Icon.md
---

# InteractiveActionItem — 沉浸式互动操作项

## 1. 组件概述 (Overview)

**InteractiveActionItem** 是短视频沉浸流右侧互动列的最小可交互单元（Molecule）。  
每个操作项由一枚「互动区专属图标（Interactive Icon）」与一行「计数文本（Label）」垂直堆叠构成，承载点赞、评论、种草、分享四类核心强交互动作；右侧互动列底部的音量控制由独立 **InteractiveVolumeControl** 二级组件承载，支持「静音」与「取消静音」两种样式切换。

**适用场景**：
- 短视频流右侧 Action Rail（操作列），通常由 4 个 InteractiveActionItem 竖向排列，并在底部追加 InteractiveVolumeControl；
- 所有呈现场景均为**沉浸式深色背景**（全屏视频），图标与文字均需携带防穿透阴影。

> **层级说明（Atomic Design）**：  
> InteractiveActionItem = Icon（Atom）+ Text（Atom） → Molecule  
> 右侧 Action Rail = 4 × InteractiveActionItem + InteractiveVolumeControl → Organism

---

## 2. 解剖结构 (Anatomy)

```
┌─────────────────────────┐
│  InteractiveActionItem  │  ← 外层容器 (Container)
│  ┌───────────────────┐  │
│  │  Icon Area (50×50)│  │  ← 图标区（含透明热区 padding）
│  └───────────────────┘  │
│  Label top: 43px         │  ← 与 Icon 热区底部重叠 7px（非 flex gap）
│  ┌───────────────────┐  │
│  │   Label Area      │  │  ← 文本区（计数 / 操作词）
│  └───────────────────┘  │
└─────────────────────────┘
外层容器宽: 50px（与图标热区等宽）
外层容器高: 62px；内部 Icon + Label 视觉内容高: 58px；文字到底部留 4px
```

### 2.1 组成原子

| 层 | 原子名称 | 说明 |
|:---|:---|:---|
| A1 | **Icon（Interactive）** | 来自 `icons/interactive/` 目录；画板固定 `50×50pt`，内部核心图形约 `27pt`，四周透明热区 padding 不可裁剪 |
| A2 | **Label Text** | 计数数值或操作词（如 "34.5万" / "分享"）；PingFang SC / `font_size_11_500` · **MCP 实测 fontWeight=500** |
| A3 | **Volume Icon（Fill）** | 来自 `icons/fill/icon-volume-mute-fill`；用于底部静音 / 取消静音控制，尺寸、偏移、圆角全部引用 `Icon.md § 互动区音量控制变量` |

---

## 3. Token 映射规则 (Token Mapping)

> ⚠️ 严禁写死任何 CSS 数值。所有属性必须映射到 `/tokens`以及 `/visual`目录下的变量。

### 3.1 尺寸与间距

| 属性 | Token 引用 | 值 | 来源文档 |
|:---|:---|:---:|:---|
| 图标容器宽高（含热区） | `size.interactive_icon` = `50px` | 50 px | `Icon.md § 2 / § 6` |
| 内部视觉内容高 | `size.action_item_content` | 58 px | MCP `1600:588` / `633:4476;633:3751` |
| Label 顶部定位 | `space.action_item_label_top` | 43 px | MCP `1600:1056;633:3764` |
| Label 底部留白 | `space.action_item_bottom_inset` | 4 px | `62 - 58` |
| 图标-文字排布 | 绝对定位重叠 | `labelTop 43` / `iconHeight 50` | 非 `gap`；Label 与 Icon 热区重叠 7 px |
| 外层容器总高 | `size.action_item` = `62px` | 62 px | `Icon.md § 6 / spacing.md` |
| 外层容器宽 | 与图标容器同宽 `50px` | 50 px | `Icon.md § 6` |
| 各 ActionItem 间垂直间距 | `space.action_item_stack_gap` | 0 px | MCP `1600:588` 两个 symbol 均为 inline-flex column，无 gap |

### 3.1.1 底部音量控制尺寸

> 以下数据来源：MCP `get_design_context` 直接读取 `633:3616` 与 `1791:107`。实现层禁止写裸 CSS 数值，必须引用 `Icon.md` 中同名变量。

| 属性 | Token 引用 | MCP 实测值 | 来源节点 |
|:---|:---|:---:|:---|
| 音量按钮热区 | `size.interactive_volume_hotzone` | 50 px | `1791:107` |
| 取消静音胶囊宽 | `size.interactive_volume_control_w` | 69 px | `633:3614` |
| 取消静音胶囊高 | `size.interactive_volume_control_h` | 30 px | `633:3614` |
| 静音圆形视觉底 | `size.interactive_volume_circle` | 30 px | `1787:133` / `1791:108` |
| 静音落位图标 | `size.interactive_volume_icon_compact` | 16 px | `1791:109` |
| 胶囊内图标 | `size.interactive_volume_icon_inline` | 14 px | `633:3579` |
| 热区内圆形偏移 | `space.interactive_volume_circle_inset` | 10 px | `1791:108` |
| 热区内图标偏移 | `space.interactive_volume_icon_compact_inset` | 17 px | `1791:109` |
| 胶囊文案偏移 | `space.interactive_volume_label_x` / `space.interactive_volume_label_y` | 7 px / 9.5 px | `633:3578` |
| 胶囊图标偏移 | `space.interactive_volume_inline_icon_x` / `space.interactive_volume_inline_icon_y` | 48 px / 8 px | `633:3579` |

### 3.2 排版字体

> 以下数据来源：MCP `get_design_context` 直接读取节点 `823:3046;633:3767`（文字节点）属性值。

| 属性 | Token 引用 | MCP 实测值 | 备注 |
|:---|:---|:---|:---|
| 字族 | `font_family_pf_medium` | `PingFang SC` | MCP 返回 `fontFamily: 'PingFang SC'` |
| 字号 | `font_size_caption_md` → `font_size_11` | `11` pt | MCP 返回 `fontSize: 11` |
| 字重 | `font_weight_medium` | `500` | ⚠️ MCP 返回 `fontWeight: '500'`，非 400！v1.0.0 推断错误已修正 |
| Role 组合 Token | `font_size_14_500` 最近邻；本组件提案 `font_size_11_500` | 11px / 500 | typography.md 中 500 档现有 `font_size_14_500`，11pt/500 为新增提案 |
| 行高 | MCP 实测 `lineHeight: 15` | `15` px | 设计稿显式值（非公式推导）；`11 * 1.5 - 1 = 15.5` 公式取整与此吻合 |
| 文字对齐 | `textAlign: center` | center | MCP 返回 `textAlign: 'center'` |

#### 音量控制文字

| 属性 | Token 引用 | MCP 实测值 | 备注 |
|:---|:---|:---|:---|
| 字族 | `font_family_pf_medium` | `PingFang SC` | `633:3578` |
| 字号 / 字重 | `font.interactive_volume_label` → `font_size_10_500` | 10 / 500 | `typography.md` 已有 `font_size_10` 与 `font_weight_medium` |
| 行高 | `line_height.interactive_volume_label` | 10.91 px | 设计稿显式值 |
| 文案 | 固定文案 | 取消静音 | 仅 `unmute_prompt` 状态显示 |

> ⚠️ **v1.0.0 修正说明**：前版推断字重为 `font_weight_regular`（400），MCP `get_design_context` 实测为 `fontWeight: '500'`（Medium），已修正为 `font_weight_medium`。

### 3.3 色彩与状态映射

> 以下数据来源：MCP `get_variables` 直接读取节点 `823:3017` 返回的变量绑定。

#### 文字色彩（MCP 直接校验）

| 状态 | Token 引用 | MCP 返回值 | Hex 说明 |
|:---|:---|:---|:---|
| Default（计数文字） | `color/text_immerse` | `#ffffffe5` | ⚠️ **非纯白 #ffffff**！约 90% 不透明度白色。v1.0.0 推断为 `color/title_immerse` 已修正 |
| Active（like） | `color/primary` | `#ff0f23` | 品牌红，需设计稿 Active 节点二次确认 |
| Active（grass） | `color/Recommend_btntext` | `#14ad5d` | 种草绿，需设计稿 Active 节点二次确认 |
| Disabled | `color/text_immerse_help` | `#ffffffb2` | 沉浸态辅助文本，约 70% 不透明度 |

> ⚠️ **v1.0.0 修正说明**：前版将文字 Default 颜色推断为 `color/title_immerse`（`#ffffff`），MCP `get_variables` 节点 `823:3017` 实测变量绑定为 `color/text_immerse`（`#ffffffe5`，略带透明），两者视觉接近但 Token 引用不同。以 MCP 直接读取值为准。

#### 图标色彩

| 状态 | 操作类型 | Token 引用 | 值 | 来源 |
|:---|:---|:---|:---:|:---|
| Default（未激活） | like / comment / share / 收藏 | `color/title_immerse` | `#ffffff` | MCP 截图视觉确认（白色图标） |
| Active（已赞） | like | `color/primary` | `#ff0f23` | `color.md — 品牌主色` |
| Active（已种草） | grass | `color/Recommend_btntext` | `#14ad5d` | `color.md — 种草按钮文本` |
| Disabled（禁用） | all | `color/text_disable` | `#666666` | `color.md — 禁用文本` |

#### 音量控制色彩

| 状态 | 元素 | Token 引用 | MCP 返回值 | 来源 |
|:---|:---|:---|:---:|:---|
| muted / unmute_prompt | 背景 | `color.interactive_volume_bg` → `color/background 3` | `#ffffffe5` | MCP `get_variables(633:3616)` |
| muted / unmute_prompt | 图标 | `color.interactive_volume_fg` → `color/title` | `#171a26` | MCP `get_variables(633:3616)` |
| unmute_prompt | 文案 | `color.interactive_volume_fg` → `color/title` | `#171a26` | MCP `get_variables(633:3616)` |
| unmute_prompt | 文案/图标透明度 | `opacity.interactive_volume_content` | `0.90` | MCP `get_design_context(633:3616)` |

### 3.4 阴影

| 应用元素 | Token 引用 | 实现方式 | 来源文档 |
|:---|:---|:---|:---|
| 互动图标 | `shadow_interactive` | `filter: drop-shadow(0 1px 1px rgba(0,0,0,0.20))` | `shadow.md — 官方命名 Shadow Token` |
| 计数文字 | `shadow_interactive` | `text-shadow: 0 1px 1px rgba(0,0,0,0.20)` | `shadow.md — 沉浸式视频流专用映射` |

> **注意**：`shadow_interactive` 为防穿透设计，Light / Dark 模式参数相同（均作用于全屏视频背景）。  
> 禁止在同一元素同时叠加 `text-shadow` 与 `filter: drop-shadow`（见 `shadow.md — Anti-patterns`）。

---

## 4. 变体与配置 (Variants & Props)

### 4.1 组件 Props 定义

```typescript
interface InteractiveActionItemProps {
  /** 操作类型，决定图标资产与激活色彩 */
  type: 'like' | 'comment' | 'grass' | 'share';

  /** 是否处于激活状态（已点赞 / 已种草） */
  isActive?: boolean;

  /** 是否禁用（如评论区关闭） */
  disabled?: boolean;

  /**
   * 显示计数（真实数字，需通过 formatCount 格式化）。
   * undefined 时不渲染 Label 区域。
   */
  count: number | undefined;

  /** 点击回调 */
  onPress?: () => void;
}

interface InteractiveVolumeControlProps {
  /** 音量状态：muted 展示圆形静音按钮；unmute_prompt 展示「取消静音」胶囊按钮 */
  state: 'muted' | 'unmute_prompt';

  /** 点击回调：muted 通常切换到 unmute_prompt 或直接恢复声音 */
  onPress?: () => void;
}
```

### 4.2 type 与资产/颜色映射

| `type` 值 | 图标（Default） | 图标（Active） | 激活图标色 Token | 激活文字色 Token |
|:---|:---|:---|:---|:---|
| `like` | `icon-like-default` | `icon-like-active` | `color/primary` | `color/primary` |
| `comment` | `icon-comment-default` | —（无激活态） | — | — |
| `grass` | `icon-grass-default` | `icon-grass-active` | `color/Recommend_btntext` | `color/Recommend_btntext` |
| `share` | `icon-share-default` | —（无激活态） | — | — |

### 4.3 volume state 与资产/颜色映射

| `state` 值 | UI 形态 | 图标资产 | 图标节点 | 背景 Token | 前景 Token |
|:---|:---|:---|:---|:---|:---|
| `muted` | 圆形按钮，仅图标 | `icon-volume-mute-fill` | `1847:6831` / `1847:6838` | `color.interactive_volume_bg` | `color.interactive_volume_fg` |
| `unmute_prompt` | 胶囊按钮，文案「取消静音」+ 图标 | `icon-volume-mute-fill` | `1787:150;1847:6838` | `color.interactive_volume_bg` | `color.interactive_volume_fg` |

> **约束**：音量控制不复用 `InteractiveActionItem` 的 `50×62` 图标+文字结构；它是右侧互动区底部独立二级组件，尺寸与状态切换以 `Icon.md § 互动区音量控制变量` 为唯一来源。

> **约束**：comment 与 share 无 `isActive` 状态，传入 `isActive=true` 时忽略，不改变外观。

---

## 5. 交互与显示规则 (Interaction & Display Rules)

### 5.1 计数格式化规则

```typescript
/**
 * 遵循设计稿标注格式（"34.5万"样式）。
 * count 始终为真实业务数字，不存在固定词透传。
 * - undefined → 不渲染 Label（调用方判断）
 * - 0         → "0"（明确显示零计数，与业务惯例一致）
 * - < 10000   → 原样字符串，如 "1232"
 * - >= 10000  → 保留 1 位小数不省略尾零，如 "1.0万" / "34.5万"
 */
function formatCount(count: number | undefined): string {
  if (count === undefined) return '';
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}万`;
  }
  return String(count);
}
```

**示例**：
| 原始值 | 显示值 |
|:---:|:---:|
| `undefined` | （不渲染） |
| `0` | `0` |
| `1232` | `1232` |
| `99000` | `9.9万` |
| `345000` | `34.5万` |

### 5.2 触摸热区（Touch Target）

| 属性 | 规则 | Token 来源 |
|:---|:---|:---|
| 图标触摸热区 | 图标画板自带 `50×50pt` 透明 padding，**不得通过 CSS 缩减图标容器尺寸** | `Icon.md § 2 / § 6` |
| 整体可点击区域 | 整个 `InteractiveActionItem`（50×62pt）均为可点击区域，包括计数文字区 | `Icon.md § 6` |
| 热区约束 | 禁止强行裁剪 SVG viewBox 或设置 `overflow: hidden` 导致热区透明区域消失 | `Icon.md § 6` |

### 5.3 单色清洗约束

所有互动区图标资产必须完成**单色清洗（currentColor 收口）**：
- 移除 SVG 内部固定 `fill` / `stroke` 颜色值
- 统一通过父容器的 CSS `color` 属性驱动图标着色
- 由 `isActive` prop 和 `type` prop 共同决定运行时颜色

### 5.4 阴影叠加约束

- 图标：使用 `filter: drop-shadow`（贴合 SVG 路径），**禁止使用 `box-shadow`**
- 文字：使用 `text-shadow`
- 同一元素**禁止同时设置** `filter: drop-shadow` 与 `text-shadow`（见 `shadow.md § Anti-patterns`）

---

## 6. 实现参考（CSS / React）

> 以下代码基于 MCP `get_design_context` 直接生成结果，经 Token 化改写。

```tsx
// React 参考实现（基于 MCP node 823:3046 直接输出）
import { Icon } from '@/components/atoms/Icon';
import { formatCount } from '@/utils/formatCount';

const colorMap = {
  like:    { default: 'color/title_immerse', active: 'color/primary' },
  comment: { default: 'color/title_immerse', active: 'color/title_immerse' },
  grass:   { default: 'color/title_immerse', active: 'color/Recommend_btntext' },
  share:   { default: 'color/title_immerse', active: 'color/title_immerse' },
};

const volumeIconMap = {
  muted: 'icon-volume-mute-fill',
  unmute_prompt: 'icon-volume-mute-fill',
} as const;

export const InteractiveActionItem = ({
  type, isActive = false, disabled = false, count, onPress,
}: InteractiveActionItemProps) => {
  const iconName = isActive ? `icon-${type}-active` : `icon-${type}-default`;
  const iconColor  = isActive ? colorMap[type].active : colorMap[type].default;
  // ⚠️ 文字色：MCP 实测为 color/text_immerse (#ffffffe5)，非 color/title_immerse
  const labelColor = disabled ? 'color/text_immerse_help' : 'color/text_immerse';

  return (
    // 容器: size.action_item | MCP: width:50, height:62；内部绝对定位，无 flex gap
    <div
      style={{ width: 'var(--size-interactive-icon)', height: 'var(--size-action-item)', position: 'relative' }}
      onClick={!disabled ? onPress : undefined}
    >
      {/* Icon Area: size.interactive_icon — size="interactive"，viewBox 由 Icon.md 定义 */}
      <Icon
        name={iconName}
        size="interactive"
        color={iconColor}
        style={{
          position: 'absolute',
          left: 'var(--space-action-item-zero)',
          top: 'var(--space-action-item-zero)',
          filter: 'var(--shadow-interactive-filter)',
        }}
        aria-label={type}
      />
      {/* Label Area: MCP 实测值已映射为 typography token */}
      <span
        style={{
          width: 'var(--size-interactive-icon)',
          height: 'var(--size-action-item-label)',
          position: 'absolute',
          left: 'var(--space-action-item-zero)',
          top: 'var(--space-action-item-label-top)',
          fontSize: 'var(--font-size-11)',
          fontFamily: 'var(--font-family-pf-medium)',
          fontWeight: 'var(--font-weight-medium)',
          lineHeight: 'var(--line-height-counter)',
          color: labelColor,     /* color/text_immerse: #ffffffe5 */
          textShadow: 'var(--shadow-interactive-text)',
          textAlign: 'center',
          wordBreak: 'break-word',
        }}
      >
        {formatCount(count)}
      </span>
    </div>
  );
};

export const InteractiveVolumeControl = ({
  state, onPress,
}: InteractiveVolumeControlProps) => {
  if (state === 'unmute_prompt') {
    return (
      <button
        type="button"
        aria-label="取消静音"
        onClick={onPress}
        style={{
          width: 'var(--size-interactive-volume-control-w)',
          height: 'var(--size-interactive-volume-control-h)',
          borderRadius: 'var(--radius-interactive-volume-pill)',
          background: 'var(--color-interactive-volume-bg)',
          color: 'var(--color-interactive-volume-fg)',
          position: 'relative',
          border: 'var(--border-interactive-volume-reset)',
          padding: 'var(--space-interactive-volume-reset)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: 'var(--space-interactive-volume-label-x)',
            top: 'var(--space-interactive-volume-label-y)',
            opacity: 'var(--opacity-interactive-volume-content)',
            fontFamily: 'var(--font-family-pf-medium)',
            fontSize: 'var(--font-size-10)',
            fontWeight: 'var(--font-weight-medium)',
            lineHeight: 'var(--line-height-interactive-volume-label)',
          }}
        >
          取消静音
        </span>
        <Icon
          name={volumeIconMap[state]}
          size="interactiveVolumeInline"
          color="color.interactive_volume_fg"
          style={{
            position: 'absolute',
            left: 'var(--space-interactive-volume-inline-icon-x)',
            top: 'var(--space-interactive-volume-inline-icon-y)',
            opacity: 'var(--opacity-interactive-volume-content)',
          }}
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label="静音"
      onClick={onPress}
      style={{
        width: 'var(--size-interactive-volume-hotzone)',
        height: 'var(--size-interactive-volume-hotzone)',
        position: 'relative',
        border: 'var(--border-interactive-volume-reset)',
        padding: 'var(--space-interactive-volume-reset)',
        background: 'var(--color-interactive-volume-transparent)',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 'var(--space-interactive-volume-circle-inset)',
          top: 'var(--space-interactive-volume-circle-inset)',
          width: 'var(--size-interactive-volume-circle)',
          height: 'var(--size-interactive-volume-circle)',
          borderRadius: 'var(--radius-interactive-volume-circle)',
          background: 'var(--color-interactive-volume-bg)',
        }}
      />
      <Icon
        name={volumeIconMap[state]}
        size="interactiveVolumeCompact"
        color="color.interactive_volume_fg"
        style={{
          position: 'absolute',
          left: 'var(--space-interactive-volume-icon-compact-inset)',
          top: 'var(--space-interactive-volume-icon-compact-inset)',
        }}
      />
    </button>
  );
};
```

---

## 7. 异常记录与待办 (TODOs)

| 编号 | 类型 | 描述 |
|:---|:---|:---|
| IA-01 | ✅ MCP 已校验 | `0:13091` / `633:3616` / `1791:107` 均已通过 zero-design MCP 读取结构、变量与截图；v1.0.0 的 MCP 访问受限记录已关闭。 |
| IA-02 | ✅ 音量控制补齐 | 底部静音 / 取消静音状态已补入 `Icon.md` 变量与本文档状态映射，CSS 实现层不得写裸尺寸、颜色、透明度、圆角、字体数值。 |
| IA-03 | TODO | `comment` / `share` 是否有数值计数（如评论数显示 "1232"）还是固定文字（"评论" / "转发"）？当前 icon-showcase 中两者均有出现，需设计确认业务规则。 |
| IA-04 | TODO | Disabled 状态的图标资产是否有独立设计节点，还是纯靠 `color/text_disable` (#666666) 改色？待设计补充。 |
| IA-05 | TODO | 互动区是否有 Loading 态（点击后图标播放动效）？动效参数（时长、曲线）需补充 Motion Token 对应关系。 |
