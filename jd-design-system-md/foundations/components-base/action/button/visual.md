---
file: visual.md
component: Button
owner_role: 视觉设计师
last_updated: 2026-04-29
tokens_dependency: [color, typography, spacing, radius, shadow, motion]
---

# Visual · 视觉规范

> 视觉设计师视角的 Button:Token 引用、5×4×5 矩阵、深色/浅色映射、变体边界。
>
> **本文档不写硬编码色值** —— 所有色值通过 Token 引用。如果你看到一个色值,那要么是 Token 没接进来(请提 issue),要么是反例(请见 donts.md)。

---

## 1. Token 依赖清单

| Token Path | 用途 |
|---|---|
| `color.brand.primary` | primary 默认背景 |
| `color.brand.primary.pressed` | primary 按下背景 |
| `color.semantic.danger` | danger 默认背景 |
| `color.semantic.danger.pressed` | danger 按下背景 |
| `color.neutral.text.primary` | secondary / text 默认文字色 |
| `color.neutral.text.disabled` | disabled 文字色 |
| `color.neutral.bg.disabled` | disabled 背景 |
| `color.neutral.border.default` | secondary 默认描边 |
| `typography.button.L` / `M` / `S` / `XS` / `Mini` | 5 个尺寸的字号阶梯 |
| `spacing.button.padding-h.L` 等 | 5 个尺寸的内边距 |
| `radius.button` | 圆角(默认 8pt,可通过主题切换) |
| `motion.button.press` | 按下动效 duration(`fast` 200ms)|

**重要**:本组件的 visual.md 不出现具体色值(`#fa2c19`),只出现 Token 路径。色值变更通过 `[[foundations/tokens/color.md]]` 一处生效。

---

## 2. 尺寸矩阵

| Size | 高度 | 内边距(水平) | 字号 | 适用场景 |
|---|---|---|---|---|
| L | 48pt | 24pt | `typography.button.L`(17pt/600) | 页面主操作:加购、立即购买、提交订单 |
| M | 40pt | 16pt | `typography.button.M`(15pt/500) | 模块主操作、对话框确认 |
| S | 32pt | 12pt | `typography.button.S`(13pt/500) | 卡片内操作、次要操作 |
| XS | 28pt | 8pt | `typography.button.XS`(12pt/400) | 列表项内操作、紧凑布局 |
| Mini | 24pt | 8pt | `typography.button.Mini`(11pt/400) | 标签内嵌、极紧凑场景 |

**最小可点区铁律**:无论 Size 多小,**实际可点击区域 ≥ 44pt × 44pt**。S/XS/Mini 通过透明热区扩大,视觉尺寸不变。详见 `[[horizontal/a11y/touch-target.md]]`。

---

## 3. 类型 × 状态 矩阵

> 每个单元格描述使用什么 Token。空格 = 该状态在该类型下未定义(理论上不该出现)。

### Light Mode

| Type \ State | default | pressed | disabled | loading |
|---|---|---|---|---|
| **primary** | bg=`color.brand.primary`<br>text=`color.neutral.text.onColor` | bg=`color.brand.primary.pressed` | bg=`color.neutral.bg.disabled`<br>text=`color.neutral.text.disabled` | bg=`color.brand.primary`<br>spinner=`color.neutral.text.onColor` |
| **secondary** | bg=`color.neutral.bg.surface`<br>border=`color.neutral.border.default`<br>text=`color.neutral.text.primary` | bg=`color.neutral.bg.pressed` | border=`color.neutral.border.disabled`<br>text=`color.neutral.text.disabled` | 同 default + spinner=`color.brand.primary` |
| **text** | text=`color.neutral.text.primary` | bg=`color.neutral.bg.pressed`(轻量,圆角 4pt) | text=`color.neutral.text.disabled` | text=`color.neutral.text.primary` + spinner |
| **danger** | bg=`color.semantic.danger` | bg=`color.semantic.danger.pressed` | 同 primary disabled | bg=`color.semantic.danger` + spinner=`color.neutral.text.onColor` |

### Dark Mode

> 通过 `color.*.dark` variant 自动映射。**视觉设计师不需要为深色模式单独设计** —— 只需在 `tokens/color.md` 中维护 `light/dark` 变体即可。

例外:
- 大促场景(618/双11)的渐变按钮,深色模式下需手工调暗渐变饱和度(详见 `[[horizontal/brand/promotion/618.md#dark-mode]]`)

---

## 4. 图标 + 文字 排布

| 形式 | 示意 | 间距 |
|---|---|---|
| 仅文字 | `[ 加入购物车 ]` | - |
| 左图标+文字 | `[icon][ 加入购物车 ]` | 图文间距 = `spacing.4` |
| 文字+右图标 | `[ 查看更多 ][icon]` | 同上 |
| 仅图标(块状) | 不用 Button,用 `IconButton` 独立组件 | - |

**图标尺寸**(随按钮尺寸缩放):
| Button Size | Icon Size |
|---|---|
| L | 20pt |
| M | 16pt |
| S | 14pt |
| XS | 12pt |
| Mini | 12pt |

---

## 5. block 与 inline

- **inline**(默认):宽度自适应文字 + 内边距
- **block**:撑满父容器宽度

**何时用 block**:
- 提交订单、确认支付、立即购买等"全屏页面底部主操作"
- 表单底部的提交按钮
- 模态弹窗内的主按钮(若按钮组只有一个主按钮)

**何时不用 block**:
- 列表项内的操作(会破坏卡片节奏)
- 与其他按钮并排时(并排按钮的 block 处理见 `[[experience.md#button-group]]`)

---

## 6. 圆角

- 默认 `radius.button` = 8pt
- 大促场景可通过主题切换到 `radius.full`(胶囊型),但**仅限于品牌色 / 渐变背景**的按钮(详见 `[[horizontal/brand/promotion/618.md#button-style]]`)
- 不允许直接在组件层硬覆盖圆角

---

## 7. 阴影与 elevation

**默认按钮无阴影**。仅以下场景使用:

| 场景 | Token |
|---|---|
| 浮在卡片之上的主操作(如 PDP 底部固定栏) | `shadow.elevation.2` |
| FAB(浮动操作按钮,独立组件,本组件不涉及) | - |

---

## 8. 大促 / 节庆变体

> **重要**:大促主题不通过覆盖 Button 视觉实现,而是通过**主题切换**(`[[horizontal/brand/promotion/]]`)整体替换 Token。Button 组件本身不感知"现在是 618 还是日常"。

变体范例(均通过主题 Token 实现,不需要修改 Button 代码):
- 618 期间:primary 背景从 `color.brand.primary`(纯色红)切换为渐变 Token
- 双 11 期间:radius 从 8pt 切换为 full
- 春节期间:文字色叠加金色描边

---

## 9. 边界与例外

**视觉上明确的"不许"**(都已在 `donts.md` 配置自动检测):
- ❌ Button 内嵌 Button(嵌套点击)
- ❌ 自定义渐变(必须走主题 Token)
- ❌ disabled 状态用透明度模拟(必须用 disabled token)
- ❌ 在 secondary 上叠加品牌色文字(造成与 primary 视觉混淆)
- ❌ 圆角硬编码值(必须用 `radius.button` 或 `radius.full`)

---

## 10. 变体总览(查图请去 variants/)

```
variants/
├── size-matrix.png            # 5 种 size 对照图
├── type-state-matrix.png      # 4 type × 5 state 全矩阵图
├── icon-positions.png         # 4 种图标位置示意
├── block-vs-inline.png        # block 与 inline 对照
├── light-dark-comparison.png  # 浅色/深色对比
└── promotion-themed.png       # 大促主题变体
```

(以上图片当前为占位符,P1 阶段完成实拍/Figma 导出)

---

## 11. 与设计文件的同步

- Figma Library:`京东 APP / Foundations / Action / Button`(链接占位)
- 同步机制:Figma 插件 + Token Bridge(详见 `[[ai-mechanism/token-sync.md]]`)
- **当 Figma 文件修改时**:必须同步更新本 visual.md 的 Token Path(由 CI 任务校验,governance/quality.md)
